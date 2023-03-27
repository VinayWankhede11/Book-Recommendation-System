import React, { useState, useEffect } from 'react';
import './index.css'

function PopularBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/popular-books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Popular Books</h2>
      <div className="card-container">
        {books.slice(0,4).map(book => (
          <div className="card" key={book.ISBN}>
            <img src={book['Image-URL-L']} alt={book['Book-Title']} />
            <div className="card-content">
              <h3>{book['Book-Title']}</h3>
              <p>by {book['Book-Author']}</p>
              <p>Rating: {book['Book-Rating']}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularBooks;
