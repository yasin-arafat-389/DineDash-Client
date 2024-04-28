/* eslint-disable react/prop-types */
import { useMemo, useRef } from "react";
import BrowseFoods from "../../../Utility/FancyButton/BrowseFoods/BrowseFoods";
import "./HeroSection.css";
import { useInView } from "framer-motion";

const HeroSection = () => {
  const images = useMemo(
    () => ["./bk-logo.png", "./ph-logo.png", "./kfc-logo.png", "./bq-logo.png"],
    []
  );

  // Animation refs
  const titleRef = useRef(null);
  const imagesRef = useRef(null);
  const heroSectionRef = useRef(null);

  const isInView = useInView(titleRef, { once: false });
  const isImageInView = useInView(imagesRef, { once: false });
  const isHeroSectionInView = useInView(heroSectionRef, { once: false });

  return (
    <div>
      <div
        className="pb-6 sm:pb-8 lg:pb-12"
        style={{
          backgroundImage: `url("./hero-bg.png")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[85%] mx-auto pt-10">
          <section
            className="mb-8 flex flex-col md:flex-row lg:flex-row justify-center gap-10 "
            ref={heroSectionRef}
          >
            <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left w-5/5 md:w-3/5 lg:w-3/5">
              <p
                className={`mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl text-center md:text-center lg:text-left ${
                  isHeroSectionInView
                    ? `translate-y-0 duration-[0.6s] opacity-100 ease-in-out`
                    : `translate-y-[50px] opacity-0 ease-in-out`
                }`}
              >
                Taste the Magic at Your Doorstep
              </p>

              <h1
                className={`mb-5 md:mb-5 lg:mb-12 text-[30px] md:text-[30px] lg:text-[50px] leading-[30px] md:leading-[40px] lg:leading-[60px] font-bold text-black text-center md:text-center lg:text-left ${
                  isHeroSectionInView
                    ? `translate-y-0 duration-[0.6s] opacity-100 delay-[0.3s] ease-in-out`
                    : `translate-y-[50px] opacity-0 ease-in-out`
                }`}
              >
                Experience the Next Generation of Food Delivery Magic
              </h1>

              <div
                className={`flex flex-col gap-2.5 sm:flex-row items-center md:items-start lg:items-start my-5 md:my-0 lg:my-5  ${
                  isHeroSectionInView
                    ? `translate-y-0 duration-[0.6s] opacity-100 delay-[0.5s] ease-in-out`
                    : `translate-y-[50px] opacity-0 ease-in-out`
                }`}
              >
                <BrowseFoods />
              </div>
            </div>

            <div className="w-5/5 md:w-2/5 lg:w-2/5 overflow-hidden">
              <img
                src="./delivery-hero.png"
                loading="lazy"
                alt="Photo by Fakurian Design"
                className={`h-full w-full object-cover object-center ${
                  isHeroSectionInView
                    ? `translate-x-0 duration-[0.8s] ease-in-out`
                    : `translate-x-[550px]`
                }`}
              />
            </div>
          </section>

          <div className="mt-[100px] text-center">
            <div className="w-[75%] mx-auto overflow-hidden">
              <h2
                ref={titleRef}
                className={`text-[20px] md:text-[28px] lg:text-[40px] font-bold leading-tight text-gray-800 mb-[30px] md:mb-[50px] lg:mb-[70px] ${
                  isInView
                    ? "translate-y-0 opacity-100 duration-[1200ms] ease-in-out"
                    : "translate-y-[100px] opacity-0"
                }`}
              >
                Trusted by <span className="text-blue-600">Restaurants</span>{" "}
                all over Bangladesh
              </h2>
            </div>

            <section
              ref={imagesRef}
              className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10 justify-items-center"
            >
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Image ${index}`}
                  className={`w-[100px] md:w-[60%] lg:w-[60%] ${
                    isImageInView
                      ? `translate-y-0 duration-1000 ease-in-out opacity-100`
                      : `translate-y-[-100px] opacity-0`
                  }`}
                  style={{
                    transitionDelay: isImageInView ? `${index * 0.5}s` : "0s",
                  }}
                />
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
