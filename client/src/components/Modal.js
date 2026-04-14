import "../styles/Modal.css";
import { NameForm } from "./ModalContent/NameForm";
import { EditProductForm } from "./ModalContent/EditProductForm"
import { Confirm } from "./ModalContent/Confirm";
import { LoginRegisterUser } from "./ModalContent/LoginRegisterUser";
import { TicketDetail } from "./ModalContent/TicketDetail";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

export const Modal = ({ contentProps }) => {
  const { modalIsOpenIn, setModalIsOpenIn } = useContext(ModalContext);

  let content;
  switch (modalIsOpenIn) {
    case "LoginUserForm":
      content = (
        <LoginRegisterUser
          setIsOpenIn={setModalIsOpenIn}
        />
      );
    break;
    case "NameForm":
      content = (
        <NameForm
          methodAction={contentProps.methodAction}
          textContent={contentProps.textContent}
          inputValidation={contentProps.otherRequires.inputValidation}
        />
      );
      break;
      case "EditProductForm":
        content = (
          <EditProductForm
          product={contentProps.otherRequires}
           />
        )
        break;
    case "Confirm":
      content = (
        <Confirm
          actionMethod={contentProps.methodAction}
          paramsActionMethod={contentProps.arrayParams}
          textContent={contentProps.textContent}
        />
      );
      break;
      case "TicketDetail":
        content = (
        <TicketDetail
          ticketData={contentProps.otherRequires}
        />
      );
      break;
    default:
      return;
  }
  return (
    <div className="modal-background">
      <div className="modal-content">
        <div className="close-modal"><i
          className="fa-solid fa-xmark xmark-class"
          onClick={() => setModalIsOpenIn("")}
        ></i></div>
        {content}
      </div>
    </div>
  );
};
