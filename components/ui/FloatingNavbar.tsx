"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LanguageContext } from "@/contexts/LanguageContext";
import { Link as ScrollLink } from 'react-scroll';

const navItemTranslations = {
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
  },
  de: {
    home: "Startseite",
    about: "Über mich",
    projects: "Projekte",
    experience: "Erfahrung",
    contact: "Kontakt",
  },
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    nameEn: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    window.addEventListener('modalOpen', handleModalOpen);
    window.addEventListener('modalClose', handleModalClose);

    return () => {
      window.removeEventListener('modalOpen', handleModalOpen);
      window.removeEventListener('modalClose', handleModalClose);
    };
  }, []);

  useEffect(() => {
    const navbar = navRef.current;
    if (navbar) {
      document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleScroll = (target: string) => {
    const element = document.getElementById(target.slice(1));
    if (element) {
      const navbarHeight = navRef.current?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 20; // 20px extra space

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!modalOpen && (
        <motion.div
          ref={navRef}
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
            className
          )}
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(17, 25, 40, 0.75)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.125)",
          }}
        >
          {navItems.map((navItem: any, idx: number) => (
            <a
              key={`link=${idx}`}
              onClick={() => handleScroll(navItem.link)}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 cursor-pointer"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="text-sm">
                {language === 'en' ? navItem.nameEn : navItem.name}
              </span>
            </a>
          ))}
          <div className="flex space-x-2 ml-2">
            <button 
              className="relative inline-flex h-6 w-6 overflow-hidden rounded-full p-[1px] focus:outline-none"
              onClick={() => setLanguage('de')}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 backdrop-blur-3xl">
                <Image src="/german-flag.png" alt="German Flag" width={16} height={16} />
              </span>
            </button>
            <button 
              className="relative inline-flex h-6 w-6 overflow-hidden rounded-full p-[1px] focus:outline-none"
              onClick={() => setLanguage('en')}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 backdrop-blur-3xl">
                <Image src="/usa.png" alt="USA Flag" width={16} height={16} />
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};