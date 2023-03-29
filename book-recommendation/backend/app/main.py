from flask import Flask, request,jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import pickle
from sklearn.neighbors import NearestNeighbors
import os
pathFile = str (os.path.dirname(os.path.abspath(__file__)))
print(pathFile)

with open(pathFile+'/matrix.pkl', 'rb') as f:
    matrix = pickle.load(f)
with open(pathFile+'/model.pkl', 'rb') as f:
    model = pickle.load(f)
with open(pathFile+'/explicit_dataset.pkl', 'rb') as f:
    explicit_dataset = pickle.load(f)
with open(pathFile+'/popular.pkl', 'rb') as f:
    popular_df = pickle.load(f)
with open(pathFile+'/popular_year.pkl', 'rb') as f:
    popular_year_df = pickle.load(f)


def funcpred(name):
  def funcnew( name):
    unique_row = explicit_dataset[explicit_dataset['Book-Title'] == name].iloc[0]
    author = unique_row['Book-Author']
    url = unique_row['Image-URL-L']
    return {"book_name" :name, "author" : author , "image":url  }

  distances, indices = model.kneighbors(matrix.loc[name].values.reshape(1, -1), n_neighbors = 5+1)
  ans = []
  for i in range(0, len(distances.flatten())):
    if i > 0:
        ans.append(funcnew(matrix.index[indices.flatten()[i]]) )
  return ans

def printBook(data_frame, n):          #function will print the unique value of book title
    z = data_frame['Book-Title'].unique()
    y = data_frame['Image-URL-L'].unique()
    i = data_frame['Book-Author'].unique()
    ans = []
    for x in range(len(z)):
      w = data_frame['Book-Rating'][data_frame['Book-Title']==z[x]].count()
      ans.append({ "book_name":str(z[x]), "image": str(y[x]),"author":str(i[0]),"rating":str(w)})
      if x >= n-1:
        break
    return ans

def get_booksAuthor(dataframe, name, n):
    unique_author = dataframe['Book-Author'].unique()      
    data = explicit_dataset [explicit_dataset ['Book-Title'] != name]

    if unique_author[0] in list(data['Book-Author'].unique()):  #checking for unique author name

        k2 = data[data['Book-Author'] == unique_author[0]]
    k2 = k2.sort_values(by=['Book-Rating'])
    return printBook(k2, n)
def get_booksPublisher(dataframe, name, n):
    unique_author = dataframe['Publisher'].unique()
    data = explicit_dataset [explicit_dataset ['Book-Title'] != name]
    if unique_author[0] in list(data['Publisher'].unique()):  #checking for unique author name
        k2 = pd.DataFrame(data[data['Publisher'] == unique_author[0]])
    k2=k2.sort_values(by=['Book-Rating']) 
    return printBook(k2, n)



app = Flask(__name__)
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


# print(popular_year_df.head())

if __name__ == '__main__':
    app.run(debug=True)
