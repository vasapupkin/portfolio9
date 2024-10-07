'use client';

import dynamic from 'next/dynamic';

const ConsentBanner = dynamic(() => import('./ConsentBanner'), { ssr: false });

const ClientConsentBanner: React.FC = () => {
  return <ConsentBanner />;
};

export default ClientConsentBanner;
