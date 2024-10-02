import { useContext } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { heroText } from "@/data/textContent";
import { LanguageContext } from "@/contexts/LanguageContext";

const Hero = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="pb-20">
      <div className="flex justify-center relative z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[80vw] flex flex-col items-center justify-center">
          <TextGenerateEffect
            words={heroText[language].mainDescription}
            className="text-justify text-[15px] md:text-xl lg:text-2xl"
          />
          {/* <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            {heroText[language].introduction}
          </p>

          <a href="#about">
            <MagicButton
              title={heroText[language].buttonText}
              icon={<FaLocationArrow />}
              position="right"
            />
          </a> */}
        </div>
      </div>
    </div>
  );
};


export default Hero;
