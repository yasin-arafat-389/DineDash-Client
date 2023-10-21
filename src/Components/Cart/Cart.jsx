/* eslint-disable react/prop-types */
import { Textarea, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Cart = ({ ingredients }) => {
  let navigate = useNavigate();
  let [customNote, setCustomNote] = useState();

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
    return totalPrice.toFixed(2); // Assuming you want the price rounded to two decimal places
  };

  const totalPrice = calculateTotalPrice();

  // Getting value from burger provider
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  // Handling add to cart
  const handleAddToCart = () => {
    if (!selectedValue) {
      Swal.fire(
        "You must select a provider",
        "Select a restaurent where you want to get the burger from",
        "warning"
      );
      return;
    } else {
      console.log(selectedValue);
    }

    const customBurger = JSON.parse(localStorage.getItem("customBurger")) || [];

    const updatedBurger = [
      ...customBurger,
      {
        ingredients: ingredients,
        totalPrice: totalPrice,
        note: customNote,
        provider: selectedValue,
      },
    ];

    localStorage.setItem("customBurger", JSON.stringify(updatedBurger));

    toast.success("Custom Burger added to cart", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/cart");
  };

  return (
    <div>
      <div>
        <div className="rounded-lg shadow-md p-6 ">
          {ingredients.length === 0 ? (
            <div>
              <img src="https://i.ibb.co/v3XtdVh/empty-cart.png" alt="" />
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
                  label="Custom Note"
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

              {/* Provider block */}
              <div className="mt-5">
                <select
                  className="select border-2 border-cyan-400 rounded-lg p-3 w-full max-w-xs"
                  value={selectedValue}
                  name="provider"
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Select Provider
                  </option>
                  <option value="Burger King">Burger King</option>
                  <option value="Burger Queen">Burger Queen</option>
                  <option value="Pizzaburg">Pizzaburg</option>
                </select>

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
                  Select the restaurent you want to get your burger from.
                </Typography>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
              >
                Add To Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
