import { useState, useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

export const NameForm = ({
  methodAction,
  textContent,
  inputValidation,
}) => {
  const { setModalIsOpenIn } = useContext(ModalContext);
  const [name, setName] = useState("");
  return (
    <form className="reset-form-class">
      <button type="submit" disabled hidden aria-hidden="true"></button>
      <label htmlFor="name">{textContent}</label>
      <input
        id="name"
        type="text"
        placeholder="Nombre"
        onInput={(e) => {
          setName(e.target.value);
          inputValidation(e.target, ".error-message-name");
        }}
      />
      <p className="err-message error-message-name"></p>
      <div className="modal-box-btns">
        <button
          className="green-button"
          type="button"
          onClick={() => {
            if (
              inputValidation(
                document.querySelector("#name"),
                ".error-message-name",
              )
            ) {
              methodAction(name);
              setModalIsOpenIn("");
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
