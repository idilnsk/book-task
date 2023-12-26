//import { places } from '../../../../lib/db.js';
import dbConnect from "../../../../db/connect";
import Books from "../../../../db/models/Books";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (id === "undefined") {
    return response.status(404).json({ status: "not loaded" });
  }

  if (request.method === "GET") {
    const books = await Books.findById(id);
    if (!books) {
      return response.status(404).json({ status: "not found" });
    }
    response.status(200).json(books);
  } else if (request.method === "PATCH") {
    const placesToUpdate = await Books.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json(placesToUpdate);
  } else if (request.method === "DELETE") {
    const placesToDelete = await Books.findByIdAndDelete(id);
    response.status(200).json(placesToDelete);
  } else {
    return response.status(405).json({ message: "Not allowed" });
  }
}
