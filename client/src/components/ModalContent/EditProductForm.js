import { useState } from "react";
import {
  handleValues,
  getDiscount,
  getFinalPrice,
  formatToCurrency,
} from "../../utils/handlerPrices";
import {
  nameProductValidation,
  originalPriceValidation,
  porcentDiscountValidation,
  quantityValidation,
} from "../../validations/productValidation";

export const EditProductForm = ({
  setIsOpenIn,
  editProductCartList,
  utils,
}) => {
  const { product } = utils;
  const [name, setName] = useState(product.name);
  const [originalPrice, setOriginalPrice] = useState(product.originalPrice);
  const [porcentDiscount, setPorcentDiscount] = useState(
    product.porcentDiscount
  );
  const [quantity, setQuantity] = useState(product.quantity);
  const [discount, setDiscount] = useState(
    getDiscount(
      product.originalPrice,
      product.porcentDiscount,
      product.quantity
    )
  );
  const [finalPrice, setFinalPrice] = useState(
    getFinalPrice(
      product.originalPrice,
      product.porcentDiscount,
      product.quantity
    )
  );

  return (
    <form className="reset-form-class">
      <button type="submit" disabled hidden aria-hidden="true"></button>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          id="name"
          type="text"
          placeholder="Ej: Galletita, Arroz, Banana..."
          value={name}
          onInput={(e) => {
            setName(e.target.value);
            nameProductValidation(e.target, ".error-message-name");
          }}
        />
        <p className="err-message error-message-name"></p>
      </div>
      <div>
        <label htmlFor="original-price">Precio</label>
        <input
          id="original-price"
          className="original-price"
          type="number"
          min={0}
          placeholder="$"
          value={originalPrice}
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
              }
            );
            originalPriceValidation(e.target, ".error-message-original-price");
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
          value={porcentDiscount}
          onInput={(e) => {
            handleValues(originalPrice, parseFloat(e.target.value), quantity, {
              setOriginalPrice,
              setPorcentDiscount,
              setQuantity,
              setDiscount,
              setFinalPrice,
            });
            porcentDiscountValidation(
              e.target,
              ".error-message-porcent-to-discount"
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
          value={quantity}
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
              }
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
          <span className="number-discount">{formatToCurrency(discount)}</span>
        </p>
        <p className="final-price">
          <i className="fa-solid fa-sack-dollar result-icons"></i>
          Precio final: {formatToCurrency(finalPrice)}
        </p>
      </div>
      <div className="modal-box-btns">
        <button
          className="green-button"
          type="button"
          onClick={() => {
            let inputName = document.querySelector("#name");
            let inputOrigPrice = document.querySelector("#original-price");
            let inputDiscount = document.querySelector("#porcent-to-discount");
            let inputQuantity = document.querySelector("#quantity");
            let passValidation = [
              nameProductValidation(inputName, ".error-message-name"),
              originalPriceValidation(
                inputOrigPrice,
                ".error-message-original-price"
              ),
              porcentDiscountValidation(
                inputDiscount,
                ".error-message-porcent-to-discount"
              ),
              quantityValidation(inputQuantity, ".error-message-quantity"),
            ];
            if (!passValidation.includes(false)) {
              editProductCartList({
              id: product.id,
              name,
              originalPrice,
              porcentDiscount,
              quantity,
            });
            }
          }}
        >
          Guardar
        </button>
        <button
          className="red-button"
          type="button"
          onClick={() => setIsOpenIn("")}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
