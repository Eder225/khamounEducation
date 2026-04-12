import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 cursor-pointer flex items-center" onClick={() => navigate('/')}>
             <Logo className="h-12 md:h-14 w-auto object-contain" />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => navigate('/auth')}
              className="bg-khamoun-primary text-white px-5 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-sm"
            >
              Se connecter
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-khamoun-primary"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-4 shadow-lg">
          <div className="pt-4 flex flex-col space-y-3">
            <button 
              onClick={() => navigate('/auth')}
              className="w-full text-center bg-khamoun-primary text-white font-bold py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Se connecter
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
