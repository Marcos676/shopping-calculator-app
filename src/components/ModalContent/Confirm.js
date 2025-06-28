export const Confirm = ({ setIsOpenIn, action }) => {
  return (
    <div className="confirm-content text-center">
      <h4>Esta seguro de que quiere borrar el contenido del carrito?</h4>

      <div className="modal-box-btns">
        <button onClick={() => action.methodAction(action.arrayParams[0])}>Confirmar</button>
        <button onClick={() => setIsOpenIn("")}>Cancelar</button>
      </div>
    </div>
  );
};
