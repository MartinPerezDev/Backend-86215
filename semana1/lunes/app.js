const alumns = [];

function addStudent(name) {
  if (/\d/.test(name)) {
    console.error(`Error: el nombre ${name} no es valido`);
    return;
  }

  const id = alumns.length + 1;
  alumns.push({ id, name });
  console.log(`Alumno ${name} fue agregado correctamente con ID ${id}`);
};

function show(){
  if(alumns.length === 0){
    console.error("No hay alumnos registrados!");
    return;
  }

  console.log("Lista de alumnos:");
  alumns.forEach( (student) => {
    console.log(`ID: ${student.id}, NOMBRE: ${student.name}`);
  });
};

function deleteStudentById(id){
  const index = alumns.findIndex( (student) => student.id === id );
  if(index === -1){
    console.error(`Error: No se encontro ningun alumno con ID ${id}`);
    return;
  }

  const deletedStudent = alumns.splice(index, 1)[0];
  console.log(`Alumno ${deletedStudent.name} fue eliminado con exito!`);
};

show();
addStudent("Jhonatan");
addStudent("Lucas");
addStudent("Mayco");
deleteStudentById(5);
deleteStudentById(2);
show();