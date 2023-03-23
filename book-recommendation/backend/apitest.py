import requests

url = 'http://localhost:5000/recommendKNN'
myobj = {'book_name': 'The Lovely Bones: A Novel'}

x = requests.post(url, json = myobj)
print("knn")
print(x.text)

url = 'http://localhost:5000/getAuthor'
myobj = {'book_name': 'The Lovely Bones: A Novel'}

x = requests.post(url, json = myobj)
print("author")
print(x.text)

url = 'http://localhost:5000/getPublisher'
myobj = {'book_name': 'The Lovely Bones: A Novel'}

x = requests.post(url, json = myobj)
print("publisher")
print(x.text)