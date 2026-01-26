const precio = 1000;
const cuotas = 12;
const tasaInteres = 0.05; //5% de interes

const total = precio * ( 1 + tasaInteres ) ** cuotas;

/*
console.log(`Precio base: $${precio}`);
console.log(`Interes por cada mes: ${tasaInteres * 100}%`);
console.log(`Numero de cuotas: ${cuotas}`);
console.log(`Total a pagar: $${total.toFixed(2)}`);
*/

const metodosPago = ["debido", "credito", "paypal", "transferencia", "efectivo"];
const metodoPagoUsuario = "paypal";

if( metodosPago.includes(metodoPagoUsuario) ){
  console.log("Metodo de pago aceptado");
}else{
  console.log("Metodo de pago no valido, Porfavor elige uno aceptado");
}