import { useState, useRef } from "react";
import { LoginUserForm } from "./LoginUserForm";
import { RegisterUserForm } from "./RegisterUserForm";

export const LoginRegisterUser = ({ setIsOpenIn, setUserName }) => {
  const [showForm, setShowForm] = useState("login");
  const btnloginRef = useRef(null);
  const btnRegisterRef = useRef(null);

  const handleShowForm = (form) => {
    setShowForm(form);
    if (form === "login") {
      btnloginRef.current.style.backgroundColor = "#fff3b0";
      btnRegisterRef.current.style.backgroundColor = "#fffefa";
    } else {
      btnRegisterRef.current.style.backgroundColor = "#fff3b0";
      btnloginRef.current.style.backgroundColor = "#fffefa";
    }
  };
  /*  funcion que recibe:
  inputId: string del id del input que se desea capturar (#id-input)
  boxErrorClass: string de la clase de la caja que contendra el mensaje de error (.ejemplo-caja)
  msg: Mensaje del error que mostrará la caja
 */
  const handleBackValidations = (inputId, boxErrorClass, msg) => {
    const input = document.querySelector(inputId);
    const boxError = document.querySelector(boxErrorClass);
    input.classList.remove("isValid");
    input.classList.add("isInvalid");
    boxError.textContent = msg;
  };

  return (
    <div className="login-register-user-container">
      <div className="btn-container">
        <div
          className="btn btn-r"
          ref={btnloginRef}
          onClick={() => handleShowForm("login")}
        >
          Iniciar sesión
        </div>
        <div
          className="btn btn-l"
          ref={btnRegisterRef}
          onClick={() => handleShowForm("register")}
        >
          Registrarse
        </div>
      </div>
      {showForm === "login" ? (
        <LoginUserForm
          setIsOpenIn={setIsOpenIn}
          setUserName={setUserName}
          handleBackValidations={handleBackValidations}
        />
      ) : (
        <RegisterUserForm
          setIsOpenIn={setIsOpenIn}
          setUserName={setUserName}
          handleBackValidations={handleBackValidations}
        />
      )}
    </div>
  );
};
