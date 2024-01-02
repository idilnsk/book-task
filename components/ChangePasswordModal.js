import React, { useState } from 'react';
import styled from 'styled-components';
import ChangePassword from './ChangePassword';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
`;

const ChangePasswordModal = ({ onClose }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const onPasswordChange = () => {
    setShowMessage(true);
    setMessage('Password changed successfully!');
    setTimeout(onClose, 2000);
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}> 
        <ChangePassword onPasswordChange={onPasswordChange} />
        {showMessage && <p>{message}</p>}
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ChangePasswordModal;
