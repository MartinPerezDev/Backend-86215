//String
let name = "Jhonatan";

//Number
let id = 1;

//Boolean
let isAdmin = true;

//Null
let user = null;

//Undefined
let data;

//Objetos predefinidos

let date = new Date().toLocaleString();
let fullname = "Walter Morales";
let regexp = /\d/;
console.log(regexp.test(fullname));

function registerUser(num1, num2) {
  return num1 + num2;
};

const loginUser = (num1, num2) => num1 + num2;

class User { };

const userData = {
  name: "",
  lastname: "",
  age: 35
};

const users = [ { name: "" }, { name: "" }, { name: "" } ];