import dbConnect from '../../db/connect'; // Your database connection logic
import User from '../../db/models/User'; // Your user model
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    // Handle user registration
    try {
      const { username, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

    

      // Create a new user
      const user = new User({
        username,
        password,
      });

      // Save the new user
      await user.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}