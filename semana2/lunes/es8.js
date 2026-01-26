const carrito = {
  notebook: 1,
  mouse: 2,
  teclado: 1,
  monitor: 1
};

console.log( Object.keys(carrito) );
console.log( Object.values(carrito) );

const totalProductos = Object.values(carrito).reduce( (total, cantidad) => total + cantidad, 0);
console.log("Total de productos en el carrito: ", totalProductos);

const nuevoCarrito = Object.entries(carrito).map( ([ producto, cantidad ]) => {
  return { producto, cantidad };
});

console.log(nuevoCarrito);