import { useState } from "react";

export const LoginUserForm = ({ setIsOpenIn }) => {
    // autocompleta nombre de session previa
  let storedUser = sessionStorage.getItem("expiredUserData");
  storedUser = storedUser && JSON.parse(storedUser);
  const [name, setName] = useState(storedUser ? storedUser : "");
  storedUser && sessionStorage.removeItem("expiredUserData");
  
  const [password, setPassword] = useState("");



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
        <button className="green-button" type="button" onClick={() => {}}>
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
