CREATE TABLE customer_metadata
(
    id SERIAL,
    customer_id INT,
    meta_key VARCHAR(255) NOT NULL,
    meta_value TEXT,
    PRIMARY KEY (id, customer_id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

--sample data
INSERT INTO customer_metadata (customer_id, meta_key, meta_value)
VALUES
    (1, 'address', '123 Main Street'),
    (1, 'email', 'john@example.com'),
    (2, 'address', '456 Elm Street'),
    (2, 'email', 'jane@example.com'),
    (3, 'address', '789 Oak Street'),
    (3, 'email', 'bob@example.com'),
    (4, 'address', '101 Pine Street'),
    (4, 'email', 'alice@example.com');