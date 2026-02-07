export const TicketDetail = ({ setIsOpenIn, ticketData }) => {
  return (
    <div className="ticket-detail">
      <header>
        <h2>{ticketData.name}</h2>
        <p>{ticketData.created_at}</p>
      </header>
      <ul className="product-list">
        <li className="product-item">
            <div className="item-row name-final-price-item">
                <span>Galletitas de salvado Granix</span>
                <span>$1500</span>
            </div>
            <div className="item-row price-quantity-total-price-item">
                <span>Precio: 2000 x 1</span>
                <span>$2000</span>
            </div>
            <div className="item-row discount-item">
                <span>Descuento: 25%</span>
                <span>$500</span>
            </div>
        </li>
        <li className="product-item">
            <div className="item-row name-final-price-item">
                <span>Galletitas</span>
                <span>$1500</span>
            </div>
            <div className="item-row price-quantity-total-price-item">
                <span>Precio: 2000 x 1</span>
                <span>$2000</span>
            </div>
            <div className="item-row discount-item">
                <span>Descuento: 25%</span>
                <span>$500</span>
            </div>
        </li>
        <li className="product-item">
            <div className="item-row name-final-price-item">
                <span>Bananas</span>
                <span>$1500</span>
            </div>
            <div className="item-row price-quantity-total-price-item">
                <span>Precio: 2000 x 1</span>
                <span>$2000</span>
            </div>
            <div className="item-row discount-item">
                <span>Descuento: 25%</span>
                <span>$500</span>
            </div>
        </li>
        <li className="product-item">
            <div className="item-row name-final-price-item">
                <span>Bananas</span>
                <span>$1500</span>
            </div>
            <div className="item-row price-quantity-total-price-item">
                <span>Precio: 2000 x 1</span>
                <span>$2000</span>
            </div>
            <div className="item-row discount-item">
                <span>Descuento: 25%</span>
                <span>$500</span>
            </div>
        </li>
        <li className="product-item">
            <div className="item-row name-final-price-item">
                <span>Bananas</span>
                <span>$1500</span>
            </div>
            <div className="item-row price-quantity-total-price-item">
                <span>Precio: 2000 x 1</span>
                <span>$2000</span>
            </div>
            <div className="item-row discount-item">
                <span>Descuento: 25%</span>
                <span>$500</span>
            </div>
        </li>
      </ul>
      <div className="totals-section">
        <div className="total-row"><span>Total sin descuento: </span><span>$2000</span></div>
        <div className="total-row"><span>Descuento total: </span><span>$500</span></div>
        <div className="total-row total-price"><span>Total: </span><span>$1500</span></div>
      </div>
    </div>
  );
};
