const { Pool } = require("pg");

const connectionString = "process.env.customerDB";
const pool = new Pool({
  connectionString,
});

const getCustomerMetadata = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM customer_metadata ORDER BY id ASC"
    );
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCustomerMetadataById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT * FROM customer_metadata WHERE id = $1", [
      id,
    ]);
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Customer metadata not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCustomerMetadata = async (req, res) => {
  try {
    const { customer_id, meta_key, meta_value } = req.body;
    const response = await pool.query(
      "INSERT INTO customer_metadata (customer_id, meta_key, meta_value) VALUES ($1, $2, $3) RETURNING *",
      [customer_id, meta_key, meta_value]
    );
    res.status(201).json(response.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCustomerMetadata = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { customer_id, meta_key, meta_value } = req.body;
    const response = await pool.query(
      "UPDATE customer_metadata SET customer_id = $1, meta_key = $2, meta_value = $3 WHERE id = $4 RETURNING *",
      [customer_id, meta_key, meta_value, id]
    );
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Customer metadata not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCustomerMetadata = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query(
      "DELETE FROM customer_metadata WHERE id = $1 RETURNING *",
      [id]
    );
    if (response.rows.length === 0) {
      res.status(404).json({ error: "Customer metadata not found" });
    } else {
      res.status(200).json({ message: "Customer metadata deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCustomerMetadata,
  getCustomerMetadataById,
  createCustomerMetadata,
  updateCustomerMetadata,
  deleteCustomerMetadata,
};
