import "../styles/ModalSaveItem.css"
import { useState } from "react";


export const ModalSaveItem = ({isVisible, isNotVisible, save}) => {
    const [name, setName] = useState("");
    if (isVisible) {
        return (
            <div className="modal-save-calc">
            <form className="form-modal-save-calc class-handle-save" >
                <label htmlFor="name">Nombre:</label>
            <input
              id="name"
              className=""
              type="text"
              placeholder="Ej: Galletita, arroz, banana..."
              onInput={(e) => setName(e.target.value)}
            />
                <div className="modal-box-btns">
                    <button
                    type="button"
                    onClick={ () => save(name)}
                    >Guardar</button>
                    <button type="button"
                    onClick={() => isNotVisible(false)}
                    >Cancelar</button>
                    
                </div>
            </form>
        </div>
        )
    }
}