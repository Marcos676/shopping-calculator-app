import "../styles/Modal.css";
import { useEffect, useRef } from "react";
import { NewProductForm } from "./ModalContent/NewProductForm";
import { Confirm } from "./ModalContent/Confirm";

export const Modal = ({ isOpenIn, setIsOpenIn, contentProps }) => {
  /* Mueve el modal de creacion de producto hacia arriba de la pantalla para que en mobile, el teclado no tape los botones. Esto hace que el usuario no tenga que cerrar el teclado para realizar la interaccion final en el formulario. */
  const refModalContent = useRef(null);
  useEffect(() => {
    if (isOpenIn === "NewProductForm" && refModalContent.current !== null) {
      refModalContent.current.style.marginBottom = "270px";
    }
    if (isOpenIn !== "NewProductForm" && refModalContent.current !== null) {
      refModalContent.current.style.marginBottom = "0px";
    }
  }, [isOpenIn]);

  let content;
  switch (isOpenIn) {
    case "NewProductForm":
      content = (
        <NewProductForm
          setIsOpenIn={setIsOpenIn}
          addProductCartList={contentProps.methodAction}
        />
      );

      break;
    case "Confirm":
      content = (
        <Confirm
          setIsOpenIn={setIsOpenIn}
          actionMethod={contentProps.methodAction}
          paramsActionMethod={contentProps.arrayParams}
          textContent={contentProps.textContent}
        />
      );
      break;
    default:
      return;
  }

  return (
    <div className="modal-background">
      <div ref={refModalContent} className="modal-content">
        {content}
      </div>
    </div>
  );
};
