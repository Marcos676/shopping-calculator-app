import { check, body } from "express-validator";

const validations = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Se requiere un nombre"),
  body("name")
    .custom((value) => value.trim().length < 31)
    .withMessage("Debe tener hasta 30 caracteres"), //Menos de 30 caracteres
  body("productList").custom((value) => value.length !== 0).withMessage("No se puede guardar un carrito vacío"),
];

export default validations;
