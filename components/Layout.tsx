
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AUTHOR_INFO } from '../constants';
import SearchModal from './SearchModal';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Lógica de Scroll Reveal
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // Scroll al inicio en cambio de ruta
    window.scrollTo(0, 0);

    return () => observer.disconnect();
  }, [location.pathname, children]); // Re-ejecutar cuando cambia la ruta o el contenido

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Archivo', path: '/archive' },
    { name: 'Laboratorio', path: '/lab' },
    { name: 'Marlen Balboa', path: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfcf8]">
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <header className="sticky top-0 z-50 bg-[#fdfcf8]/90 backdrop-blur-md border-b border-[#e5e1da]">
        <nav className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="group">
            <h1 className="text-2xl font-serif font-bold tracking-tight text-[#2d2a26] group-hover:text-[#a67c52] transition-colors">
              Reflexiones Atemporales
            </h1>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#a67c52]/70 font-bold">Por Marlen Balboa</p>
          </Link>

          <ul className="hidden md:flex space-x-12 text-xs font-bold uppercase tracking-[0.15em] text-[#6b665f]">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`hover:text-[#2d2a26] transition-colors relative py-2 ${
                    location.pathname === item.path ? 'text-[#2d2a26]' : ''
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#a67c52]"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-6">
             <button 
               onClick={() => setIsSearchOpen(true)}
               className="text-[#6b665f] hover:text-[#a67c52] transition-colors p-2"
               aria-label="Buscar posts"
             >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
             </button>

             <a href={AUTHOR_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#6b665f] hover:text-[#a67c52] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
             </a>
             
             <button className="md:hidden text-[#2d2a26]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#1a1917] text-[#e5e1da] py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <h3 className="text-[#fdfcf8] font-serif text-2xl">Reflexiones Atemporales</h3>
            <p className="text-sm leading-relaxed text-[#9b948a]">
              Dirigido por {AUTHOR_INFO.name}. Un espacio para desacelerar y habitar el lenguaje con profundidad profesional.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[#a67c52] font-bold uppercase text-[10px] tracking-[0.2em]">Sigue el Camino</h4>
            <ul className="space-y-4 text-sm font-classic">
              <li><Link to="/about" className="hover:text-white transition-colors">Sobre Marlen Balboa</Link></li>
              <li><a href={AUTHOR_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn Profesional</a></li>
              <li><Link to="/lab" className="hover:text-white transition-colors">Laboratorio de Ideas</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[#a67c52] font-bold uppercase text-[10px] tracking-[0.2em]">Círculo de Lectura</h4>
            <p className="text-sm text-[#9b948a]">Únete a la comunidad de mentes inquietas.</p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-[#fdfcf8] px-4 py-3 text-sm focus:outline-none w-full text-[#1a1917] placeholder-[#6b665f] rounded-sm border border-transparent focus:border-[#a67c52] transition-all"
              />
              <button className="bg-[#a67c52] text-white font-bold uppercase text-[10px] tracking-[0.2em] py-3 px-6 rounded-sm hover:bg-[#8e6a46] transition-all self-start">
                Suscribirse
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-[#3d3a36] text-[9px] uppercase tracking-[0.4em] text-[#6b665f] text-center font-bold">
          Omnia mutantur, nihil interit — Todo cambia, nada perece.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
