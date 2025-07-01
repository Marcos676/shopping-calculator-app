import { useState } from "react";
import { handleValues, getDiscount, getFinalPrice } from "../../utils/handlerPrices";

export const EditProductForm = ({
  setIsOpenIn,
  editProductCartList,
  utils
}) => {
  const { product } = utils
  const [name, setName] = useState(product.name);
  const [originalPrice, setOriginalPrice] = useState(
    product.originalPrice
  );
  const [porcentDiscount, setPorcentDiscount] = useState(
    product.porcentDiscount
  );
  const [quantity, setQuantity] = useState(product.quantity);
  const [discount, setDiscount] = useState(getDiscount(product.originalPrice, product.porcentDiscount, product.quantity));
  const [finalPrice, setFinalPrice] = useState(getFinalPrice(product.originalPrice, product.porcentDiscount, product.quantity));

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
          onInput={(e) => setName(e.target.value)}
        />
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
          onInput={(e) =>
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
            )
          }
        />
      </div>
      <div>
        <label htmlFor="porcent-to-discount">Descuento</label>
        <input
          id="porcent-to-discount"
          className="porcent-to-discount"
          type="number"
          min={0}
          max={100}
          placeholder="%"
          value={porcentDiscount}
          onInput={(e) =>
            handleValues(originalPrice, parseFloat(e.target.value), quantity, {
              setOriginalPrice,
              setPorcentDiscount,
              setQuantity,
              setDiscount,
              setFinalPrice,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="quantity">Cantidad</label>
        <input
          id="quantity"
          className="original-price"
          type="number"
          min={1}
          placeholder="Unidades"
          value={quantity}
          onInput={(e) =>
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
      <div className="modal-box-btns">
        <button
          className="green-button"
          type="button"
          onClick={() =>
            editProductCartList({
              id: product.id,
              name,
              originalPrice,
              porcentDiscount,
              quantity,
            })
          }
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
