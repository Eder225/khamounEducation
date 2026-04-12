import React from 'react';

export const Logo = ({ variant = 'default', className, ...props }: { variant?: 'default' | 'white', className?: string, [key: string]: any }) => (
  <img 
    src={variant === 'white' ? "/logo-white.png" : "/logo.png"} 
    alt="Khamoun Education Logo" 
    className={className || "h-32 md:h-40 w-auto object-contain"} 
    onError={(e) => {
      // Fallback if white logo doesn't exist
      if (variant === 'white') {
        e.currentTarget.src = "/logo.png";
        e.currentTarget.className = (className || "h-32 md:h-40 w-auto object-contain") + " brightness-0 invert";
      }
    }}
    {...props}
  />
);
