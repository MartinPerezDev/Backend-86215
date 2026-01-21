class Persona {
  constructor(nombre, edad, humor) {
    this.nombre = nombre;
    this.edad = edad;
    this.humor = humor;
  }

  saludar() {
    return `Hola me llamo ${this.nombre}, y tengo ${this.edad} años`;
  }

  random() {
    return Math.random() < 0.5 ? 0 : 1
  }

  jugarPartido() {
    const resultado = this.humor >= 70;

    this.humor += resultado === true ? 10 : -20;
    return resultado === true ? `${this.nombre} jugo un partido de futbol` : `${this.nombre} no se sentia bien y no pudo ir a jugar`;
  }

  dormir() {
    const numeroRandom = this.random();

    this.humor += numeroRandom === 1 ? 100 : -50;
    return numeroRandom === 1 ? `${this.nombre} durmio correctamente y su humor se restablecio` : `${this.nombre} no tuvo una buena noche y termino mas cansado de lo que estaba`;
  }
};

const persona1 = new Persona("Sergio Triana", 32, 100);
const persona2 = new Persona("Alejandro Pourcel", 26, 90);

console.log(persona1.saludar());
console.log(persona2.saludar());

console.log(persona1.dormir());
console.log(persona2.dormir());

console.log(persona1.jugarPartido());
console.log(persona2.jugarPartido());

console.log(persona1.dormir());
console.log(persona2.dormir());