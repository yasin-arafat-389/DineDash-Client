/* eslint-disable react/prop-types */
const Cart = ({ ingredients }) => {
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

  // Calculating total calories
  const calculateTotalCalories = () => {
    let totalCalories = 0;
    ingredients.forEach((item) => {
      totalCalories += item.calories; // Assuming each ingredient has a 'calories' property
    });
    return totalCalories;
  };

  const totalPrice = calculateTotalPrice();
  const totalCalories = calculateTotalCalories();

  // Handling add to cart
  const handleAddToCart = () => {
    localStorage.setItem("selectedIngredients", JSON.stringify(ingredients));
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
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total Price</span>
                <span className="font-semibold">{`৳ ${totalPrice}`}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total Calories</span>
                <span className="font-semibold">{totalCalories}</span>
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
