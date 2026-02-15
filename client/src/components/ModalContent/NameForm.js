import { useState } from "react";

export const NameForm = ({
  setIsOpenIn,
  methodAction,
  textContent,
  inputValidation,
}) => {
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
              setIsOpenIn("");
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
