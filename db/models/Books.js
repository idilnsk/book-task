import mongoose from "mongoose";
const { Schema } = mongoose;
const booksSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, 
  },
  addedBy: {
    type: String,
    required: true,
    default: 'Non-registered user', 
  },
  name: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  isbn: { type: Number, required: true }, 
  price: { type: Number, required: true } 
});
const Books = mongoose.models.Books || mongoose.model("Books", booksSchema);
export default Books;


