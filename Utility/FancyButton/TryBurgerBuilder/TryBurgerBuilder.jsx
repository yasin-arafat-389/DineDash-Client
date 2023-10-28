import { Link } from "react-router-dom";
import "./TryBurgerBuilder.css";

const TryBurgerBuilder = () => {
  return (
    <Link to="/burger-builder">
      <button className="tryburgerbuilder flex items-center gap-3">
        <img src="https://i.ibb.co/7Xx3VWB/burger.png" alt="" /> Try Burger
        Builder
      </button>
    </Link>
  );
};

export default TryBurgerBuilder;
