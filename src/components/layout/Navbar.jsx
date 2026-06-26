import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeStyle = "font-body-md text-body-md text-white font-bold border-b-2 border-white pb-1";
  const inactiveStyle = "font-body-md text-body-md text-white/85 hover:text-white transition-colors";

  const handleContactClick = () => {
    setIsOpen(false);
    if (location.pathname === '/recursos') {
      const contactSec = document.getElementById('contacto');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/recursos');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const contactSec = document.getElementById('contacto');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? 'bg-[#848c75]/90 backdrop-blur-md shadow-md py-3' : 'bg-[#848c75] py-4'} left-0 right-0`}>
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <NavLink to="/" className="flex items-center gap-3 font-headline-md text-headline-md font-semibold text-white" onClick={() => setIsOpen(false)}>
          <img
            src="/LogoR.webp"
            alt="KSA Trabajo Social"
            className="h-12 w-12 rounded-full object-cover"
          />
          <span>KSA Trabajo Social</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
            Inicio
          </NavLink>
          <NavLink to="/sobre-mi" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
            Sobre Mí
          </NavLink>
          <NavLink to="/servicios" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
            Servicios
          </NavLink>
          <NavLink to="/recursos" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
            Recursos y Contacto
          </NavLink>
        </div>

        <div className="hidden md:block">
          <button
            onClick={handleContactClick}
            className="cta-terracotta text-white px-6 py-3 rounded-full font-button text-button shadow-lg cursor-pointer"
          >
            Solicitar Asesoría
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white/85 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col space-y-4 px-margin-mobile pb-6 bg-[#848c75] border-t border-white/20 pt-4">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/sobre-mi"
            className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            onClick={() => setIsOpen(false)}
          >
            Sobre Mí
          </NavLink>
          <NavLink
            to="/servicios"
            className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            onClick={() => setIsOpen(false)}
          >
            Servicios
          </NavLink>
          <NavLink
            to="/recursos"
            className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            onClick={() => setIsOpen(false)}
          >
            Recursos y Contacto
          </NavLink>
          <button
            onClick={handleContactClick}
            className="cta-terracotta text-white px-6 py-3 rounded-full font-button text-button shadow-lg w-full text-center cursor-pointer"
          >
            Solicitar Asesoría
          </button>
        </div>
      </div>
    </nav>
  );
}
