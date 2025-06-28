import "./styles/App.css";
import { useState } from "react";

import { Modal } from "./components/Modal";
import { SidebarShoppingCart } from "./components/SidebarShoppingCart";

import { getDiscount, getFinalPrice } from "./utils/priceCalculation";

function App() {
  // Estados de calculos
  const [originalPrice, setOriginalPrice] = useState("");
  const [porcentDiscount, setPorcentDiscount] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  // Estados de Modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  // Estados de Carrito
  const [cartList, setCartList] = useState([]);
  // Estados de Sidebar
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  // ------ Funciones útiles

  //Obtiene ID
  const getId = () => {
    if (cartList.length === 0) {
      return 1;
    } else {
      return cartList[cartList.length - 1].id + 1;
    }
  };

  //Obtiene descuento
  /*   const getDiscount = (precio, descuento) => (precio * descuento) / 100; */

  //Resetea formularios segun query pasada como parametro
  const handleReset = (classForm) => {
    document.querySelectorAll(classForm).forEach((form) => {
      form.reset();
    });
  };

  // --------Manejadores

  const handleValues = (price, disc) => {
    //Actualizacion de valores
    setOriginalPrice(price);
    setPorcentDiscount(disc);

    //si algun input esta vacío no muestra ningun resultado
    if (price === "" || disc === "") {
      //si un input esta vacío devuelve un string vacío
      setDiscount("");
      setFinalPrice("");
    } else {
      setDiscount(getDiscount(price, disc));
      setFinalPrice(getFinalPrice(price, disc));
    }
  };

  //recibe el nombre, pone los datos en un objeto dentro de un array, limpia los campos y cierra el modal
  const HandleCartList = (name) => {
    setCartList([
      ...cartList,
      { id: getId(), name, originalPrice, porcentDiscount },
    ]);
    handleReset(".reset-form-class");
    setOriginalPrice("");
    setPorcentDiscount("");
    setDiscount("");
    setFinalPrice("");
    setIsOpenModal(false);
  };

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

  return (
    <div className="App">
      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        saveNewProduct={HandleCartList}
      />

      <SidebarShoppingCart isOpen={HandleSideBar} products={cartList} setCartList={setCartList} />

      <header className="App-header">
        <i
          className="fa-solid fa-cart-shopping"
          onClick={() => HandleSideBar(true)}
        ></i>
        <i className="fas fa-info-circle"></i>
      </header>
      <main>
        <div className="title-description">
          <h2>Calculá tu descuento al instante</h2>
        </div>
        <form className="functional-app class-handle-save">
          <div className="inputs-box">
            <label htmlFor="original-price">Precio</label>
            <input
              id="original-price"
              className="original-price"
              type="number"
              min={0}
              placeholder="$"
              onInput={(e) => handleValues(e.target.value, porcentDiscount)}
            />
          </div>
          <div className="inputs-box">
            <label htmlFor="porcent-to-discount">Descuento</label>
            <input
              id="porcent-to-discount"
              className="porcent-to-discount"
              type="number"
              min={0}
              max={100}
              placeholder="%"
              onInput={(e) => handleValues(originalPrice, e.target.value)}
            />
          </div>
          <div>
            <p className="discount">
              <i className="fas fa-arrow-right result-icons"></i>
              Ahorro: $<span className="number-discount">{discount}</span>
            </p>
            <p className="final-price">
              <i className="fa-solid fa-sack-dollar result-icons"></i>
              Precio final: ${finalPrice}
            </p>
          </div>
          <button type="button" onClick={() => setIsOpenModal(true)}>
            Guardar
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
