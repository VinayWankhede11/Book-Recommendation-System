import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function PopularBooksYear() {
  const [books_year, setBooks_year] = useState([]);

  useEffect(() => {
    fetch('/api/popular-books-year')
      .then(response => response.json())
      .then(data => setBooks_year(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <hr ></hr>
      <h1>Popular Books By Years</h1>
      <Grid container spacing={2}>
        {books_year.filter(book => book['Year-Of-Publication'] < 2006 || book['Year-Of-Publication'] > 2021).map(book => (
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
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center',color:'#1E90FF' }}>Author: {book['Book-Author']}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center',color:'#1E90FF' }}>Year: {book['Year-Of-Publication']}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    // <div>
    //   <h2>Popular Books By Year</h2>
    //   <Card sx={{ maxWidth: 300}}>
    //     {books_year.filter(book => book['Year-Of-Publication'] < 2010 || book['Year-Of-Publication'] > 2021).map(book => (
    //   <CardActionArea>
    //     <CardMedia
    //       component="img"
    //       height="300"
    //       image={book['Image-URL-L']}
    //       alt={book['Book-Title']}
    //     />
    //     <CardContent  key={book.ISBN}>
    //       <Typography gutterBottom variant="h5" component="div">
    //         <h3>{book['Book-Title']}</h3>
    //       </Typography>
    //       <Typography variant="body2" color="text.secondary">
    //           <p>by {book['Book-Author']}</p>
    //           <p>Rating: {book['Book-Rating']}</p>
    //           <p>Year: {book['Year-Of-Publication']}</p>
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //    ))}
    // </Card>
      
    // </div>
  );
}

export default PopularBooksYear;