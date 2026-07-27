import { useRef } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '@/components/feature/MovieCard';
import type { Filme } from '@/mocks/filmes';

interface MovieRowProps {
  titulo: string;
  filmes: Filme[];
}

export default function MovieRow({ titulo, filmes }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (filmes.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -window.innerWidth * 0.6 : window.innerWidth * 0.6;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="mb-8 md:mb-12 group/row">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <h2 className="font-heading text-xl md:text-2xl text-white tracking-wide">
          {titulo}
        </h2>
        <Link
          to="/movies"
          className="text-xs md:text-sm text-red-500 hover:text-red-400 transition-colors duration-200 flex items-center gap-1 whitespace-nowrap"
        >
          Ver todos
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-arrow-right-s-line"></i>
          </span>
        </Link>
      </div>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-20 w-10 md:w-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 cursor-pointer rounded-r-lg"
          aria-label="Anterior"
        >
          <span className="w-8 h-8 flex items-center justify-center">
            <i className="ri-arrow-left-s-line text-2xl text-white"></i>
          </span>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-20 w-10 md:w-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 cursor-pointer rounded-l-lg"
          aria-label="Próximo"
        >
          <span className="w-8 h-8 flex items-center justify-center">
            <i className="ri-arrow-right-s-line text-2xl text-white"></i>
          </span>
        </button>

        <div
          ref={scrollRef}
          className="movie-row-scroll flex gap-3 md:gap-4 overflow-x-auto pb-3 scroll-smooth no-scrollbar"
        >
          {filmes.map((filme, index) => (
            <MovieCard key={filme.id} filme={filme} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}