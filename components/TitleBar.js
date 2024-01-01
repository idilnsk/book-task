import styled from "styled-components";
import React, { useState } from 'react';
import AuthForm from './AuthForm';
import ChangePassword from './ChangePassword';

const Headline = styled.h1`
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

export default function TitleBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);

  return (
    <Headline>
      Emilias books
      {isLoggedIn ? (
        <>
          <ChangePassword onPasswordChange={logOut} />
          <button onClick={logOut}>Log Out</button>
        </>
      ) : (
        <AuthForm onLogin={logIn} />
      )}
    </Headline>
  );
}
