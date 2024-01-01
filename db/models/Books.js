import mongoose from "mongoose";
const { Schema } = mongoose;
const booksSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});
const Books = mongoose.models.Books || mongoose.model("Books", booksSchema);
export default Books;


