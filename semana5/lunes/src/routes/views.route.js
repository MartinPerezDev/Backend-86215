import express from "express";
import ProductManager from "../productManager.js";

const viewsRouter = express.Router();
const productManager = new ProductManager("./src/data/products.json");

viewsRouter.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

viewsRouter.get("/dashboard", async (req, res) => {
  try {
    const products = await productManager.getProducts();

    res.render("dashboard", { products, title: "Dashboard" });
  } catch (error) {
    res.status(500).render("error");
  }
});

viewsRouter.get("/dashboard/detail/:productId", async(req, res)=> {
  try {
    const productId = req.params.productId;

    const product = await productManager.getProductById(productId);

    res.render("product", { product, title: "Product Detail" });
  } catch (error) {
    res.status(500).render("error");
  }
});

export default viewsRouter;