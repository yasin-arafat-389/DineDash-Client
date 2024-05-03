import { motion } from "framer-motion";

const HowItWorks = () => {
  let steps = [
    {
      thumbnail: "./step-1.png",
      step: "01",
      title: "Select Restaurant",
      description:
        "Begin your culinary journey by selecting from a diverse array of top-rated restaurants on DineDash, each offering a unique and tantalizing dining experience.",
    },
    {
      thumbnail: "./step-2.png",
      step: "02",
      title: "Select Food",
      description:
        "Indulge in a seamless selection process as you pick from our extensive menu, featuring a tantalizing array of dishes crafted to satisfy every craving and preference.",
    },
    {
      thumbnail: "./step-3.png",
      step: "03",
      title: "Wait for delivery",
      description:
        "Savor the anticipation as our dedicated delivery team swiftly transports your chosen delicacies, ensuring they arrive fresh and delectable at your doorstep, ready for your enjoyment.",
    },
  ];

  return (
    <div className="mt-10 md:mt-10 lg:mt-20 mb-10">
      <div className="title&subtitle">
        <h1
          className={`text-center text-[30px] md:text-[58px] lg:text-[58px] font-bold `}
        >
          How It Works
        </h1>

        <p
          className={`text-center text-[14px] md:text-[18px] lg:text-[18px] text-[#787878] py-4 px-4 md:px-0 lg:px-0`}
        >
          With DineDash, ordering food from online is just 3 steps simple.
          Browse the menu, <br /> select your food and Sit back and relax as we
          swiftly deliver your food.
        </p>
      </div>

      <div className="images&description grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 w-[90%] mx-auto mt-8">
        {steps.map((step, index) => (
          <div className="flex flex-col items-center" key={index}>
            <motion.img
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={step.thumbnail}
              alt=""
            />

            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center my-2"
            >
              <h1 className={`text-[24px] text-[#363636] font-bold `}>
                <span className={`text-[40px] text-[#cfcfcf] font-bold`}>
                  {step.step}
                </span>{" "}
                {step.title}
              </h1>
            </motion.div>

            <motion.p
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-[16px] text-[#787878] text-center font-medium `}
            >
              {step.description}
            </motion.p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
