import "../styles/Header.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import {UserContext} from "../contexts/UserContext"
import { CartContext } from "../contexts/CartContext";

export const Header = ({
  HandleSideBar,
  handleModalContent,
  refreshTokenUserCheck,
}) => {
  const [showMenuUser, setShowMenuUser] = useState(false);

  const {user, setUser} = useContext(UserContext);
  const {quantityProducts} = useContext(CartContext);

  //Función que se encarga del deslogueo del usuario
  const handleLogout = async () => {
    // accede al endpoint de deslogueo
    try {
      const response = await fetch(
        (process.env.NODE_ENV === "production" ? "https://" : "http://") + process.env.REACT_APP_API_URL + "/api/user/logout",
        {
          method: "POST",
          credentials: "include",
        },
      );
      switch (response.status) {
        case 200:
          //el back elimina las cookies con los tokens y aqui elimina el nombre de usuario del estado global
          setShowMenuUser(false);
          setUser({name: ""});
          break;
        case 401:
          // Ejecuta el refresh token con refreshTokenUserCheck y vuelve a ejecutar luego de actualizar los token
          const error401Parsed = await response.json();
          console.log("Error 401 en logout: ", error401Parsed);
          refreshTokenUserCheck();
          handleLogout();
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
        {user.name ? (
          <span
            onClick={() =>
              setShowMenuUser(showMenuUser === true ? false : true)
            }
          >
            {" "}
            {user.name}{" "}
          </span>
        ) : (
          <i
            className="fa-regular fa-circle-user login-user-icon"
            onClick={() => handleModalContent("LoginUserForm")}
          ></i>
        )}
        <nav
          className="user-menu"
          style={{ display: showMenuUser ? "block" : "none" }}
        >
          <ul className="user-menu-list">
            <Link to="/" onClick={() => setShowMenuUser(false)} >
              <li>
                <i className="fa-solid fa-calculator"></i> Calcular
              </li>
            </Link>
            <Link to="/mis-tickets" onClick={() => setShowMenuUser(false)} >
              <i className="fa-solid fa-receipt"></i> Mis tickets
            </Link>
            <li
              onClick={() =>
                handleModalContent(
                  "Confirm",
                  handleLogout,
                  [],
                  "Esta seguro de que quiere cerrar sesion?",
                )
              }
            >
              {" "}
              <i className="fa-solid fa-circle-user"></i> Cerrar sesion
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
