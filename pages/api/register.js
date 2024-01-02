import dbConnect from '../../db/connect'; 
import User from '../../db/models/User'; 
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { username,email, password} = req.body;

      const existingUser = await User.findOne({ 
        $or: [{ username }, { email }] 
      });
      if (existingUser) {
        return res.status(409).json({ message: 'Username or Email already exists' });
      }

          const user = new User({
        username,
        email,
        password,
      });

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