"use client";

import { useState, useEffect } from "react";
import { navItems } from "@/data";
import dynamic from "next/dynamic"
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { LanguageContext } from "@/contexts/LanguageContext";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

const Home = () => {
  const [language, setLanguage] = useState<'en' | 'de'>('de');
  const [key, setKey] = useState(0);

  const changeLanguage = (lang: 'en' | 'de') => {
    setLanguage(lang);
    setKey(prevKey => prevKey + 1);
  };
  

  useEffect(() => {
 // Test POST request
    fetch('/api/log-visit', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      // .then(response => {
      //   if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      //   return response.json();
      // })
      // .then(data => console.log('Visit logged successfully:', data))
      // .catch(error => console.error('Error logging visit:', error));
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <FloatingNav navItems={navItems} />
        <div className="items-center" style={{height:'60vh', width:'100vh'}}>
        <Scene />
        </div>
        <div className="max-w-7xl w-full mx-auto"> 
        <div id="about"><Hero key={key} /></div>
          <Grid />
          <div id="projects"><RecentProjects /></div>
          <Experience />
          <Approach />
          <div id="testimonials"> <Clients /></div>
          <div id="contact">  <Footer /> </div>
         
       
        </div> 
      </main>
    </LanguageContext.Provider>
  );
};

export default Home;
