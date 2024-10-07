import React, { useState, useContext } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import { LanguageContext } from "@/contexts/LanguageContext";
import Loader from "./Loader";

const Footer: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { language } = useContext(LanguageContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/submit-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue, language }),
      });
      
      if (!response.ok) {
        const text = await response.text();
        console.error('Server responded with:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResponseMessage(data.message);
      setInputValue(""); // Clear the input after submission
    } catch (error) {
      console.error('Error submitting message:', error);
      setResponseMessage(language === 'en' ? 'An error occurred. Please try again.' : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="w-full pt-20 pb-10 relative" >
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96 pointer-events-none">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="flex flex-col items-center relative z-10">
        <h1 className="heading lg:max-w-[45vw]">
          {language === 'en' ? (
            <>Here <span className="text-purple">AI</span> can help you</>
          ) : (
            <>Hier kann <span className="text-purple">AI</span> Ihnen weiterhelfen</>
          )}
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          {language === 'en' ? (
            "Please add the link with the profile/project description of your request and AI will analyze if I am the right candidate for you."
          ) : (
            "Bitte fügen Sie den Link mit der Profil/Projektbeschreibung ein und AI analysiert, ob ich für Sie der passende Kandidat bin."
          )}
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full max-w-md px-4 py-2 mb-4 text-white bg-black-200 border border-black-300 rounded-lg focus:outline-none focus:border-purple relative z-20"
          placeholder={language === 'en' ? "Insert your link here" : "Fügen Sie hier Ihren Link ein"}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <a onClick={handleSubmit} className={isLoading ? 'pointer-events-none' : ''}>
            <MagicButton
              title={isLoading ? (language === 'en' ? 'Checking...' : 'Wird geprüft...') : (language === 'en' ? 'Check' : 'Prüfen')}
              icon={isLoading ? null : <FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
        {isLoading && (
          <div className="mt-4">
            <Loader />
          </div>
        )}
        {responseMessage && !isLoading && (
          <TextGenerateEffect
            words={responseMessage}
            className="text-justify text-[15px] md:text-xl lg:text-2xl"
          />
        )}
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light mb-6 md:mb-0">
          Copyright © 2024 Oleg Golovin
        </p>

        {/* <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <a href={info.link} target="_blank" rel="noopener noreferrer">
                <img src={info.img} alt="icons" width={20} height={20} />
              </a>
            </div>
          ))}
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
