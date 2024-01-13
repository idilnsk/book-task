import Books from "../../../db/models/Books";
import dbConnect from "../../../db/connect";
import jwt from 'jsonwebtoken';
import User from '../../../db/models/User'; 

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const books = await Books.find().populate('user', 'username');
    return response.status(200).json(books);
  } else if (request.method === 'POST') {
    try {
     

const token = request.headers.authorization?.split(' ')[1];
let userId;
let addedByUsername = 'Non-registered user';

if (token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  userId = decoded.id; 

  const user = await User.findById(userId);
  if (user) {
    addedByUsername = user.username; 
  }
}

const newBook = new Books({
  ...request.body,
  user: userId || undefined,
  addedBy: addedByUsername
});

await newBook.save();


if (userId) {
  await User.findByIdAndUpdate(userId, { $push: { booksAdded: newBook._id } });
}

response.status(201).json(newBook);

    } catch (error) {
     
      response.status(500).json({ error: error.message });
    }
  } else {
    
    response.status(405).json({ message: 'Method Not Allowed' });
  }
}
