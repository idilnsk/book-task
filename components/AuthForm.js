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
  border-radius: 10px; // Rounded corners
  background-color: lightorange; // Light orange color
  color: white;
  cursor: pointer;
  margin-left: 10px;
  

  &:hover {
    background-color: darkorange;
  }
`;


const Message = styled.p`
  color: green;
`;


export default function AuthForm({ onLogin }) {
    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
      event.preventDefault(); 
      try {
          const response = await axios.post('/api/auth', {
              username: loginIdentifier,
              password: loginPassword
            });
            console.log("Login successful", response.data); 
            
            const { token, userId, username } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username); 
      setMessage('Login successful');
      setError('');
      onLogin(true, username); 
    } catch (err) {
      console.error("Login error", err); 
      setError('Login failed: ' + (err.response ? err.response.data.message : 'An unknown error occurred'));
    }
  };

  return (
    <Container>
      <StyledForm>
        <StyledInput
          type="text"
          placeholder="Username/Email"
          value={loginIdentifier}
          onChange={(e) => setLoginIdentifier(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <StyledButton onClick={handleLogin}>Login</StyledButton>
      </StyledForm>
      {message && <Message style={{ color: 'green' }}>{message}</Message>}
      {error && <Message style={{ color: 'red' }}>{error}</Message>}
    </Container>
  );
}