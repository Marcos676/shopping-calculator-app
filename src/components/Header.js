import "../styles/Header.css";
import { useState } from "react";

export const Header = ({
  HandleSideBar,
  quantityProducts,
  handleModalContent,
  refreshTokenUserCheck,
  userName,
  setUserName,
}) => {
  const [showMenuUser, setShowMenuUser] = useState(false);

  //Función que se encarga del deslogueo del usuario
  const handleLogout = async () => {
    // accede al endpoint de deslogueo
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "user/logout",
        {
          method: "POST",
          credentials: "include",
        },
      );
      switch (response.status) {
        case 200:
          //el back elimina las cookies con los tokens y aqui elimina el nombre de usuario del estado
          const responseParsed = await response.json();
          console.log(responseParsed);
          setShowMenuUser(false);
          setUserName("");
          break;
        case 401:
          // Ejecuta el refresh token con refreshTokenUserCheck pasandole esta funcion para que va luevva a ejecutar luego de actualizar los token
          const error401Parsed = await response.json();
          console.log("Error 401 en logout: ", error401Parsed);
          refreshTokenUserCheck(handleLogout);
          break;
        case 403:
          const error403Parsed = await response.json();
          console.log("Error 403 en logout: ", error403Parsed);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log("Error en logout", error);
    }
  };

  return (
    <header className="App-header">
      <div className="cart-sidebar-button" onClick={() => HandleSideBar(true)}>
        <i className="fa-solid fa-cart-shopping"></i>
        <div className="quantity-products-cart">{quantityProducts}</div>
      </div>

      <div className="user-button">
        {userName ? (
          <span
            onClick={() =>
              setShowMenuUser(showMenuUser === true ? false : true)
            }
          >
            {" "}
            {userName}{" "}
          </span>
        ) : (
          <i
            className="fa-regular fa-circle-user login-user-icon"
            onClick={() => handleModalContent("LoginUserForm", setUserName)}
          ></i>
        )}
        <ul
          className="user-menu"
          style={{ display: showMenuUser ? "flex" : "none" }}
        >
          <li>
            <i className="fa-solid fa-receipt"></i> Mis tickets
          </li>
          <li
            onClick={() => handleModalContent(
              "Confirm",
              handleLogout,
              [],
              "Esta seguro de que quiere cerrar sesion?",
            )}
          >
            {" "}
            <i className="fa-solid fa-circle-user"></i> Cerrar sesion
          </li>
        </ul>
      </div>
    </header>
  );
};
