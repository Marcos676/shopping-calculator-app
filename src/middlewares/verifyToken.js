import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  //  Busca los tokens
  const accessToken = req.signedCookies["accessToken"];

  // Envia un status 403 si no existe un refresh Token
  if (!accessToken)
    return res.status(401).json({ error: "No existe access token" });

  try {
    // Verifica el access token
    const { iat, exp, ...userData } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY,
    );
    //envía los datos del usuario por req
    req.user = userData;
    next();
  } catch (error) {
    //Si el token expiró, envía un status 401
    if (error.name === "TokenExpiredError")
      return res.status(401).json({ error: "El accessToken expiró" });
    //Si hay algun otro tipo de error con la verificacion del token envia un status 401 con el tipo de error
    return res
      .status(403)
      .json({ error: "Token inválido", message: error.message }); //token invalido
  }
};

export default verifyToken;
