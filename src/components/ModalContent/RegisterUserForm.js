import { useState } from "react";



export const RegisterUserForm = ({ setIsOpenIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <form className="reset-form-class">
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
