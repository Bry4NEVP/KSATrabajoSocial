import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { submitContactForm } from '../lib/contactApi';

export default function Home() {
  const [contactStatus, setContactStatus] = useState({ type: 'idle', message: '' });

  useEffect(() => {
    // Scroll animation effect on load/scroll
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

    const cards = document.querySelectorAll('.animate-on-scroll');
    cards.forEach(card => {
      card.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
      observer.observe(card);
    });

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setContactStatus({ type: 'loading', message: 'Enviando tu solicitud...' });

    try {
      await submitContactForm(form, 'home');
      setContactStatus({ type: 'success', message: 'Gracias por tu mensaje. Te contactaremos pronto.' });
      form.reset();
    } catch (error) {
      setContactStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <header className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
        <div className="order-2 md:order-1">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-label-caps text-label-caps mb-6">
            TRABAJO SOCIAL PROFESIONAL
          </span>
          <h1 className="font-display-hero-mobile md:font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface leading-tight mb-8">
            Acompañando personas, familias y comunidades hacia el <span className="text-primary italic">bienestar social.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
            Transformando realidades a través de la intervención profesional, la empatía y un compromiso inquebrantable con la dignidad humana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/recursos"
              className="cta-terracotta text-white px-8 py-4 rounded-full font-button text-button shadow-lg text-center cursor-pointer"
            >
              Solicitar Asesoría
            </Link>
            <Link
              to="/sobre-mi"
              className="border-2 border-primary text-primary px-8 py-4 rounded-full font-button text-button hover:bg-primary/5 transition-colors text-center cursor-pointer"
            >
              Mi trayectoria
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2 relative h-[500px] md:h-[650px]">
          <div className="absolute inset-0 rounded-[48px] overflow-hidden soft-shadow bg-surface-container-highest">
            <img
              className="w-full h-full object-cover"
              alt="Keythnaren portrait"
              src="/Retrato1.webp"
            />
          </div>

          {/* Floating Cards */}
          <div className="hidden md:flex absolute -left-6 top-1/4 glass-card p-5 rounded-card soft-shadow items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-white">
              <span className="material-symbols-outlined">group</span>
            </div>
            <div>
              <p className="font-body-md font-bold text-on-surface">Bienestar Familiar</p>
              <p className="text-xs text-on-surface-variant">Intervención integral</p>
            </div>
          </div>

          <div className="hidden md:flex absolute -right-4 bottom-1/4 glass-card p-5 rounded-card soft-shadow items-center gap-4 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">diversity_3</span>
            </div>
            <div>
              <p className="font-body-md font-bold text-on-surface">Inclusión Social</p>
              <p className="text-xs text-on-surface-variant">Derechos garantizados</p>
            </div>
          </div>

          <div className="hidden md:flex absolute left-1/4 -bottom-6 glass-card p-5 rounded-card soft-shadow items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">public</span>
            </div>
            <div>
              <p className="font-body-md font-bold text-on-surface">Desarrollo Comunitario</p>
              <p className="text-xs text-on-surface-variant">Impacto local</p>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Metrics Section */}
      <section className="bg-surface-container-low py-16">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
          <div className="flex flex-col items-center">
            <span className="font-headline-lg text-headline-lg text-primary mb-2">6+</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">Años de experiencia</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-headline-lg text-headline-lg text-primary mb-2">500+</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">Familias acompañadas</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-headline-lg text-headline-lg text-primary mb-2">20+</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">Proyectos sociales</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-headline-lg text-headline-lg text-primary mb-2">100%</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">Compromiso ético</span>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-square rounded-[40px] overflow-hidden soft-shadow border-8 border-white">
              <img
                className="w-full h-full object-cover"
                alt="Empatía y apoyo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFLtcSajRcSS4EVmopMCKfk3KrtkIUSdU2gOpHQX_lNzIJpV5mGD2_MErr5Olp4ozZGrJ98xhWp53x7AAgyg8OCmgv6RqeOVf7gy2lMnHxYICmrQsPrEDar8Q1Id3pck9clfXHal0nZYiJVO2yLm0SIj8aiC6Ql8tvHCrc00a981FsBwC1pPhndm3Ud4Hod_0MztGYphu8tPVqWUpXe3AwsY_mq4zdVIoNVf8112qzOkwBtRcTlnsaG_cP-iltVRZoXuHXadombkDP"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-full flex items-center justify-center p-8 text-white text-center font-bold text-lg leading-tight hidden md:flex">
              Escuchar  Comprender  Acompañar
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Mi Misión Profesional</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
              Acompaño a las personas en sus procesos de cambio desde una mirada humana, ética y respetuosa. Creo que escuchar, comprender y trabajar en conjunto permite fortalecer capacidades, generar nuevas oportunidades y contribuir al bienestar de las familias y las comunidades.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <p className="font-body-md text-on-surface"><span className="font-bold">Empatía:</span> Escucha activa y acompañamiento respetuoso en cada proceso.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <p className="font-body-md text-on-surface"><span className="font-bold">Etica Profesional:</span>Intervenciones responsables, transparentes y centradas en la dignidad humana.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <p className="font-body-md text-on-surface"><span className="font-bold">Compromiso Social:</span> Trabajo orientado al fortalecimiento de personas, familias y comunidades.</p>
              </div>
            </div>
            <Link
              to="/sobre-mi"
              className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform cursor-pointer"
            >
              Conoce más sobre mi trayectoria <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="bg-surface py-section-gap">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Servicios de Intervención</h2>
            <p className="font-body-md text-on-surface-variant">Soluciones especializadas para desafíos sociales complejos, desde el ámbito individual hasta el comunitario.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Service Card 1 */}
            <div className="animate-on-scroll bg-white p-8 rounded-[32px] soft-shadow hover:bg-primary hover:text-white transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-white/20 flex items-center justify-center text-primary group-hover:text-white mb-8 transition-colors">
                <span className="material-symbols-outlined text-4xl">home</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-4">Intervención Familiar</h3>
              <p className="font-body-md group-hover:text-white/80 mb-6">Mediación en conflictos y diseño de planes de convivencia para fortalecer el núcleo familiar.</p>
              <ul className="space-y-2 mb-8 group-hover:text-white/90">
                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-sm">chevron_right</span> Orientación parental</li>
                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-sm">chevron_right</span> Gestión de crisis</li>
              </ul>
            </div>

            {/* Service Card 2 (Large) */}
            <div className="animate-on-scroll bg-primary text-white p-8 rounded-[32px] soft-shadow md:col-span-1 md:row-span-2 flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-8">
                  <span className="material-symbols-outlined text-4xl">psychology</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-4">Orientación Psicosocial</h3>
                <p className="font-body-md text-white/80 mb-8">Acompañamiento individualizado para superar barreras sociales y mejorar la salud mental comunitaria.</p>
              </div>
              <div>
                <div className="bg-white/10 rounded-2xl p-6 mb-8">
                  <p className="italic mb-2 text-sm">"Un enfoque integral que considera el entorno como clave de la sanación."</p>
                </div>
                <Link
                  to="/servicios"
                  className="w-full block text-center bg-white text-primary px-6 py-3 rounded-full font-button hover:bg-white/90 transition-colors"
                >
                  Detalles del servicio
                </Link>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="animate-on-scroll bg-white p-8 rounded-[32px] soft-shadow hover:bg-tertiary hover:text-white transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-tertiary/10 group-hover:bg-white/20 flex items-center justify-center text-tertiary group-hover:text-white mb-8 transition-colors">
                <span className="material-symbols-outlined text-4xl">school</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-4">Peritaje Social</h3>
              <p className="font-body-md group-hover:text-white/80 mb-6">Informes periciales rigurosos para procesos judiciales, custodias y dependencia.</p>
              <ul className="space-y-2 group-hover:text-white/90">
                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-sm">chevron_right</span> Evaluación técnica</li>
                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-sm">chevron_right</span> Ratificación judicial</li>
              </ul>
            </div>

            {/* Service Card 4 */}
            <div className="animate-on-scroll bg-white p-8 rounded-[32px] soft-shadow hover:bg-secondary hover:text-white transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 group-hover:bg-white/20 flex items-center justify-center text-secondary group-hover:text-white mb-8 transition-colors">
                <span className="material-symbols-outlined text-4xl">groups</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-4">Tercer Sector</h3>
              <p className="font-body-md group-hover:text-white/80 mb-6">Asesoría a ONGs y fundaciones en el diseño y evaluación de proyectos de impacto social.</p>
            </div>

            {/* Service Card 5 */}
            <div className="animate-on-scroll bg-surface-container-high p-8 rounded-[32px] soft-shadow flex flex-col justify-center items-center text-center">
              <h3 className="font-headline-md text-headline-md mb-4 text-primary">¿Necesitas algo específico?</h3>
              <p className="font-body-md text-on-surface-variant mb-6">Diseñamos intervenciones a medida según cada realidad social.</p>
              <Link
                to="/recursos"
                className="cta-terracotta text-white px-8 py-3 rounded-full font-button"
              >
                Consultar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Timeline */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-center mb-16">Metodología de Trabajo</h2>
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-8 left-0 w-full h-1 bg-primary-fixed -translate-y-1/2 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-card md:rounded-none soft-shadow md:shadow-none">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-headline-md text-headline-md mb-6 z-10">1</div>
              <h4 className="font-headline-md text-headline-md text-on-surface mb-2">Diagnóstico</h4>
              <p className="font-body-md text-on-surface-variant">Análisis profundo de la situación, necesidades y recursos disponibles.</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-card md:rounded-none soft-shadow md:shadow-none">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-headline-md text-headline-md mb-6 z-10">2</div>
              <h4 className="font-headline-md text-headline-md text-on-surface mb-2">Plan de Acción</h4>
              <p className="font-body-md text-on-surface-variant">Diseño de objetivos claros y estrategias de intervención personalizadas.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-card md:rounded-none soft-shadow md:shadow-none">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-headline-md text-headline-md mb-6 z-10">3</div>
              <h4 className="font-headline-md text-headline-md text-on-surface mb-2">Intervención</h4>
              <p className="font-body-md text-on-surface-variant">Ejecución del plan mediante acompañamiento activo y mediación.</p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-card md:rounded-none soft-shadow md:shadow-none">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-headline-md text-headline-md mb-6 z-10">4</div>
              <h4 className="font-headline-md text-headline-md text-on-surface mb-2">Seguimiento</h4>
              <p className="font-body-md text-on-surface-variant">Evaluación de resultados y ajustes para garantizar la sostenibilidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary-fixed/30 py-section-gap">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <h2 className="font-headline-lg text-headline-lg text-center mb-16">Voces de Confianza</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Ricardo S. */}
            <div className="animate-on-scroll bg-white p-10 rounded-card soft-shadow relative">
              <span className="material-symbols-outlined text-6xl text-primary/10 absolute top-4 right-8 select-none">format_quote</span>
              <p className="font-body-lg text-body-lg italic text-on-surface mb-8">
                "La intervención de Elena fue el punto de inflexión que nuestra familia necesitaba. Su profesionalidad y calidez humana nos devolvieron la esperanza en un momento crítico."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-variant overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Ricardo S."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO80iccO1UDfUKyp7lTuWJZX5oDSMom3N5yIPrgBtZ8ELHxklMOKiabyMvPdKFf-Y8PGSvr3DfBWPGCQZ6jWlS8enuQiWzfIdr0MWsfwvLH7Bw3yfq5fEiCpqCsh5ccVod6HuRC0R8IFCgKyOgX4okalgDLWR-_sIiwUAQE7K5iK9QpmaLO9Kfg08gbzVCD40x6otmwueDbpZOMaGVi912Of9HNn8SI6QhfB1lk5UougZHQUdPWGpb_4Zw3Pb3SM6GVaL48OgmQqJF"
                  />
                </div>
                <div>
                  <p className="font-bold text-on-surface">Ricardo S.</p>
                  <p className="text-sm text-on-surface-variant">Padre de familia</p>
                </div>
              </div>
            </div>

            {/* Marta G. */}
            <div className="animate-on-scroll bg-white p-10 rounded-card soft-shadow relative">
              <span className="material-symbols-outlined text-6xl text-primary/10 absolute top-4 right-8 select-none">format_quote</span>
              <p className="font-body-lg text-body-lg italic text-on-surface mb-8">
                "Como directora de una fundación, contar con la asesoría técnica de Elena ha elevado el nivel de nuestros proyectos sociales de manera exponencial. Rigor y ética pura."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-variant overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Marta G."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTlaN0MXjj8oSvJ2PNYmFjuiLIWaP473GaFVEeyOIbisA3EL1MQJkbFHyAPvdWNPMsqbVN_jnpQoq0siAce4ZLU7yJd6ycLQWsLFfweo7hwqgOddmlEbiy_HkcpYiJd-u5hbjqIuhwlVSaIZqJhOX_-JVtPQsKCC5z4iMyewSYK3RL4VIMl7204jYDyfI4oaTcaKWSXk6FXKvHn6GS8jtKZrzCwVT6WttyX4irx2eenrXNllt8S1IgnHyRo09IAp2kRQqluhggY9O-"
                  />
                </div>
                <div>
                  <p className="font-bold text-on-surface">Marta G.</p>
                  <p className="text-sm text-on-surface-variant">Directora Fundación Ágora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="contacto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-outline-variant/20 flex-grow">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">Hablemos</h2>
              <p className="text-on-surface-variant font-body-md text-body-md mb-10">
                Estoy aqui para escucharte. Ya sea una consulta profesional o una solicitud de asesoria tecnica, respondere en menos de 24 horas.
              </p>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary bg-primary-fixed/30 p-3 rounded-full">call</span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant">TELEFONO</p>
                    <p className="font-headline-md text-on-surface text-lg">+34 600 000 000</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary bg-primary-fixed/30 p-3 rounded-full">mail</span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant">EMAIL</p>
                    <p className="font-headline-md text-on-surface text-lg">hola@elenamarin.social</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary bg-primary-fixed/30 p-3 rounded-full">location_on</span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant">UBICACION</p>
                    <p className="font-headline-md text-on-surface text-lg">Barranquilla, Colombia</p>
                  </div>
                </li>
              </ul>

              <a
                className="mt-12 flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-[16px] font-button text-button hover:opacity-90 transition-all shadow-md cursor-pointer"
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined">chat</span> Escribeme por WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-outline-variant/20">
              <form className="space-y-8" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="font-body-md font-bold text-on-surface" htmlFor="home-name">Nombre completo</label>
                    <input
                      required
                      className="w-full px-5 py-4 bg-[#EBE8E0] border border-[#A5AD97] rounded-[16px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 text-on-surface"
                      id="home-name"
                      name="name"
                      placeholder="Ej. Ana Garcia"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body-md font-bold text-on-surface" htmlFor="home-email">Correo electronico</label>
                    <input
                      required
                      className="w-full px-5 py-4 bg-[#EBE8E0] border border-[#A5AD97] rounded-[16px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 text-on-surface"
                      id="home-email"
                      name="email"
                      placeholder="ana@ejemplo.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-body-md font-bold text-on-surface" htmlFor="home-subject">Sobre que te gustaria recibir orientacion?</label>
                  <select
                    className="w-full px-5 py-4 bg-[#EBE8E0] border border-[#A5AD97] rounded-[16px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer text-on-surface"
                    id="home-subject"
                    name="inquiryType"
                  >
                    <option value="orientacion-familiar">Orientacion familiar</option>
                    <option value="apoyo-psicosocial">Apoyo psicosocial</option>
                    <option value="desarrollo-comunitario">Desarrollo comunitario</option>
                    <option value="capacitacion">Capacitacion</option>
                    <option value="consulta-profesional">Consulta profesional</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-body-md font-bold text-on-surface" htmlFor="home-message">Tu mensaje</label>
                  <textarea
                    required
                    className="w-full px-5 py-4 bg-[#EBE8E0] border border-[#A5AD97] rounded-[16px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 resize-none text-on-surface"
                    id="home-message"
                    name="message"
                    placeholder="En que puedo ayudarte hoy?"
                    rows={5}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    required
                    className="rounded border-[#A5AD97] text-primary focus:ring-primary h-4 w-4"
                    id="home-privacy"
                    name="privacyAccepted"
                    type="checkbox"
                  />
                  <label className="text-sm text-on-surface-variant" htmlFor="home-privacy">
                    Acepto la <a className="underline hover:text-primary" href="#" onClick={(e) => { e.preventDefault(); alert('Politica de Privacidad...'); }}>politica de privacidad</a> y el tratamiento de mis datos.
                  </label>
                </div>

                <button
                  className="w-full md:w-auto px-12 py-4 bg-[#D89B5C] text-white rounded-[16px] font-button text-button hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={contactStatus.type === 'loading'}
                  type="submit"
                >
                  {contactStatus.type === 'loading' ? 'Enviando...' : 'Enviar mensaje'} <span className="material-symbols-outlined">send</span>
                </button>
                {contactStatus.message && (
                  <p className={`font-body-md text-body-md ${contactStatus.type === 'error' ? 'text-error' : 'text-primary'}`}>
                    {contactStatus.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
