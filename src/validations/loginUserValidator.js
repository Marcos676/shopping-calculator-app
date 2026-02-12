import argon2 from 'argon2';
import models from "../database/models/index.cjs";
const { User } = models;
import { check, body } from "express-validator";

const validations = [
  check("name").trim().notEmpty().withMessage("Ingrese su nombre de usuario"),
  body("name")
    .custom(async (value) => {
      const user = await User.findOne({ where: { name: value.trim() } });
      if (!user) {
        throw new Error("Error en la busqueda de usuario");
      }
    })
    .withMessage("El nombre de usuario no existe"),
  check("password").trim().notEmpty().withMessage("Ingrese su contraseña"),
  body("password")
    .custom(async (value, {req}) => {
      const user = await User.findOne({ where: { name: req.body.name.trim() } });

      if (!(await argon2.verify(user.password, value))) {
        throw new Error("Error en la busqueda de usuario");
      }
    })
    .withMessage("Contraseña incorrecta")
];

export default validations;
