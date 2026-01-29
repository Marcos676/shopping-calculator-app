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

const sessionCheck = async (req, res) => { // se ejecutara al recargar la pagina o al expirarse el accessToken
//  busca el refresh token 
  const oldRefreshToken = req.signedCookies["refreshToken"];
// Envia un status 401 si no existe
  if (!oldRefreshToken)
    return res.status(401).json({ error: "No existe un token" }); // No existe un refresh token
// Verifica el refresh token
  try {
    const { iat, exp, ...userData } = jwt.verify(
      oldRefreshToken,
      process.env.JWT_SECRET_KEY,
    );
    //Crea nuevos tokens y los envia por cookies seguras junto con el nombre de usuario en respuesta
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
    //Si el token expiró, decodifica el token, envia un status 403 junto con el nombre de usuario para completar el formulario de inicio de sesion
    if (error.name === "TokenExpiredError") {
      const userData = jwt.decode(oldRefreshToken);
      return res
        .status(403)
        .json({ error: "Token expiró", name: userData.name }); //token expirado, pedir al usuario que vuelva a loguearse
    }
    //Si hay algun otro tipo de error con la verificacion del token envia un status 401 con el tipo de error
    return res
      .status(401)
      .json({ error: "Token inválido", message: error.message }); //token invalido
  }
};

const createUser = async (req, res) => {
  // Envio de errores de validaciones
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({
      errors: validationResult(req).mapped(),
    });
  }
  let body = req.body;
  try {
    // Hashea contraseña
    const passwordHash = await argon2.hash(body.password);
    // Crea usuario
    const { id, name, email } = await User.create({
      name: body.name.trim(),
      email: body.email.trim(),
      password: passwordHash,
    });
    let user = { id, name, email };
    //Crea tokens
    const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    // Envia tokens en cookies seguras yg envia el nombre de usuario
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
  // Envio de errores de validaciones
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({
      errors: validationResult(req).mapped(),
    });
  }
  // Busca datos de usuario
  try {
    const { id, name, email } = await User.findOne({
      where: {
        name: req.body.name.trim(),
      },
    });
    let user = { id, name, email };
    // Crea tokens
    const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    //Envía tokens en cookie segura y envia el nombre de usuario
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
    //Envia un error si hay algun error en la busqueda en la db
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al encontrar el usuario" });
  }
};

export { userList, createUser, loginUser, userNameCheck, sessionCheck };
