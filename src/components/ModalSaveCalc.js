import "../styles/ModalSaveCalc.css"

export const ModalSaveCalc = (isVisible, name, originalPrice, discount) => {
    //let show = isVisible ? "flex" : "none" 


    return(
        <div className="modal-save-calc" /* style={{display: {show}}} */>
            <form className="form-modal-save-calc">
                <label htmlFor="name">Nombre:</label>
            <input
              id="name"
              className=""
              type="text"
              placeholder="Ej: Galletita, arroz, banana..."
            />
                <div className="modal-box-btns">
                    <button type="button"
                    onClick={(e) => ModalSaveCalc(false)}
                    >Cancelar</button>
                    <button type="button">Guardar</button>
                </div>
            </form>
        </div>
    )
}