CREATE TABLE expenses
(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE
);

--sample data
INSERT INTO expenses (description, amount, date)
VALUES
    ('Office Supplies', 100.50, '2023-01-05'),
    ('Website Hosting', 50.00, '2023-01-08'),
    ('Marketing Campaign', 500.00, '2023-01-12'),
    ('Office Rent', 800.00, '2023-01-15'),
    ('Travel Expenses', 350.75, '2023-01-20'),
    ('Employee Salaries', 2500.00, '2023-01-22'),
    ('Utility Bills', 200.00, '2023-01-25'),
    ('Advertising Costs', 450.25, '2023-01-28'),
    ('Equipment Purchase', 1500.00, '2023-02-02'),
    ('Software Licenses', 300.00, '2023-02-05'),
    ('Consulting Fees', 700.50, '2023-02-08'),
    ('Insurance Premiums', 400.00, '2023-02-12'),
    ('Business Taxes', 900.00, '2023-02-15'),
    ('Training Programs', 600.75, '2023-02-20'),
    ('Legal Services', 3500.00, '2023-02-22'),
    ('Maintenance Costs', 220.00, '2023-02-25'),
    ('Office Furniture', 1200.25, '2023-02-28'),
    ('Travel Expenses', 550.00, '2023-03-02'),
    ('Employee Bonuses', 800.00, '2023-03-05'),
    ('Marketing Materials', 300.00, '2023-03-08'),
    ('Printing Services', 150.50, '2023-03-12'),
    ('Research & Development', 2000.00, '2023-03-15'),
    ('Website Development', 1000.00, '2023-03-20'),
    ('Software Maintenance', 400.75, '2023-03-22'),
    ('Training Workshops', 750.00, '2023-03-25'),
    ('Travel Expenses', 600.25, '2023-03-28'),
    ('Equipment Upgrade', 1800.00, '2023-04-02'),
    ('Office Supplies', 80.00, '2023-04-05'),
    ('Marketing Campaign', 700.50, '2023-04-08'),
    ('Advertising Costs', 350.00, '2023-04-12'),
    ('Consulting Fees', 650.75, '2023-04-15'),
    ('Business Taxes', 950.00, '2023-04-20'),
    ('Training Programs', 500.00, '2023-04-22'),
    ('Legal Services', 3000.00, '2023-04-25'),
    ('Maintenance Costs', 250.25, '2023-04-28'),
    ('Office Furniture', 1300.00, '2023-05-02'),
    ('Travel Expenses', 600.00, '2023-05-05'),
    ('Employee Bonuses', 850.00, '2023-05-08'),
    ('Marketing Materials', 250.50, '2023-05-12'),
    ('Printing Services', 1200.00, '2023-05-15'),
    ('Research & Development', 1800.00, '2023-05-20'),
    ('Website Development', 900.75, '2023-05-22'),
    ('Software Maintenance', 450.00, '2023-05-25'),
    ('Training Workshops', 700.25, '2023-05-28');



CREATE OR REPLACE FUNCTION check_expense_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.amount > 100000 THEN
        NEW.description := 'cex-' || NEW.description;
        NEW.amount := 1;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_expense_trigger
BEFORE INSERT ON expenses
FOR EACH ROW EXECUTE FUNCTION check_expense_trigger();