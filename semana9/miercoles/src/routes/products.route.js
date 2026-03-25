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
    const { limit = 10, page = 1, category = null, order = "asc" } = req.query;

    const filter = category ? { category } : {};
    const sortOrder = order === "asc" ? 1 : -1;

    const data = await Product.paginate(filter, { limit, page, sort: { price: sortOrder }, select: "-__v -createdAt -updatedAt" });
    const products = data.docs;
    delete data.docs;

    res.status(200).json({ status: "success", payload: products, ...data });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al listar los productos" });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await Product.findById(pid);
    if(!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "succes", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al traer un producto por su id" });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al actualizar el producto" });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;

    const deletedProduct = await Product.findByIdAndDelete(pid);
    if (!deletedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(204).send({});
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al borrar el producto" });
  }
});


export default productsRouter;