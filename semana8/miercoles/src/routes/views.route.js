import express from "express";
import Product from "../models/product.model.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async(req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const data = await Product.paginate({}, { limit, page, lean: true });
    const products = data.docs;
    delete data.docs;

    const links = [];

    for(let i=1; i <= data.totalPages; i++){
      links.push({ number: i, link: `?limit=${limit}&page=${i}` });
    };

    res.render("home", { products, links });
  } catch (error) {
    res.status(500).json({ status: "error", message: "No es posible mostrar los productos" });
  }
});

export default viewsRouter;