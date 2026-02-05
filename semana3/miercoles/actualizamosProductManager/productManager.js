import { v4 as newId } from "uuid";
import fs from "fs/promises";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  verifyCode(code, products) {
    return products.some((product) => product.code === code);
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      //antes que nada verificamos que el codigo no este repetido en ningun producto
      const codeUsed = this.verifyCode(product.code, products);
      if (codeUsed) return "El codigo enviado ya esta en uso";

      const id = newId();

      const newProduct = { id, ...product };
      products.push(newProduct);

      await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
    } catch (error) {
      throw new Error("No se pudo insertar el producto", error.message);
    }
  }

  async getProducts() {
    try {
      const productJson = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(productJson);

      return products;
    } catch (error) {
      throw new Error("No se pudo leer el archivo", error.message);
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.getProducts();
      const productFound = products.find((product) => product.id === productId);
      if (!productFound) throw new Error("Producto no encontrado");

      return productFound;
    } catch (error) {
      throw new Error("Error al traer un producto por su ID", error.message);
    }
  }
};

const productManager = new ProductManager("./data/products.json");

const main = async () => {
  try {
    await productManager.addProduct({
      title: "Teclado Mecanico",
      description: "Teclado mecanico inalambrico",
      price: 2000,
      thumbnail: "teclado.jpg",
      code: "Mlkp1241",
      stock: 20
    });

    await productManager.addProduct({
      title: "Mouse Rojo",
      description: "Mouse inalambrico",
      price: 1500,
      thumbnail: "mouse.jpg",
      code: "Plmk1231",
      stock: 5
    });
    console.table(await productManager.getProducts());

    console.log( await productManager.getProductById("4e409922-27d6-4fa1-ac53-1de2c5022704") ) 
  } catch (error) {
    console.log(error);
  }
}

main();