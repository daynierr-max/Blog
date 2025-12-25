
import React, { useState } from 'react';
import { generateAIReflection } from '../services/geminiService';
import { ReflectionResponse } from '../types';

const Lab: React.FC = () => {
  const [concept, setConcept] = useState('');
  const [loading, setLoading] = useState(false);
  const [reflection, setReflection] = useState<ReflectionResponse | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept.trim()) return;

    setLoading(true);
    setReflection(null);
    const result = await generateAIReflection(concept);
    setReflection(result);
    setLoading(false);
  };

  return (
    <div className="fade-in bg-[#fdfcf8] min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-24">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#a67c52] font-bold mb-6 block">Alquimia del Pensamiento</span>
          <h1 className="text-5xl md:text-7xl font-serif italic text-[#2d2a26] mb-8">Laboratorio de Ideas</h1>
          <p className="text-[#6b665f] max-w-2xl mx-auto text-lg leading-relaxed font-classic opacity-90">
            Deposita una palabra o inquietud en el crisol. La inteligencia destilará una reflexión que trasciende lo cotidiano.
          </p>
        </header>

        <form onSubmit={handleGenerate} className="mb-24">
          <div className="flex flex-col md:flex-row gap-0 max-w-3xl mx-auto shadow-xl rounded-full overflow-hidden border border-[#e5e1da]">
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Introduce un concepto (ej. Silencio, Eternidad)..."
              className="flex-grow bg-white px-8 py-6 text-lg focus:outline-none text-[#2d2a26] font-classic placeholder-[#e5e1da]"
            />
            <button
              disabled={loading}
              className="bg-[#2d2a26] text-white px-12 py-6 font-bold uppercase tracking-widest text-[10px] hover:bg-[#a67c52] transition-colors disabled:bg-stone-300"
            >
              {loading ? 'Destilando...' : 'Destilar'}
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex flex-col items-center py-20">
            <div className="w-16 h-16 border-t-2 border-[#a67c52] rounded-full animate-spin mb-8"></div>
            <p className="text-[#6b665f] font-classic italic tracking-wide animate-pulse">Consultando los ecos del tiempo...</p>
          </div>
        )}

        {reflection && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 fade-in">
            <div className="md:col-span-7 bg-white p-12 shadow-sm border border-[#e5e1da] rounded-sm">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#a67c52] font-bold mb-8 flex items-center">
                <span className="w-8 h-px bg-[#a67c52] mr-4"></span> Perspectiva Filosófica
              </h3>
              <p className="text-xl text-[#2d2a26] leading-[1.8] font-classic">
                {reflection.philosophical}
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col gap-10">
              <div className="bg-[#2d2a26] text-[#e5e1da] p-10 rounded-sm shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3H21.017V15C21.017 16.1046 20.1216 17 19.017 17H16.017V21H14.017Z" /></svg>
                </div>
                <h3 className="text-[9px] uppercase tracking-[0.3em] text-[#a67c52] font-bold mb-6">Esencia Poética</h3>
                <p className="text-2xl font-serif italic leading-relaxed text-white">
                  "{reflection.poetic}"
                </p>
              </div>

              <div className="bg-[#f4f2ee] p-10 border border-[#e5e1da] rounded-sm">
                <h3 className="text-[9px] uppercase tracking-[0.3em] text-[#6b665f] font-bold mb-4">Contexto Histórico</h3>
                <p className="text-[#6b665f] leading-relaxed italic text-sm font-classic">
                  {reflection.historical}
                </p>
              </div>
            </div>
            
            <div className="md:col-span-12 pt-16 text-center">
              <button 
                onClick={() => {setReflection(null); setConcept('');}}
                className="text-[#a67c52] hover:text-[#2d2a26] transition-colors text-[10px] uppercase tracking-[0.4em] font-bold py-4 border-b border-[#a67c52]/30"
              >
                Nueva Exploración
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lab;
