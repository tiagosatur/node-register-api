## About

This is a node js and mongodb api where you can register a user, get a jwt token and access a private route using this token.

## Requirements

- You need to have installed and configured MongoDB

## Starting

- `yarn install`

- `yarn start`

## Routes

Make the requests with your prefered software (Postman or Imsonia).

Base route: `http://localhost:3000`

### Available routes

(POST) `/auth/register`: submit a json with name, email and passwor fields:

```
{
	"name": "The coffe",
	"email": "thecoffe@gmail.com",
	"password": "123"
}
```

(POST) `/auth/authenticate`: use it to login with the above created user

```
{
	"email": "thecoffe@gmail.com",
	"password": "123"
}
```

(GET) `/projects`: returns a success message if you pass correctly the jwt token (Bearer [token]) in the authorization headers.
