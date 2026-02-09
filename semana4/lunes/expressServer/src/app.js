import express from "express";

const app = express();

const products = [
  { id: 1, title: "Laptop Pro 14", category: "laptops", price: 1299.99 },
  { id: 2, title: "Laptop Air 13", category: "laptops", price: 999.99 },
  { id: 3, title: "Monitor UltraWide 34", category: "monitors", price: 599.99 },
  { id: 4, title: "Monitor IPS 27", category: "monitors", price: 329.99 },
  { id: 5, title: "Teclado Mecanico", category: "peripherals", price: 119.99 },
  { id: 6, title: "Mouse Optico", category: "peripherals", price: 39.99 }
]

// endpoints -> rutas
// req -> request
// res -> response
app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.get("/products", (req, res) => {
  const { order, search } = req.query;
  let productsList = [...products];

  //si search existe, realizamos una busqueda por su "title"
  if (search) {
    const regexp = new RegExp(search, "i");
    productsList = productsList.filter((productData) => regexp.test(productData.title));
  };

  //si order tiene algun valor, ordenamos por precio
  if (order === "asc") {
    productsList.sort((a, b) => a.price - b.price);
  } else if (order === "desc") {
    productsList.sort((a, b) => b.price - a.price);
  }

  res.json({ message: "Lista de productos", products: productsList });
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;

  const product = products.find((productData) => productData.id === Number(productId));
  if (!product) return res.json({ message: "Error - Producto no encontrado" });

  res.json({ message: "Producto encontrado por id", product });
});

app.get("/products/category/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;

  const filteredProducts = products.filter((productData) => productData.category === categoryId);
  if (filteredProducts.length === 0) return res.json({ message: `Error - no se encontraron productos para la categoria ${categoryId}` });

  res.json({ message: "Productos filtrados por categoria", products: filteredProducts });
});

//manejador de rutas no encontradas - 404
app.use((req, res) => {
  res.json({ message: "Ruta no encontrada" });
});

app.listen(8080, () => {
  console.log("🚀 Servidor iniciado correctamente en http://localhost:8080");
});