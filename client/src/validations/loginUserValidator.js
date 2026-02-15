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

const nameValidation = (input, boxMessageError) => {
  const boxError = document.querySelector(boxMessageError);
  const valueInput = input.value.trim();

  if (valueInput.length > 0) {
    toggleClass(input, "isValid", "isInvalid");
    boxError.textContent = "";
    return true;
  }
  toggleClass(input, "isInvalid", "isValid");
  boxError.textContent = "Ingrese su nombre de usuario";
  return false;
};

const passwordValidator = (input, boxMessageError) => {
  const boxError = document.querySelector(boxMessageError);
  const valueInput = input.value.trim();

  if (valueInput.length > 0) {
    toggleClass(input, "isValid", "isInvalid");
    boxError.textContent = "";
    return true;
  }
  toggleClass(input, "isInvalid", "isValid");
  boxError.textContent = "Ingrese su contraseña";
  return false;
};

module.exports = {
  nameValidation,
  passwordValidator,
};
