CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id REFRENCES products(id),
    quantity INTEGER,
    user_id REFRENCES users(id)
);