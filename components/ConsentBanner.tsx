'use client';

import React, { useState, useEffect, useContext } from 'react';
import MagicButton from './MagicButton';
import { LanguageContext } from '@/contexts/LanguageContext';

const ConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { language } = useContext(LanguageContext);
  const [bannerText, setBannerText] = useState('');
  const [acceptText, setAcceptText] = useState('');
  const [declineText, setDeclineText] = useState('');

  useEffect(() => {
    const consent = localStorage.getItem('dataConsentGiven');
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    setBannerText(language === 'en' 
      ? "We collect anonymized visit data to improve our site. Do you consent?" 
      : "Wir sammeln anonymisierte Besuchsdaten, um unsere Website zu verbessern. Stimmen Sie zu?");
    setAcceptText(language === 'en' ? "Accept" : "Akzeptieren");
    setDeclineText(language === 'en' ? "Decline" : "Ablehnen");
  }, [language]);

  const giveConsent = () => {
    localStorage.setItem('dataConsentGiven', 'true');
    setShowBanner(false);
  };

  const denyConsent = () => {
    localStorage.setItem('dataConsentGiven', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <p className="text-sm">{bannerText}</p>
        <div className="flex space-x-2">
          <MagicButton
            title={acceptText}
            handleClick={giveConsent}
            icon={<span>✓</span>}
            position="left"
            otherClasses="!bg-[#161A31] text-xs py-1 px-2"
          />
          <MagicButton
            title={declineText}
            handleClick={denyConsent}
            icon={<span>✕</span>}
            position="left"
            otherClasses="!bg-[#161A31] text-xs py-1 px-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
