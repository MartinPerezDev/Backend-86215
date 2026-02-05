import fs from "fs";

const leerArchivo = () => {
  const data = fs.readFileSync("./data/archivo.txt", "utf-8");
  return data;
}

const sobreEscribirArchivo = () => {
  fs.writeFileSync("./data/archivo.txt", "Guardando data desde node js", "utf-8");
}

const actualizarArchivo = () => {
  fs.appendFileSync("./data/archivo.txt", "\nAgregando contenido nuevo", "utf-8");
}

const archivoExiste = () => {
  return fs.existsSync("./data/archivo2.txt");
}

console.log( leerArchivo() );
sobreEscribirArchivo();
actualizarArchivo();
console.log( archivoExiste() );