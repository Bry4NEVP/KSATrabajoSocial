import React, { useState, useEffect } from 'react';

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [emailSub, setEmailSub] = useState('');
  
  useEffect(() => {
    // Scroll animation effect
    const observerOptions = {
      threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const bentoItems = document.querySelectorAll('.animate-bento');
    bentoItems.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    return () => {
      bentoItems.forEach(el => observer.unobserve(el));
    };
  }, [activeFilter]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Elena se pondrá en contacto contigo pronto.');
    e.target.reset();
  };

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (emailSub.trim()) {
      alert(`¡Gracias por suscribirte con: ${emailSub}! Recibirás nuestros recursos mensuales.`);
      setEmailSub('');
    }
  };

  const handleDownload = (e, fileTitle) => {
    e.preventDefault();
    alert(`Descargando el recurso: ${fileTitle}`);
  };

  // Resources data with categories for filtering
  const resourcesList = [
    {
      id: 'featured',
      type: 'featured',
      category: ['Artículos', 'Bienestar Social'],
      title: 'La Importancia de la Salud Mental en el Trabajo Social',
      description: 'Una mirada profunda a cómo el autocuidado profesional impacta directamente en la calidad de la intervención social.',
      tag: 'ARTÍCULO DESTACADO',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCic1UD9UtwU6-VcCeJOIgmklgOOVgv7C_BkGWMMPAfHteqp6mAPKjYFGg4xZv5OYQ0XgHfbsWOnHG85gUZgmsts6szKjwusPDIp1LVi9SdeqNGpYOvdD2wd83BXiUCnu3_ncG8qqxQyAaPFwbG_rkV7SziU0hW1g7RtZ8RmKMbzUKC94Ik1kiH5JKFuzlNAUaEm5oGE1TuYblSncBvX8-alI2O-O12YFebdWpC6j661g7bgktw-VPqH4Er8NsZUE1MCfItJ0ij81pC',
      colSpan: 'md:col-span-8'
    },
    {
      id: 'guide2024',
      type: 'download',
      category: ['Guías PDF'],
      title: 'Guía de Ayudas 2024',
      description: 'Resumen actualizado de las principales prestaciones sociales para familias en situación de vulnerabilidad.',
      icon: 'description',
      colSpan: 'md:col-span-4'
    },
    {
      id: 'mediation',
      type: 'card',
      category: ['Artículos', 'Bienestar Social'],
      title: 'Mediación Familiar',
      description: 'Consejos prácticos para la resolución de conflictos en el hogar.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAj8O1bD4bte09lFf60VUQdD72l-qKKZAte3G6dWONho3_NPNnBKmipaD8O0KFHzg5Lgc1-JiYczwYiycd5MvD28dfFb7lWJMPpH0g8jE2p7JODvUHCXmvSJyP0CHRakQl84MgUe85nC66s_EgKKo1YpJqCUllTBwb9ru21nWFRJFFGJfnQMtXBOTKFuutz-mlxKSKrZX6AgUQ1aKeC0sK4ArzyKUEc7b9TWAhSIAA7v7Oj_Ckwl7LFwDax8SET80VKpTwpwh27vr5',
      colSpan: 'md:col-span-4'
    }
  ];

  const filteredResources = activeFilter === 'Todos'
    ? resourcesList
    : resourcesList.filter(item => item.category.includes(activeFilter));

  const filterButtons = ['Todos', 'Artículos', 'Guías PDF', 'Bienestar Social'];

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSec = document.getElementById('contacto');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="pt-32 pb-section-gap overflow-x-hidden">
      {/* Hero Section for Resources */}
      <header className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16 text-center section-fade-in">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4 block">Conocimiento compartido</span>
        <h1 className="font-display-hero-mobile md:font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface mb-6">Recursos y Guías</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Herramientas, artículos y materiales prácticos diseñados para profesionales del sector social y familias que buscan orientación clara y profesional.
        </p>
      </header>

      {/* Resource Categories & Filter */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {filterButtons.map((btn) => (
            <button
              key={btn}
              onClick={() => setActiveFilter(btn)}
              className={`px-6 py-2 rounded-full font-button text-button transition-all cursor-pointer ${
                activeFilter === btn
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </section>

      {/* Bento Grid Resources */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Filtered Dynamic Items */}
          {filteredResources.map((item) => {
            if (item.type === 'featured') {
              return (
                <div 
                  key={item.id}
                  className={`${item.colSpan} animate-bento group relative overflow-hidden rounded-[24px] bg-white h-[450px] transition-transform duration-500 hover:-translate-y-1`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url('${item.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-label-caps font-label-caps mb-4">{item.tag}</span>
                    <h2 className="text-white font-headline-lg text-headline-lg mb-3">{item.title}</h2>
                    <p className="text-white/80 font-body-md text-body-md line-clamp-2 max-w-xl">{item.description}</p>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert(`Abriendo: ${item.title}`); }}
                      className="mt-6 inline-flex items-center text-white font-button text-button hover:underline gap-2"
                    >
                      Leer más <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                  </div>
                </div>
              );
            }
            
            if (item.type === 'download') {
              return (
                <div 
                  key={item.id}
                  className={`${item.colSpan} animate-bento bg-white rounded-[24px] p-8 shadow-sm flex flex-col justify-between border border-outline-variant/30 hover:border-primary transition-all`}
                >
                  <div>
                    <span className="material-symbols-outlined text-primary text-4xl mb-6">{item.icon}</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-4">{item.title}</h3>
                    <p className="text-on-surface-variant font-body-md text-body-md mb-6">{item.description}</p>
                  </div>
                  <button 
                    onClick={(e) => handleDownload(e, item.title)}
                    className="text-primary font-button text-button flex items-center gap-2 group cursor-pointer bg-transparent border-none outline-none self-start"
                  >
                    Descargar PDF <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">download</span>
                  </button>
                </div>
              );
            }
            
            if (item.type === 'card') {
              return (
                <div 
                  key={item.id}
                  className={`${item.colSpan} animate-bento bg-surface-container-low rounded-[24px] p-6 hover:shadow-md transition-all`}
                >
                  <div className="rounded-xl overflow-hidden h-48 mb-4">
                    <img className="w-full h-full object-cover" alt={item.title} src={item.image} />
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface text-lg mb-2">{item.title}</h4>
                  <p className="text-on-surface-variant font-body-md text-body-md text-sm mb-4">{item.description}</p>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); alert(`Explorando recursos de: ${item.title}`); }}
                    className="text-primary font-button text-button text-sm"
                  >
                    Ver recursos
                  </a>
                </div>
              );
            }
            
            return null;
          })}

          {/* Static Bento Blocks (shown on Todos or as layout complements) */}
          {activeFilter === 'Todos' && (
            <>
              {/* Contact Request Block */}
              <div className="md:col-span-4 animate-bento bg-white rounded-[24px] p-8 flex flex-col items-center text-center justify-center border border-dashed border-outline-variant">
                <span className="material-symbols-outlined text-primary-container text-5xl mb-4">mail</span>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2">¿Necesitas algo específico?</h4>
                <p className="text-on-surface-variant font-body-md text-body-md mb-6">Escríbeme y evaluaré la creación de nuevos materiales informativos.</p>
                <a 
                  href="#contacto" 
                  onClick={handleScrollToContact}
                  className="bg-primary/10 text-primary px-6 py-2 rounded-full font-button text-button hover:bg-primary hover:text-white transition-all cursor-pointer"
                >
                  Contactar
                </a>
              </div>

              {/* Newsletter subscription Block */}
              <div className="md:col-span-4 animate-bento bg-primary text-white rounded-[24px] p-8 flex flex-col justify-end">
                <span className="material-symbols-outlined text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h4 className="font-headline-md text-headline-md mb-2 text-white">Comunidad Pro</h4>
                <p className="text-primary-fixed font-body-md text-body-md mb-6">Únete a nuestra lista para recibir recursos exclusivos cada mes.</p>
                <form className="flex gap-2" onSubmit={handleSubscribeSubmit}>
                  <input 
                    required
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    className="bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-lg px-4 py-2 w-full focus:ring-1 focus:ring-white focus:outline-none" 
                    placeholder="Tu email" 
                    type="email"
                  />
                  <button className="bg-white text-primary p-2 rounded-lg cursor-pointer" type="submit">
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto section-gap" id="contacto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Contact Info Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-outline-variant/20 flex-grow">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">Hablemos</h2>
              <p className="text-on-surface-variant font-body-md text-body-md mb-10">
                Estoy aquí para escucharte. Ya sea una consulta profesional o una solicitud de asesoría técnica, responderé en menos de 24 horas.
              </p>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary bg-primary-fixed/30 p-3 rounded-full">call</span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant">TELÉFONO</p>
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
                    <p className="font-label-caps text-label-caps text-on-surface-variant">UBICACIÓN</p>
                    <p className="font-headline-md text-on-surface text-lg">Madrid, España</p>
                  </div>
                </li>
              </ul>
              
              <a 
                className="mt-12 flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-[16px] font-button text-button hover:opacity-90 transition-all shadow-md cursor-pointer" 
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined">chat</span> Escríbeme por WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-outline-variant/20">
              <form className="space-y-8" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="font-body-md font-bold text-on-surface" htmlFor="name">Nombre completo</label>
                    <input 
                      required
                      className="w-full px-5 py-4 bg-[#EBE8E0] border border-[#A5AD97] rounded-[16px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 text-on-surface" 
                      id="name" 
                      name="name" 
                      placeholder="Ej. Ana García" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body-md font-bold text-on-surface" htmlFor="email">Correo electrónico</label>
                    <input 
                      required
                      className="w-full px-5 py-4 bg-[#EBE8E0] border border-[#A5AD97] rounded-[16px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 text-on-surface" 
                      id="email" 
                      name="email" 
                      placeholder="ana@ejemplo.com" 
                      type="email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-body-md font-bold text-on-surface" htmlFor="subject">Asunto</label>
                  <select 
                    className="w-full px-5 py-4 bg-[#EBE8E0] border border-[#A5AD97] rounded-[16px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer text-on-surface" 
                    id="subject"
                  >
                    <option value="general">Consulta General</option>
                    <option value="asesoria">Solicitud de Asesoría</option>
                    <option value="colaboracion">Colaboración Profesional</option>
                    <option value="recursos">Duda sobre Recursos</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="font-body-md font-bold text-on-surface" htmlFor="message">Tu mensaje</label>
                  <textarea 
                    required
                    className="w-full px-5 py-4 bg-[#EBE8E0] border border-[#A5AD97] rounded-[16px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 resize-none text-on-surface" 
                    id="message" 
                    placeholder="¿En qué puedo ayudarte hoy?" 
                    rows={5}
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <input 
                    required
                    className="rounded border-[#A5AD97] text-primary focus:ring-primary h-4 w-4" 
                    id="privacy" 
                    type="checkbox"
                  />
                  <label className="text-sm text-on-surface-variant" htmlFor="privacy">
                    Acepto la <a className="underline hover:text-primary" href="#" onClick={(e) => { e.preventDefault(); alert('Política de Privacidad...'); }}>política de privacidad</a> y el tratamiento de mis datos.
                  </label>
                </div>
                
                <button 
                  className="w-full md:w-auto px-12 py-4 bg-[#D89B5C] text-white rounded-[16px] font-button text-button hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md" 
                  type="submit"
                >
                  Enviar mensaje <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
