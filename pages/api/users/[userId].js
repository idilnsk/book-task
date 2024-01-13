import dbConnect from '../../../db/connect';
import User from '../../../db/models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { userId } = req.query;

      // Find the user by ID and populate the booksAdded array
      const user = await User.findById(userId).populate('booksAdded');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}