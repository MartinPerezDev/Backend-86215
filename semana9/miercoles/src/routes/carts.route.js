import express from "express";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js"

const cartRouter = express.Router();

cartRouter.post("/", async (req, res) => {
  try {
    const cart = await Cart.create({});

    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al crear el carrito" });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity <= 0) return res.status(400).json({ status: "error", message: "La cantidad debe ser un numero entero mayor a 0" });

    //verificar que el producto a agregar existe
    const product = await Product.findById(pid).lean();
    if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    //obtener carrito
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    //buscar si el producto ya existe en el carrito
    const productIndex = cart.products.findIndex((dataProduct) => dataProduct.product == pid);

    if (productIndex !== -1) {
      //producto existe en el carrito, sumamos sus cantidades
      cart.products[productIndex].quantity += quantity;
    } else {
      //producto no existe en el carrito, lo agregamos como nuevo
      cart.products.push({ product: pid, quantity });
    }

    //guardamos los cambios
    const updatedCart = await cart.save();
    res.status(200).json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al agregar un producto al carrito" });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await Cart.findById(cid).populate("products.product");
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    res.status(200).json({ status: "success", payload: cart.products });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al agregar un producto al carrito" });
  }
});

//cambiar la cantidad de un producto en el carrito
cartRouter.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    if (!Number.isInteger(quantity) || quantity <= 0) return res.status(400).json({ status: "error", message: "La cantidad debe ser un numero entero mayor a 0" });

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    const productIndex = cart.products.findIndex((dataProduct) => dataProduct.product == pid);
    if (productIndex === -1) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    cart.products[productIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({ status: "success", payload: cart.products });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al actualizar la cantidad del producto en el carrito" });
  }
});

//borrar un producto de un carrito
cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const updatedCart = await Cart.findByIdAndUpdate(cid, { $pull: { products: { product: pid } } }, { new: true });
    if (!updatedCart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    res.status(200).json({ status: "success", payload: updatedCart.products });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al borrar un producto de el carrito" });
  }
});

//vaciar carrito completamente
cartRouter.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;

    const updatedCart = await Cart.findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true });
    if (!updatedCart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    res.status(204).send({});
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al borrar los productos de el carrito" });
  }
});

export default cartRouter;