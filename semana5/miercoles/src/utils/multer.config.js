import multer from "multer";

//definir como y donde guardamos el archivo
const storage = multer.diskStorage({
  //donde se guardan los archivos
  destination: (req, file, next) => {
    next(null, "./public/img");
  },
  //que nombre va a tener el archivo
  filename: (req, file, next) => {
    const newFilename = Date.now() + "-" + file.originalname;
    next(null, newFilename);
  }
});

//creamos el middleware
const uploaderMulter = multer({ storage });

export default uploaderMulter;