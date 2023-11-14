/* eslint-disable react/prop-types */
import { Textarea, Typography } from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Cart = ({ ingredients, provider }) => {
  let navigate = useNavigate();
  let [customNote, setCustomNote] = useState();
  let { user } = useAuth();

  // Calculating ingredients
  const calculateIngredientCounts = (ingredients) => {
    const ingredientCounts = {};
    ingredients.forEach((item) => {
      if (ingredientCounts[item.name]) {
        ingredientCounts[item.name]++;
      } else {
        ingredientCounts[item.name] = 1;
      }
    });
    return ingredientCounts;
  };
  const ingredientCounts = calculateIngredientCounts(ingredients);

  // Calculating total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    ingredients.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice.toFixed(2);
  };

  const totalPrice = calculateTotalPrice();

  // Handling add to cart
  const handleAddToCart = async () => {
    const customBurger =
      JSON.parse(localStorage.getItem(`${user?.email}`)) || [];

    const updatedBurger = [
      ...customBurger,
      {
        user: user?.email,
        ingredients: ingredients,
        totalPrice: totalPrice,
        note: customNote,
        provider: provider,
      },
    ];

    localStorage.setItem(`${user?.email}`, JSON.stringify(updatedBurger));

    toast.success(`Custom burger added to cart!`, {
      style: {
        border: "2px solid green",
        padding: "8px",
        color: "#713200",
      },
      iconTheme: {
        primary: "green",
        secondary: "#FFFAEE",
      },
    });
    navigate("/cart");
  };

  let handleShowAlert = () => {
    toast.error(`You must login first!!`, {
      style: {
        border: "2px solid red",
        padding: "8px",
        color: "#713200",
      },
      iconTheme: {
        primary: "red",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <div>
      <div>
        <div className="rounded-lg p-6 ">
          {ingredients.length === 0 ? (
            <div>
              <img
                className="mx-auto"
                src="https://i.ibb.co/v3XtdVh/empty-cart.png"
                alt=""
              />
            </div>
          ) : (
            <>
              {Object.keys(ingredientCounts).map((name, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <span>
                    {name}{" "}
                    {ingredientCounts[name] > 1
                      ? `x${ingredientCounts[name]}`
                      : ""}
                  </span>

                  <span>
                    ৳{" "}
                    {ingredients.find((item) => item.name === name).price *
                      ingredientCounts[name]}
                  </span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between mb-5">
                <span className="font-semibold">Total Price</span>
                <span className="font-semibold">{`৳ ${totalPrice}`}</span>
              </div>

              {/* Custom Label Block */}
              <div>
                <Textarea
                  color="cyan"
                  label="Add a Note"
                  onChange={(e) => setCustomNote(e.target.value)}
                />
                <Typography
                  variant="small"
                  color="gray"
                  className="my-2 flex items-center gap-1 font-normal text-[12px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add a note e.g. label of spice, allergic agent to avoid etc.
                </Typography>
              </div>

              {user ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                >
                  Add To Cart
                </button>
              ) : (
                <Link to="/sign-in" state={location?.pathname}>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                    onClick={handleShowAlert}
                  >
                    Add To Cart
                  </button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
