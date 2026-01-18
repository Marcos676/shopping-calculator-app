/* 
Las funciones de validacion reciben 2 parámetros:
input: la captura del input a evaluar
boxMessageError: la clase de la etiqueta en la que se mostrara el mensaje de error. Ej: .error-box
*/

const nameUserValidation = async (input, boxMessageError) => {
  const boxError = document.querySelector(boxMessageError);
  const valueInput = input.value.trim();

  if (valueInput.length > 1 && valueInput.length <= 30) {    
    try {
      const response = await fetch(
      process.env.REACT_APP_API_URL + "users/" + valueInput,
    );
    const user = await response.json();
    if (user.finded) {
      input.classList.remove("isValid");
      input.classList.add("isInvalid");
      boxError.textContent = "Este nombre ya existe";
      return false;
    }
    } catch (error) {
      console.log(error);
    }

  if (valueInput !== "" && valueInput.length < 31) {
    input.classList.remove("isInvalid");
    input.classList.add("isValid");
    boxError.textContent = "";
    return true;
  }
  console.log((valueInput.length > 1 && valueInput.length <= 30));
  
  
    
  }
  if (valueInput.length > 30) {
    input.classList.remove("isValid");
    input.classList.add("isInvalid");
    boxError.textContent = "Puede tener hasta 30 caracteres";
    return false;
  }
  input.classList.remove("isValid");
  input.classList.add("isInvalid");
  boxError.textContent = "Se requiere un nombre";
  return false;
};

module.exports = {
  nameUserValidation,
};
