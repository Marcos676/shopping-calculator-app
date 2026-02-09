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

    //Funcion que maneja la visualizacion de la contraseña
  const showPassword = (inputId, icon) => {
    const input = document.querySelector(inputId)
    if (input.type === "password") {
      input.type = "text";
      icon.classList.replace('fa-eye-slash', 'fa-eye')
      return
    }
    input.type = "password";
    icon.classList.replace('fa-eye', 'fa-eye-slash')
  }

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
          showPassword={showPassword}
        />
      ) : (
        <RegisterUserForm
          setIsOpenIn={setIsOpenIn}
          setUserName={setUserName}
          showPassword={showPassword}
        />
      )}
    </div>
  );
};
