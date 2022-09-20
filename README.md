# Storefront-backend project

## About project

this project is made as a back end course project and it was made for educational purposes only.
this project is made by only one person (me) and I did not copy-paste any code from any sources and I garentee that this project is written by only me and it is an application to the course content.

## Getting started

In order to get started with this backend api you need to clone this repository to your device and follow the instructions below.

## Steps to Run the API

### 1.Set up enviroment variables and database.json file
these files are not included in the repository because they depend on environment configuration that you need to do yourself.
1. create a new file in the root directory and name it .env 
2. this file should have values for enviroment variables .. here is a sample of what the file should look like copy it and change the values
```
PGUSER=your postgres username
PGPASSWORD=your postgres password
PGHOST=you database host (localhost if you are hosting it on your machine)
PGDATABASE=the main database name
TEST_DB=the test database name
ENV=(this variable should be set to 'dev' if you are doing developmentphase and should be set to 'test' if you are doing test phase)
PEPPER=this is a pepper string (set ot any string of your choice to be pepper for password hashing)
ROUNDS=this is the hashing rounds number (set to any number ie: 10)
SECRETTOKEN=this is a secret string for jwt signiture (set to any string of your choice)
```
3. create a file named database.json in the root directory
4. this file should contain information about the databases used for the api .. it should look like this .. change values within ()
```
{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "(dev database name)",
      "user": "(pg username)",
      "password": "(pg password)"
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "(test database name)",
      "user": "(pg username)",
      "password": "(pg password)"
    }
}
```
5. after making the two files check the package.json file for the scripts to running the api 
### 2. Running phase (set ENV=dev in .env file)

1. to run the api start with running the server  and you have two options
* use the start script 
```
yarn start
```
* use the watch script
``` 
yarn watch
```
2. after startign the server open [postman software](https://www.postman.com/) and start using the api endpoints in the requirements file

3. (optional) to help a little bit with postman import storefront back-end.postman_collection.json file found in the root directory to postman on your device .. this will automatically get you all the requests in the api with the required body format so you can start putting your values and fetch the requests
4. run the migration command in the terminal to set up your database for the api
```
db-migrate up
```
5. here is a table of all the endpoints available for the api

| request | url | description | requirments|
| ------- | --- | ----------- | ---------- |
| index users [GET] | '/users' | gets all users in the users table | body.token |
| show users [GET] | '/users/:id' | gets a user with a certain id | params.id , body.token |
| create user [POST] | '/users' | adds user to the users table and returns their jwt in the response | body.username, body.password, body.firstName, body.lastName|
| authenticate user [POST] | '/users/auth' | authenticates user returning user when successful | body.username. body.password, body.token|
| index products [GET] | '/products' | gets all products in the products table | NO REQUIREMENT |
| show product [GET] | '/products/:id' | gets a product with certain id | params.id |
| create product [POST] | '/products' | creates a new product and returns it | body.name , body.price, body.token |
| index orders [GET] | '/orders' | gets all orders in the orders table | NO REQUIREMENT |
| show order [GET] | '/orders/:id' | gets an order with certain id | params.id , body.token |
| create order [POST] | '/orders' | adds order to orders table | body.token , body.userId , body.status [a user must be created first to use their id in order]|
| add to order [POST] | '/orders/:id/products' | adds products to a certain order | params.id , body.token , body.productId, body.quantity [ a product, a user and an order must be created first to add together using this endpoint]|
| show products in order [GET] | '/orders/:id/products' | shows a list of products in an order | params.id , body.token [ add to order endpoint must be used first before this endpoint ]|


