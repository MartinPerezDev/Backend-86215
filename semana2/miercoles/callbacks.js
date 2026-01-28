function saludar(nombre, callback){
  console.log(`Hola ${nombre}`);

  callback();
}

function despedir(){
  console.log("Adios, que tengas un buen dia!");
}

//saludar("Allan", despedir);

let arrayNumeros = [1, 2, 3, 4, 5];
let nuevoArray = arrayNumeros.map( (numero) => numero + 1 );

//console.log(nuevoArray);

//definiendo el callback por fuera
const funcionCallback = (numero) => {
  if( numero%2 === 0 ){
    return numero;
  }else{
    return "@";
  }
}

const evaluarPares = arrayNumeros.map( funcionCallback );

console.log(evaluarPares);