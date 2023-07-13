import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import Card from "../UI/Card";

import classes from "./AvailableMealsList.module.css";

const AvailableMealsList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  // const catchError = useCallback(async () => {
  //   try {
  //     await fetchMeals();
  //   } catch (error) {
  //     setIsLoading(false);
  //     setHttpError(error);
  //   }
  // }, []);

  const fetchMeals = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://food-order-58002-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    let meals = [];
    for (const meal in data) {
      meals.push({
        id: meal,
        name: data[meal].name,
        description: data[meal].description,
        price: data[meal].price,
      });
    }
    setMeals(meals);
    setIsLoading(false);
  };

  useEffect(() => {
    // catchError();
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsLoading}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMealsList;
