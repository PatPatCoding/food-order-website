import { createContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 1,
  addItem: (item) => {},
  removeItem: (id) => {},
  resetCart: () => {},
});

export default CartContext;
