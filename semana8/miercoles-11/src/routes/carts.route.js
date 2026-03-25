import express from "express";
import Cart from "../models/cart.model.js";

const cartRouter = express.Router();

cartRouter.post("/", async (req, res) => {
  try {
    const cart = await Cart.create({});

    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al crear el carrito" });
  }
});

cartRouter.post("/:cid/product/:pid", async(req, res)=> {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(cid, { $push: { products: { product: pid, quantity } } }, { new: true, runValidators: true });

    res.status(200).json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al agregar un producto al carrito" });
  }
});

export default cartRouter;