import TryBurgerBuilder from "../../../Utility/FancyButton/TryBurgerBuilder/TryBurgerBuilder";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div>
      <div
        className="pb-6 sm:pb-8 lg:pb-12"
        style={{
          backgroundImage: `url("https://i.ibb.co/GWVwjYw/background-1.png")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[85%] mx-auto pt-10">
          <section className="mb-8 flex flex-col md:flex-row lg:flex-row justify-center gap-10 ">
            <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left w-5/5 md:w-3/5 lg:w-3/5">
              <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl text-center md:text-center lg:text-left">
                Taste the Magic at Your Doorstep
              </p>

              <h1 className="mb-5 md:mb-5 lg:mb-12 text-[30px] md:text-[30px] lg:text-[50px] leading-[30px] md:leading-[40px] lg:leading-[60px] font-bold text-black text-center md:text-center lg:text-left">
                Experience the Next Generation of Food Delivery Magic
              </h1>

              <div className="flex flex-col gap-2.5 sm:flex-row items-center md:items-start lg:items-start">
                <TryBurgerBuilder />
              </div>
            </div>

            <div className="w-5/5 md:w-2/5 lg:w-2/5">
              <img
                src="https://i.ibb.co/jwbhTXt/7509757-3683230-removebg-preview-1.png"
                loading="lazy"
                alt="Photo by Fakurian Design"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </section>

          <div className="mt-20">
            <h2 className="text-center text-[20px] md:text-[28px] lg:text-[40px] font-bold leading-tight text-gray-800 mb-[30px] md:mb-[50px] lg:mb-[70px]">
              Trusted by <span className="text-blue-600">Restaurents</span> all
              over Bangladesh
            </h2>
            <section className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10 justify-items-center">
              <img src="https://i.ibb.co/sJV7rfp/l1.png" alt="" />
              <img src="https://i.ibb.co/q9fn25y/l3.png" alt="" />
              <img src="https://i.ibb.co/0rdXZwt/l4.png" alt="" />
              <img src="https://i.ibb.co/gWC31nq/l2.png" alt="" />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
