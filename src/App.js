import "./styles/App.css";
import { useState, useEffect } from "react";

import { Modal } from "./components/Modal";
import { SidebarShoppingCart } from "./components/SidebarShoppingCart";

import { getDiscount, getFinalPrice } from "./utils/priceCalculation";

function App() {
  // Estados de calculos
  const [originalPrice, setOriginalPrice] = useState("");
  const [porcentDiscount, setPorcentDiscount] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  // Estado de Modal
  const [modalIsOpenIn, setModalIsOpenIn] = useState("");
  const [modalProps, setModalProps] = useState({});
  // Estado de productos guardados en Carrito
  const [cartList, setCartList] = useState([]);
  const [quantityProducts, setQuantityProducts] = useState(0);
  // Estado de Sidebar
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

  //Resetea formularios segun query pasada como parametro
  const handleReset = (classForm) => {
    document.querySelectorAll(classForm).forEach((form) => {
      form.reset();
    });
  };

  // --------Manejadores

  const handleValues = (price, disc, quant) => {
    //Actualizacion de valores
    quant = quant === "" ? 1 : quant;
    setOriginalPrice(price);
    setPorcentDiscount(disc);
    setQuantity(quant);
    
    //si algun input esta vacío no muestra ningun resultado
    if (price === "" || quant === 0 || Number.isNaN(quant)) {
      //si un input esta vacío devuelve un string vacío
      setDiscount("");
      setFinalPrice("");
    } else {
      setDiscount(getDiscount(price, disc, quant));
      setFinalPrice(getFinalPrice(price, disc, quant));
    }
  };

  useEffect(() => {
    if (cartList.length !== 0) {
      let totalProducts = cartList.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      setQuantityProducts(totalProducts);
    } else {
      setQuantityProducts(0);
    }
  }, [cartList]);

  //recibe el nombre, pone los datos en un objeto dentro de un array, resetea los campos y cierra el modal
  const addProductCartList = (name) => {
    setCartList([
      ...cartList,
      { id: getId(), name, originalPrice, porcentDiscount, quantity },
    ]);
    handleReset(".reset-form-class");
    setOriginalPrice("");
    setPorcentDiscount("");
    setDiscount("");
    setFinalPrice("");
    setQuantity(1);
    setModalIsOpenIn("");
  };

  const deleteProductCartlist = (id) => {
    let updatedList = cartList.filter((product) => {
      return product.id !== id;
    });
    setCartList(updatedList);
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

  /*
   handleModalContent Recibe como parametros:
   modalContent = string que definira el contenido del modal
   action = metodo que podra utilizarse como en un evento onClick
   paramsAction = parametro para el action si hace falta
   textContent = Texto dinamico, actualmente utilizado en contenido de modal de Confirm
  */
  const handleModalContent = (
    modalContent,
    action,
    paramsAction,
    textContent
  ) => {
    setModalProps({
      methodAction: action,
      arrayParams: [paramsAction],
      textContent,
    });
    setModalIsOpenIn(modalContent);
  };

  return (
    <div className="App">
      <SidebarShoppingCart
        isOpen={HandleSideBar}
        products={cartList}
        setCartList={setCartList}
        deleteProductCartlist={deleteProductCartlist}
        handleModalContent={handleModalContent}
        quantityProducts={quantityProducts}
      />
      <Modal
        isOpenIn={modalIsOpenIn}
        setIsOpenIn={setModalIsOpenIn}
        contentProps={modalProps}
      />

      <header className="App-header">
        <div
          className="cart-sidebar-button"
          onClick={() => HandleSideBar(true)}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <div className="quantity-products-cart">{quantityProducts}</div>
        </div>

        <i className="fas fa-info-circle"></i>
      </header>
      <main>
        <div className="title-description">
          <h2>Calculá tu descuento al instante</h2>
        </div>
        <form className="functional-app reset-form-class">
          <div className="inputs-box">
            <label htmlFor="original-price">Precio</label>
            <input
              id="original-price"
              className="original-price"
              type="number"
              min={0}
              placeholder="$"
              onInput={(e) =>
                handleValues(
                  parseFloat(e.target.value),
                  porcentDiscount,
                  quantity
                )
              }
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
              onInput={(e) =>
                handleValues(
                  originalPrice,
                  parseFloat(e.target.value),
                  quantity
                )
              }
            />
          </div>
          <div className="inputs-box">
            <label htmlFor="quantity">Cantidad</label>
            <input
              id="quantity"
              className="original-price"
              type="number"
              min={1}
              placeholder="Unidades"
              onInput={(e) =>
                handleValues(
                  originalPrice,
                  porcentDiscount,
                  parseFloat(e.target.value)
                )
              }
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
          <button
            type="button"
            onClick={() =>
              handleModalContent("NewProductForm", addProductCartList)
            }
          >
            Guardar
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
