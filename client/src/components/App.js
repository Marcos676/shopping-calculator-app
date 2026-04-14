import { Routes, Route } from "react-router-dom";
import "../styles/App.css";
import { useState, useEffect, useContext } from "react";
// Importa el hook para manejar cookies
import { useCookies } from "react-cookie";

// Importa las páginas y componentes necesarios
import { Header } from "./Header";
import { SidebarShoppingCart } from "./SidebarShoppingCart";
import { UIFeedback } from "./UIFeedback";
import { Modal } from "./Modal";

import { MyTickets } from "../pages/MyTickets";
import { CalculatePrice } from "../pages/CalculatePrice";
import { PrivateRoute } from "./PrivateRoute"; // Componente para proteger rutas privadas, solo accesibles para usuarios logueados

//Contextos
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { ModalContext } from "../contexts/ModalContext";


function App() {
  // Estados de Contexto
  const { setUser } = useContext(UserContext);
  const { cartList, setCartList, quantityProducts, setQuantityProducts } =
    useContext(CartContext);
  const { modalIsOpenIn, setModalIsOpenIn, modalProps, setModalProps } =
    useContext(ModalContext);

  // Seteo de cookie
  const [cookies, setCookies, removeCookie] = useCookies(["cartCookie"]);

  //ESTADOS LOCALES DE APP.JS

  // Estado para controlar si es la primera carga de la aplicación
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Estado de Sidebar
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  //Estado de pantalla completa
  const [fullScreen, setFullScreen] = useState(false);

  // Función para activar o desactivar pantalla completa
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
  };

  /* --------------------------------------------------------------- */

  //Función que actualiza el accessToken y refreshToken, en caso de existir y ejecuta una funcion pasada por parámetro en caso de actualizacion de token exitosa
  const refreshTokenUserCheck = async () => {
    try {
      const response = await fetch(
        (process.env.NODE_ENV === "production" ? "https://" : "http://") +
          process.env.REACT_APP_API_URL +
          "/api/user/session-check",
        {
          method: "POST",
          credentials: "include",
        },
      );
      switch (response.status) {
        case 200: // refresh token válido y actualizacion de tokens. Recupera datos de sesion previa
          const userData = await response.json();
          setUser({name: userData.userName});
          break;
        case 401: // no existe refresh token, no hay sesiones previas
          const error401Data = await response.json();
          console.log("Error 401: ", error401Data);
          break;
        case 403: // refreshToken vencido o error en token, solicitar que se vuelva a iniciar sesion
          const error403Data = await response.json();
          console.log("Error 403: ", error403Data);
          //Guarda el nombre de usaurio en session para autocompletarlo en el form de login
          sessionStorage.setItem(
            "expiredUserData",
            JSON.stringify(error403Data.name),
          );
          handleModalContent("LoginUserForm");
          break;
        default:
          break;
      }
    } catch (error) {
      console.log("Error en el checkeo de token: ", error);
    }
  };

  // En la primera carga de la aplicación, cargar la lista de productos del carrito desde las cookies y validar y refrescar los tokens de autenticación
  if (isFirstLoad) {
    if (typeof cookies["cartCookie"] !== "undefined") {
      setCartList(cookies["cartCookie"].cartList);
    }
    refreshTokenUserCheck();
    setIsFirstLoad(false);
  }

  /* --------------------------------------------------------------- */

  // ----- Funciones útiles

  //Activa overlay para el mensaje de vaciado de carrito exitoso
  function showOverlay(simbol, message) {
    const overlay = document.getElementById("overlayFeedback");
    const iconEl = document.getElementById("overlayIcon");
    const textEl = document.getElementById("overlayText");

    iconEl.textContent = simbol;
    textEl.textContent = message;
    overlay.classList.add("show");

    setTimeout(() => {
      overlay.classList.remove("show");
    }, 2000);
  }

  //Resetea formularios segun query pasada como parametro
  const handleResetForm = (classForm) => {
    document.querySelectorAll(classForm).forEach((form) => {
      form.reset();
    });
  };

  // --------Manejadores
  // Actualiza cantidad de productos en el carrito
  useEffect(() => {
    if (cartList.length !== 0) {
      let totalProducts = cartList.reduce(
        (acc, product) => acc + product.quantity,
        0,
      );
      setQuantityProducts(totalProducts);
    } else {
      setQuantityProducts(0);
    }
  }, [cartList]);

  // ----- CRUD  de productos -----

  const deleteProductCartlist = (id) => {
    const updatedList = cartList.filter((product) => {
      return product.id !== id;
    });
    setCartList(updatedList);
    updatedList.length === 0
      ? removeCookie("cartCookie")
      : setCookies("cartCookie", { cartList: updatedList }, { path: "/" });
  };

  const cleanCartList = (mensaje) => {
    setCartList([]);
    removeCookie("cartCookie");
    showOverlay("✓", mensaje);
  };

  // ----- Maneja la apertura y cierre del carrito -----
  const HandleSideBar = (show) => {
    setIsOpenSidebar(show ? true : false);

    if (isOpenSidebar) {
      document.querySelector(".sidebar-shopping-cart").style.transform =
        "translateX(-100%)";
    } else {
      document.querySelector(".sidebar-shopping-cart").style.transform =
        "translateX(0%)";
    }
  };

  // ----- Maneja el contenido del modal y estructura los datos -----
  /*
   handleModalContent Recibe como parametros:
   - modalContent = string que definira el contenido del modal, se puede apreciar los valores esperados en el Switch del archivo Modal.js
   - action = metodo que podra utilizarse como en un evento onClick
   - paramsAction = parametro para el action si hace falta, debe recibir un array en el cual, dentro se deben poner los parametros a utilizar
   - textContent = Texto dinamico, actualmente utilizado en contenido de modal de Confirm
   - otherRequires = debe recibir un objeto literal con lo que se desea incluir.
   Nota: si no necesitas por ejemplo paramsAction puedes mandar un "" para luego poner textContent, si se requiere
  */
  const handleModalContent = (
    modalContent,
    action,
    paramsAction,
    textContent,
    otherRequires,
  ) => {
    setModalProps({
      methodAction: action,
      arrayParams: paramsAction,
      textContent,
      otherRequires,
    });
    setModalIsOpenIn(modalContent);
  };

  return (
    <div className="App">
      <SidebarShoppingCart
        isOpen={HandleSideBar}
        products={cartList}
        cleanCartList={cleanCartList}
        deleteProductCartlist={deleteProductCartlist}
        handleModalContent={handleModalContent}
        quantityProducts={quantityProducts}
        refreshTokenUserCheck={refreshTokenUserCheck}
        showOverlay={showOverlay}
      />
      <Modal
        isOpenIn={modalIsOpenIn}
        setIsOpenIn={setModalIsOpenIn}
        contentProps={modalProps}
      />
      <UIFeedback />
      {/* Boton de FullScreen */}
      <div className="fullScreen-button" onClick={() => toggleFullScreen()}>
        {fullScreen ? (
          <i className="fa-solid fa-compress"></i>
        ) : (
          <i className="fa-solid fa-expand"></i>
        )}
      </div>
      {/* -------- */}
      <Header
        HandleSideBar={HandleSideBar}
        quantityProducts={quantityProducts}
        handleModalContent={handleModalContent}
        refreshTokenUserCheck={refreshTokenUserCheck}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <CalculatePrice
                cartList={cartList}
                setCartList={setCartList}
                setCookies={setCookies}
                handleResetForm={handleResetForm}
                setModalIsOpenIn={setModalIsOpenIn}
                handleModalContent={handleModalContent}
              />
            }
          />
          <Route element={<PrivateRoute />}>
            <Route
              path="/mis-tickets"
              element={
                <MyTickets
                  handleModalContent={handleModalContent}
                  refreshTokenUserCheck={refreshTokenUserCheck}
                />
              }
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
