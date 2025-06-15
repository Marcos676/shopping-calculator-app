import "./styles/App.css";
import { useState } from "react";

import { ModalSaveCalc } from "./components/ModalSaveCalc";

function App() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [porcentDiscount, setPorcentDiscount] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveList, setSaveList] = useState([]);

  // ------ Funciones útiles
  
  //Obtiene ID
  const getId = () => {
    if (saveList.length === 0) {
      return 1;
    } else {
      return saveList[saveList.length - 1].id + 1;
    }
  };
  //Obtiene descuento
  const getDiscount = (precio, descuento) => (precio * descuento) / 100;


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
      setFinalPrice(price - getDiscount(price, disc));
    }
  };

  //recibe el nombre, pone los datos en un objeto dentro de un array y cierra el modal
  const HandleSaveList = (name) => {
    setSaveList([
      ...saveList,
      { id: getId(), name, originalPrice, porcentDiscount },
    ]);
    setShowSaveModal(false);
    console.log(saveList);
  };

  return (
    <div className="App">
      <ModalSaveCalc
        isVisible={showSaveModal}
        isNotVisible={setShowSaveModal}
        save={HandleSaveList}
      />

      <header className="App-header">
        <i className="fa-regular fa-bookmark"></i>
        <i className="fas fa-info-circle"></i>
      </header>
      <main>
        <div className="title-description">
          <h2>Calculá tu descuento al instante</h2>
        </div>
        <form className="functional-app">
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
          <button type="button" onClick={() => setShowSaveModal(true)}>
            Guardar
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
