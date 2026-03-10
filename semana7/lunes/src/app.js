import express from "express";
import productsRouter from "./routes/products.route.js";
import connectMongoDB from "./config/db.js";
import dotenv from "dotenv";

//inicializamos las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

connectMongoDB();

//endpoints
app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log("🚀 Servidor iniciado correctamente!");
});