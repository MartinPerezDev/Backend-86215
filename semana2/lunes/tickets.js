class TicketMaster{
  #precioBaseDeGanancia = 0.15; //15%
  #eventos = [];

  #nuevoId(){
    return this.#eventos.length + 1;
  }

  mostrarEventos(){
    return this.#eventos.length !== 0 ? this.#eventos : "No hay eventos asignados" ;
  }

  agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date().toLocaleDateString() ){
    if(!nombre || !lugar || !precio) return "Error, faltan datos para agregar el evento";

    const id = this.#nuevoId();
    this.#eventos.push({
      id,
      nombre,
      lugar,
      precio: Number((precio * ( 1 + this.#precioBaseDeGanancia )).toFixed(2)),
      capacidad,
      fecha,
      participantes: []
    });

    return "Evento agregado correctamente";
  }

  agregarUsuarioEnEvento(idEvento, idUsuario){
    if(!idEvento || !idUsuario) return "Error, faltan datos para agregar el usuario en el evento";

    //verificamos que el evento exista
    const indexEvento = this.#eventos.findIndex((evento) => evento.id === idEvento );
    if(indexEvento === -1) return "Error, este evento no existe";

    //verificamos si el usuario existe dentro de el array de participantes
    const indexParticipante = this.#eventos[indexEvento].participantes.findIndex((idParticipante) => idParticipante === idUsuario );
    if(indexParticipante !== -1) return "Error, el participante ya se encuentra agregado al evento";

    //si el usuario es nuevo lo agregamos al array de participantes de ese evento
    this.#eventos[indexEvento].participantes.push(idUsuario);

    return `Usuario con ID ${idUsuario} agregado correctamente al evento ${this.#eventos[indexEvento].nombre}`;
  }

}

const ticketec = new TicketMaster;

console.table( ticketec.mostrarEventos() );
console.log( ticketec.agregarEvento("Apertura Mundial 2026", "Parque centenario", 2000, 200, "22/02/2026") );
console.log( ticketec.agregarEvento("Baile folklore", "Plaza san martin", 50) );
console.table( ticketec.mostrarEventos() );
console.log( ticketec.agregarUsuarioEnEvento() );
console.log( ticketec.agregarUsuarioEnEvento(2, 43) );
console.log( ticketec.agregarUsuarioEnEvento(2, 10) );
console.log( ticketec.agregarUsuarioEnEvento(2, 16) );
console.log( ticketec.agregarUsuarioEnEvento(2, 16) );
console.table( ticketec.mostrarEventos() );

