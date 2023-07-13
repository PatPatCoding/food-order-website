import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  //there will be more returns based on actions
  switch (action.type) {
    case "ADD_ITEM":
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.quantity;

      const existingItemId = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingItem = state.items[existingItemId];

      let updatedItems;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemId] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE_ITEM":
      const existingItemToBeRemovedId = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const existingItemToBeRemoved = state.items[existingItemToBeRemovedId];

      const updatedTotalAmountAfterRemoval =
        state.totalAmount - existingItemToBeRemoved.price;

      const updatedItemAfterRemoval = {
        ...existingItemToBeRemoved,
        quantity: existingItemToBeRemoved.quantity - 1,
      };

      let updatedItemsAfterRemoval;
      if (existingItemToBeRemoved.quantity > 1) {
        updatedItemsAfterRemoval = [...state.items];
        updatedItemsAfterRemoval[existingItemToBeRemovedId] =
          updatedItemAfterRemoval;
      } else {
        updatedItemsAfterRemoval = [...state.items];
        updatedItemsAfterRemoval = updatedItemsAfterRemoval.filter(
          (item) => item.id !== existingItemToBeRemoved.id
        );
      }

      return {
        items: updatedItemsAfterRemoval,
        totalAmount: updatedTotalAmountAfterRemoval,
      };
    case "RESET_CART":
      return defaultCartState;
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", payload: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", payload: id });
  };

  const resetCartHandler = () => {
    dispatchCartAction({type: "RESET_CART"})
  }

  // Helper constant. It will be dynamic.
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    resetCart: resetCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
