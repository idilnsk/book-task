import { useState } from 'react';
import axios from 'axios';

const getCurrentUserId = () => {
    return localStorage.getItem('userId');
  };

 const ChangePassword = ({ onPasswordChange }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      const userId = getCurrentUserId();
      await axios.post('/api/change-password', { userId, oldPassword, newPassword });
      onPasswordChange();
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  return (
    <div>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Change My Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};
export default ChangePassword