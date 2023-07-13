import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const context = useContext(CartContext);
  const totalAmount = `$${context.totalAmount.toFixed(2)}`;
  const cartNotEmpty = context.items.length > 0;

  const onAddHandler = (item) => {
    const addedItem = { ...item, quantity: 1 };
    context.addItem(addedItem);
  };
  const onRemoveHandler = (id) => {
    context.removeItem(id);
  };
  const orderHandler = () => {
    setFormIsVisible(true);
  };

  const confirmHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-58002-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userData,
          items: context.items,
          amount: context.totalAmount,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    context.resetCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {context.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          onAdd={onAddHandler.bind(null, item)}
          onRemove={onRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {cartNotEmpty && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );
  if (isSubmitting) {
    return (
      <section>
        <p>Submitting</p>
      </section>
    );
  }
  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {formIsVisible && (
        <Checkout onCancel={props.onHideCart} onConfirm={confirmHandler} />
      )}
      {!formIsVisible && modalActions}
    </React.Fragment>
  );

  const submittedModalContent = (
    <React.Fragment>
      <p>Succesfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClickBackground={props.onHideCart}>
      {isSubmitting && <p>Submitting</p>}
      {!isSubmitting && !didSubmit && modalContent}
      {didSubmit && submittedModalContent}
    </Modal>
  );
};

export default Cart;
