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
      // Assuming you have a way to get the current user's ID
      const userId = getCurrentUserId();
      await axios.post('/api/change-password', { userId, oldPassword, newPassword });
      onPasswordChange();
      // Optionally reset input fields or give feedback to the user
    } catch (error) {
      console.error('Failed to change password:', error);
      // Handle errors (e.g., show error message to the user)
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