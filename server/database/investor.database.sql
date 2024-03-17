CREATE TABLE investors
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount_invested NUMERIC(10, 2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    shares_acquired INT NOT NULL
);

--sample data
INSERT INTO investors (name, amount_invested, date, shares_acquired)
VALUES
    ('John Doe', 5000.00, '2023-01-05', 100),
    ('Jane Smith', 7500.00, '2023-01-08', 150),
    ('Alice Johnson', 10000.00, '2023-01-12', 200);
