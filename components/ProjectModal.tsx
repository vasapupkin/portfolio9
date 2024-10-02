import { useContext, useEffect } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { FaLocationArrow } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

interface ProjectModalProps {
  project: {
    title: string;
    titleEn: string;
    des: string;
    desEn: string;
    img: string;
    iconLists: string[];
    link: string;
    stack: string;
  };
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[6000] p-4">
      <div className="bg-[#13162D] rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{language === 'en' ? project.titleEn : project.title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow custom-scrollbar">
          <div className="relative h-64 mb-4 overflow-hidden rounded-xl">
            <img src="/bg.png" alt="bgimg" className="absolute inset-0 w-full h-full object-cover" />
            <img src={project.img} alt="cover" className="absolute bottom-0 left-1/2 transform -translate-x-1/2" />
          </div>
          <p className="text-[#BEC1DD] mb-1">{language === 'en' ? "Project Description:" : "Projektbeschreibung:"}</p>
          <p className="text-[#BEC1DD] mb-4">{language === 'en' ? project.desEn : project.des}</p>
          <p className="text-[#BEC1DD] mb-1">Stack:</p>
          <div className="flex items-center justify-between">
            <p className="text-[#BEC1DD] mb-4 text-sm">{project.stack}</p>
          </div>
        </div>
        {project.link !== '' && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple hover:underline mt-4">
            {language === 'en' ? "Check Live Site" : "Live-Seite ansehen"}
            <FaLocationArrow className="ml-2" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
