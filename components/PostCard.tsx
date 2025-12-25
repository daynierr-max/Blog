
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <article className="group cursor-pointer">
      <Link to={`/post/${post.id}`}>
        <div className="overflow-hidden mb-8 aspect-[16/10] bg-[#f4f2ee] rounded-sm relative shadow-inner">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>
        </div>
        
        <div className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.2em] text-[#a67c52] mb-4 font-bold">
          <span>{post.category}</span>
          <span className="w-1 h-1 bg-[#e5e1da] rounded-full"></span>
          <span className="text-[#6b665f]">{post.date}</span>
        </div>
        
        <h2 className="text-2xl md:text-4xl font-serif font-light text-[#2d2a26] mb-4 group-hover:text-[#a67c52] transition-colors leading-[1.2]">
          {post.title}
        </h2>
        
        <p className="text-[#6b665f] leading-relaxed mb-6 font-classic text-base md:text-lg opacity-85">
          {post.excerpt}
        </p>
        
        <div className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#2d2a26] border-b border-transparent group-hover:border-[#a67c52] transition-all pb-1">
          Sumergirse en la lectura
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 ml-3 text-[#a67c52]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
