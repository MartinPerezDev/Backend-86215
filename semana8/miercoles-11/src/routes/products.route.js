import express from "express";
import Product from "../models/product.model.js";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;

    const product = await Product.create(newProduct);
    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al agregar un producto" });
  }
});

productsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al listar los productos" });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true });
    if(!updatedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al actualizar el producto" });
  }
});

productsRouter.delete("/:pid", async(req, res)=> {
  try {
    const pid = req.params.pid;

    const deletedProduct = await Product.findByIdAndDelete(pid);
    if(!deletedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(204).send({});
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al borrar el producto" });
  }
});


export default productsRouter;