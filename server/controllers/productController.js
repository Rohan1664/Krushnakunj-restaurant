import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// ✅ GET ALL WITH PAGINATION + SEARCH
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { description: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// GET SINGLE
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

// UPDATE
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