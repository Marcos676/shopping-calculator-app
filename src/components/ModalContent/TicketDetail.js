import {
  getDiscount,
  getFinalPrice,
  getTotalDiscount,
  getTotalPrice,
  getTotalWithoutDiscount,
  formatToCurrency,
} from "../../utils/handlerPrices";

export const TicketDetail = ({ ticketData }) => {
  let { name, created_at, products } = ticketData;

  return (
    <div className="ticket-detail">
      <header>
        <h2>{name}</h2>
        <p>{created_at}</p>
      </header>
      <ul className="product-list">
        {products.map(
          ({ id, name, quantity, originalPrice, porcentDiscount }) => {
            return (
              <li className="product-item" key={id}>
                <div className="item-row name-final-price-item">
                  <span>{name}</span>
                  <span>
                    {formatToCurrency(
                      getFinalPrice(originalPrice, porcentDiscount, quantity),
                    )}
                  </span>
                </div>
                <div className="item-row price-quantity-total-price-item">
                  <span>
                    Precio: {originalPrice} x {quantity}
                  </span>
                  <span>{formatToCurrency(originalPrice * quantity)}</span>
                </div>
                <div className="item-row discount-item">
                  <span>Descuento: {porcentDiscount}%</span>
                  <span>
                    {formatToCurrency(
                      getDiscount(originalPrice, porcentDiscount, quantity),
                    )}
                  </span>
                </div>
              </li>
            );
          },
        )}
      </ul>
      <div className="totals-section">
        <div className="total-row">
          <span>Total sin descuento: </span>
          <span>{formatToCurrency(getTotalWithoutDiscount(products))}</span>
        </div>
        <div className="total-row">
          <span>Descuento total: </span>
          <span>{formatToCurrency(getTotalDiscount(products))}</span>
        </div>
        <div className="total-row total-price">
          <span>Total: </span>
          <span>{formatToCurrency(getTotalPrice(products))}</span>
        </div>
      </div>
    </div>
  );
};
