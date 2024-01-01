// pages/api/change-password.js

import dbConnect from '../../db/connect'; // Adjust the path as needed
import User from '../../db/models/User'; // Adjust the path as needed
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const { userId, oldPassword, newPassword } = req.body;

            // Find the user by userId
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verify the old password
            if (!(await bcrypt.compare(oldPassword, user.password))) {
                return res.status(403).json({ message: 'Incorrect password' });
            }

            // Hash the new password and update
            user.password = newPassword;
            await user.save();

            res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
