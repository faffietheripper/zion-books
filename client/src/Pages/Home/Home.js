import React from "react";
import "./Home.css"

export default function Home({ handleTitle, title, books, deleteBook, handleAddBook, form, handleChange }) {
  return (
    <div>
      <input onChange={handleTitle} value={title} placeholder="Filter by Title" />
      {books.map((book, index) => {
        return (
          <div key={index}>
            <h3>{book.title}</h3>
            <p>Title: {book.title}</p>
            <p>Genre: {book.genre}</p>
            <span onClick={() => deleteBook(book._id, book.title)}>X</span>
          </div>
        );
      })}
      <h2>Add a Book</h2>
      <form onSubmit={handleAddBook}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}