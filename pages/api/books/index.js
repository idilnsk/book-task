import Books from "../../../db/models/Books";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const books = await Books.find();
    return response.status(200).json(books);
  } else if (request.method === "POST") {
    try {
      const booksData = request.body;
      const books = new Books(booksData);
      await books.save();
      response.status(201).json({ status: "Book created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Not Found" });
  }
}
