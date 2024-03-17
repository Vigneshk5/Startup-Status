const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "process.env.financeDB",
});

const getProfits = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM profits ORDER BY id ASC");
    res.status(200).json(response.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProfitById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT * FROM profits WHERE id = $1", [id]);
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Profit entry not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createProfit = async (req, res) => {
  try {
    const { description, amount, date } = req.body;
    const response = await pool.query(
      "INSERT INTO profits (description, amount, date) VALUES ($1, $2, $3) RETURNING *",
      [description, amount, date]
    );
    res.status(201).json(response.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProfit = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { description, amount, date } = req.body;
    const response = await pool.query(
      "UPDATE profits SET description = $1, amount = $2, date = $3 WHERE id = $4 RETURNING *",
      [description, amount, date, id]
    );
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Profit entry not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProfit = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("DELETE FROM profits WHERE id = $1 RETURNING *", [
      id,
    ]);
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Profit entry not found" });
    } else {
      res.status(200).json({ message: "Profit entry deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getProfits,
  getProfitById,
  createProfit,
  updateProfit,
  deleteProfit,
};
