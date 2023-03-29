import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container'

function PopularBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/popular-books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <hr></hr>
      <h1>Popular Books</h1>
      <Grid container spacing={2}>
        {books.slice(0, 8).map(book => (
          <Grid item key={book.ISBN} xs={12} sm={6} lg={3}>
            <Card sx={{ maxWidth: 350 }}>
              <CardContent sx={{ maxHeight:500,height: 500,backgroundColor:'rgb(0, 30, 60)',color:'#00BFFF',borderRadius:'15px',}}>
                <CardMedia
                  component="img"
                  height="300"
                  image={book['Image-URL-L']}
                  alt={book['Book-Title']}
                  sx={{
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.06)',
                    },
                  }}
                />
                <Typography variant="h5" component="div"
                  sx={{
                  textAlign: 'center',
                  padding: '10px 0',
                  }}>
                  <h4>{book['Book-Title']}</h4>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center',color:'#1E90FF' }}>
                  <Typography>Author: {book['Book-Author']}</Typography>
                  <Typography>Rating: {book['Book-Rating']}</Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default PopularBooks