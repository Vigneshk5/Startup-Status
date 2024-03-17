const { Pool } = require("pg");

const connectionString = "process.env.employeeDB";

const pool = new Pool({
  connectionString,
});

const getInvestors = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM investors ORDER BY id ASC");
    res.status(200).json(response.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getInvestorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT * FROM investors WHERE id = $1", [id]);
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Investor not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createInvestor = async (req, res) => {
  try {
    const { name, amount_invested, date, shares_acquired } = req.body;
    const response = await pool.query(
      "INSERT INTO investors (name, amount_invested, date, shares_acquired) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, amount_invested, date, shares_acquired]
    );
    res.status(201).json(response.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateInvestor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, amount_invested, date, shares_acquired } = req.body;
    const response = await pool.query(
      "UPDATE investors SET name = $1, amount_invested = $2, date = $3, shares_acquired = $4 WHERE id = $5 RETURNING *",
      [name, amount_invested, date, shares_acquired, id]
    );
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Investor not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteInvestor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query(
      "DELETE FROM investors WHERE id = $1 RETURNING *",
      [id]
    );
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Investor not found" });
    } else {
      res.status(200).json({ message: "Investor deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getInvestors,
  getInvestorById,
  createInvestor,
  updateInvestor,
  deleteInvestor,
};
