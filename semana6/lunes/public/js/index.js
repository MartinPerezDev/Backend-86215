//conexion desde el cliente
const socket = io();

const getUsername = async () => {
  const inputData = await Swal.fire({
    title: "Ingrese su nombre de usuario",
    input: "text",
    inputLabel: "este nombre se utilizara en el chat",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) return "Es obligatorio ingresar su nombre de usuario";
    }
  });

  return inputData.value;
};

const showNewUserConnected = (username) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: `${username} se unio al chat!`,
    showConfirmButton: false,
    timer: 2000
  });
}

const insertMessage = (messageData) => {
  const { username, message } = messageData;
  const chatBox = document.getElementById("chatBox");

  // Crear contenedor del mensaje
  const msgWrapper = document.createElement("div");
  msgWrapper.classList.add("mb-3", "d-flex", "flex-column", "align-items-start");

  // Estructura de la burbuja
  msgWrapper.innerHTML = `
    <small class="text-muted mb-1" style="font-size: 0.75rem; margin-left: 10px;">${username}</small>
    <div class="bg-white p-2 px-3 shadow-sm" style="border-radius: 18px; max-width: 80%; border: 1px solid #e4e6eb;">
      <span class="text-dark">${message}</span>
    </div>
  `;

  chatBox.appendChild(msgWrapper);
  
  // Auto-scroll al fondo
  chatBox.scrollTop = chatBox.scrollHeight;
};

const main = async () => {
  const username = await getUsername();
  //luego de caputurar username, emitimos un evento de nuevo usuario
  socket.emit("new user connected", username);

  //formulario
  const formChat = document.getElementById("formChat");
  const inputChat = document.getElementById("inputChat");

  formChat.addEventListener("submit", (event) => {
    event.preventDefault();

    //capturamos el msj
    const message = inputChat.value;
    inputChat.value = "";

    //emitimos un evento de mensaje nuevo
    socket.emit("new message", { username, message });
  });

  //capturamos la re-transmision del mensaje y lo insertamos en el HTML
  socket.on("broadcast new message", (messageData) => insertMessage(messageData));

  //capturamos el historial de mensajes y los insertarmos en el HTML
  socket.on("message history", (messages)=> {
    messages.forEach((messageData)=> {
      insertMessage(messageData);
    });
  });

  socket.on("notification new user", (username)=> {
    showNewUserConnected(username);
  });

  socket.on("count users", (userCounter)=> {
    const countUsers = document.getElementById("countUsers");
    countUsers.textContent = userCounter;
  });
};

main();