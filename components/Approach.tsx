import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageContext } from "@/contexts/LanguageContext";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";

const Approach = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section className="w-full py-20">
      <h1 className="heading">
        {language === 'en' ? 'What ' : 'Das '}
        <span className="text-purple">
          {language === 'en' ? 'I do' : 'mache ich'}
        </span>
      </h1>
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        <Card
          title={language === 'en' ? "Activity" : "Tätigkeit"}
          icon={<AceternityIcon order={language === 'en' ? "Development" : "Entwicklung"} />}
          des={language === 'en' ? 
            "I enjoy developing in C# & JavaScript - often using React.js or Next.js, EntityFramework. SQL are the databases, but I also use (nosql) mongo DB and cosmos DB when required. I use MVC and MVVC as architectural patterns. For CI/CD - GitHub, Vercel and Azure Tools. I use Azure Cloud for resource connection. I also have experience with Docker and Kubernetes. My development environment is VS Code or Visual Studio." :
            "Ich entwickle gern in C# & JavaScript - dabei nutze ich oft React.js oder Next.js. EntityFramwork, SQL sind die Datenbanken, allerdings setzte ich, wenn erforderlich auch (nosql) mongo DB und cosmos DB ein. Als Architekturmuster benutze ich MVC und MVVC. Als CI/CD - GitHub, vercel sowie Azure Tools. Für die Ressourcenanbindung nutze ich Azure-Cloud. Außerdem habe ich Erfahrung in Umgang mit Docker und Kubernetes. Meine Entwicklungsumgebung ist VS Code oder Visual Studio."
          }
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
          />
        </Card>
        <Card
          title={language === 'en' ? "Technology" : "Technologie"}
          icon={<AceternityIcon order="Stack" />}
          des={language === 'en' ?
            "I use a wide variety of libraries, frameworks and technologies: ethers.js, web3.js, cryptographic libraries, JQuery, Ajax, three.js, ChatGPT, websocket, SQL, selenium, puppeteer, appium." :
            "Ich benutze ganz unterschiedliche Bibliotheken, Frameworks und Technologien: ethers.js, web3.js, Kryptographische Bibliotheken, JQuery, Ajax, three.js, ChatGpt, websocket, SQL, selenium, puperteer, appium."
          }
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
            colors={[
              [255, 166, 158],
              [221, 255, 247],
            ]}
            dotSize={2}
          />
        </Card>
        <Card
          title={language === 'en' ? "Clients" : "Kunden"}
          icon={<AceternityIcon order={language === 'en' ? "Industries" : "Branchen"} />}
          des={language === 'en' ?
            "I enjoy working for a wide variety of industries - including banks, asset managers, car rental companies, software developers, etc. Furthermore, I am both a full-stack developer and a backend developer. I implement SaaS solutions, landing pages, internal applications, CRUD interfaces. In addition, I work enthusiastically on blockchain/cryptography, mathematical/statistical models and AI." :
            "Ich arbeite gerne für ganz unterschiedliche Branchen - darunter Banken, Vermögenverwalter, Autovermieter, Softwareentwickler etc. Des Weiteren bin ich sowohl Full-Stack-Entwickler als auch Backend-Entwickler. Dabei implementiere ich SaaS-Lösung, landing Pages, interne Anwendungen, CRUD-Schnittstellen. Darüber hinaus arbeite ich mit Begeisterung an Blockchain/Kryptographie, mathematischen/statistischen Modellen und KI."
          }
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  children,
  des,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center
       dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative lg:h-[35rem] rounded-3xl "
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-10">
        <div
          className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
        group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center"
        >
          {icon}
        </div>
        <h2
          className="dark:text-white text-center text-3xl opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white 
         group-hover/canvas-card:-translate-y-2 transition duration-200"
        >
          {title}
        </h2>
        <p
          className="text-sm opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 mt-4 group-hover/canvas-card:text-white text-center
         group-hover/canvas-card:-translate-y-2 transition duration-200"
          style={{ color: "#E4ECFF" }}
        >
          {des}
        </p>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px] ">
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
          className="inline-flex h-full w-full cursor-pointer items-center 
        justify-center rounded-full bg-slate-950 px-5 py-2 text-purple backdrop-blur-3xl font-bold text-2xl"
        >
          {order}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};