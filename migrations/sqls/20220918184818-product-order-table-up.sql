CREATE TABLE products_order (
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id),
    quantity integer
);