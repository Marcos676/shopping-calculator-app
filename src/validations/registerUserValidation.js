/* 
Las funciones de validacion reciben 2 parámetros:
input: la captura del input a evaluar
boxMessageError: la clase de la etiqueta en la que se mostrara el mensaje de error. Ej: .error-box
*/

// Funcion que intercambia las clases de la caja que recibe por parámetro
/* Parametros:
box = elemento html previamente selexionado con querySelector o similar a editar
add = Nombre de la clase a agregar a la caja (string)
remove = Nombre de la clase a remover de la caja (string) */
function toggleClass(box, add, remove) {
  box.classList.remove(remove);
  box.classList.add(add);
}

const nameValidation = async (input, boxMessageError) => {
  
  const boxError = document.querySelector(boxMessageError);
  const valueInput = input.value.trim()

  if (valueInput !== "" && valueInput.length <= 30) {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "users/" + valueInput,
      );
      const user = await response.json();
      if (user.finded) {
        toggleClass(input, "isInvalid", "isValid");
        boxError.textContent = "Este nombre ya existe";
        return false;
      }
    } catch (error) {
      console.log(error);
    }
    //Caso válido
    toggleClass(input, "isValid", "isInvalid");
    boxError.textContent = "";
    return true;
  }
  if (valueInput.length > 30) {
    toggleClass(input, "isInvalid", "isValid");
    boxError.textContent = "Puede tener hasta 30 caracteres";
    return false;
  }
  toggleClass(input, "isInvalid", "isValid");
  boxError.textContent = "Se requiere un nombre";
  return false;
};

const emailValidation = (input, boxMessageError) => {
  const boxError = document.querySelector(boxMessageError);
  const valueInput = input.value.trim();
  const regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  /* Esta expresión valida formatos típicos como example@example.com, permitiendo:
-Caracteres alfanuméricos, puntos, guiones bajos, porcentajes, más, signos de igual, y guiones en la parte del usuario.
-Dominios con puntos y guiones.
-TLDs (extensiones de dominio) de al menos dos caracteres (como .com, .es, .net).  */
  if (valueInput.length === 0){
    toggleClass(input, "isInvalid", "isValid");
    boxError.textContent = "Se requiere un email";
    return false;
  }
  if (regExEmail.test(valueInput)) {
    toggleClass(input, "isValid", "isInvalid");
    boxError.textContent = "";
    return true;
  }
  toggleClass(input, "isInvalid", "isValid");
    boxError.textContent = "El email es inválido";
    return false;
};

const passwordValidator = (input, boxMessageError) => {
  const boxError = document.querySelector(boxMessageError);
  const valueInput = input.value.trim();
  let regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // Condiciones de la expresion: al menos una letra minúscula - al menos una letra mayúscula - al menos un dígito - al menos 8 caracteres
  if (valueInput.length === 0){
    toggleClass(input, "isInvalid", "isValid");
    boxError.textContent = "Se requiere una contraseña";
    return false;
  }
  if (regExPassword.test(valueInput)) {
    toggleClass(input, "isValid", "isInvalid");
    boxError.textContent = "";
    return true;
  }
  toggleClass(input, "isInvalid", "isValid");
    boxError.textContent = "La contraseña debe tener al menos una letra minúscula, una letra mayúscula, un dígito y al menos 8 caracteres";
    return false;
}

const confirmPasswordValidator = (input, password, boxMessageError) => {
  const boxError = document.querySelector(boxMessageError);
  const valueInput = input.value.trim();
  if (valueInput.length === 0){
    toggleClass(input, "isInvalid", "isValid");
    boxError.textContent = "Se requiere que repita la contraseña";
    return false;
  }
  if (valueInput === password) {
    toggleClass(input, "isValid", "isInvalid");
    boxError.textContent = "";
    return true;
  }
  toggleClass(input, "isInvalid", "isValid");
    boxError.textContent = "Las contraseñas no coinciden";
    return false;
}


module.exports = {
  nameValidation,
  emailValidation,
  passwordValidator,
  confirmPasswordValidator
};
