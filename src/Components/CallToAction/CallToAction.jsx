import TryBurgerBuilder from "../../../Utility/FancyButton/TryBurgerBuilder/TryBurgerBuilder";
import "./CallToAction.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CallToAction = () => {
  let steps = [
    "Choose the restaurent you want to get your burger from",
    "Select the ingredients you want in your burger",
    "Reorder the ingredients to your preference by dragging and dropping",
    "Add a note for additional information about your burger",
  ];

  // Animations
  let subtitleRef = useRef(null);
  let titleRef = useRef(null);
  let descriptionRef = useRef(null);
  let stepsRef = useRef(null);
  let buttonRef = useRef(null);

  let isSubTitleInView = useInView(subtitleRef, { once: false });
  let isTitleInView = useInView(titleRef, { once: false });
  let isDescriptionInView = useInView(descriptionRef, { once: false });
  let isStepsInView = useInView(stepsRef, { once: false });
  let isButtonInView = useInView(buttonRef, { once: false });

  return (
    <div>
      <div className="pl-10 pr-10 pt-10 pb-20 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center bg-[#F7F1E8]">
        <div>
          <motion.img
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, easings: ["easeInOut"] }}
            src="./burger-cta.png"
            className="w-[90%] mx-auto"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div
            ref={subtitleRef}
            className={`subtitle text-blue-500 text-[15px] md:text-[13px] lg:text-[20px] font-bold text-center md:text-left lg:text-left ${
              isSubTitleInView
                ? "translate-y-0 opacity-100 duration-[0.8s]"
                : "translate-y-[100px] opacity-0"
            }`}
          >
            We proudly present you
          </div>

          <div
            ref={titleRef}
            className={`main-title text-[23px] md:text-[20px] lg:text-[40px] text-[#282932] text-center md:text-left lg:text-left ${
              isTitleInView
                ? "translate-y-0 opacity-100 duration-[0.8s] delay-[0.3s]"
                : "translate-y-[100px] opacity-0"
            }`}
          >
            The Burger Builder
          </div>

          <div
            ref={descriptionRef}
            className={`desc w-[100%] md:w-[100%] lg:w-[70%] mt-3 md:mt-3 lg:mt-5 text-gray-700 text-[15px]  md:text-[12px] lg:text-[15px] font-normal ${
              isDescriptionInView
                ? "translate-y-0 opacity-100 duration-[0.8s] delay-[0.5s]"
                : "translate-y-[100px] opacity-0"
            }`}
          >
            Why let restaurents make burger the way they do when you can just
            make your own burger. {`It's`} about time you build your own burger
            they way you like it.
          </div>

          <div className="features mt-5">
            <ul>
              {steps.map((step, index) => (
                <li
                  ref={stepsRef}
                  key={index}
                  style={{
                    transitionDelay: isStepsInView ? `${index * 0.4}s` : "0s",
                  }}
                  className={`my-5 flex gap-2 text-[15px] md:text-[13px] lg:text-[18px] items-start ${
                    isStepsInView
                      ? "translate-y-0 opacity-100 duration-[0.8s]"
                      : "translate-y-[100px] opacity-0"
                  }`}
                >
                  <IoMdCheckmarkCircleOutline className="text-[30px] md:text-[20px] lg:text-[25px] text-blue-500" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={buttonRef}
            className={`mt-6 ${
              isButtonInView
                ? "translate-y-0 opacity-100 duration-[0.8s] delay-[1.5s]"
                : "translate-y-[100px] opacity-0"
            }`}
          >
            <TryBurgerBuilder text="Try Burger Builder" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
