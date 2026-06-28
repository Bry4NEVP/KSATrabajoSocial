import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll animation effect for cards
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    const hoverCards = document.querySelectorAll('.hover-lift');
    hoverCards.forEach(card => {
      card.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
      observer.observe(card);
    });

    return () => {
      hoverCards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const handleContactClick = () => {
    navigate('/recursos');
    // Scroll to contact form after navigation
    setTimeout(() => {
      const contactSec = document.getElementById('contacto');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <main className="mt-32">
      {/* Hero Section: Editorial Storytelling */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          {/* Portrait with soft decorative background */}
          <div className="md:col-span-5 relative group">
            <div className="absolute -top-6 -left-6 w-full h-full bg-primary-fixed rounded-[40px] -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
            <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-lg">
              <img
                className="w-full h-full object-cover"
                alt="Keythnaren editorial portrait"
                src="/Retrato2.webp"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 hidden md:block">
              <div className="bg-surface-container-highest p-8 rounded-2xl shadow-xl border border-outline-variant max-w-[240px] glass-card">
                <p className="font-headline-md text-primary text-2xl italic leading-snug">"El cambio social comienza con la dignidad individual."</p>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="md:col-span-6 md:col-start-7 mt-12 md:mt-0">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block mb-4">Sobre mi trayectoria</span>
            <h1 className="font-display-hero-mobile md:font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface mb-8 leading-tight">keythnaren Sandoval Acuña</h1>
            <div className="space-y-6 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              <p>
                Soy Keythnaren Sandoval Acuña, Trabajadora Social con
                seis años de experiencia acompañando procesos de
                intervención familiar, orientación psicosocial y desarrollo
                comunitario, promoviendo el bienestar, la inclusión y la
                dignidad humana mediante un acompañamiento ético y cercano.
              </p>
              <p>
                A lo largo de más de 15 años de carrera, he navegado por contextos diversos—desde el apoyo directo a familias en crisis hasta la consultoría estratégica para instituciones públicas. Mi enfoque no es simplemente resolver problemas, sino empoderar a los individuos para que recuperen su propia autonomía.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="w-12 h-[2px] bg-tertiary-container"></div>
                <span className="font-label-caps text-on-surface font-bold">Trabajadora Social Colegiada · Consultora · Formadora</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Mission & Values (Bento Grid) */}
      <section className="bg-surface-container-low py-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Propósito y Valores</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Los pilares que sostienen cada una de mis intervenciones y colaboraciones profesionales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-10 rounded-[32px] border border-outline-variant hover-lift">
              <div className="w-14 h-14 bg-primary-fixed flex items-center justify-center rounded-2xl mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">favorite</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Empatía Radical</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Escucha activa y comprensión profunda del contexto humano antes de proponer cualquier solución técnica.</p>
            </div>

            {/* Value 2 (Larger Focus) */}
            <div className="bg-primary text-on-primary p-10 rounded-[32px] md:scale-105 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 flex items-center justify-center rounded-2xl mb-8">
                  <span className="material-symbols-outlined text-white text-3xl">shield_with_heart</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-4 text-white">Dignidad Humana</h3>
                <p className="font-body-md text-body-md opacity-90 text-white/90">El centro de mi labor es proteger y promover los derechos fundamentales de cada persona, sin excepciones.</p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-10 rounded-[32px] border border-outline-variant hover-lift">
              <div className="w-14 h-14 bg-primary-fixed flex items-center justify-center rounded-2xl mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">verified</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Integridad Ética</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Compromiso innegociable con la transparencia, la confidencialidad y el rigor profesional en cada informe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic & Certifications (Asymmetric Layout) */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Formación y Acreditaciones</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
              Mi compromiso con la excelencia me impulsa a una actualización constante. Creo en el rigor académico como base de la práctica social.
            </p>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#848C75]/10 rounded-full text-primary border border-primary/20">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              <span className="font-label-caps text-[10px] uppercase tracking-tighter">Miembro del Colegio de Trabajo Social</span>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-12 mt-12 lg:mt-0">
            {/* Academic Block 1 */}
            <div className="flex gap-8 group">
              <div className="flex-shrink-0 w-[2px] bg-outline-variant relative">
                <div className="absolute top-0 -left-1.5 w-4 h-4 rounded-full bg-primary transition-all group-hover:scale-150"></div>
              </div>
              <div>
                <span className="font-label-caps text-tertiary mb-2 block">2008 — 2012</span>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2">Grado en Trabajo Social</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Corporacion Universitaria Del Caribe CECAR. Sincelejo, Colombia.</p>
              </div>
            </div>

            {/* Academic Block 2 */}
            <div className="flex gap-8 group">
              <div className="flex-shrink-0 w-[2px] bg-outline-variant relative">
                <div className="absolute top-0 -left-1.5 w-4 h-4 rounded-full bg-primary transition-all group-hover:scale-150"></div>
              </div>
              <div>
                <span className="font-label-caps text-tertiary mb-2 block">2014 — 2015</span>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2">Máster en Mediación de Conflictos</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Instituto de Mediación Social. Enfoque en resolución extrajudicial de conflictos familiares y comunitarios.</p>
              </div>
            </div>

            {/* Certifications Block */}
            <div className="flex gap-8 group">
              <div className="flex-shrink-0 w-[2px] bg-outline-variant relative">
                <div className="absolute top-0 -left-1.5 w-4 h-4 rounded-full bg-primary transition-all group-hover:scale-150"></div>
              </div>
              <div>
                <span className="font-label-caps text-tertiary mb-2 block">Certificaciones</span>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-surface p-4 rounded-xl border border-outline-variant">
                    <span className="material-symbols-outlined text-primary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                    <h5 className="font-body-md font-bold text-on-surface text-sm">Pobreza Energética</h5>
                    <p className="text-xs text-on-surface-variant">Acreditación Nacional para Evaluación Técnica.</p>
                  </div>
                  <div className="bg-surface p-4 rounded-xl border border-outline-variant">
                    <span className="material-symbols-outlined text-primary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                    <h5 className="font-body-md font-bold text-on-surface text-sm">Salud Mental Comunitaria</h5>
                    <p className="text-xs text-on-surface-variant">Especialista en Acompañamiento Psicosocial.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mb-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto rounded-[40px] overflow-hidden relative">
          <div className="absolute inset-0 bg-[#575f4a] opacity-95"></div>
          <div
            className="absolute inset-0 bg-cover bg-center -z-10"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBttsqNYPFcr3zZYEy2CD61vT5LchA-NYYq9Br6Iq3ScskT-BB8RuXFtP5w12qA9nWjV5R43P3Xp18aco0tEWErZIKvoyMV_wwZNup7q4WIjBqut5O18nzQcC53Y3fnhtxT0MH_Nraq8K2i3k27_AfUlEVf4Y-7-yZPC8Xe5NW1dJe_6DgzE4kfIRpfEI3ZeEhv_0W2xO7_2hRJ-7LE_XikLBZEAGx_qVbAuG-bTbcrPojQOT1DNBwi5YC2HWzTXameTRlSIPdntXY5')" }}
          ></div>
          <div className="relative z-10 px-8 py-20 md:py-32 flex flex-col items-center text-center">
            <h2 className="font-display-hero-mobile md:font-headline-lg text-white mb-6">¿Hablamos sobre cómo puedo ayudarte?</h2>
            <p className="font-body-lg text-white/80 max-w-xl mb-12">Estoy aquí para escuchar tu historia y trabajar juntos en una estrategia de bienestar social adaptada a tus necesidades o las de tu organización.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleContactClick}
                className="bg-[#D89B5C] text-white px-10 py-5 rounded-full font-button text-button shadow-lg hover:shadow-xl hover:opacity-90 transition-all cursor-pointer"
              >
                Agendar Primera Cita
              </button>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Descargando currículum...'); }}
                className="border-2 border-white/30 text-white px-10 py-5 rounded-full font-button text-button hover:bg-white/10 transition-all text-center"
              >
                Descargar CV Completo
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
