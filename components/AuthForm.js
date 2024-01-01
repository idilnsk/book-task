import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: blue;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

const Message = styled.p`
  color: green;
`;


export default function AuthForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('/api/register', { username, password });
      setMessage('User created successfully');
      setError('');
    } catch (error) {
      setMessage('');
      setError('Registration failed: ' + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth', { username, password });
      // Handle the response, store the token, redirect the user, etc.
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      setMessage('Login successful');
      setError('');
      onLogin();
    } catch (err) {
      setMessage('');
      setError('Login failed: ' + err.response.data.message); // Use the actual error message from the server
    }
  };

  return (
    <Container>
      <StyledForm>
        <StyledInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {message && <Message>{message}</Message>}
        {error && <Message style={{ color: 'red' }}>{error}</Message>}
        <StyledButton type="button" onClick={handleLogin}>Login</StyledButton>
        <StyledButton type="button" onClick={handleRegister}>Register</StyledButton>
      </StyledForm>
    </Container>
  );
}
