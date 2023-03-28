# Book Recommendation System

This book recommendation system uses collaborative filtering techniques, KNN Model to  make recommendations. Users can search for books based on title, author name, or publisher and in result the recommendations will be displayed.


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Building docker image for frontend

```bash
  cd frontend
  docker build -t frontend .
```
Building docker image for backend

```bash
  cd backend
  docker build -t backend .
```

Start the application using Docker Compose:

```bash
  docker-compose up
```

Navigate to http://localhost:3000 in your web browser to access the application.


## Project Structure

The Project Structure is as follow:

``` bash
project/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md

```

## FAQ

#### Question 1 
Answer 1

#### Question 2

Answer 2


## Screenshots

![App Screenshot](https://drive.google.com/file/d/1EmZiGC1Z7mXQmZ5eAAUJ8z0OGuWCPkOx/preview)


## Features

- KNN model based recomendation
- Popular books by Year, All time.
- Responsive Frontend in React.js.
- Search based book recomendation based on author, publisher.


## Tech Stack

**Client:** React , Material UI

**Server:** Fastapi, python, uvicorn, sci-learn, pandas ,numpy, pickle

**Deployment** Docker 

