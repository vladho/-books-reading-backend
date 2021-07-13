# -books-reading-backend

????????========BASE STEPS=========?????????

- Clone repo
- create .env (which exist same fields as in .env.example)
- npm i || yarn add
- npm run start:dev || yarn start:dev

////Postman requests////

//=======================users=================//

SIGNUP:

POST http://localhost:8080/api/users/signup

require body: {
"email":"terrypratchett@mail.com",
"password":"123456789"}, JSON

response: {
"status": "success",
"code": 201,
"message": "Successfully added",
"data": {
"id": "60ee09db72c4e91a8875e8e1",
"name": "Guest",
"email": "terrypratchett@mail.com"
}
}

LOGIN:

POST http://localhost:8080/api/users/login

require body: {
"email":"terrypratchett@mail.com",
"password":"123456789"}, JSON

response: {
"status": "success",
"code": 200,
"data": {
"token": "eyJhbGciOiJIUzyereNiIsInR5ceryeuI6IkpXVCJ9.eyJpZCIeryejYwZWUwOWRiNzJjNGUerterWE4ODc1ZThlMSIsImlhweqdCI6MTYyNjIxMjgzOH0.GX-8TW21qweqaC9ohmOlCER4owNnF1KNYMFAKigftS_fMu4",
"user": {
"email": "terrypratchett@mail.com"
}
}
}

LOGOUT:

POST http://localhost:8080/api/users/logout

require Authorization Type Bearer Token (which you get in response after login)

response 204 No Content
!!!empty response body is OK if 204!!!

//==========================books========================//

ADD ONE:

POST http://localhost:8080/api/books

require Authorization Type Bearer Token (which you get in response after login)

require body: {
"name":"Guard!",
"author":"T.J.Pratchett",
"year":"2000",
"pages":"200"
}, JSON

response: {
"status": "success",
"code": 201,
"message": "Book added",
"data": {}
}

GET ALL:

GET http://localhost:8080/api/books

response: {
"status": "success",
"code": 200
}

GET ONE:

GET http://localhost:8080/api/books/:bookId

response: {
"status": "success",
"code": 200,
"data": {}
}
