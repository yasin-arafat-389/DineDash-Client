/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const AddIngredients = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const text = texts[index];
    let display = "";
    let charIndex = 0;

    const interval = setInterval(() => {
      display += text[charIndex];
      setDisplayedText(display);
      charIndex++;

      if (charIndex === text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDisplayedText("");
          setIndex((index + 1) % texts.length);
        }, 1000); // Pause between texts
      }
    }, 100); // Speed of typing

    return () => clearInterval(interval);
  }, [index, texts]);

  return (
    <div className="text-center">
      <h1 className="text-lg font-bold text-gray-800 leading-tight">
        <span className="inline-block">
          <span className="animate-typewriter text-teal-500">
            {displayedText}
          </span>
        </span>
      </h1>
    </div>
  );
};

export default AddIngredients;
