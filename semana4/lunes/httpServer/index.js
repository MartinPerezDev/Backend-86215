import http from "http";

const users = [
  {
    name: "Lautaro",
    course: "React JS"
  },
  {
    name: "Gonzalo",
    course: "Node JS"
  }
]

const server = http.createServer((request, response)=> {
  //definiendo rutas
  if(request.url === "/"){
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Bienvenido a mi servidor");
  }
  else if(request.url === "/usuarios"){
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end( JSON.stringify({ message: "Lista de usuarios v2", users }) );
  }
  else{
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end( JSON.stringify({ message: "Error 404 - Ruta no encontrada" }) );
  }

});


server.listen(8080, ()=> {
  console.log("🚀 Servidor iniciado correctamente!");
});