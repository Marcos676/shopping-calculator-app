import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User, Ticket } from "../database/models/index.js";
import { validationResult } from "express-validator";

function sendError(valError, res) {
  let errors = valError;
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.mapped(),
    });
  }
}

const userList = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "password"],
      include: [
        {
          model: Ticket,
          as: "tickets",
          attributes: [
            "id",
            "name",
            "product_list",
          ],
        },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const createUser = async (req, res) => {
  sendError(validationResult(req), res);

  let body = req.body;
  try {
    const passwordHash = await argon2.hash(body.password);
    const { id, name, email } = await User.create({
      name: body.name.trim(),
      email: body.email.trim(),
      password: passwordHash,
    });
    let user = { id, name, email };
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "12h" });
    return res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

const loginUser = async (req, res) => {
  sendError(validationResult(req), res);

  let body = req.body;
  try {
    const { id, name, email } = await User.findOne({
      where: {
        name: body.name.trim(),
      },
    });
    let user = { id, name, email };
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "12h" });    
    return res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al encontrar el usuario" });
  }
};

export { userList, createUser, loginUser };
