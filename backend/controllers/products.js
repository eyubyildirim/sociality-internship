const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// @desc    Get all products
// @route   GET /products
exports.getProducts = asyncHandler(async (req, res, next) => {
  // Get all the products from the database
  const products = await Product.find();

  newProducts = products.map((product) => {
    return {
      id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
    };
  });

  console.log(newProducts);
  res.status(200).json({ success: true, data: newProducts });
});

// @desc    Get a product
// @route   GET /products/:id
exports.getProduct = asyncHandler(async (req, res, next) => {
  // Get product with req.params.id from database
  console.log("object");
  const product = await Product.findById(req.params.id);
  console.log("object");

  // If no product found with this id, return an error
  if (!product) {
    return next(
      new ErrorResponse(
        `Product not found with the ID: ${req.params.id}`,
        404,
        req.params.id
      )
    );
  }
  const newProduct = {
    id: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
  };

  res.status(200).json({ data: newProduct });
});

// @desc    Add the product from link
// @route   GET /products/add?id=
exports.addProduct = asyncHandler(async (req, res, next) => {
  // Get the website from link
  const response = await got(req.query.link);
  // Take the body in dom format
  const dom = new JSDOM(response.body);

  // Query all images
  const images = [...dom.window.document.querySelectorAll("img")];
  // First filter images with class name then map their src to another array.
  const mainImages = images
    .filter(
      (image) =>
        image.className ===
        "wt-max-width-full wt-horizontal-center wt-vertical-center carousel-image wt-rounded"
    )
    .map((image) => image.src);
  // Get the first image in this new array, it's always our main product image source
  const imageSrc = mainImages[0];

  // Query all h1
  const names = [...dom.window.document.querySelectorAll("h1")];
  // Filter with corresponding class and map their text
  const mainNames = names
    .filter(
      (name) =>
        name.className ===
        "wt-text-body-03 wt-line-height-tight wt-break-word wt-mb-xs-1"
    )
    .map((name) => name.textContent);
  // First name is our main product's name
  const name = mainNames[0].trim();

  // Query all p
  const prices = [...dom.window.document.querySelectorAll("p")];
  // Filter with corresponding class and map their text
  const mainPrices = prices
    .filter((price) => price.className === "wt-text-title-03 wt-mr-xs-2")
    .map((price) => price.textContent);
  // First price is our main product's price
  const price = mainPrices[0].trim();

  // Create a product with name, image and price in our database and save it to a variable.
  const product = await Product.create({
    name: name,
    image: imageSrc,
    price: price,
  });

  // Return the product variable as response
  res.status(200).json({ product: product });
});
