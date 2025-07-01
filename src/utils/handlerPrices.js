const getDiscount = (price, discount, quantity) =>
  parseFloat(((price * discount) / 100).toFixed(2)) * quantity;

const getFinalPrice = (price, discount, quantity) =>
  parseFloat((price - (price * discount) / 100).toFixed(2)) * quantity;

const getTotalPrice = (products) =>
  products.reduce(
    (acc, currVal) =>
      acc +
      getFinalPrice(
        currVal.originalPrice,
        currVal.porcentDiscount,
        currVal.quantity
      ),
    0
  );

const getTotalDiscount = (products) =>
  products.reduce(
    (acc, currVal) =>
      acc +
      getDiscount(
        currVal.originalPrice,
        currVal.porcentDiscount,
        currVal.quantity
      ),
    0
  );

const handleValues = (
  price,
  disc,
  quant,
  {
    setOriginalPrice,
    setPorcentDiscount,
    setQuantity,
    setDiscount,
    setFinalPrice,
  }
) => {
  //Actualizacion de valores
  quant = quant === "" ? 1 : quant;
  disc = disc === "" || Number.isNaN(disc) ? 0 : disc;
  setOriginalPrice(price);
  setPorcentDiscount(disc);
  setQuantity(quant);

  //si algun input esta vacío no muestra ningun resultado
  if (price === "" || Number.isNaN(price) || quant === 0 || Number.isNaN(quant)) {
    //si un input esta vacío devuelve un string vacío
    setDiscount("");
    setFinalPrice("");
  } else {
    setDiscount(getDiscount(price, disc, quant));
    setFinalPrice(getFinalPrice(price, disc, quant));
  }
};

module.exports = {
  getDiscount,
  getFinalPrice,
  getTotalPrice,
  getTotalDiscount,
  handleValues,
};
