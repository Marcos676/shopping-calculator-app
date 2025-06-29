export const Confirm = ({ setIsOpenIn, actionMethod, paramsActionMethod, textContent }) => {
  return (
    <div className="confirm-content text-center">
      <h3>{textContent}</h3>

      <div className="modal-box-btns">
        <button
          onClick={() => {
            actionMethod(paramsActionMethod[0]);
            setIsOpenIn("");
          }}
        >
          Confirmar
        </button>
        <button onClick={() => setIsOpenIn("")}>Cancelar</button>
      </div>
    </div>
  );
};
