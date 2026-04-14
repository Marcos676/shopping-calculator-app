import { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { CartContext } from "../../contexts/CartContext";
import { ModalContext } from "../../contexts/ModalContext";
// importa funciones para manejar calculos de precios y validaciones de campos
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
// Importa función para mostrar notificaciones
import { showToast } from "../../utils/notifications";

export const EditProductForm = ({ product }) => {

  const { cartList, setCartList } = useContext(CartContext);
  const { setModalIsOpenIn } = useContext(ModalContext);
  const [cookies, setCookies] = useCookies(["cartCookie"]);

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

  const editProductCartList = (updatedData) => {
    // Si el campo de descuento o cantidad queda vacio, se asigna un valor por defecto para evitar errores en los calculos
    updatedData.porcentDiscount =
      updatedData.porcentDiscount === "" ? 0 : updatedData.porcentDiscount;
    updatedData.quantity =
      updatedData.quantity === "" ? 1 : updatedData.quantity;
    // Actualiza la lista de productos del carrito con los nuevos datos editados
    const updatedList = cartList.map((product) =>
      product.id === updatedData.id ? updatedData : product,
    );
    // Actualiza el estado del carrito, la cookie y muestra el mensaje de producto editado exitosamente
    setCartList(updatedList);
    setCookies("cartCookie", { cartList: updatedList }, { path: "/" });
    showToast(`<i class="fa-solid fa-circle-check"></i> Producto editado</i>`);
    // Cierra el modal de edición de producto
    setModalIsOpenIn("");
  };

  return (
    <form className="reset-form-class overflow-container">
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
          onClick={() => setModalIsOpenIn("")}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
