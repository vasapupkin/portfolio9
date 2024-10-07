"use client";

import { useState, useContext } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { LanguageContext } from "@/contexts/LanguageContext";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import MagicButton from "./MagicButton";
import ProjectModal from "./ProjectModal";

// Define the Project type
type Project = {
  id: number;
  title: string;
  titleEn: string;
  des: string;
  desEn: string;
  img: string;
  iconLists: string[];
  link: string;
  stack: string;
  src: string;
};

const RecentProjects = () => {
  const { language } = useContext(LanguageContext);
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const showMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 4, projects.length));
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="py-20" >
      <h1 className="heading">
        {language === 'en' ? 'My' : 'Meine'} <span className="text-purple">{language === 'en' ? 'Projects' : 'Projekte'}</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.slice(0, visibleProjects).map((item: Project) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw] cursor-pointer"
            key={item.id}
            onClick={() => openModal(item)}
          >
            <PinContainer title={language === 'en' ? "more..." : "weiterlesen..."}>
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                <img
                  src={item.img}
                  alt="cover"
                  className="z-10 absolute bottom-0"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {language === 'en' ? item.titleEn : item.title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {language === 'en' ? item.desEn : item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                   <img 
                     src={item.src} 
                     alt="Tech stack icons"
                     className="w-3/5" // This makes the image 80% of its original size
                   />
                  {/* {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="icon5" className="p-2" />
                    </div>
                  ))} */}
                </div>

                {/* <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    Check Live Site
                  </p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div> */}
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
      
      {visibleProjects < projects.length && (
        <div className="flex justify-center mt-10">
          <MagicButton
            title={language === 'en' ? "See More" : "Mehr sehen"}
            icon={<FaLocationArrow />}
            position="right"
            handleClick={showMoreProjects}
          />
        </div>
      )}

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
};

export default RecentProjects;
