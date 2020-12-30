# Library

Simple Library REST Full API
> This API developed whit NodeJS, ExpressJS and MongoDB.

> This API contains the following requests

* Add a new student & librarian (name, mobile number)
* Add a new book (bookName, author, price, date)
* Get a single student details by a mobile number. (Access student & librarian)
* Get a single librarian details by a mobile number. (Access only librarian)
* Get a single book details by (name or author). (Access student & librarian)
* Update information (student, librarian & book).
* Delete information (student, librarian & book).

## API DOC:
Postman doc 👉 https://documenter.getpostman.com/view/8893042/TVt17ioz
 
## OR Locally Installation
1. Clone this repo
2. Change your directory : `cd assignment/question-03`
3. Run `npm install`
5. Run `npm start`

### Auth Routes

> http://localhost:8000/api/auth/signup (post)

> http://localhost:8000/api/auth/login (post)

> http://localhost:8000/api/auth/logout (get)

### User Routes

> http://localhost:8000/api/user/student/:phone (get)(access student & librarian)

> http://localhost:8000/api/user/librarian/:phone (get) (access librarian)

> http://localhost:8000/api/user/:id (post) (user update) (access student & librarian)

> http://localhost:8000/api/user/:id (delete) (user soft delete) (access logged user)

### Book Routes

> http://localhost:8000/api/book (post) (add book) (access librarian)

> http://localhost:8000/api/book (get) (get all books) (access student & librarian)

> http://localhost:8000/api/book/search/:searchTex (get) (search book by name or author) (access student & librarian)

> http://localhost:8000/api/book/:id (post) (update book information) (access librarian)

> http://localhost:8000/api/book/:id (delete) (soft delete a book) (access librarian)
