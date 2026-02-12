import express from "express";
import ProductManager from "./productManager.js";

const app = express();

//middleware para habilitar poder recibir data json en mis endpoints
app.use(express.json());

const productManager = new ProductManager("./src/data/products.json");

// endpoints
app.get("/api/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();

    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/api/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productManager.getProductById(productId);

    res.status(200).json({ status: "success" , product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

//agregar un producto nuevo
app.post("/api/products", async(req, res)=> {
  try {
    //recuperar la data del producto nuevo
    const newProduct = req.body;

    const product = await productManager.addProduct(newProduct);
    res.status(201).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

//borrar un producto por su id
app.delete("/api/products/:productId", async(req, res)=> {
  try {
    const productId = req.params.productId;

    await productManager.deleteProductById(productId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

//editar un producto por su id
app.put("/api/products/:productId", async(req, res)=> {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const product = await productManager.updateProductById(productId, updates);
    res.status(200).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// -> /api/carts/:cid/product/:pid

//manejador de rutas no encontradas - 404
app.use((req, res) => {
  res.json({ message: "Ruta no encontrada" });
});

app.listen(8080, () => {
  console.log("🚀 Servidor iniciado correctamente en http://localhost:8080");
});