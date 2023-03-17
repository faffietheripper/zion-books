import "./reset.css";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import BookDetails from "./BookDetails";
import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [form, setForm] = useState({
    title: "",
    author: "",
    read: true,
    genre: "",
  });

  useEffect(() => {
    getBooks();
  }, [title]);

  async function getBooks() {
    let API = "http://localhost:8080/books";

    if (title !== "") {
      API = API + "?title=" + title;
    }
    const res = await axios.get(API);
    setBooks(res.data);
  }

  function handleTitle(event) {
    setTitle(event.target.value);
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleAddBook(event) {
    event.preventDefault();
    const API = "http://localhost:8080/books";
    const res = await axios.post(API, form);

    // add our new cat to the page
    const newBooksList = [...books, res.data];
    setBooks(newBooksList);

    // reset the form
    setForm({
      title: "",
      author: "",
      read: false,
      genre: "",
    });
  }

  async function deleteBook(id, title) {
    const confirmDelete = window.confirm(`Are you sure you want to permantently delete ${title}?`);
    if (confirmDelete) {
      const API = `http://localhost:8080/books/${id}`;
      const res = await axios.delete(API);
      console.log(res);
      getBooks();
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleTitle={handleTitle}
                title={title}
                books={books}
                deleteBook={deleteBook}
                handleAddBook={handleAddBook}
                form={form}
                handleChange={handleChange}
              />
            }
          />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
