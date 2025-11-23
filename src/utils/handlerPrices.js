const getDiscount = (price, discount, quantity) =>
  parseFloat((((price * discount) / 100) * quantity).toFixed(2));

const getFinalPrice = (price, discount, quantity) =>
  parseFloat(((price - (price * discount) / 100) * quantity).toFixed(2));

const getTotalPrice = (products) =>
  products.reduce(
    (acc, product) =>
      parseFloat((acc +
      getFinalPrice(
        product.originalPrice,
        product.porcentDiscount,
        product.quantity
      )).toFixed(2)),
    0
  );

const getTotalDiscount = (products) =>
  products.reduce(
    (acc, product) =>
      parseFloat((acc +
      getDiscount(
        product.originalPrice,
        product.porcentDiscount,
        product.quantity
      )).toFixed(2)),
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
    price === "" || price <= 0 || disc < 0 || disc > 100 ||
    quant <= 0
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

const formatToCurrency = (number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }).format(number)

module.exports = {
  getDiscount,
  getFinalPrice,
  getTotalPrice,
  getTotalDiscount,
  handleValues,
  formatToCurrency
};
