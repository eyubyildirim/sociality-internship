const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const cors = require("cors");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
const products = require("./routes/products");

const morgan = require("morgan");

const app = express();

// Body parser
app.use(express.json());

app.use(cors());

if (process.env.NODE_ENV === "development") {
  console.log("dev");
  app.use(morgan("dev"));
}

// Mount routers
app.use("/products", products);

// Redirection
app.all("/", (req, res) => res.redirect("/products/"));

// Custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);

// Handle unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
