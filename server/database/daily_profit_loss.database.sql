CREATE VIEW daily_profit_loss AS
SELECT 
    COALESCE(e.date, p.date) AS date,
    COALESCE(SUM(e.amount), 0) AS total_expense,
    COALESCE(SUM(p.amount), 0) AS total_profit,
    COALESCE(SUM(p.amount), 0) - COALESCE(SUM(e.amount), 0) AS profit_left
FROM 
    expenses e
FULL OUTER JOIN 
    profits p ON e.date = p.date
GROUP BY 
    COALESCE(e.date, p.date);
