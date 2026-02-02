import "../styles/SidebarShoppingCart.css";

import {
  getDiscount,
  getFinalPrice,
  getTotalPrice,
  getTotalDiscount,
  formatToCurrency,
} from "../utils/handlerPrices";

export const SidebarShoppingCart = ({
  isOpen,
  products,
  cleanCartList,
  deleteProductCartlist,
  editProductCartList,
  handleModalContent,
  quantityProducts,
  showOverlay,
  userName,
  setUserName,
}) => {
  const handleDropdownDetail = (id) => {
    let detailBox = document.querySelector(
      `.sidebar-shopping-cart .item-${id} .dropdown-detail-item`,
    );
    let triangleDropdown = document.querySelector(
      `.sidebar-shopping-cart .item-${id} .fa-caret-right`,
    );

    if (detailBox.classList.contains("dropdown-detail-active")) {
      detailBox.classList.remove("dropdown-detail-active");
      detailBox.style.height = "0px";
      triangleDropdown.style.transform = "rotate(0deg)";
    } else {
      detailBox.classList.add("dropdown-detail-active");
      detailBox.style.height = "71px";
      triangleDropdown.style.transform = "rotate(90deg)";
    }
  };

  const handleSaveTicket = async (name) => {
    // condiciones enviando avisos al usuario para que no guarde un carrito vacío y esté logueado
    if (products.length === 0)
      return showOverlay("!", "No puede guardar un carrito vacío");
    if (userName === "")
      return handleModalContent("LoginUserForm", setUserName);

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "ticket/crear",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            productList: products,
          }),
        }
      );
      switch (response.status) {
        case 200:
          console.log(response);
      const responseParsed = await response.json();
      console.log(responseParsed);
          break;
        case 400:
        // prepararlo para manejar los errores del nombre en el formulario del modal
        break;
        default:
          break;
      }
      
    } catch (error) {
      console.log("Error del catch:", error);
      
    }
  };

  return (
    <div className="sidebar-shopping-cart">
      <header className="sidebar-shopping-cart-header">
        <i className="fa-solid fa-cart-shopping cart-shopping-class "></i>
        <h2>Carrito de compras</h2>
        <i
          className="fa-solid fa-xmark xmark-class"
          onClick={() => isOpen(false)}
        ></i>
      </header>
      <div className="cart-content">
        <div className="items-list">
          {products.length === 0 && (
            <p className="empty-legend">Carrito vacío</p>
          )}
          {products.map(
            ({ id, name, originalPrice, porcentDiscount, quantity }) => {
              return (
                <div className={`item-container item-${id}`} key={id}>
                  <div
                    className="name-price-item"
                    onClick={() => handleDropdownDetail(id)}
                  >
                    <div className="caret-right-name">
                      <i className="fa-solid fa-caret-right result-icons"></i>
                      <span>{quantity}</span>
                      <span>{`${name}`}</span>
                    </div>
                    <span className="product-final-price">
                      {formatToCurrency(
                        getFinalPrice(originalPrice, porcentDiscount, quantity),
                      )}
                    </span>
                  </div>
                  <div className={`dropdown-detail-item`}>
                    <div className="detail-item">
                      <span>
                        {`Precio original: ${formatToCurrency(originalPrice)}`}{" "}
                      </span>
                      <span> {`Descuento: ${porcentDiscount} %`} </span>
                      <span>
                        {`Ahorro: ${formatToCurrency(
                          getDiscount(originalPrice, porcentDiscount, quantity),
                        )}`}
                      </span>
                    </div>
                    <div className="action-buttons-container">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() =>
                          handleModalContent(
                            "EditProductForm",
                            editProductCartList,
                            [],
                            "",
                            {
                              product: {
                                id,
                                name,
                                originalPrice,
                                porcentDiscount,
                                quantity,
                              },
                            },
                          )
                        }
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() =>
                          handleModalContent(
                            "Confirm",
                            deleteProductCartlist,
                            [id],
                            `Esta seguro de que quiere borrar el producto: ${name}?`,
                          )
                        }
                      ></i>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
        <div className="total-button-box">
          <div className="total-container">
            <p className="total-price">
              <i className="fa-solid fa-sack-dollar result-icons"></i>{" "}
              {`Total a pagar: ${formatToCurrency(getTotalPrice(products))}`}
            </p>
            <p className="">
              <i className="fa-solid fa-tag result-icons"></i>
              {`Total ahorrado: ${formatToCurrency(getTotalDiscount(products))}`}
            </p>
            <p className="">
              <i className="fa-solid fa-cart-shopping result-icons"></i>
              {`Cantidad de productos: ${quantityProducts}`}
            </p>
          </div>
          <div className="box-buttons">
            <button
              className="clean-cart"
              type="button"
              onClick={() => {
                if (products.length === 0) {
                  showOverlay("!", "El carrito ya está vacío");
                } else {
                  handleModalContent(
                    "Confirm",
                    cleanCartList,
                    [],
                    "Esta seguro de que quiere borrar el contenido del carrito?",
                  );
                }
              }}
            >
              Vaciar <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <button
              className="save-cart"
              type="button"
              onClick={() => handleSaveTicket()}
            >
              <i className="fa-solid fa-receipt"></i> Guardar ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
