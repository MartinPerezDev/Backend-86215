const cliente = "Lautaro Braile";

const productos = [
  { id: 1, nombre: "Notebook", precio: 1200, cantidad: 2 },
  { id: 2, nombre: "Teclado", precio: 500, cantidad: 1 },
  { id: 3, nombre: "Mouse", precio: 200, cantidad: 3 }
];

const precioTotal = () => {
  let total = 0;

  productos.forEach( (producto) => {
    total = total + producto.cantidad * producto.precio;
  });

  return total;
};

const listarProductos = () => {
  const listado = productos.map( (producto) => {
    return `${producto.cantidad} x ${producto.nombre} : $${producto.cantidad * producto.precio}`;
  }).join("\n");

  return listado;
};

const resumenPedido = `
📦 Pedido de ${cliente}

${listarProductos()}

----------------------------------

💰 Total: $${precioTotal()}
`;

console.log(resumenPedido);