CREATE TABLE customers
(
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    acquiring_cost DECIMAL(10, 2) NOT NULL
);


CREATE OR REPLACE FUNCTION update_customer_type()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.acquiring_cost > 500 THEN
        NEW.type := 'VIP';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_customer_type_trigger
BEFORE INSERT OR UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_customer_type();

--sample data
INSERT INTO customers (type, age, acquiring_cost)
VALUES
    ('Regular', 25, 300.00),
    ('Regular', 30, 500.00),
    ('Regular', 35, 700.00),
    ('Regular', 40, 1000.00);
