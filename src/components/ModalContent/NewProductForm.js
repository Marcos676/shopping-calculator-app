import { useState } from "react";

export const NewProductForm = ({ setIsOpenIn, saveNewProduct }) => {
    const [name, setName] = useState("");
    return (
          <form className="reset-form-class">
            <button type="submit" disabled hidden aria-hidden="true"></button>
            <label htmlFor="name">Nombre:</label>
            <input
              id="name"
              type="text"
              placeholder="Ej: Galletita, arroz, banana..."
              onInput={(e) => setName(e.target.value)}
            />
            <div className="modal-box-btns">
              <button type="button" onClick={() => saveNewProduct(name)}>
                Guardar
              </button>
              <button type="button" onClick={() => setIsOpenIn("")}>
                Cancelar
              </button>
            </div>
          </form>
    )
}