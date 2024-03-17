const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./src/routes/index"));

app.listen(4000);
console.log("Server is running on port, 4000");
