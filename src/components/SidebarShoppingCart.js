import "../styles/SidebarShoppingCart.css";
import { useState } from "react";
 
import {
  getDiscount,
  getFinalPrice,
  getTotalPrice,
  getTotalDiscount,
} from "../utils/priceCalculation";

export const SidebarShoppingCart = ({ isOpen, products, setCartList, deleteProductCartlist, handleModalContent }) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const handleDropdownDetail = (id) => {
    let detailBox = document.querySelector(
      `.sidebar-shopping-cart .item-${id} .dropdown-detail-item`
    );
    let triangleDropdown = document.querySelector(
      `.sidebar-shopping-cart .item-${id} .fa-caret-right`
    );

    if (isOpenDetail) {
      setIsOpenDetail(false);
      detailBox.style.height = "0px";
      triangleDropdown.style.transform = "rotate(0deg)";
    } else {
      setIsOpenDetail(true);
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
          {products.map(({ id, name, originalPrice, porcentDiscount }) => {
            return (
              <div className={`item-container item-${id}`} key={id}>
                <div
                  className="name-price-item"
                  onClick={() => handleDropdownDetail(id)}
                >
                  <span>
                    <i className="fa-solid fa-caret-right result-icons"></i>
                    {name}
                  </span>
                  <span>$ {getFinalPrice(originalPrice, porcentDiscount)}</span>
                </div>
                <div className={`dropdown-detail-item`}>
                  <div className="detail-item">
                    <span>{`Precio original: $ ${originalPrice}`} </span>
                    <span> {`Descuento: ${porcentDiscount}%`} </span>
                    <span>
                      {`Ahorro: $ ${getDiscount(
                        originalPrice,
                        porcentDiscount
                      )}`}
                    </span>
                  </div>
                  <div className="action-buttons-container">
                    <i className="fa-solid fa-pen"></i>
                    <i className="fa-solid fa-trash" onClick={() => handleModalContent("Confirm", deleteProductCartlist, id, `Esta seguro de que quiere borrar el producto: ${name}?`)}></i>
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
              {`Total a pagar: $ ${getTotalPrice(products)}`}
            </p>
            <p className="">
              <i className="fa-solid fa-tag result-icons"></i>
              {`Total ahorrado: $ ${getTotalDiscount(products)}`}
            </p>
          </div>
          <button className="clean-cart" type="button" onClick={()=> handleModalContent("Confirm", setCartList, [], "Esta seguro de que quiere borrar el contenido del carrito?")}>
            <i className="fa-solid fa-cart-shopping"></i>
            <i className="fa-solid fa-arrow-left"></i>
            Vaciar
          </button>
        </div>
      </div>
    </div>
  );
};
