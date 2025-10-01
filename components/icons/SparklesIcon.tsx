
import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M9.9 2.1c.1-.6.5-1.1 1-1.3" />
    <path d="M14.1 2.1c-.1-.6-.5-1.1-1-1.3" />
    <path d="m12 5.5 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
    <path d="M4.2 7.1c.3-.5.8-.8 1.4-.8" />
    <path d="M18.4 7.1c-.3-.5-.8-.8-1.4-.8" />
    <path d="m6.5 12 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
    <path d="M9.9 21.9c.1.6.5 1.1 1 1.3" />
    <path d="M14.1 21.9c-.1.6-.5 1.1-1 1.3" />
    <path d="m17.5 12 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
  </svg>
);

export default SparklesIcon;
