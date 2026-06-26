import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Services() {
  const navigate = useNavigate();

  useEffect(() => {
    // Micro-interactions for service cards
    const cards = document.querySelectorAll('.service-card');
    const handleMouseEnter = (e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
    };
    const handleMouseLeave = (e) => {
      e.currentTarget.style.transform = 'translateY(0)';
    };

    cards.forEach(card => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const handleContactClick = () => {
    navigate('/recursos');
    // Scroll to contact form
    setTimeout(() => {
      const contactSec = document.getElementById('contacto');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const servicesData = [
    {
      icon: 'family_restroom',
      title: 'Intervención Familiar',
      description: 'Mediación y acompañamiento en procesos de crisis, resolución de conflictos y fortalecimiento de vínculos afectivos para garantizar un entorno seguro y saludable.'
    },
    {
      icon: 'psychology',
      title: 'Orientación Psicosocial',
      description: 'Apoyo individualizado para el desarrollo de herramientas de resiliencia, manejo de emociones y superación de barreras sociales en contextos vulnerables.'
    },
    {
      icon: 'groups',
      title: 'Trabajo Comunitario',
      description: 'Promoción de la participación ciudadana y empoderamiento de grupos locales para la autogestión de soluciones a problemas del entorno social.'
    },
    {
      icon: 'child_care',
      title: 'Atención a Niñez y Adolescencia',
      description: 'Protección de derechos y acompañamiento integral a menores en situación de riesgo, asegurando su desarrollo pleno en entornos protectores.'
    },
    {
      icon: 'assignment',
      title: 'Gestión de Proyectos',
      description: 'Diseño, ejecución y evaluación de impacto de programas sociales para ONGs, instituciones públicas y empresas con responsabilidad social.'
    },
    {
      icon: 'school',
      title: 'Capacitación y Consultoría',
      description: 'Talleres formativos para profesionales y equipos técnicos sobre ética, metodologías de intervención y gestión del bienestar social.'
    }
  ];

  return (
    <main className="pt-32 pb-section-gap">
      {/* Hero Section */}
      <header className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-20">
        <div className="max-w-3xl">
          <h1 className="font-display-hero-mobile md:font-display-hero text-display-hero-mobile md:text-display-hero text-primary mb-6">
            Servicios Profesionales
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Un enfoque humano y técnico para la transformación social. Brindo acompañamiento especializado a individuos, familias y comunidades para fortalecer el tejido social y promover el bienestar integral.
          </p>
        </div>
      </header>

      {/* Services Bento Grid */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {servicesData.map((service, index) => (
            <div 
              key={index}
              className="service-card group bg-surface-container-lowest p-8 rounded-[24px] border border-outline-variant/30 flex flex-col h-full hover:shadow-lg transition-all duration-300"
            >
              <div className="icon-container w-16 h-16 bg-primary-fixed rounded-2xl flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="material-symbols-outlined text-primary text-4xl">{service.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-4">{service.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                {service.description}
              </p>
              <div className="mt-8 pt-6 border-t border-outline-variant/20">
                <button 
                  onClick={handleContactClick}
                  className="text-primary font-button flex items-center gap-2 group-hover:translate-x-2 transition-transform cursor-pointer bg-transparent border-none outline-none"
                >
                  Saber más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <div className="bg-surface-container-low p-12 md:p-20 rounded-[48px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed opacity-30 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary-fixed opacity-30 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6 relative z-10">¿Listo para iniciar un proceso de cambio?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto relative z-10">
            Reserva una sesión inicial de asesoría para evaluar tu caso o las necesidades de tu organización. Juntos diseñaremos el mejor camino a seguir.
          </p>
          <button 
            onClick={handleContactClick}
            className="bg-[#D89B5C] text-white px-10 py-5 rounded-[16px] font-button text-button shadow-lg shadow-[#D89B5C]/20 hover:scale-105 transition-all relative z-10 cursor-pointer"
          >
            Solicitar Asesoría
          </button>
        </div>
      </section>
    </main>
  );
}
