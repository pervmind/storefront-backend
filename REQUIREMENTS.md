# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index An INDEX route: 'api/products/index' [GET]
- Show A SHOW routes: 'api/products/show/:id' [GET]
- Create [token required] A CREATE route: 'api/products/create' [POST]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] An INDEX route: '/users' [GET]
- Show [token required] A SHOW route: '/users/:id' [GET]
- Create N[token required] A CREATE route: '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required] A SHOW route: 'api/orders/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

#### Database Tables
##### products table
| id | name | price |
| -- | ---- | ----- |
| SERIAL PRIMARY KEY | VARCHAR | INTEGER |

##### users table
| id | username | firstName | lastName | password |
| -- | -------- | --------- | -------- | -------- |
| SERIAL PRIMARY KEY | VARCHAR | VARCHAR | VARCHAR | VARCHAR |

##### orders table
| id | product_id | quantity | user_id |
| -- | ---------- | -------- | ------- |
| SERIAL PRIMARY KEY | FOREIGN KEY REFRENCES products(id) | INTEGER | FOREIGN KEY REFRENCES users(id) |
