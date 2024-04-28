import { useInView } from "framer-motion";
import { useRef } from "react";

const HowItWorks = () => {
  // animation refs
  const titleRef = useRef(null);
  const shortDescRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: false });
  const isShortDescInView = useInView(shortDescRef, { once: false });

  return (
    <div className="mt-10 md:mt-10 lg:mt-20 mb-10">
      <div className="title&subtitle">
        <h1
          ref={titleRef}
          className={`text-center text-[30px] md:text-[58px] lg:text-[58px] font-bold ${
            isTitleInView
              ? `translate-y-0 opacity-100 duration-1000 ease-in-out`
              : `translate-y-[50px] opacity-0`
          }`}
        >
          How It Works
        </h1>

        <p
          ref={shortDescRef}
          className={`text-center text-[14px] md:text-[18px] lg:text-[18px] text-[#787878] py-4 px-4 md:px-0 lg:px-0 ${
            isShortDescInView
              ? `translate-y-0 opacity-100 duration-1000 delay-[0.5s] ease-in-out`
              : `translate-y-[50px] opacity-0`
          }`}
        >
          With DineDash, ordering food from online is just 3 steps simple.
          Browse the menu, <br /> select your food and Sit back and relax as we
          swiftly deliver your food.
        </p>
      </div>

      <div className="images&description grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 w-[90%] mx-auto mt-8">
        {/* Card 1 */}
        <div className="flex flex-col items-center">
          <img src="./step-1.png" alt="" />
          <div className="flex items-center my-2">
            <h1 className="text-[24px] text-[#363636] font-bold ">
              <span className="text-[40px] text-[#cfcfcf] font-bold">01</span>{" "}
              Select Restaurant
            </h1>
          </div>
          <p className="text-[16px] text-[#787878] text-center font-medium">
            Begin your culinary journey by selecting from a diverse array of
            top-rated restaurants on DineDash, each offering a unique and
            tantalizing dining experience.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center">
          <img src="./step-2.png" alt="" />
          <div className="flex items-center my-2">
            <h1 className="text-[24px] text-[#363636] font-bold ">
              <span className="text-[40px] text-[#cfcfcf] font-bold">02</span>{" "}
              Select Food
            </h1>
          </div>
          <p className="text-[16px] text-[#787878] text-center font-medium">
            Indulge in a seamless selection process as you pick from our
            extensive menu, featuring a tantalizing array of dishes crafted to
            satisfy every craving and preference.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center">
          <img src="./step-3.png" alt="" />
          <div className="flex items-center my-2">
            <h1 className="text-[24px] text-[#363636] font-bold ">
              <span className="text-[40px] text-[#cfcfcf] font-bold">03</span>{" "}
              Wait for delivery
            </h1>
          </div>
          <p className="text-[16px] text-[#787878] text-center font-medium">
            Savor the anticipation as our dedicated delivery team swiftly
            transports your chosen delicacies, ensuring they arrive fresh and
            delectable at your doorstep, ready for your enjoyment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
