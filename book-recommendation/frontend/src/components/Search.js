import React, { useState } from 'react';

function Search() {
  const [searchOption, setSearchOption] = useState('title');
  const [bookName, setBookName] = useState('');
  const [numResults, setNumResults] = useState(5);
  const [books, setBooks] = useState([]);
// The Lovely Bones: A Novel
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = '';
    switch (searchOption) {
      case 'author':
        url = '/getAuthor';
        break;
      case 'publisher':
        url = '/getPublisher';
        break;
      case 'title':
        url = '/recommendKNN';
        break;
      default:
        break;
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        book_name: bookName
      })
    });

    const data = await response.json();
    setBooks(data.books);
  };

  const handleInputChange = (e) => {
    setBookName(e.target.value);
  };

  const handleNumResultsChange = (e) => {
    setNumResults(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Search Option:
          <select value={searchOption} onChange={handleSearchOptionChange}>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
            <option value="title">Title</option>
          </select>
        </label>
        <br />
        <label>
          Search Term:
          <input type="text" value={bookName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Number of Results:
          <input type="number" min="1" value={numResults} onChange={handleNumResultsChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <div className="books-container">
        {
          books.map((book) => (
            <div className="book-card" key={book.book_name}>
              <img src={book.image} alt={book.book_name} />
              <h3>{book.book_name}</h3>
              <p>Author: {book.author}</p>
              <p>Rating: {book.rating}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;

// import React, { useState } from 'react';

// function App() {
//   const [bookName, setBookName] = useState('');
//   const [numResults, setNumResults] = useState(5);
//   const [books, setBooks] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch('/recommendKNN', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         book_name: bookName
//       })
//     });

//     const data = await response.json();
//     setBooks(data.books);
//   };

//   const handleInputChange = (e) => {
//     setBookName(e.target.value);
//   };

//   const handleNumResultsChange = (e) => {
//     setNumResults(e.target.value);
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit}>
//         <label>
//           Book Name:
//           <input type="text" value={bookName} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label>
//           Number of Results:
//           <input type="number" min="1" value={numResults} onChange={handleNumResultsChange} />
//         </label>
//         <br />
//         <button type="submit">Submit</button>
//       </form>

//       <div className="books-container">
//         {books.map((book) => (
//           <div className="book-card" key={book.book_name}>
//             <img src={book.image} alt={book.book_name} />
//             <h3>{book.book_name}</h3>
//             <p>Author: {book.author}</p>
//             <p>Rating: {book.rating}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
