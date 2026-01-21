const user = {
  fullname: "Mayco Castillo",
  greet() {
    return `Hola, me llamo ${this.fullname}`;
  }
};

const user2 = {
  fullname: "Nicolas Surbayrole",
  greet(){
    return `Hola, me llamo ${this.fullname}`
  }
};

console.log(user.greet());
console.log(user2.greet());

class User{
  constructor(fullname){
    this.fullname = fullname;
  }

  greet(){
    return `Hola, me llamo ${this.fullname}`;
  }
};

const user3 = new User("Aaron Serrano");
const user4 = new User("Jhonatan Recoba");

console.log(user3.greet());
console.log(user4.greet());