import "../styles/Modal.css";
import { useState } from "react";

export const Modal = ({ isOpen, setIsOpen, saveNewProduct }) => {
  const [name, setName] = useState("");
  if (isOpen) {
    return (
      <div className="modal-background">
        <div className="modal-content">
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
              <button type="button" onClick={() => setIsOpen(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};
