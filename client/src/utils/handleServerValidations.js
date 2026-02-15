  /*  funcion que recibe:
  inputId: string del id del input que se desea capturar (#id-input)
  boxErrorClass: string de la clase de la caja que contendra el mensaje de error (.ejemplo-caja)
  msg: Mensaje del error que mostrará la caja
 */
const handleServerValidations = (inputId, boxErrorClass, msg) => {
    const input = document.querySelector(inputId);
    const boxError = document.querySelector(boxErrorClass);
    input.classList.remove("isValid");
    input.classList.add("isInvalid");
    boxError.textContent = msg;
  };
module.exports = {handleServerValidations}