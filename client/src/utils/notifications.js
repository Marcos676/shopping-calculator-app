  // Mostrar Toast (mensaje de agregado y editado de producto exitoso)
  export function showToast(message) {
    const toast = document.querySelector(".toast");

    toast.innerHTML = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  //Activa overlay para el mensaje de vaciado de carrito exitoso
  export function showOverlay(simbol, message) { //Ejemplo de simbol: "!" para advertencia, "✓" para éxito, "x" para error
    const overlay = document.getElementById("overlayFeedback");
    const iconEl = document.getElementById("overlayIcon");
    const textEl = document.getElementById("overlayText");

    iconEl.textContent = simbol;
    textEl.textContent = message;
    overlay.classList.add("show");

    setTimeout(() => {
      overlay.classList.remove("show");
    }, 2000);
  }