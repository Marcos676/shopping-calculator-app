import { Routes, Route } from 'react-router-dom';
import "./styles/App.css";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

import { Modal } from "./components/Modal";
import { SidebarShoppingCart } from "./components/SidebarShoppingCart";
import { Header } from "./components/Header";
import { CalculatePrice } from './pages/CalculatePrice';
import { MyTickets } from './pages/MyTickets';

function App() {
  //Estado de usuario
  const [userName, setUserName] = useState("");
  
  // Estado de productos guardados en Carrito
  const [cartList, setCartList] = useState([]);
  const [quantityProducts, setQuantityProducts] = useState(0);

  // Estado de Modal
  const [modalIsOpenIn, setModalIsOpenIn] = useState("");
  const [modalProps, setModalProps] = useState({});

  // Estado de Sidebar
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  // Seteo de cookie
  const [cookies, setCookies, removeCookie] = useCookies(["cartCookie"]);

  //Función que actualiza el accessToken y refreshToken, en caso de existir y ejecuta una funcion pasada por parámetro en caso de actualizacion de token exitosa
  const refreshTokenUserCheck = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "user/session-check",
        {
          method: "POST",
          credentials: "include",
        },
      );
      switch (response.status) {
        case 200: // refresh token válido y actualizacion de tokens. Recupera datos de sesion previa
          const userData = await response.json();
          setUserName(userData.userName);
          break;
        case 401: // no existe refresh token, no hay sesiones previas
          const error401Data = await response.json();
          console.log("Error 401: ", error401Data);
          break;
        case 403: // Token vencido o error en token, solicitar que se vuelva a iniciar sesion
          const error403Data = await response.json();
          console.log("Error 403: ", error403Data);
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

  //  Carga el carrito guardado en la cookie y checkea si el usuario está logueado durante el primer montaje
  useEffect(() => {
    if (typeof cookies["cartCookie"] !== "undefined") {
      setCartList(cookies["cartCookie"].cartList);
    }
    refreshTokenUserCheck();
  }, []);

  // ----- Funciones útiles


  // Mostrar Toast (mensaje de agregado y editado de producto exitoso)
  function showToast(message) {
    const toast = document.querySelector(".toast");

    toast.innerHTML = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

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
  

  const editProductCartList = (updatedData) => {
    updatedData.porcentDiscount =
      updatedData.porcentDiscount === "" ? 0 : updatedData.porcentDiscount;
    updatedData.quantity =
      updatedData.quantity === "" ? 1 : updatedData.quantity;

    const updatedList = cartList.map((product) =>
      product.id === updatedData.id ? updatedData : product,
    );
    setCartList(updatedList);
    setCookies("cartCookie", { cartList: updatedList }, { path: "/" });
    showToast(`<i class="fa-solid fa-circle-check"></i> Producto editado</i>`);

    setModalIsOpenIn("");
  };

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
        editProductCartList={editProductCartList}
        handleModalContent={handleModalContent}
        quantityProducts={quantityProducts}
        showOverlay={showOverlay}
        userName={userName}
        setUserName={setUserName}
        refreshTokenUserCheck={refreshTokenUserCheck}
      />
      <Modal
        isOpenIn={modalIsOpenIn}
        setIsOpenIn={setModalIsOpenIn}
        contentProps={modalProps}
      />
      {/* Toast */}
      <div className="toast"></div>
      {/* -------- */}
      {/* Overlay */}
      <div id="overlayFeedback" className="overlay-feedback">
        <div className="icon" id="overlayIcon"></div>
        <div className="text" id="overlayText"></div>
      </div>
      {/* -------- */}
      <Header
        HandleSideBar={HandleSideBar}
        quantityProducts={quantityProducts}
        handleModalContent={handleModalContent}
        refreshTokenUserCheck={refreshTokenUserCheck}
        userName={userName}
        setUserName={setUserName}
      />
      <main>
        <Routes>
          <Route path="/" element={<CalculatePrice cartList={cartList} setCartList={setCartList} setCookies={setCookies} showToast={showToast} handleResetForm={handleResetForm} setModalIsOpenIn={setModalIsOpenIn} handleModalContent={handleModalContent} />} />
          <Route path="/mis-tickets" element={<MyTickets />} />
        </Routes>
        
      </main>
    </div>
  );
}

export default App;
