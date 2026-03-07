import express from "express";
import http from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.route.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//endpoints
app.use("/", viewsRouter);

//persistencia en memoria de los msj
const messages = [];
let userCounter = 0;
//websockets
io.on("connection", (socket) => {
  socket.on("new user connected", (username) => {
    userCounter++;
    io.emit("count users", userCounter);

    socket.emit("message history", messages);

    //enviamos un evento a los clientes conectados, menos al que se conecto
    socket.broadcast.emit("notification new user",  username);
  });

  socket.on("new message", (messageData) => {
    //guardamos los msj en nuestro array messages
    messages.push(messageData);

    //emitimos un evento global transmitiendo el msj a todos los clientes
    io.emit("broadcast new message", messageData);
  });

  socket.on("disconnect", ()=> {
    if(userCounter >= 1){
      userCounter--;
      io.emit("count users", userCounter);
    };
  });
});

server.listen(8080, () => {
  console.log("🚀 Servidor iniciado correctamente!");
});