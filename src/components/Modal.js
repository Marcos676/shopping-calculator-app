import "../styles/Modal.css";
import { NewProductForm } from "./ModalContent/NewProductForm";

export const Modal = ({ isOpenIn, setIsOpenIn, saveNewProduct }) => {
  let content;
  switch (isOpenIn) {
    case "NewProductForm":
      content = (
        <NewProductForm
          setIsOpenIn={setIsOpenIn}
          saveNewProduct={saveNewProduct}
        />
      );
      break;
    //case "":
    default:
      return
  }

  return (
    <div className="modal-background">
      <div className="modal-content">{content}</div>
    </div>
  );
};
