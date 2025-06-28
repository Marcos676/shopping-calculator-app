import "../styles/Modal.css";
import { SaveNewProductForm } from "./ModalContent/SaveNewProduct";

export const Modal = ({ isOpenIn, setIsOpenIn, saveNewProduct }) => {
  switch (isOpenIn) {
    case "new-product-form":
      return (
      <SaveNewProductForm setIsOpenIn={setIsOpenIn} saveNewProduct={saveNewProduct} />
    );  
    //case "":
    default:
      break;
  }
};
