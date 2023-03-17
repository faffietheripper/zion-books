const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL);
const Book = require("./models/books");

async function seed() {
  await Book.create({
    title: "Lady Joker",
    author: "Kaoru Takamura",
    description: "One of the great masterpieces of Japanese crime fiction and one of the must-read books of this or any year' David Peace",
    genre: "Classic crime",
    isbn: "9781529394214",
    read: true,
  });

  mongoose.disconnect();
}
seed();
