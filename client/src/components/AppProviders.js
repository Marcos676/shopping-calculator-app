// Este componente se encarga de envolver toda la aplicación con los contextos necesarios para manejar el estado global de la aplicación, como el usuario logueado, el carrito de compras y los modales. De esta manera, cualquier componente dentro de la aplicación puede acceder a estos estados y funciones sin necesidad de pasarlos como props.

import { useState } from "react";

// CookiesProvider es un componente que proporciona el contexto de cookies a toda la aplicación, permitiendo el uso de cookies en cualquier componente.
import { CookiesProvider } from "react-cookie";

// Contextos para manejar el estado global de la aplicación
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { ModalContext } from "../contexts/ModalContext";

// "children" es el contenido que se renderizará dentro de este componente, en este caso es,todo lo que esta envolviendo su componente en index.js, que es el componente App, de esta manera, App y todos sus componentes hijos tendrán acceso a los contextos proporcionados por AppProviders.
export default function AppProviders({ children }) {
  // Estados globales

  // UserContext: Guarda el nombre del usuario logueado, se utiliza para mostrarlo en el header y para manejar la autenticación de las rutas privadas.
  const [user, setUser] = useState("");

  // CartContext: Guarda la lista de productos agregados al carrito y la cantidad total de productos, se utiliza para mostrar la cantidad en el icono del carrito y para manejar el contenido del carrito.
  const [cartList, setCartList] = useState([]);
  const [quantityProducts, setQuantityProducts] = useState(0);

  // ModalContext: Guarda el estado de apertura del modal y las propiedades del modal, se utiliza para manejar la apertura y cierre de los modales y para pasarles las propiedades necesarias.
  const [modalIsOpenIn, setModalIsOpenIn] = useState("");
  const [modalProps, setModalProps] = useState({});

  return (
    <CookiesProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <CartContext.Provider
          value={{
            cartList,
            setCartList,
            quantityProducts,
            setQuantityProducts,
          }}
        >
          <ModalContext.Provider
            value={{
              modalIsOpenIn,
              setModalIsOpenIn,
              modalProps,
              setModalProps,
            }}
          >
            {children}
          </ModalContext.Provider>
        </CartContext.Provider>
      </UserContext.Provider>
    </CookiesProvider>
  );
}
