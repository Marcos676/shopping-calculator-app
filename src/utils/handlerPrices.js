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
  price = Number.isNaN(price) ? "" : price;
  disc = Number.isNaN(disc) ? "" : disc;
  quant = Number.isNaN(quant) ? "" : quant;

  setOriginalPrice(price);
  setPorcentDiscount(disc);
  setQuantity(quant);

  //si algun input esta vacío no muestra ningun resultado o no es un número
  if (
    price === "" ||
    quant === 0 || quant === ""
  ) {
    //si un input esta vacío devuelve un string vacío
    setDiscount("");
    setFinalPrice("");
  } else {
    disc = disc === "" ? 0 : disc;
    quant = quant === "" ? 1 : quant;

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
