import "../styles/SidebarShoppingCart.css";

import {
  getDiscount,
  getFinalPrice,
  getTotalPrice,
  getTotalDiscount,
  formatToCurrency
} from "../utils/handlerPrices";

export const SidebarShoppingCart = ({
  isOpen,
  products,
  cleanCartList,
  deleteProductCartlist,
  editProductCartList,
  handleModalContent,
  quantityProducts,
}) => {

  const handleDropdownDetail = (id) => {
    let detailBox = document.querySelector(
      `.sidebar-shopping-cart .item-${id} .dropdown-detail-item`
    );
    let triangleDropdown = document.querySelector(
      `.sidebar-shopping-cart .item-${id} .fa-caret-right`
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

  return (
    <div className="sidebar-shopping-cart">
      <header className="sidebar-shopping-cart-header">
        <div className="header-row-container">
          <i className="fa-solid fa-cart-shopping cart-shopping-class "></i>
          <h2>Carrito de compras</h2>
          <i
            className="fa-solid fa-xmark xmark-class"
            onClick={() => isOpen(false)}
          ></i>
        </div>
        <i className="fas fa-info-circle info-circle-class"></i>
      </header>
      <div className="cart-content">
        <div className="items-list">
          {products.length === 0 && (
            <p className="empty-legend">Carrito vacío</p>
          )}
          {products.map(({ id, name, originalPrice, porcentDiscount, quantity }) => {
            return (
              <div className={`item-container item-${id}`} key={id}>
                <div
                  className="name-price-item"
                  onClick={() => handleDropdownDetail(id)}
                >
                  <div className="caret-right-name">
                  <i className="fa-solid fa-caret-right result-icons"></i>
                  <span>{quantity}</span>
                  <span>
                    {`${name}`}
                  </span>
                  </div>
                  <span className="product-final-price">{formatToCurrency(getFinalPrice(originalPrice, porcentDiscount, quantity))}</span>
                </div>
                <div className={`dropdown-detail-item`}>
                  <div className="detail-item">
                    <span>{`Precio original: ${formatToCurrency(originalPrice)}`} </span>
                    <span> {`Descuento: ${porcentDiscount} %`} </span>
                    <span>
                      {`Ahorro: ${formatToCurrency(getDiscount(
                        originalPrice,
                        porcentDiscount, quantity
                      ))}`}
                    </span>
                  </div>
                  <div className="action-buttons-container">
                    <i className="fa-solid fa-pen"
                    onClick={() =>
                        handleModalContent(
                          "EditProductForm", editProductCartList, [], "", { product: { id, name, originalPrice, porcentDiscount, quantity } } )
                      }
                    ></i>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() =>
                        handleModalContent(
                          "Confirm",
                          deleteProductCartlist,
                          [id],
                          `Esta seguro de que quiere borrar el producto: ${name}?`
                        )
                      }
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}
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
          <button
            className="clean-cart"
            type="button"
            onClick={() =>
              handleModalContent(
                "Confirm",
                cleanCartList,
                [[]],
                "Esta seguro de que quiere borrar el contenido del carrito?"
              )
            }
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <i className="fa-solid fa-arrow-left"></i>
            Vaciar
          </button>
        </div>
      </div>
    </div>
  );
};
