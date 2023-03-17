const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  genre: String,
  isbn: String,
  read: Boolean,
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
