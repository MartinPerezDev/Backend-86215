//iniciamos la conexion desde nuestro cliente
const socket = io();

const deleteProduct = (productId) => {
  socket.emit("delete product", { productId })
};

socket.on("product list", ({ products })=> {
  //capturo el contenedor de los productos
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  //iteramos nuestro array de productos para insertar 1 a 1
  products.forEach((product)=> {
    let card = document.createElement("div");
    card.className = "product-card"
    card.innerHTML = `
      <img src=${product.thumbnail}>
      <p>${product.title}</p>
      <p>$${product.price}</p>
      <button onclick="deleteProduct('${product.id}')" >eliminar</button>
    `;

    //insertamos cada card dentro de el contenedor
    productList.appendChild(card);
  });
});


//formulario
const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", async(event)=> {
  event.preventDefault();

  const formData = new FormData(productForm);

  const response = await fetch("api/products", {
    method: "POST",
    body: formData
  });

  if(response.ok){
    productForm.reset();
    socket.emit("new product");
  }

});