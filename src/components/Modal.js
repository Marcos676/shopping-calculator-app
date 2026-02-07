import "../styles/Modal.css";
import { useEffect, useRef } from "react";
import { NameForm } from "./ModalContent/NameForm";
import { EditProductForm } from "./ModalContent/EditProductForm"
import { Confirm } from "./ModalContent/Confirm";
import { LoginRegisterUser } from "./ModalContent/LoginRegisterUser";
import { TicketDetail } from "./ModalContent/TicketDetail";

export const Modal = ({ isOpenIn, setIsOpenIn, contentProps }) => {
  /* Mueve el modal de creacion de producto hacia arriba de la pantalla para que en mobile, el teclado no tape los botones. Esto hace que el usuario no tenga que cerrar el teclado para realizar la interaccion final en el formulario. */
  const refModalContent = useRef(null);
  useEffect(() => {
    if (isOpenIn === "NameForm" && refModalContent.current !== null) {
      refModalContent.current.style.marginBottom = "270px";
    }
    if (isOpenIn !== "NameForm" && refModalContent.current !== null) {
      refModalContent.current.style.marginBottom = "0px";
    }
  }, [isOpenIn]);

  let content;
  switch (isOpenIn) {
    case "LoginUserForm":
      content = (
        <LoginRegisterUser
          setIsOpenIn={setIsOpenIn}
          setUserName={contentProps.methodAction}
        />
      );
    break;
    case "NameForm":
      content = (
        <NameForm
          setIsOpenIn={setIsOpenIn}
          methodAction={contentProps.methodAction}
          textContent={contentProps.textContent}
          inputValidation={contentProps.otherRequires.inputValidation}
        />
      );
      break;
      case "EditProductForm":
        content = (
          <EditProductForm
          setIsOpenIn={setIsOpenIn}
          editProductCartList={contentProps.methodAction}
          utils={contentProps.otherRequires}
           />
        )
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
      case "TicketDetail":
        content = (
        <TicketDetail
          setIsOpenIn={setIsOpenIn}
          ticketData={contentProps.otherRequires}
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
