"use client";

import React, { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { companies, testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Clients = () => {
  const { language } = useContext(LanguageContext);

  const translatedTestimonials = testimonials.map(testimonial => ({
    ...testimonial,
    quote: language === 'en' ? testimonial.quoteEn : testimonial.quote,
    title: language === 'en' ? testimonial.titleEn : testimonial.title,
  }));

  return (
    <section className="py-20">
      <h1 className="heading">
        {language === 'en' ? 'Some' : 'Ein paar'}
        <span className="text-purple"> {language === 'en' ? 'References' : 'Referenzen'}</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={translatedTestimonials}
            direction="right"
            speed="slow"
          />
        </div>
{/* 
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map((company) => (
            <React.Fragment key={company.id}>
              <div className="flex md:max-w-60 max-w-32 gap-2">
                <img
                  src={company.img}
                  alt={company.name}
                  className="md:w-10 w-5"
                />
                <img
                  src={company.nameImg}
                  alt={company.name}
                  width={company.id === 4 || company.id === 5 ? 100 : 150}
                  className="md:w-24 w-20"
                />
              </div>
            </React.Fragment>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Clients;
