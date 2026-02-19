import express from "express";
import productsRouter from "./routes/products.route.js";

const app = express();

//middleware para habilitar poder recibir data json en mis endpoints
app.use(express.json());
//habilitamos la carpeta public
app.use(express.static("./public"));
//habilitamos recibir data de formularios y se parsea a objeto js
app.use(express.urlencoded({ extended: true }));

//endpoints
app.use("/api/products", productsRouter);
//app.use("/api/carts", cartsRouter);

//manejador de rutas no encontradas - 404
app.use((req, res) => {
  res.json({ message: "Ruta no encontrada" });
});

app.listen(8080, () => {
  console.log("🚀 Servidor iniciado correctamente en http://localhost:8080");
});