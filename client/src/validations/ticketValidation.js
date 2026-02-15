/* 
Las funciones de validacion reciben 2 parámetros:
input: la captura del input a evaluar
boxMessageError: la clase de la etiqueta en la que se mostrara el mensaje de error. Ej: .error-box
*/

const nameTicketValidation = (input, boxMessageError) => {
  let boxError = document.querySelector(boxMessageError);
  let valueInput = input.value;
  if (valueInput.trim() !== "" && valueInput.trim().length < 31) {
    input.classList.remove("isInvalid");
    input.classList.add("isValid");
    boxError.textContent = "";
    return true;
  }
  if (valueInput.trim().length > 30) {
    input.classList.remove("isValid");
    input.classList.add("isInvalid");
    boxError.textContent = "Debe tener hasta 30 caracteres";
    return false;
  }
  input.classList.remove("isValid");
  input.classList.add("isInvalid");
  boxError.textContent = "Se requiere un nombre";
  return false;
};

module.exports = {
  nameTicketValidation,
};
