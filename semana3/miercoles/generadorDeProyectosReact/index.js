import fs from "fs/promises";
import path from "path";

const appJsxContent = `
function App(){

  return(
    <div>
      <h1>Esta es mi App creada desde Node JS!</h1>
    </div>
  )
}

export default App;
`;

const indexContent = `
import { createRoot } from "react-dom/client"
import App from "./App.jsx"

createRoot( document.getElementById("root")).render(
  <App />
)
`;

const indexHTMLContent = `
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

const packageJsonContent = JSON.stringify({
  name: "app-react-desde-node",
  version: "1.0.0",
  dependencies: {
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-scripts": "5.0.1"
  },
  scripts: {
    "dev": "react-scripts start"
  }
}, null, 2);

const generateReactProyect = async(proyectName) => {
  //creamos la ruta absoluta en donde vamos a guardar nuestro proyecto de react
  const basePath = path.join(process.cwd(), proyectName );

  //definimos la estructura de carpetas
  const folders = ["src", "src/components", "src/assets", "public"];

  //definimos los archivos que queremos generar en nuestro proyecto
  const files = [
    {
      fileName: "App.jsx",
      content: appJsxContent
    },
    {
      fileName: "index.js",
      content: indexContent
    },
    {
      fileName: "index.html",
      content: indexHTMLContent
    },
    {
      fileName: "package.json",
      content: packageJsonContent
    }
  ]

  try {
    //creamos la carpeta de nuestro proyecto
    await fs.mkdir(basePath);

    //creamos las carpetas internas de nuestro proyecto
    for( const folder of folders ){
      await fs.mkdir( path.join(basePath, folder) );
    }

    //creamos los archivos del proyecto
    for(const file of files){
      
      switch(file.fileName){
        case "index.html":
          await fs.writeFile( path.join(basePath, "public", file.fileName), file.content, "utf-8" );
          break;
        case "package.json":
          await fs.writeFile( path.join(basePath, file.fileName), file.content, "utf-8" );
          break;
        default:
          await fs.writeFile( path.join(basePath, "src", file.fileName), file.content, "utf-8" );
      }
    }
  } catch (error) {
    console.log("Error al generar el proyecto", error.message);
  }
};

generateReactProyect("my-ecommerce");
