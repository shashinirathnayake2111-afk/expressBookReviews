const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6 - Register
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  users.push({ username: username, password: password });
  return res.status(200).json({ message: "User successfully registered. Now you can login" });
});

// Task 1 - Get all books
public_users.get('/', function (req, res) {
  return res.status(200).json(JSON.stringify(books));
});

// Task 2 - Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn]);
});

// Task 3 - Get books by Author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const book_keys = Object.keys(books);
  const author_books = [];
  book_keys.forEach((key) => {
    if (books[key].author === author) {
      author_books.push(books[key]);
    }
  });
  if (author_books.length > 0) {
    return res.status(200).json(author_books);
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

// Task 4 - Get books by Title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const book_keys = Object.keys(books);
  const title_books = [];
  book_keys.forEach((key) => {
    if (books[key].title === title) {
      title_books.push(books[key]);
    }
  });
  if (title_books.length > 0) {
    return res.status(200).json(title_books);
  } else {
    return res.status(404).json({ message: "No books found for this title" });
  }
});

// Task 5 - Get book reviews
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "No reviews found for this book." });
  }
});

// Task 10 - Get all books using Async/Await
public_users.get('/async/books', async function (req, res) {
  try {
    const getBooksAsync = () => {
      return new Promise((resolve, reject) => {
        if (books) {
          resolve(books);
        } else {
          reject("No books found");
        }
      });
    };
    const result = await getBooksAsync();
    return res.status(200).json(JSON.stringify(result));
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Task 11 - Get book by ISBN using Async/Await
public_users.get('/async/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const getBookByISBN = () => {
      return new Promise((resolve, reject) => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject("Book not found");
        }
      });
    };
    const result = await getBookByISBN();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// Task 12 - Get books by Author using Async/Await
public_users.get('/async/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    const getBooksByAuthor = () => {
      return new Promise((resolve, reject) => {
        const book_keys = Object.keys(books);
        const author_books = [];
        book_keys.forEach((key) => {
          if (books[key].author === author) {
            author_books.push(books[key]);
          }
        });
        if (author_books.length > 0) {
          resolve(author_books);
        } else {
          reject("No books found for this author");
        }
      });
    };
    const result = await getBooksByAuthor();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// Task 13 - Get books by Title using Async/Await
public_users.get('/async/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    const getBooksByTitle = () => {
      return new Promise((resolve, reject) => {
        const book_keys = Object.keys(books);
        const title_books = [];
        book_keys.forEach((key) => {
          if (books[key].title === title) {
            title_books.push(books[key]);
          }
        });
        if (title_books.length > 0) {
          resolve(title_books);
        } else {
          reject("No books found for this title");
        }
      });
    };
    const result = await getBooksByTitle();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

module.exports.general = public_users;