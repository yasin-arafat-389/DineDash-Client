import TryBurgerBuilder from "../../../Utility/FancyButton/TryBurgerBuilder/TryBurgerBuilder";
import "./CallToAction.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const CallToAction = () => {
  return (
    <div>
      <div className="pl-10 pr-10 pt-10 pb-20 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center bg-[#F7F1E8]">
        <div>
          <img
            src="https://i.ibb.co/GPfTdL6/burger-cta.png"
            className="w-[90%] mx-auto"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="subtitle text-blue-500 text-[15px] md:text-[13px] lg:text-[20px] font-bold">
            We proudly present you
          </div>
          <div className="main-title text-[23px] md:text-[20px] lg:text-[40px] text-[#282932]">
            The Burger Builder
          </div>
          <div className="desc w-[100%] md:w-[100%] lg:w-[70%] mt-3 md:mt-3 lg:mt-5 text-gray-700 text-[15px]  md:text-[12px] lg:text-[15px] font-normal">
            Why let restaurents make burger the way they do when you can just
            make your own burger. {`It's`} about time you build your own burger
            they way you like it.
          </div>

          <div className="features mt-5">
            <ul>
              <li className="my-2 flex gap-2 text-[15px] md:text-[13px] lg:text-[18px] items-center">
                <IoMdCheckmarkCircleOutline className="text-[20px] md:text-[20px] lg:text-[25px] text-blue-500" />
                Choose the restaurent you want to get your burger from
              </li>
              <li className="my-2 flex gap-2 text-[15px] md:text-[13px] lg:text-[18px] items-center">
                <IoMdCheckmarkCircleOutline className="text-[20px] md:text-[20px] lg:text-[25px] text-blue-500" />
                Select the ingredients you want in your burger
              </li>
              <li className="my-2 flex gap-2 text-[15px] md:text-[13px] lg:text-[18px] items-center">
                <IoMdCheckmarkCircleOutline className="text-[20px] md:text-[20px] lg:text-[25px] text-blue-500" />
                Reorder the ingredients to your preference by dragging and
                dropping
              </li>
              <li className="my-2 flex gap-2 text-[15px] md:text-[13px] lg:text-[18px] items-center">
                <IoMdCheckmarkCircleOutline className="text-[20px] md:text-[20px] lg:text-[25px] text-blue-500" />
                Add a note for additional information about your burger
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <TryBurgerBuilder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
