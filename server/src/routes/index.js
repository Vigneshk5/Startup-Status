const { Router } = require("express");
const router = Router();

// Import the expense controller functions
const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense.controller");

// Import the profit controller functions
const {
  getProfits,
  getProfitById,
  createProfit,
  updateProfit,
  deleteProfit,
} = require("../controllers/profit.controller");

// Import the daily profit loss controller function
const { getDailyProfitLoss } = require("../controllers/daily_profit_loss.controller");

// Import the customer controller functions
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerlist.controller");

// Import the customer metadata controller functions
const {
  getCustomerMetadata,
  getCustomerMetadataById,
  createCustomerMetadata,
  updateCustomerMetadata,
  deleteCustomerMetadata,
} = require("../controllers/customer_metadata.controller");

// Import the investor controller functions
const {
  getInvestors,
  getInvestorById,
  createInvestor,
  updateInvestor,
  deleteInvestor,
} = require("../controllers/investor.controller");

// Expense routes
router.get("/expenses", getExpenses);
router.get("/expenses/:id", getExpenseById);
router.post("/expenses", createExpense);
router.put("/expenses/:id", updateExpense);
router.delete("/expenses/:id", deleteExpense);

// Profit routes
router.get("/profits", getProfits);
router.get("/profits/:id", getProfitById);
router.post("/profits", createProfit);
router.put("/profits/:id", updateProfit);
router.delete("/profits/:id", deleteProfit);

// Daily Profit Loss route
router.get("/daily-profit-loss", getDailyProfitLoss);

// Customer routes
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", createCustomer);
router.put("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCustomer);

// Customer metadata routes
router.get("/customer-metadata", getCustomerMetadata);
router.get("/customer-metadata/:id", getCustomerMetadataById);
router.post("/customer-metadata", createCustomerMetadata);
router.put("/customer-metadata/:id", updateCustomerMetadata);
router.delete("/customer-metadata/:id", deleteCustomerMetadata);

// Investor routes
router.get("/investors", getInvestors);
router.get("/investors/:id", getInvestorById);
router.post("/investors", createInvestor);
router.put("/investors/:id", updateInvestor);
router.delete("/investors/:id", deleteInvestor);

module.exports = router;
