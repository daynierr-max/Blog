
import React, { useState, useEffect } from 'react';
import { MOCK_POSTS } from '../constants';
import PostCard from '../components/PostCard';
import { generateInspirationalImage } from '../services/geminiService';

const Home: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    const img = await generateInspirationalImage("Ideas que resisten al tiempo, sabiduría antigua, luz suave y libros");
    if (img) setHeroImage(img);
    setIsGenerating(false);
  };

  useEffect(() => {
    handleGenerateImage();
  }, []);

  return (
    <div className="bg-[#fdfcf8]">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-6 bg-[#2d2a26]">
        <div className="absolute inset-0 transition-opacity duration-1000">
          {heroImage ? (
            <>
              <img 
                src={heroImage} 
                className="w-full h-full object-cover opacity-40 scale-110" 
                alt="Visión Atemporal" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fdfcf8] via-transparent to-[#2d2a26]/50"></div>
            </>
          ) : (
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:60px_60px]"></div>
          )}
        </div>

        <div className="text-center max-w-4xl z-10 fade-in-load">
          <span className="text-[10px] uppercase tracking-[0.6em] text-[#a67c52] font-bold mb-8 block">
            Un Archivo para la Mente Inquieta
          </span>
          <h1 className="text-5xl md:text-9xl font-serif font-light text-white mb-8 leading-[1.1] italic">
            Ideas que resisten al <span className="font-normal not-italic text-[#a67c52]">tiempo</span>.
          </h1>
          <p className="text-xl md:text-2xl text-stone-300 font-classic max-w-3xl mx-auto leading-relaxed mb-12 opacity-80">
            Explora las intersecciones entre la filosofía clásica y el ruido del mundo moderno. Un refugio para leer, pensar y existir.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleGenerateImage}
              disabled={isGenerating}
              className="px-10 py-4 bg-transparent border border-white/30 text-white text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-all rounded-full"
            >
              {isGenerating ? 'Destilando Esencia...' : 'Reimaginar Portada'}
            </button>
            <a href="#/lab" className="px-10 py-4 bg-[#a67c52] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-[#8e6a46] transition-all rounded-full shadow-lg shadow-[#a67c52]/20">
              Laboratorio de Ideas
            </a>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-6xl mx-auto px-6 py-32 bg-[#fdfcf8] relative z-20">
        <div className="flex flex-col items-center mb-24 reveal">
          <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#a67c52] mb-4">Crónicas del Pensamiento</h2>
          <div className="h-0.5 w-12 bg-[#e5e1da]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-32">
          <div className="lg:col-span-2 reveal">
             <PostCard post={MOCK_POSTS[0]} />
          </div>
          <div className="reveal">
            <PostCard post={MOCK_POSTS[1]} />
          </div>
          <div className="reveal">
            <PostCard post={MOCK_POSTS[2]} />
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-40 bg-[#f4f2ee] border-y border-[#e5e1da]">
        <div className="max-w-3xl mx-auto text-center px-6 reveal">
          <div className="mb-12 text-[#a67c52]">
            <svg className="w-12 h-12 mx-auto opacity-30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3H21.017V15C21.017 16.1046 20.1216 17 19.017 17H16.017V21H14.017ZM3.01701 21L3.01701 18C3.01701 16.8954 3.91244 16 5.01701 16H8.01701C8.56929 16 9.01701 15.5523 9.01701 15V9C9.01701 8.44772 8.56929 8 8.01701 8H5.01701C3.91244 8 3.01701 7.10457 3.01701 6V3H10.017V15C10.017 16.1046 9.12158 17 8.01701 17H5.01701V21H3.01701Z" />
            </svg>
          </div>
          <p className="text-3xl md:text-5xl font-serif text-[#2d2a26] leading-tight mb-10 italic">
            "No leemos para encontrar nuevas ideas, sino para que las nuestras cobren voz."
          </p>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#6b665f]">— Fragmento del Archivo</span>
        </div>
      </section>

      {/* Interactive Lab Invite */}
      <section className="max-w-6xl mx-auto px-6 py-40 reveal">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#1a1917] rounded-sm overflow-hidden shadow-2xl">
          <div className="p-12 md:p-24 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">Laboratorio de Esencias</h2>
            <p className="text-stone-400 text-lg font-classic leading-relaxed mb-10">
              Usa nuestra herramienta de introspección asistida para destilar cualquier concepto en una reflexión filosófica profunda.
            </p>
            <a href="#/lab" className="inline-block text-center px-10 py-5 bg-[#a67c52] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-[#8e6a46] transition-all">
              Iniciar Experimento
            </a>
          </div>
          <div className="hidden md:block bg-[#2d2a26] relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/ink/800/1000')] bg-cover grayscale"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1917] to-transparent"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
