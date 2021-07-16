# -books-reading-backend

????????========BASE STEPS=========?????????

- Clone repo
- create .env (which exist same fields as in .env.example)
- npm i || yarn add
- npm run start:dev || yarn start:dev

////Postman requests////

//=======================USERS=================//

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

response: {
"status":"success",
"code":204,
"message":"Success logout"
}

//==========================BOOKS========================//

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
"status":"success",
"code":201,
"message":"Book added",
"data":
{
"book":
{
"readPages":0,
"rating":0,
"status":"plan",
"_id":"60f091710d3cbf4eef55fdec",
"title":"Guard!",
"author":"T.J.Pratchett",
"year":2000,
"totalPages":200,
"createdAt":"2021-07-15T19:50:09.132Z",
"updatedAt":"2021-07-15T19:50:09.132Z"}
}
}

GET ALL:

GET http://localhost:8080/api/books

response: {
"status":"success",
"code":200,
"data":
{
"result":
[
{
"readPages":0,
"rating":0,
"status":"plan",
"_id":"60ef3bb1c5920cf6447ddf16",
"title":"Test5",
"author":"Test5",
"year":2002,
"totalPages":120,
"createdAt":"2021-07-14T19:32:01.155Z",
"updatedAt":"2021-07-14T19:32:01.155Z"
},
{
"readPages":0,
"rating":0,
"status":"plan",
"_id":"60f021574f84913ecf3cbbfe",
"title":"Test 15/07/2021",
"author":"Demy",
"year":2002,
"totalPages":120,
"createdAt":"2021-07-15T11:51:51.101Z",
"updatedAt":"2021-07-15T11:51:51.101Z"}

GET ONE:

GET http://localhost:8080/api/books/:bookId

response: {
"status":"success",
"code":200,
"data":
{
"result":
{
"readPages":0,
"rating":0,
"status":"plan",
"_id":"60f07e29b3bc654cd2f6def5",
"title":"Guard!","author":"T.J.Pratchett",
"year":2000,"totalPages":200,
"createdAt":"2021-07-15T18:27:53.321Z",
"updatedAt":"2021-07-15T18:27:53.321Z"}
}
}

DELETE ONE:

POST http://localhost:8080/api/books

require Authorization Type Bearer Token (which you get in response after login)

require body: {
"name":"Guard!",
"author":"T.J.Pratchett",
"year":"2000",
"pages":"200"
}, JSON

response: {
"status":"success",
"code":204,
"message":"Book deleted"
}

//==========================TRANING========================//

ADD:

POST http://localhost:8080/api/training

require Authorization Type Bearer Token (which you get in response after login)

require body: {
"startDate":"32323",
"finishDate":"232323"
}, JSON

response: {
"status":"success",
"code":201,
"message":"Training added",
"data":
{
"training":
{
"_id":"60f0a60cdcd8b6511bac8b29",
"startDate":"32323",
"finishDate":"232323",
"createdAt":"2021-07-15T21:18:04.960Z",
"updatedAt":"2021-07-15T21:18:04.960Z"}
}
}
