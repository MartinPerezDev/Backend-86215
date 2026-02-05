import fs from "fs";

const leerJson = () => {
  const dataJson = fs.readFileSync("./data/archivo.json", "utf-8");
  const data = JSON.parse(dataJson);
  return data;
};

const sobreEscribirJson = () => {
  const dataJson = fs.readFileSync("./data/archivo.json", "utf-8");
  const data = JSON.parse(dataJson);

  data.push({ name: "Caja", icon: "📦" });

  fs.writeFileSync("./data/archivo.json", JSON.stringify(data, null, 2) , "utf-8");
}

console.log( leerJson() );

sobreEscribirJson();