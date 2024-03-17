const { Pool, Client } = require("pg");
const connectionString = "process.env.financeDB";

const pool = new Pool({
  connectionString,
});

const getExpenses = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM expenses ORDER BY id ASC");
    res.status(200).json(response.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT * FROM expenses WHERE id = $1", [id]);
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Expense not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createExpense = async (req, res) => {
  try {
    const { description, amount, date } = req.body;
    const response = await pool.query(
      "INSERT INTO expenses (description, amount, date) VALUES ($1, $2, $3) RETURNING *",
      [description, amount, date]
    );
    res.status(201).json(response.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { description, amount, date } = req.body;
    const response = await pool.query(
      "UPDATE expenses SET description = $1, amount = $2, date = $3 WHERE id = $4 RETURNING *",
      [description, amount, date, id]
    );
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Expense not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING *",
      [id]
    );
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Expense not found" });
    } else {
      res.status(200).json({ message: "Expense deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
