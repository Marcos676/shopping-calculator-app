import { useState } from "react";
import {
  nameValidation,
  emailValidation,
  passwordValidator,
  confirmPasswordValidator,
} from "../../validations/registerUserValidation";

import { handleServerValidations } from "../../utils/handleServerValidations"

export const RegisterUserForm = ({
  setIsOpenIn,
  setUserName,
  showPassword,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    //Checkea validacioses del front en cada input
    let testValidations = [
      nameValidation(document.querySelector("#name"), ".error-message-name"),
      emailValidation(document.querySelector("#email"), ".error-message-email"),
      passwordValidator(
        document.querySelector("#password"),
        ".error-message-password",
      ),
      confirmPasswordValidator(
        document.querySelector("#confirmPassword"),
        password,
        ".error-message-confirm-password",
      ),
    ];
    //Si existe alguna finaliza la funcion
    if (testValidations.includes(false)) {
      return;
    }
    //ordena los datos y los envia al endpoint
    let formInfo = {
      name,
      email,
      password,
      confirm: confirmPassword,
    };
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "user/register",
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
        case 200:
          //Guarda datos de usuario en estado
          const userData = await response.json();
          setUserName(userData.userName);
          setIsOpenIn("");
          break;
        case 400:
          const formErrors = await response.json();
          //Manejo de validaciones del servidor
          formErrors.errors.name &&
            handleServerValidations(
              "#name",
              ".error-message-name",
              formErrors.errors.name.msg,
            );
          formErrors.errors.email &&
            handleServerValidations(
              "#email",
              ".error-message-email",
              formErrors.errors.email.msg,
            );
          formErrors.errors.password &&
            handleServerValidations(
              "#password",
              ".error-message-password",
              formErrors.errors.password.msg,
            );
          formErrors.errors.confirm &&
            handleServerValidations(
              "#confirmPassword",
              ".error-message-confirm-password",
              formErrors.errors.confirm.msg,
            );
          break;
        case 500:
          const serverError = await response.json();
          //Manejo de mensaje de error en el servidor
          console.log("Error del servidor:", serverError);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error del servidor:", error);
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
          placeholder=""
          onInput={(e) => {
            setName(e.target.value);
            nameValidation(e.target, ".error-message-name");
          }}
          onFocus={(e) => {
            nameValidation(e.target, ".error-message-name");
          }}
        />
        <p className="err-message error-message-name"></p>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder=""
          onInput={(e) => {
            setEmail(e.target.value);
            emailValidation(e.target, ".error-message-email");
          }}
          onFocus={(e) => {
            emailValidation(e.target, ".error-message-email");
          }}
        />
        <p className="err-message error-message-email"></p>
      </div>
      <div className="field-password">
        <i className="fa-regular fa-eye-slash" onClick={ (e) => showPassword("#password", e.target) }></i>
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          placeholder=""
          onInput={(e) => {
            setPassword(e.target.value);
            passwordValidator(e.target, ".error-message-password");
          }}
          onFocus={(e) => {
            passwordValidator(e.target, ".error-message-password");
          }}
        />
        <p className="err-message error-message-password"></p>
      </div>
      <div className="field-password">
        <i className="fa-regular fa-eye-slash" onClick={ (e) => showPassword("#confirmPassword", e.target) }></i>
        <label htmlFor="confirmPassword">Repita la contraseña:</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder=""
          onInput={(e) => {
            setConfirmPassword(e.target.value);
            confirmPasswordValidator(
              e.target,
              password,
              ".error-message-confirm-password",
            );
          }}
          onFocus={(e) => {
            confirmPasswordValidator(
              e.target,
              password,
              ".error-message-confirm-password",
            );
          }}
        />
        <p className="err-message error-message-confirm-password"></p>
      </div>

      <div className="modal-box-btns">
        <button
          className="green-button"
          type="button"
          onClick={() => {
            handleRegister();
          }}
        >
          Registrarse
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
