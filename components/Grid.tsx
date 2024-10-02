import { useContext } from 'react';
import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { LanguageContext } from "@/contexts/LanguageContext";

const Grid = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section >
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={language === 'en' ? item.titleEn || item.title : item.title}
            description={language === 'en' ? item.descriptionEn || item.description : item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
