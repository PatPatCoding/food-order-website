import React from "react";

import AvailableMealsList from "./AvailableMealsList";
import Summary from "./Summary";

const Meals = () => {
  return (
    <React.Fragment>
      <Summary />
      <AvailableMealsList />
    </React.Fragment>
  );
};

export default Meals;
