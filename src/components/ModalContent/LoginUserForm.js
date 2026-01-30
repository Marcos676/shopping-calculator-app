import { useState } from "react";

export const LoginUserForm = ({
  setIsOpenIn,
  setUserName,
  handleBackValidations,
}) => {
  // autocompleta nombre de session previa
  let storedUser = sessionStorage.getItem("expiredUserData");
  storedUser = storedUser && JSON.parse(storedUser);
  const [name, setName] = useState(storedUser ? storedUser : "");
  storedUser && sessionStorage.removeItem("expiredUserData");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // envía la informacion del formulario al metodo de login
    const formInfo = {
      name,
      password,
    };
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInfo),
          credentials: "include",
        },
      );
      // Maneja la respuesta segun el status de la respuesta
      switch (response.status) {
        // obtiene el nombre de usuario y lo gaurda en estado
        case 200:
          const userData = await response.json();
          setUserName(userData.userName);
          setIsOpenIn("");
          console.log(userData);
          break;
        case 400:
          //Maneja los errores del formulario del servidor
          const formErrors = await response.json();
          console.log("Validaciones del servidor:", formErrors);
          //Manejo de validaciones del servidor
          formErrors.errors.name &&
            handleBackValidations(
              "#name",
              ".error-message-name",
              formErrors.errors.name.msg,
            );
          formErrors.errors.password &&
            handleBackValidations(
              "#password",
              ".error-message-password",
              formErrors.errors.password.msg,
            );

          break;
        case 500:
          //Manejo de mensaje de error en el servidor
          const serverError = await response.json();
          console.log("Error del servidor:", serverError);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log("Error en el fetch de logeo", error);
    }
  };

  return (
    <form className="reset-form-class login-register-form-container">
      <button type="submit" disabled hidden aria-hidden="true"></button>
      <div>
        <label htmlFor="name">Nombre de usuario:</label>
        <input
          id="name"
          type="text"
          value={name}
          onInput={(e) => {
            setName(e.target.value);
            //nameProductValidation(e.target, ".error-message-name");
          }}
        />
        <p className="err-message error-message-name"></p>
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          placeholder=""
          onInput={(e) => {
            setPassword(e.target.value);
            //nameProductValidation(e.target, ".error-message-password");
          }}
        />
        <p className="err-message error-message-password"></p>
      </div>
      <div className="modal-box-btns">
        <button
          className="green-button"
          type="button"
          onClick={() => handleLogin()}
        >
          Ingresar
        </button>
        <button
          className="red-button"
          type="button"
          onClick={() => setIsOpenIn("")}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
