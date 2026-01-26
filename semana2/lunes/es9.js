//Spread operator
const lista = ["Netbook", "Mouse", "Teclado"];
const listaNueva = ["Monitor", "Impresora"];

const todosLosProductos = [ ...lista, ...listaNueva, "Auriculares" ];

console.log(todosLosProductos);

//Rest operator
function calcularTotal(...precios){
  return precios.reduce((total, precio)=> total + precio, 0 );
}

console.log( calcularTotal(100, 200, 50) )
console.log( calcularTotal(199, 24, 50, 100) ) 

const categorias = ["Electronica", "Hogar", "Deportes", "Ropa"];

const [ primeraCategoria, ...otrasCategorias ] = categorias;

console.log(primeraCategoria)
console.log(otrasCategorias)