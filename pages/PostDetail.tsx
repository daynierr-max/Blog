
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_POSTS, AUTHOR_INFO } from '../constants';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = MOCK_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-40 text-center bg-[#fdfcf8]">
        <h2 className="text-3xl font-serif mb-8 text-[#2d2a26]">El pensamiento ha expirado o no existe.</h2>
        <Link to="/" className="text-[#a67c52] font-bold uppercase text-[10px] tracking-widest border-b border-[#a67c52] pb-1 hover:text-[#2d2a26] hover:border-[#2d2a26] transition-all">Regresar al portal</Link>
      </div>
    );
  }

  return (
    <div className="fade-in bg-[#fdfcf8]">
      <article className="max-w-5xl mx-auto px-6 py-24">
        <header className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 text-[9px] uppercase tracking-[0.3em] text-[#a67c52] mb-8 font-bold">
            <span>{post.category}</span>
            <span className="w-1 h-1 bg-[#e5e1da] rounded-full"></span>
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-[#e5e1da] rounded-full"></span>
            <span>{post.readingTime} de calma</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-[#2d2a26] mb-12 leading-[1.1]">
            {post.title}
          </h1>
        </header>

        <div className="aspect-[21/10] mb-24 overflow-hidden rounded-sm shadow-2xl relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="prose prose-stone prose-lg md:prose-xl text-[#2d2a26]/90 leading-[1.9] font-classic selection:bg-[#e8e2d5]">
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-10 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#a67c52]">
                {paragraph}
              </p>
            ))}
          </div>

          <footer className="mt-32 pt-12 border-t border-[#e5e1da] flex flex-col md:flex-row items-center justify-between gap-8">
            <Link to="/about" className="flex items-center space-x-6 group">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[#f4f2ee] border border-[#e5e1da]">
                <img src={AUTHOR_INFO.image} alt={AUTHOR_INFO.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#a67c52]">Autoría</span>
                <span className="text-[#6b665f] text-sm font-classic group-hover:text-[#2d2a26] transition-colors">{AUTHOR_INFO.name}</span>
              </div>
            </Link>
            
            <div className="flex space-x-6">
              <a href={AUTHOR_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#6b665f] hover:text-[#a67c52] transition-colors text-[10px] uppercase tracking-widest font-bold">
                LinkedIn
              </a>
              <button className="text-[#6b665f] hover:text-[#a67c52] transition-colors text-[10px] uppercase tracking-widest font-bold">
                Copiar Enlace
              </button>
            </div>
          </footer>
        </div>
      </article>

      {/* Recommended Reading */}
      <section className="bg-[#f4f2ee] py-32 border-t border-[#e5e1da]">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#6b665f] mb-16 text-center">Continuar la Senda</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {MOCK_POSTS.filter(p => p.id !== id).slice(0, 2).map(p => (
              <Link key={p.id} to={`/post/${p.id}`} className="group block">
                <div className="aspect-[16/9] overflow-hidden mb-6 rounded-sm bg-[#e5e1da]">
                  <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" alt={p.title} />
                </div>
                <h4 className="font-serif text-2xl text-[#2d2a26] group-hover:text-[#a67c52] transition-colors leading-snug">{p.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
