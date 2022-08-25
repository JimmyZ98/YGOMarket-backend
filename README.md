# YGOMarket - Yu-Gi-Oh E-commerce Site

YGOMarket is deployed using Heroku! https://ygomarket.herokuapp.com/home
YGOMarket is an e-commerce website that allows users to buy and sell Yu-Gi-Oh cards from one another.

Link to back-end repo: https://github.com/JimmyZ98/YGOMarket-backend

## Features

- Product filtering
- Shopping cart
- Checkout
- Payment Processing
- User sign up and login
- Listing new sales posts
- Dark mode

## Teck Stack

### Front-end

- React
- Sass
- Axios

### Back-end

- Node.js
- Express
- JWT
- BCrypt
- Stripe
- MySQL

## Dependencies

### Front-end

- react-router-dom
- Axios
- stripe

### Back-end

- express
- cors
- dotenv
- nodemon
- knex
- mysql
- jsonwebtoken
- bcrypt
- stripe

## Environment dependency

### Front-end

Create a .env file and include:

- REACT_APP_API_URL: example = `http://localhost:8080`

### Back-end

Create a .env file and include:

- PORT: example = 8080
- JAWSDB_URL: mysql database url
- JSON_SECRET_KEY: key for JWT tokens

## Installation

### Clone

Clone front-end repo locally:

`git clone git@github.com:JimmyZ98/YGOMarket.git`

Clone back-end repo locally:

`git@github.com:JimmyZ98/YGOMarket-backend.git`

### Setup

- Open the project folder and install dependencies.

`npm i`

### Run

- Run react app locally.

`npm start`

- Run server locally.

`npx nodemon`
