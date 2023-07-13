import React, { useContext, useEffect, useState } from "react";
import classes from "./ButtonHeader.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const Button = (props) => {
  const context = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const numerOfCartItems = context.items.reduce((currentNumber, item) => {
    return currentNumber + item.quantity;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (context.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const myTimeout = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(myTimeout);
    };
  }, [context.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numerOfCartItems}</span>
    </button>
  );
};

export default Button;
