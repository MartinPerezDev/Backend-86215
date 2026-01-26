let modo = "calculos";

const calculadora = async() => {
  if(modo === "calculos"){
    const { Calculadora } = await import("./calculadora.js");

    let calculadoraCientifica = new Calculadora();

    console.log( calculadoraCientifica.suma(10, 15) );
  }
}

calculadora();