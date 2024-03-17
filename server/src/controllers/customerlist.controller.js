const { Pool } = require("pg");

const connectionString = "process.env.customerDB";
const pool = new Pool({
  connectionString,
});

const getCustomers = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM customers ORDER BY id ASC");
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { type, age, acquiringCost } = req.body;
    const response = await pool.query(
      "INSERT INTO customers (type, age, acquiring_cost) VALUES ($1, $2, $3) RETURNING *",
      [type, age, acquiringCost]
    );
    res.status(201).json(response.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { type, age, acquiringCost } = req.body;
    const response = await pool.query(
      "UPDATE customers SET type = $1, age = $2, acquiring_cost = $3 WHERE id = $4 RETURNING *",
      [type, age, acquiringCost, id]
    );
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query(
      "DELETE FROM customers WHERE id = $1 RETURNING *",
      [id]
    );
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(200).json({ message: "Customer deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
