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
        <LoginUserForm setIsOpenIn={setIsOpenIn} setUserName={setUserName} />
      ) : (
        <RegisterUserForm setIsOpenIn={setIsOpenIn} setUserName={setUserName} />
      )}
    </div>
  );
};
