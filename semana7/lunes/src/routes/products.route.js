import express from "express";
import Product from "../models/product.model.js";

const productsRouter = express.Router();

productsRouter.post("/", async(req, res)=> {
  try {
    const newProduct = req.body;

    const product = await Product.create(newProduct);
    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al agregar un producto" });
  }
});

productsRouter.get("/", async(req, res)=> {
  try {
    const products = await Product.find().lean();
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al listar los productos" });
  }
});

export default productsRouter;