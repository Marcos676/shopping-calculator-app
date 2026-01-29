import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User, Ticket } from "../database/models/index.js";
import { validationResult } from "express-validator";

const userList = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "password"],
      include: [
        {
          model: Ticket,
          as: "tickets",
          attributes: ["id", "name", "product_list"],
        },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const userNameCheck = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["name"],
      where: { name: req.params.userName },
    });
    // Si no encuentra ningun usuario devuelve null

    res.status(200).json({ ok: true, finded: response ? true : false });
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    res.status(500).json({ error: "Error al buscar usuario" });
  }
};

const sessionCheck = async (req, res) => {
  // se ejecutara al recargar la pagina o al expirarse el accessToken
  const oldRefreshToken = req.signedCookies["refreshToken"];

  if (!oldRefreshToken)
    return res.status(401).json({ error: "No existe un token" }); // No existe un refresh token

  try {
    const {iat, exp, ...userData} = jwt.verify(
      oldRefreshToken,
      process.env.JWT_SECRET_KEY,
    );
    //Crea nuevos tokens y los envia por cookies seguras y envia el nombre de usuario en respuesta
    const accessToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    const newRefreshToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 60 * 60 * 1000, // 1 hora
      httpOnly: true, // Impide acceso desde JavaScript
      secure: process.env.NODE_ENV === "production", // Solo se envía vía HTTPS
      sameSite: "strict", // Protege contra CSRF
      signed: true, // Habilita firma de cookie
    });

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
        httpOnly: true, // Impide acceso desde JavaScript
        secure: process.env.NODE_ENV === "production", // Solo se envía vía HTTPS
        sameSite: "strict", // Protege contra CSRF
        signed: true, // Habilita firma de cookie
      })
      .json({
        userName: userData.name,
      });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const userData = jwt.decode(oldRefreshToken);
      return res
        .status(403)
        .json({ error: "Token expiró", name: userData.name }); //token expirado, pedir al usuario que vuelva a loguearse
    }
    return res
      .status(401)
      .json({ error: "Token inválido", message: error.message }); //token invalido
  }
};

const createUser = async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({
      errors: validationResult(req).mapped(),
    });
  }
  let body = req.body;
  try {
    const passwordHash = await argon2.hash(body.password);
    const { id, name, email } = await User.create({
      name: body.name.trim(),
      email: body.email.trim(),
      password: passwordHash,
    });
    let user = { id, name, email };
    const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 60 * 60 * 1000, // 1 hora
      httpOnly: true, // Impide acceso desde JavaScript
      secure: process.env.NODE_ENV === "production", // Solo se envía vía HTTPS
      sameSite: "strict", // Protege contra CSRF
      signed: true, // Habilita firma de cookie
    });

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
        httpOnly: true, // Impide acceso desde JavaScript
        secure: process.env.NODE_ENV === "production", // Solo se envía vía HTTPS
        sameSite: "strict", // Protege contra CSRF
        signed: true, // Habilita firma de cookie
      })
      .json({
        userName: name,
      });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

const loginUser = async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({
      errors: validationResult(req).mapped(),
    });
  }

  let body = req.body;
  try {
    const { id, name, email } = await User.findOne({
      where: {
        name: body.name.trim(),
      },
    });
    let user = { id, name, email };
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "12h",
    });
    return res.status(200).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al encontrar el usuario" });
  }
};

export { userList, createUser, loginUser, userNameCheck, sessionCheck };
