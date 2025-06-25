export const calculatePriceWithTax = (price: number, taxRate = 0.19) => {
  return Math.floor(price + price * taxRate);
};
