import { v4 as newId } from "uuid";

class ProductManager {
  constructor() {
    this.products = [];
  }

  verifyCode(code){
    return this.products.some((product)=> product.code === code );
  }

  addProduct(product) {
    //antes que nada verificamos que el codigo no este repetido en ningun producto
    const codeUsed = this.verifyCode(product.code);
    if(codeUsed) return "El codigo enviado ya esta en uso";

    const id = newId();

    const newProduct = { id, ...product };
    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId){
    const productFound = this.products.find((product)=> product.id === productId );
    if(!productFound) return "Producto no encontrado";

    return productFound;
  }
};

const productManager = new ProductManager();

productManager.addProduct({
  title: "Teclado Mecanico",
  description: "Teclado mecanico inalambrico",
  price: 2000,
  thumbnail: "teclado.jpg",
  code: "Mlkp1241",
  stock: 20
});

productManager.addProduct({
  title: "Mouse Rojo",
  description: "Mouse inalambrico",
  price: 1500,
  thumbnail: "mouse.jpg",
  code: "Plmk1231",
  stock: 5
});

console.table(productManager.getProducts());