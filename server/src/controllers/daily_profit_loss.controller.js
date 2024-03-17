const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "process.env.financeDB",
});

const getDailyProfitLoss = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM daily_profit_loss ORDER BY date ASC"
    );
    res.status(200).json(response.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getDailyProfitLoss,
};
