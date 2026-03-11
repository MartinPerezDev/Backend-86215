import express from "express";
import productsRouter from "./routes/products.route.js";
import connectMongoDB from "./config/db.js";
import dotenv from "dotenv";
import cartRouter from "./routes/carts.route.js";

//inicializamos las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

connectMongoDB();

//endpoints
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
  console.log("🚀 Servidor iniciado correctamente!");
});