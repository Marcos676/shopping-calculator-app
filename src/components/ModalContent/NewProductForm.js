import { useState } from "react";

import { nameProductValidation } from "../../validations/productValidation"

export const NewProductForm = ({ setIsOpenIn, addProductCartList }) => {
    const [name, setName] = useState("");
    return (
          <form className="reset-form-class">
            <button type="submit" disabled hidden aria-hidden="true"></button>
            <label htmlFor="name">Nombre:</label>
            <input
              id="name"
              type="text"
              placeholder="Ej: Galletita, Arroz, Banana..."
              onInput={(e) => {
                setName(e.target.value);
                nameProductValidation(e.target, ".error-message-name")
              }}
            />
            <p className="err-message error-message-name"></p>
            <div className="modal-box-btns">
              <button className="green-button" type="button" onClick={() => {
                if (nameProductValidation(document.querySelector("#name"), ".error-message-name")) {
                  addProductCartList(name)
                  let inputs = [
                    "#original-price",
                    "#porcent-to-discount",
                    "#quantity",
                    "#name"
                  ]
                  inputs.forEach(idInput => {
                    document.querySelector(idInput).classList.remove("isValid")
                  });
                }
                }}>
                Guardar
              </button>
              <button className="red-button" type="button" onClick={() => setIsOpenIn("")}>
                Cancelar
              </button>
            </div>
          </form>
    )
}