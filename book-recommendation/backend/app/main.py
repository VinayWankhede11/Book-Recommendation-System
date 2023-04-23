# Importing necessary libraries and modules
from flask import Flask, request,jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import pickle
from sklearn.neighbors import NearestNeighbors
import os


# Getting the absolute path of the directory containing the current file using os module
pathFile = str (os.path.dirname(os.path.abspath(__file__)))


# The files to be loaded are located in the same directory as the current file
# The files are loaded using the 'rb' (read binary) mode and the pickle module's 'load()' function

# Loading a matrix of item features for content-based filtering
with open(pathFile+'/matrix.pkl', 'rb') as f:
    matrix = pickle.load(f)
# Loading a collaborative filtering model
with open(pathFile+'/model.pkl', 'rb') as f:
    model = pickle.load(f)
# Loading an explicit user-item rating dataset for collaborative filtering
with open(pathFile+'/explicit_dataset.pkl', 'rb') as f:
    explicit_dataset = pickle.load(f)
# Loading a pre-computed dataframe of popular items
with open(pathFile+'/popular.pkl', 'rb') as f:
    popular_df = pickle.load(f)
# Loading a pre-computed dataframe of popular items by year
with open(pathFile+'/popular_year.pkl', 'rb') as f:
    popular_year_df = pickle.load(f)


# This function takes a book name as input, and returns a list of recommended books
# The nested function takes a book name as input, and returns the book's author and image URL
def funcpred(name):
    # Define a nested function that returns metadata for a given book for each recommended book
  def funcnew( name):
    unique_row = explicit_dataset[explicit_dataset['Book-Title'] == name].iloc[0]
    author = unique_row['Book-Author']
    url = unique_row['Image-URL-L']
    return {"book_name" :name, "author" : author , "image":url  }
  # Generate recommendations using collaborative filtering and content-based filtering
  # The 'kneighbors()' method of the model object returns the indices and distances of the k nearest neighbors of the input item
  # In this case, the input item is the book with the given name
  # The 'n_neighbors' parameter specifies the number of neighbors to return, and is set to 5+1 to return the top 5 nearest neighbors (excluding the input item)
  distances, indices = model.kneighbors(matrix.loc[name].values.reshape(1, -1), n_neighbors = 5+1)
  # Generate metadata for each recommended book using the nested function defined earlier
  ans = []
  for i in range(0, len(distances.flatten())):
    if i > 0:
        ans.append(funcnew(matrix.index[indices.flatten()[i]]) )
    # Return the list of recommended books, along with their metadata
  return ans



# This function takes a dataframe and a number 'n' as input, and returns a list of the top 'n' books in the dataframe
def printBook(data_frame, n):
  # Extract unique book titles, image URLs, and authors from the dataframe
  z = data_frame['Book-Title'].unique()
  y = data_frame['Image-URL-L'].unique()
  i = data_frame['Book-Author'].unique()
  ans = []
  # Iterate through each unique book title in the dataframe
  for x in range(len(z)):
    # Count the number of ratings for the current book title
    w = data_frame['Book-Rating'][data_frame['Book-Title'] == z[x]].count()
    # Append the book's metadata (title, image URL, author, and rating count) to a list
    ans.append({"book_name": str(z[x]), "image": str(
        y[x]), "author": str(i[0]), "rating": str(w)})
    # If the number of books appended to the list reaches 'n', exit the loop and return the list of top books
    if x >= n-1:
      break

  return ans


# This function takes a dataframe, a book title 'name', and a number 'n' as input, and returns a list of top 'n' books by the same author as the given book title
# If the input book does not have a unique author, the function returns an empty list
# The function sorts the books by rating, and calls the 'printBook' function to format the metadata for the top 'n' books
def get_booksAuthor(dataframe, name, n):
  # Extract unique authors from the input dataframe
  unique_author = dataframe['Book-Author'].unique()
  # Filter out the input book from the dataset
  data = explicit_dataset[explicit_dataset['Book-Title'] != name]
  # If the input book has a unique author, return the top 'n' books by the same author
  if unique_author[0] in list(data['Book-Author'].unique()):
    k2 = data[data['Book-Author'] == unique_author[0]]
    k2 = k2.sort_values(by=['Book-Rating'])
    return printBook(k2, n)


# This function takes a dataframe, a book title 'name', and a number 'n' as input, and returns a list of the top 'n' books by the same publisher as the input book
def get_booksPublisher(dataframe, name, n):
  # Extract unique publisher names from the dataframe
  unique_publisher = dataframe['Publisher'].unique()
  # Filter the dataframe to exclude the input book title
  data = explicit_dataset[explicit_dataset['Book-Title'] != name]
  # If the unique publisher of the input book is present in the filtered dataframe, create a new dataframe containing only books by the same publisher, sorted by book rating
  if unique_publisher[0] in list(data['Publisher'].unique()):
    k2 = pd.DataFrame(data[data['Publisher'] == unique_publisher[0]])
    k2 = k2.sort_values(by=['Book-Rating'])
  # Return a list of the top 'n' books by the same publisher, using the printBook function
  return printBook(k2, n)




# Creating a Flask web application instance
app = Flask(__name__)
# Allowing Cross-Origin Resource Sharing (CORS) to avoid security issues
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/recommendKNN', methods=['POST'])
def recommend():
    # Get the book name from the POST request
    try:
        book_name = request.json.get('book_name')
        ans  = funcpred(book_name)
        data= {}
        data["books"] = ans
        print(jsonify(data))
        return jsonify(data)
    except:
        return print("Error")

@app.route('/getAuthor', methods=['POST'])
def recommendAuthor():
    # Get the book name from the POST request
    book_name = request.json.get('book_name')
    if book_name in list(explicit_dataset['Book-Title'].unique()):
        df = explicit_dataset[explicit_dataset['Book-Title'] == book_name]
        data= {}
        data["books"] = get_booksAuthor(df, book_name, 5)
        return jsonify(data)
    else:
        return jsonify("Invalid Book Name!!")
    
@app.route('/getPublisher', methods=['POST'])
def recommendPublisher():
    # Get the book name from the POST request
    book_name = request.json.get('book_name')
    if book_name in list(explicit_dataset['Book-Title'].unique()):
        df = explicit_dataset[explicit_dataset['Book-Title'] == book_name]
        data= {}
        data["books"] = get_booksPublisher(df, book_name, 5)
        return jsonify(data)
    else:
        return jsonify("Invalid Book Name!!")


@app.route('/api/popular-books')
def get_popular_books():
    # Convert the pandas DataFrame to a JSON object and return it
    return jsonify(popular_df.to_dict(orient='records'))

@app.route('/api/popular-books-year')
def get_popular_books_year():
    # Convert the pandas DataFrame to a JSON object and return it
    return jsonify(popular_year_df.to_dict(orient='records'))


if __name__ == '__main__':
    app.run(debug=True)
