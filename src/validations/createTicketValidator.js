import { check, body } from "express-validator";

const validations = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Se requiere un nombre para la lista"),
  body("name")
    .custom((value) => value.trim().length < 31)
    .withMessage("Solo puede tener hasta 30 caracteres"), //Menos de 30 caracteres
  check("productList").notEmpty().withMessage("La lista no puede estar vacía"),
];

export default validations;
