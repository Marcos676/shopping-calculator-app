import { useState, useEffect } from "react";
import { LoginUserForm } from "./LoginUserForm";
import { RegisterUserForm } from "./RegisterUserForm";

export const LoginRegisterUser = ({ setIsOpenIn }) => {
  const [showForm, setShowForm] = useState("login");
  let content;
  useEffect(() => {
    if (showForm === "login") {
      content = (<LoginUserForm />)
    } else {
      content = (<RegisterUserForm />)
    }
  }, [showForm]);

  return (
    <div className="login-register-user-container">
      <div className="btn-container">
        <div className="btn">Iniciar sesión</div>
        <div className="btn">Registrarse</div>
      </div>
      {content}
    </div>
  );
};
