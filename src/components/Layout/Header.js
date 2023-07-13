import React from "react";
import meals from "../../../src/assets/meals.jpg";
import ButtonHeader from "./ButtonHeader"

import classes from "./Header.module.css"

const Header = (props) => {

  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <ButtonHeader onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={meals} alt="A table full of food"/>
      </div>
    </React.Fragment>
  );
};

export default Header;
