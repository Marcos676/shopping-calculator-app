import { useState } from "react";

export const RegisterUserForm = ({ setIsOpenIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    let formInfo = {
      name,
      email,
      password,
      confirm: confirmPassword,
    };
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInfo),
        },
      );
      switch (response.status) {
        case 200:
          const userData = await response.json();
          console.log("Form data submitted:", userData);
          //Manejar guardado de datos de usuario en cookie o sesion, reseteo del formulario y cierre de modal
          break;
        case 400:
          const formErrors = await response.json();
          console.log("Form data submitted with errors:", formErrors);
          //Manejo de errores en el formulario
          
          break;
        case 500:
          const serverError = await response.json();
          console.log("Server error:", serverError);
          //Manejo de mensaje de error en el servidor
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
            //nameProductValidation(e.target, ".error-message-name");
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
            //nameProductValidation(e.target, ".error-message-email");
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
            //nameProductValidation(e.target, ".error-message-password");
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
            //nameProductValidation(e.target, ".error-message-confirm-password");
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
