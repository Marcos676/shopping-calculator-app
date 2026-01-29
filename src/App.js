import "./styles/App.css";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

import { Modal } from "./components/Modal";
import { SidebarShoppingCart } from "./components/SidebarShoppingCart";

import { handleValues, formatToCurrency } from "./utils/handlerPrices";
import {
  originalPriceValidation,
  porcentDiscountValidation,
  quantityValidation,
} from "./validations/productValidation";

function App() {
  //Estado de usuario
  const [userName, setUserName] = useState("");

  // Estados de calculos
  const [originalPrice, setOriginalPrice] = useState("");
  const [porcentDiscount, setPorcentDiscount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

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

  //  Carga el carrito guardado en la cookie y checkea si el usuario está logueado durante el primer montaje
  useEffect(() => {
    if (typeof cookies["cartCookie"] !== "undefined") {
      setCartList(cookies["cartCookie"].cartList);
    }
    const tokenUserCheck = async () => {
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
    tokenUserCheck();
  }, []);

  // ----- Funciones útiles
  //Obtiene ID de los itrems del carrito
  const getId = () => {
    if (cartList.length === 0) {
      return 1;
    }
    return cartList[cartList.length - 1].id + 1;
  };

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
  //recibe el nombre, pone los datos en un objeto dentro de un array, resetea los campos y cierra el modal
  const addProductCartList = (name) => {
    const updatedList = [
      ...cartList,
      {
        id: getId(),
        name,
        originalPrice,
        porcentDiscount: porcentDiscount === "" ? 0 : porcentDiscount,
        quantity: quantity === "" ? 1 : quantity,
      },
    ];
    setCartList(updatedList);
    setCookies("cartCookie", { cartList: updatedList }, { path: "/" });
    showToast(
      `<i class="fa-solid fa-circle-check"></i> Agregado al <i class="fa-solid fa-cart-shopping"></i>`,
    );

    handleResetForm(".reset-form-class");
    setOriginalPrice("");
    setPorcentDiscount("");
    setQuantity(1);
    setDiscount("");
    setFinalPrice("");
    setModalIsOpenIn("");
  };

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

  const cleanCartList = () => {
    setCartList([]);
    removeCookie("cartCookie");
    showOverlay("✓", "Carrito vaciado!");
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
   modalContent = string que definira el contenido del modal, se puede apreciar los valores esperados en el Switch del archivo Modal.js
   action = metodo que podra utilizarse como en un evento onClick
   paramsAction = parametro para el action si hace falta, debe recibir un array en el cual, dentro se deben poner los parametros a utilizar
   textContent = Texto dinamico, actualmente utilizado en contenido de modal de Confirm
   otherRequires = debe recibir un objeto literal con lo que se desea incluir
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
      <header className="App-header">
        <div
          className="cart-sidebar-button"
          onClick={() => HandleSideBar(true)}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <div className="quantity-products-cart">{quantityProducts}</div>
        </div>
        <div>
          {
            userName ? (<span> {userName} </span>) : (<i
            className="fa-solid fa-circle-user"
            onClick={() => handleModalContent("LoginUserForm", setUserName)}
          ></i>)
          }
          
        </div>
      </header>
      <main>
        <div className="title-description">
          <h2>Calculá tu descuento al instante</h2>
        </div>
        <form className="functional-app reset-form-class">
          <div>
            <label htmlFor="original-price">Precio</label>
            <input
              id="original-price"
              className="original-price"
              type="number"
              min={0}
              placeholder="$"
              onInput={(e) => {
                handleValues(
                  parseFloat(e.target.value),
                  porcentDiscount,
                  quantity,
                  {
                    setOriginalPrice,
                    setPorcentDiscount,
                    setQuantity,
                    setDiscount,
                    setFinalPrice,
                  },
                );
                originalPriceValidation(
                  e.target,
                  ".error-message-original-price",
                );
              }}
            />
            <p className="err-message error-message-original-price"></p>
          </div>
          <div>
            <label htmlFor="porcent-to-discount">Descuento %</label>
            <input
              id="porcent-to-discount"
              className="porcent-to-discount"
              type="number"
              min={0}
              max={100}
              placeholder="0"
              onInput={(e) => {
                handleValues(
                  originalPrice,
                  parseFloat(e.target.value),
                  quantity,
                  {
                    setOriginalPrice,
                    setPorcentDiscount,
                    setQuantity,
                    setDiscount,
                    setFinalPrice,
                  },
                );
                porcentDiscountValidation(
                  e.target,
                  ".error-message-porcent-to-discount",
                );
              }}
            />
            <p className="err-message error-message-porcent-to-discount"></p>
          </div>
          <div>
            <label htmlFor="quantity">Cantidad</label>
            <input
              id="quantity"
              className="original-price"
              type="number"
              min={1}
              placeholder="1"
              onInput={(e) => {
                handleValues(
                  originalPrice,
                  porcentDiscount,
                  parseFloat(e.target.value),
                  {
                    setOriginalPrice,
                    setPorcentDiscount,
                    setQuantity,
                    setDiscount,
                    setFinalPrice,
                  },
                );
                quantityValidation(e.target, ".error-message-quantity");
              }}
            />
            <p className="err-message error-message-quantity"></p>
          </div>
          <div>
            <p className="discount">
              <i className="fas fa-arrow-right result-icons"></i>
              Ahorro:{" "}
              <span className="number-discount">
                {formatToCurrency(discount)}
              </span>
            </p>
            <p className="final-price">
              <i className="fa-solid fa-sack-dollar result-icons"></i>
              Precio final: {formatToCurrency(finalPrice)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              let inputOrigPrice = document.querySelector("#original-price");
              let inputDiscount = document.querySelector(
                "#porcent-to-discount",
              );
              let inputQuantity = document.querySelector("#quantity");
              let passValidation = [
                originalPriceValidation(
                  inputOrigPrice,
                  ".error-message-original-price",
                ),
                porcentDiscountValidation(
                  inputDiscount,
                  ".error-message-porcent-to-discount",
                ),
                quantityValidation(inputQuantity, ".error-message-quantity"),
              ];
              if (!passValidation.includes(false)) {
                handleModalContent("NewProductForm", addProductCartList);
              }
            }}
          >
            Guardar
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
