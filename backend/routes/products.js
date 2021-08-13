const express = require("express");
const {
  getProduct,
  getProducts,
  addProduct,
} = require("../controllers/products.js");

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProduct);
router.route("/add").post(addProduct);

module.exports = router;
