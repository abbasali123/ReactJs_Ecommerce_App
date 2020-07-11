import express from "express";
import Product from "../models/ProductModel";
import { getToken, isAdmin, isAuth } from "../util";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const products = await Product.find({});
  res.send(products);
});

router.get("/:id", async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

router.post("/", isAuth, isAdmin, async (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: "Product Created.", data: newProduct });
  }
  return res.status(500).send({ message: "Error in creating Product" });
});

router.put("/:id", isAuth, isAdmin, async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById({ _id: productId });
  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
  }

  const UpdatedProduct = await product.save();
  if (UpdatedProduct) {
    return res
      .status(201)
      .send({ message: "Product Updated.", data: UpdatedProduct });
  }
  return res.status(500).send({ message: "Error in Updating Product" });
});

router.delete("/:id", isAuth, isAdmin, async (req, res, next) => {
  const deletedProduct = await Product.findById({ _id: req.params.id });
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product deleted" });
  } else {
    res.send("error in deleting Product");
  }
});

module.exports = router;
