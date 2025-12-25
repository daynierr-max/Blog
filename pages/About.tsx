
import React, { useState, useEffect } from 'react';
import { AUTHOR_INFO } from '../constants';
import { generateInspirationalImage } from '../services/geminiService';

const FALLBACK_PROFILE = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000";

const About: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>(AUTHOR_INFO.image);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchPortrait = async () => {
      setIsGenerating(true);
      try {
        const img = await generateInspirationalImage("Retrato artístico de una mujer intelectual, escritora, luz de estudio suave, elegancia académica");
        if (img) setProfileImage(img);
      } catch (e) {
        console.error("No se pudo generar el retrato artístico", e);
      }
      setIsGenerating(false);
    };
    fetchPortrait();
  }, []);

  return (
    <div className="bg-[#fdfcf8] min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24 reveal">
          <div className="relative group">
            <div className={`aspect-square overflow-hidden rounded-sm shadow-2xl bg-[#f4f2ee] transition-all duration-1000 ${isGenerating ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
              <img 
                src={profileImage} 
                alt={AUTHOR_INFO.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_PROFILE;
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#a67c52] -z-10 opacity-20"></div>
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#a67c52] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          <div className="space-y-8">
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#a67c52] font-bold block">La Autora</span>
            <h1 className="text-5xl md:text-6xl font-serif text-[#2d2a26] leading-tight">{AUTHOR_INFO.name}</h1>
            <p className="text-xl font-classic italic text-[#6b665f] leading-relaxed">
              "{AUTHOR_INFO.bio}"
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a 
                href={AUTHOR_INFO.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-8 py-3 border border-[#a67c52] text-[#a67c52] text-[10px] uppercase tracking-widest font-bold hover:bg-[#a67c52] hover:text-white transition-all rounded-full"
              >
                <span>Conectar en LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="prose prose-stone max-w-none font-classic text-[#6b665f] leading-relaxed space-y-16">
          <div className="reveal">
            <h2 className="text-3xl font-serif text-[#2d2a26] italic">Mi Filosofía</h2>
            <p>
              Entiendo el mundo empresarial no solo como un intercambio de valores económicos, sino como un lienzo para el crecimiento humano. 
              <strong> Reflexiones Atemporales</strong> nace de la necesidad de encontrar un centro de gravedad en medio de la volatilidad del presente.
            </p>
          </div>

          <div className="reveal">
            <p>
              A través de mis escritos y mi labor profesional, busco tender puentes entre lo pragmático y lo profundo. Creo firmemente que la 
              mejor estrategia es aquella que se siente auténtica y que el liderazgo más efectivo es aquel que respeta los ritmos naturales 
              del pensamiento y la creatividad.
            </p>
          </div>

          <div className="py-12 border-y border-[#e5e1da] reveal">
             <blockquote className="text-2xl font-serif italic text-[#2d2a26] text-center px-12 leading-relaxed">
               "El éxito sin propósito es solo una métrica vacía. La verdadera riqueza reside en la profundidad de nuestras reflexiones y la calidad de nuestras conexiones."
             </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
