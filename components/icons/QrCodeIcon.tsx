import React from 'react';

const QrCodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <line x1="14" y1="14" x2="14" y2="14.01" />
    <line x1="17.5" y1="14" x2="17.5" y2="14.01" />
    <line x1="14" y1="17.5" x2="14" y2="17.5" />
    <line x1="17.5" y1="17.5" x2="17.5" y2="17.5" />
    <line x1="21" y1="17.5" x2="21" y2="17.5" />
    <line x1="21" y1="21" x2="21" y2="21" />
    <line x1="17.5" y1="21" x2="17.5" y2="21" />
    <line x1="14" y1="21" x2="14" y2="21" />
  </svg>
);

export default QrCodeIcon;
