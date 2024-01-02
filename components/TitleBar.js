import React, { useState, useEffect } from 'react';
import AuthForm from './AuthForm';
import RegistrationModal from "./RegistrationModal";
import styled from "styled-components";
import ChangePasswordModal from './ChangePasswordModal';

const Headline = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  margin: 0;
  padding: 20px;
  text-align: center;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Button = styled.button`
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  gap: 5px; // Space between buttons
`;


export default function TitleBar() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [username, setUsername] = useState('');

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (token && storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
    }
}, []);

  const logIn = (status,username) => {
    console.log("logIn function called with status: ", status);
    console.log("Username received: ", username);
    setIsLoggedIn(status);
    setUsername(username);
  };

  
  const logOut = () => {
    console.log("Logging out"); 
    localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username'); 
    setIsLoggedIn(false);
    setUsername('');
  };

  console.log("isLoggedIn state:", isLoggedIn); 

  return (
    <Headline>
      <Title>Emilias books</Title>
      <ButtonContainer>
        {!isLoggedIn ? (
          <>
            <AuthForm onLogin={logIn} />
            <Button onClick={handleOpenModal}>Register</Button>
          </>
        ) : (
          <>
            <span>Welcome, {username}!</span>
            <Button onClick={() => setShowChangePasswordModal(true)}>Change Password</Button>
            <Button onClick={logOut}>Log Out</Button>
          </>
        )}
      </ButtonContainer>
      {showModal && <RegistrationModal onClose={handleCloseModal} />}
      {showChangePasswordModal && (
        <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} />
      )}
    </Headline>
  );
}
