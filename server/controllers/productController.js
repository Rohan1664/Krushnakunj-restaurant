import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// GET ALL
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// GET SINGLE PRODUCT ⭐ (ADD THIS)
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

// CREATE
export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description, category, countInStock } =
    req.body;

  const product = new Product({
    name,
    price,
    image,
    description,
    category,
    countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// UPDATE ⭐ (ADD THIS)
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  product.image = req.body.image || product.image;
  product.description = req.body.description || product.description;
  product.category = req.body.category || product.category;
  product.countInStock =
    req.body.countInStock || product.countInStock;

  const updated = await product.save();
  res.json(updated);
});

// DELETE
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
});