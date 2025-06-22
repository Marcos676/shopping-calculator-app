import "../styles/SidebarShoppingCart.css";

export const SidebarShoppingCart = ({show, setShow}) => {

  if (show) {
    return (
    <div className="sidebar-shopping-cart">
      <header className="sidebar-shopping-cart-header">
        <div className="header-row-container">
          <i className="fa-solid fa-cart-shopping cart-shopping-class"></i>
          <h2>Carrito de compras</h2>
          <i 
          className="fa-solid fa-xmark xmark-class"
          onClick={() => setShow(false)}
          ></i>
        </div>
        <i className="fas fa-info-circle info-circle-class"></i>
      </header>
      <div className="cart-content">
        <div className="items-list">
          <div className="item-container">
            <div className="name-price-item">
              <span><i className="fa-solid fa-caret-right"></i> Yerba mate</span>
              <span>$960</span>
            </div>
            <div className="dropdawn-detail-item">
              <div className="detail-item">
                <span>Precio original: ${"1200"}</span>
                <span>Descuento: {20}%</span>
                <span>Ahorro: ${900}</span>
              </div>
              <div className="action-buttons-container">
                <i className="fa-solid fa-pen"></i>
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
          <div className="item-container">
            <div className="name-price-item">
              <span><i className="fa-solid fa-caret-right"></i> Yerba mate</span>
              <span>$960</span>
            </div>
            <div className="dropdawn-detail-item">
              <div className="detail-item">
                <span>Precio original: ${"1200"}</span>
                <span>Descuento: {20}%</span>
                <span>Ahorro: ${900}</span>
              </div>
              <div className="action-buttons-container">
                <i className="fa-solid fa-pen"></i>
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
          <div className="item-container">
            <div className="name-price-item">
              <span><i className="fa-solid fa-caret-right"></i> Yerba mate</span>
              <span>$960</span>
            </div>
            <div className="dropdawn-detail-item">
              <div className="detail-item">
                <span>Precio original: ${"1200"}</span>
                <span>Descuento: {20}%</span>
                <span>Ahorro: ${900}</span>
              </div>
              <div className="action-buttons-container">
                <i className="fa-solid fa-pen"></i>
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="total-container">
          <p className="total-price">
            <i className="fa-solid fa-sack-dollar result-icons"></i>
            Total con descuento: $ {"2400"}
          </p>
          <p className="">
            <i className="fa-solid fa-tag"></i>
            Total ahorrado: $ {"480"}
          </p>
        </div>
        <button className="clean-cart" type="button">
          <i className="fa-solid fa-cart-shopping"></i>
          <i className="fa-solid fa-arrow-left"></i>
          Vaciar
        </button>
      </div>
    </div>
  );
  }
};
