"use strict";
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/books");
const cors = require("cors");
const bp = require("body-parser");
const { response } = require("express");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

//connection to database(pretty important step)
mongoose.connect(process.env.DATABASE_URL);

//READ
app.get("/books", async (request, response) => {
  //try to do this code but if it errors instead of crashing the server, stop and move to the catch
  try {
    const books = await Book.find(request.query);
    //e.g. {genre : classic crime}
    response.status(200).json(books);
  } catch (error) {
    console.log(error);
    response.status(404).json(error);
  }
});

//CREATE
app.post("/books", async (request, response) => {
  try {
    const newBook = await Book.create(request.body);
    response.status(200).json(newBook);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

// DELETE e.g.localhost:8080/books/90869868728729
app.delete("/books/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const deletedBook = await Book.findByIdAndDelete(id);
    response.status(200).send(deletedBook);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

//UPDATE
app.put("/books/:id", async (request, response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(request.params.id, request.body);
    response.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

/* ways to pass data from anywhere to the server

Query
/books?title=Lady Joker

Params
/books/Lady Joker

body(in the call on the frontend)
{title: "Lady Joker"}

*/
