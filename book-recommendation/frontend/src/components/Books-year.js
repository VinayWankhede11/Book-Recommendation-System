import React, { useState, useEffect } from 'react';
import './index.css'

function PopularBooksYear() {
  const [books_year, setBooks_year] = useState([]);

  useEffect(() => {
    fetch('/api/popular-books-year')
      .then(response => response.json())
      .then(data => setBooks_year(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Popular Books By Year</h2>
      <div className="card-container">
        {books_year
        // .filter(book => book['Year-Of-Publication'] < 2010 || book['Year-Of-Publication'] > 2021)
        .map(book => (
          <div className="card" key={book.ISBN}>
            <img src={book['Image-URL-L']} alt={book['Book-Title']} />
            <div className="card-content">
              <h3>{book['Book-Title']}</h3>
              <p>by {book['Book-Author']}</p>
              <p>Rating: {book['Book-Rating']}</p>
              <p>Year: {book['Year-Of-Publication']}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularBooksYear;