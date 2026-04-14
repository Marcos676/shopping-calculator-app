import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

export const Confirm = ({
  actionMethod,
  paramsActionMethod,
  textContent,
}) => {
  const { setModalIsOpenIn } = useContext(ModalContext);
  return (
    <div className="confirm-content text-center">
      <h3>{textContent}</h3>

      <div className="modal-box-btns">
        <button
          className="green-button"
          onClick={() => {
            actionMethod(paramsActionMethod[0]);
            setModalIsOpenIn("");
          }}
        >
          Confirmar
        </button>
        <button className="red-button" onClick={() => setModalIsOpenIn("")}>
          Cancelar
        </button>
      </div>
    </div>
  );
};
