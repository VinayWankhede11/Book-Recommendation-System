import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea  from '@mui/material/CardActionArea';
import Typography  from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Search() {
  const [searchOption, setSearchOption] = useState('title');
  const [bookName, setBookName] = useState('');
  const [numResults, setNumResults] = useState(5);
  const [books, setBooks] = useState([]);

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
    <Container >
    <Grid container spacing={15} paddingTop={5} Width={600} justifyContent="center">
      <Grid item xs={8} >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} item xs={12} justifyContent="center">
            <Grid item xs={6} maxWidth={500}>
              <TextField  label="Title/Author/Publisher" value={bookName} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={3} >
              <Select  value={searchOption} onChange={handleSearchOptionChange} fullWidth>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="publisher">Publisher</MenuItem>
                <MenuItem value="title">Title</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3} >
              <TextField label="Number of Results" type="number" min="1" value={numResults} onChange={handleNumResultsChange} fullWidth />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ maxWidth: 300}}  >
        {books.map(book => (
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={book.image} alt={book.book_name}
        />
        <CardContent  key={book.book_name} sx={{maxHeight:150}}>
          <Typography gutterBottom variant="h5" component="div">
            <h4>{book.book_name}</h4>
          </Typography>
          <Typography variant="body2" color="text.secondary">
              <p>Author: {book.author}</p>
              {/* <p>Rating: {book.rating}</p> */}
          </Typography>
        </CardContent>
      </CardActionArea>
       ))}
    </Card>
      </Grid>
    </Grid>
    </Container>
  );
}

export default Search;