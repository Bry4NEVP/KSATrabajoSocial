import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-on-primary-fixed-variant w-full pt-section-gap pb-12 text-on-primary">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="md:col-span-1">
          <div className="font-headline-md text-headline-md text-on-primary mb-6">KSA</div>
          <p className="font-body-md text-primary-fixed mb-8">
            Trabajo Social con alma y rigor técnico para un futuro más justo.
          </p>
        </div>
        <div>
          <h5 class="text-white font-bold mb-6">Navegación</h5>
          <ul className="space-y-4 font-body-md">
            <li>
              <Link to="/" className="text-primary-fixed hover:text-on-primary transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/sobre-mi" className="text-primary-fixed hover:text-on-primary transition-colors">
                Sobre Mí
              </Link>
            </li>
            <li>
              <Link to="/servicios" className="text-primary-fixed hover:text-on-primary transition-colors">
                Servicios
              </Link>
            </li>
            <li>
              <Link to="/recursos" className="text-primary-fixed hover:text-on-primary transition-colors">
                Recursos y Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-6">Legal</h5>
          <ul className="space-y-4 font-body-md">
            <li>
              <a href="#" className="text-primary-fixed hover:text-on-primary transition-colors">
                Privacidad
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-fixed hover:text-on-primary transition-colors">
                Aviso Legal
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-fixed hover:text-on-primary transition-colors">
                Cookies
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-6">Redes Sociales</h5>
          <div className="flex gap-4">
            <a
              href="https://ksa-trabajo-social.vercel.app/"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-tertiary-fixed hover:text-primary transition-colors"
              aria-label="Sitio web"
            >
              <span className="material-symbols-outlined">public</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-tertiary-fixed hover:text-primary transition-colors"
              aria-label="Email"
            >
              <span className="material-symbols-outlined">mail</span>
            </a>
            <a
              href="https://www.instagram.com/trabajadorasocial.col/"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-tertiary-fixed hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-white/10 text-center px-margin-mobile">
        <p className="font-body-md text-primary-fixed text-sm opacity-60">
          © {new Date().getFullYear()} KSA. Todos los derechos reservados. Compromiso con el bienestar social.
        </p>
      </div>
    </footer>
  );
}
