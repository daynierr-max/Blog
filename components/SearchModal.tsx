
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_POSTS } from '../constants';
import { Post } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = MOCK_POSTS.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#fdfcf8]/fb backdrop-blur-xl fade-in">
      <div className="p-8 flex justify-end">
        <button 
          onClick={onClose}
          className="group flex items-center space-x-3 text-[#6b665f] hover:text-[#2d2a26] transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Cerrar</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center px-6 pt-12">
        <div className="w-full max-w-3xl">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar pensamientos, categorías o palabras..."
            className="w-full bg-transparent border-b-2 border-[#e5e1da] py-6 text-3xl md:text-5xl font-serif text-[#2d2a26] focus:outline-none focus:border-[#a67c52] transition-colors placeholder-[#e5e1da]"
          />
          
          <div className="mt-16 space-y-12 overflow-y-auto max-h-[60vh] pb-20 scrollbar-hide">
            {query && results.length === 0 && (
              <p className="text-[#6b665f] font-classic italic text-lg text-center py-20">
                No hemos encontrado ecos de "{query}" en el archivo.
              </p>
            )}
            
            {results.map((post) => (
              <Link 
                key={post.id} 
                to={`/post/${post.id}`} 
                onClick={onClose}
                className="block group border-b border-[#e5e1da]/50 pb-8 hover:border-[#a67c52]/30 transition-colors"
              >
                <div className="flex items-center space-x-4 text-[10px] uppercase tracking-widest text-[#a67c52] mb-3 font-bold">
                  <span>{post.category}</span>
                  <span className="w-1 h-1 bg-[#e5e1da] rounded-full"></span>
                  <span className="text-[#6b665f]">{post.date}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-serif text-[#2d2a26] group-hover:text-[#a67c52] transition-colors mb-4">
                  {post.title}
                </h3>
                <p className="text-[#6b665f] font-classic line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {post.excerpt}
                </p>
              </Link>
            ))}

            {!query && (
              <div className="text-center py-20 opacity-30 select-none">
                <svg className="w-24 h-24 mx-auto text-[#e5e1da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="mt-6 text-[10px] uppercase tracking-[0.4em] font-bold text-[#6b665f]">Inicia tu búsqueda en el tiempo</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
