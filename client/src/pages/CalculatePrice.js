import { useState } from "react";

import { handleValues, formatToCurrency } from "../utils/handlerPrices";
import {
  originalPriceValidation,
  porcentDiscountValidation,
  quantityValidation,
  nameProductValidation,
} from "../validations/productValidation";

export const CalculatePrice = ({cartList, setCartList, setCookies, showToast, handleResetForm, setModalIsOpenIn, handleModalContent}) => {
  // Estados de calculos
  const [originalPrice, setOriginalPrice] = useState("");
  const [porcentDiscount, setPorcentDiscount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  //recibe el nombre, pone los datos en un objeto dentro de un array, resetea los campos y cierra el modal
  const addProductCartList = (name) => {
    // crea una nueva lista actualizada
    const updatedList = [
      ...cartList,
      {
        id: cartList.length === 0 ? 1 : cartList[cartList.length - 1].id + 1,
        name,
        originalPrice,
        porcentDiscount: porcentDiscount === "" ? 0 : porcentDiscount,
        quantity: quantity === "" ? 1 : quantity,
      },
    ];
    //Remueve la clase isValid de los inputs
    let inputs = ["#original-price", "#porcent-to-discount", "#quantity"];
    inputs.forEach((idInput) => {
      document.querySelector(idInput).classList.remove("isValid");
    });
    //Guarda la nueva lista actualizada en el estado y la cookie
    setCartList(updatedList);
    setCookies("cartCookie", { cartList: updatedList }, { path: "/" });
    // Muestra el toast con el mensaje de producto guardado
    showToast(
      `<i class="fa-solid fa-circle-check"></i> Agregado al <i class="fa-solid fa-cart-shopping"></i>`,
    );
// Resetea el formulario y los estados
    handleResetForm(".reset-form-class");
    setOriginalPrice("");
    setPorcentDiscount("");
    setQuantity(1);
    setDiscount("");
    setFinalPrice("");
  };

  return (
    <>
      <div className="title-description">
        <h2>Calculá tu compra</h2>
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
            let inputDiscount = document.querySelector("#porcent-to-discount");
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
              handleModalContent(
                "NameForm",
                addProductCartList,
                "",
                "Nombre del producto:",
                { inputValidation: nameProductValidation },
              );
            }
          }}
        >
          Nombrar
        </button>
      </form>
    </>
  );
};
