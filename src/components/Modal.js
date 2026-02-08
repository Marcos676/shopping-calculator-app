import "../styles/Modal.css";
import { NameForm } from "./ModalContent/NameForm";
import { EditProductForm } from "./ModalContent/EditProductForm"
import { Confirm } from "./ModalContent/Confirm";
import { LoginRegisterUser } from "./ModalContent/LoginRegisterUser";
import { TicketDetail } from "./ModalContent/TicketDetail";

export const Modal = ({ isOpenIn, setIsOpenIn, contentProps }) => {

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
          onClick={() => setIsOpenIn("")}
        ></i></div>
        {content}
      </div>
    </div>
  );
};
