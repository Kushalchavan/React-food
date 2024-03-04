import { useContext } from "react";

import { currencyFormater } from "./util/formater.js";
import CartContext from "../store/CartContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};

const Meals = () => {
  const cartCtx = useContext(CartContext);

  // Fetching data(meals) from backend.
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  // if(!data) {
  //   return <p>No meals found.</p>
  // }

  return (
    <ul className="w-full px-10 py-8 grid grid-cols-3 gap-6 mt-5">
      {loadedMeals.map((meal) => (
        <li
          key={meal.id}
          className="w-[22rem] h-[34rem] max-md:w-[16rem] bg-meal-background shadow-md text-center rounded-md truncate"
        >
          <article>
            <img
              src={`http://localhost:3000/${meal.image}`}
              alt={meal.name}
              className="w-full h-3/6 object-contain"
            />
            <div className="w-full px-6 py-3">
              <h3 className="font-bold text-xl">{meal.name}</h3>
              <p className=" text-meal-item-price px-3 py-1 m-auto">
                {currencyFormater.format(meal.price)}
              </p>
              <p className="text-sm text-wrap leading-none h-4 opacity-80">
                {meal.description}
              </p>
            </div>
            <div className="mt-9 mb-3">
              <button
                className="px-4 py-1 bg-yellow-400 text-gray-800 rounded shadow-md hover:bg-yellow-500 transition duration-200"
                onClick={() => cartCtx.addItems(meal)}
              >
                Add To Cart
              </button>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default Meals;
