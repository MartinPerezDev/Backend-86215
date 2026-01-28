const getUser = () => {
  const isLogged = true;

  return new Promise((resolve, reject) => {
    if (isLogged === true) {
      resolve({ id: 1, name: "Allan" });
    } else {
      reject("Error, usuario no autenticado");
    }
  })

};

getUser()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("La promesa finalizo!")
  })

//consumiendo api

/*
fetch("https://fakestoreapi.com/products")
  .then((response)=> {
    return response.json();
  })
  .then((data)=> {
    console.log(data);
  })
  .catch((error)=> {
    console.log(error);
  })
*/

//consumiendo api con async y await
const getProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    if(data.length === 0) throw new Error("La lista de productos esta vacia");

    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Finalizo la ejecución");
  }
}

getProducts();