import dbConnect from '../../db/connect' // Your database connection logic
import User from '../../db/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === 'POST') {
    // Handle login
    const { username, password } = req.body
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    if (!await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Password mismatch' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Return the token and the user's ID
    res.status(200).json({
      message: 'Login successful',
      token: token,
      userId: user._id // Include the user ID in the response
    });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
