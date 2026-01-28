//Simulador de plataforma de series y peliculas

const users = [
  {
    id: "klmj12314",
    name: "Nicolas",
    country: "Argentina"
  },
  {
    id: "lpkm21412",
    name: "Lucas",
    country: "Argentina"
  }
];

const moviesList = [
  {
    id: "mv001",
    name: "Inception",
    year: 2010,
    rating: 8.8,
    gender: "Sci-Fi"
  },
  {
    id: "mv002",
    name: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    gender: "Drama"
  },
  {
    id: "mv003",
    name: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    gender: "Action"
  },
  {
    id: "mv004",
    name: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    gender: "Crime"
  },
  {
    id: "mv005",
    name: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    gender: "Drama"
  }
];

const seriesList = [
  {
    id: "sr001",
    name: "Breaking Bad",
    year: 2008,
    rating: 9.5,
    gender: "Crime"
  },
  {
    id: "sr002",
    name: "Game of Thrones",
    year: 2011,
    rating: 9.2,
    gender: "Fantasy"
  },
  {
    id: "sr003",
    name: "The Crown",
    year: 2016,
    rating: 8.6,
    gender: "Drama"
  },
  {
    id: "sr004",
    name: "Stranger Things",
    year: 2016,
    rating: 8.7,
    gender: "Sci-Fi"
  },
  {
    id: "sr005",
    name: "The Office",
    year: 2005,
    rating: 9.0,
    gender: "Comedy"
  }
];

function login(userId){
  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      const user = users.find( (dataUser) => dataUser.id === userId );
      if(user){
        resolve(user);
      }else{
        reject("Credenciales Invalidas");
      }
    }, 1500)
  });
};

function getMovies(){
  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      if(moviesList.length !== 0){
        resolve(moviesList);
      }else{
        reject("No encontramos peliculas disponibles para su region");
      }
    }, 2000)
  });
};

function getSeries(){
  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      if(seriesList.length !== 0){
        resolve(seriesList);
      }else{
        reject("No encontramos series disponibles para su region");
      }
    }, 1700)
  });
};

function streamServer(name, delay){
  return new Promise((resolve)=> {
    setTimeout(()=> resolve(name), delay);
  })
};

async function startPlatform(){
  try {
    //loguear al usuario, enviando su id
    const user = await login("lpkm21412");
    
    //obtener las series y peliculas
    const [ movies, series ] = await Promise.all([ getMovies(), getSeries() ]);

    //detectamos cual de nuestros servidores es el mas rapido para nuestro usuario
    const server = await Promise.race([
      streamServer("LAN", 600),
      streamServer("LAS", 2500),
      streamServer("ASIA", 400)
    ]);

    if(user.country === "Argentina" && server === "ASIA") throw new Error("No es posible acceder a contenido de esta region");

    console.log("Bienvenido:", user.name);
    console.log(`Estas viendo contenido en el servidor de: ${server}`);

    console.log("No te pierdas de nuestras recomendaciones");

    console.log("Listado de Peliculas");
    console.table(movies);

    console.log("Listado de Series");
    console.table(series);
  } catch (error) {
    console.log("Platform error:", error);
  }
};

startPlatform();