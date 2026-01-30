import { useState } from "react";
import {
  nameValidation,
  emailValidation,
  passwordValidator,
  confirmPasswordValidator,
} from "../../validations/registerUserValidation";

export const RegisterUserForm = ({ setIsOpenIn, setUserName }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleBackValidations = (inputId, boxErrorClass, msg) => {
    const input = document.querySelector(inputId);
    const boxError = document.querySelector(boxErrorClass);
    input.classList.remove("isValid");
    input.classList.add("isInvalid");
    boxError.textContent = msg;
  };

  const handleRegister = async () => {
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

    if (testValidations.includes(false)) {
      return
    }

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
          credentials: 'include'
        },
      );
      switch (response.status) {
        case 200:
          //Guarda datos de usuario en estado
          const userData = await response.json();
          setUserName(userData.userName);
          setIsOpenIn("")
          break;
        case 400:
          const formErrors = await response.json();
          console.log("Form data submitted with errors:", formErrors);
          //Manejo de validaciones del servidor
          formErrors.errors.name &&
            handleBackValidations(
              "#name",
              ".error-message-name",
              formErrors.errors.name.msg,
            );
          formErrors.errors.email &&
            handleBackValidations(
              "#email",
              ".error-message-email",
              formErrors.errors.email.msg,
            );
          formErrors.errors.password &&
            handleBackValidations(
              "#password",
              ".error-message-password",
              formErrors.errors.password.msg,
            );
          formErrors.errors.confirm &&
            handleBackValidations(
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

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error("Error:", error);
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
      <div>
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
      <div>
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
