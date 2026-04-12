import React from 'react';

interface WaveProps {
  fillColorClass: string;
  className?: string;
}

export const Wave: React.FC<WaveProps> = ({ fillColorClass, className = '' }) => {
  return (
    <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-[0] ${className}`}>
      <svg 
        className={`relative block w-full h-[40px] md:h-[80px] lg:h-[120px] ${fillColorClass}`} 
        data-name="Layer 1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        <path 
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.85,121.2,201.5,114.2,242.44,110.16,283.4,96.65,321.39,56.44Z" 
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};
