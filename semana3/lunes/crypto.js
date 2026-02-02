import crypto from "crypto";

const secretKey = "miclavesecreta";

class UserManager{
  static #users = [];

  static hashPassword(password){
    const hashedPassword = crypto.createHmac("sha256", secretKey).update(password).digest("hex");
    return hashedPassword;
  }

  static createUser(user) {
    const hashedPassword = this.hashPassword(user.password);

    const newUser = {...user, password: hashedPassword };
    this.#users.push(newUser);
    return "Usuario creado correctamente";
  }

  static showUsers(){
    return this.#users;
  }

  static validateUser(username, password){
    const userFound = this.#users.find((user)=> user.username === username );
    if(!userFound) return "Usuario no encontrado";

    const hashedPassword = this.hashPassword(password);
    if(userFound.password !== hashedPassword) return "Contraseña incorrecta";

    return "Usuario validado correctamente!";
  }
};

console.log( UserManager.createUser({ username: "NicolasDev", password: "Coder1234" }) );
console.log( UserManager.createUser({ username: "Aaron", password: "House5232" }) );
console.table( UserManager.showUsers() );
console.log( UserManager.validateUser("Aaron", "House5233") );
console.log( UserManager.validateUser("Aaron", "House5232") );