CREATE TABLE products_order (
    id SERIAL PRIMARY KEY,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id),
    quantity integer
);