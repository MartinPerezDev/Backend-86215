import express from "express";
import productsRouter from "./routes/products.route.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.route.js";
import http from "http";
import { Server } from "socket.io";
import ProductManager from "./productManager.js";

const app = express();
//declaramos nuestro server de forma explicita para poder configurarlo manualmente
const server = http.createServer(app);
//configuramos nuestro server para que acepte solicitudes de websockets
const io = new Server(server);
const productManager = new ProductManager("./src/data/products.json");

//middleware para habilitar poder recibir data json en mis endpoints
app.use(express.json());
//habilitamos la carpeta public
app.use(express.static("./public"));
//habilitamos recibir data de formularios y se parsea a objeto js
app.use(express.urlencoded({ extended: true }));

//handlebars config
app.engine("handlebars", engine({
  helpers: {
    formatPrice: (price) => {
      return `$${Number(price).toLocaleString("es-AR")}`
    }
  }
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//endpoints
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);
//app.use("/api/carts", cartsRouter);

//manejador de rutas no encontradas - 404
app.use((req, res) => {
  res.json({ message: "Ruta no encontrada" });
});

//websockets
io.on("connection", async (socket) => {
  console.log("🟢 Nuevo cliente conectado con ID: " + socket.id);

  const products = await productManager.getProducts();
  socket.emit("product list", { products });

  socket.on("delete product", async ({ productId }) => {
    await productManager.deleteProductById(productId);

    //emitimos el evento a todos los clientes conectados
    const products = await productManager.getProducts();
    io.emit("product list", { products });
  });

  socket.on("new product", async() => {
    //emitimos el evento a todos los clientes conectados
    const products = await productManager.getProducts();
    io.emit("product list", { products });
  });

  socket.on("disconnect", () => {
    console.log("🔴 Se deconecto el cliente con ID: " + socket.id);
  });
});

server.listen(8080, () => {
  console.log("🚀 Servidor iniciado correctamente en http://localhost:8080");
});