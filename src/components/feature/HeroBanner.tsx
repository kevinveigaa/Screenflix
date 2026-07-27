import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { filmesDestaque } from '@/mocks/filmes';
import type { Filme } from '@/mocks/filmes';

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const semFilmes = filmesDestaque.length === 0;
  const filme: Filme | undefined = filmesDestaque[currentIndex];

  const goTo = useCallback((index: number) => {
    if (isTransitioning || semFilmes) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, semFilmes]);

  useEffect(() => {
    if (semFilmes) return;
    const timer = setInterval(() => {
      goTo((currentIndex + 1) % filmesDestaque.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, goTo, semFilmes]);

  // Placeholder quando não há filmes no catálogo
  if (semFilmes || !filme) {
    return (
      <div className="relative w-full h-[500px] md:h-[620px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.15)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6 rounded-full bg-red-600/20">
            <i className="ri-film-line text-4xl md:text-5xl text-red-500"></i>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wide">
            Catálogo Vazio
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mb-8">
            Ainda não há filmes no catálogo. Acesse o painel de administração para adicionar seus primeiros filmes.
          </p>
          <Link
            to="/admin"
            className="px-6 py-3 md:px-8 md:py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm md:text-base rounded-md transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <i className="ri-settings-3-line text-lg"></i>
            </span>
            Painel Admin
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 md:h-36 pointer-events-none">
          <div
            className="absolute inset-x-0 bottom-0 h-full"
            style={{
              background: 'linear-gradient(to top, rgb(0,0,0) 0%, rgb(0,0,0) 55%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0) 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 -bottom-[1px] h-16 md:h-20"
            style={{
              borderRadius: '100% 100% 0 0 / 100% 100% 0 0',
              background: 'rgb(0,0,0)',
              transform: 'scaleX(1.5)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] md:h-[620px] lg:h-[700px] overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: isTransitioning ? 0.4 : 1 }}
      >
        <img
          src={filme.banner}
          alt={filme.titulo}
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-12 pb-16 md:pb-20 lg:pb-28">
        <div className="max-w-2xl animate-fade-in-up" key={filme.id}>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              EM DESTAQUE
            </span>
            <span className="text-gray-400 text-sm">{filme.ano}</span>
            <span className="text-gray-400 text-sm">{filme.duracao}</span>
            <span className="bg-gray-800/80 text-gray-300 text-xs px-1.5 py-0.5 rounded">
              {filme.classificacao}
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl text-white mb-4 tracking-wide leading-none">
            {filme.titulo}
          </h1>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-3 max-w-xl">
            {filme.sinopse}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to={`/movie/${filme.id}`}
              className="px-6 py-3 md:px-8 md:py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm md:text-base rounded-md transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <i className="ri-play-fill text-lg"></i>
              </span>
              Assistir
            </Link>
            <Link
              to={`/movie/${filme.id}`}
              className="px-6 py-3 md:px-8 md:py-3.5 bg-gray-700/50 hover:bg-gray-600/50 text-white font-medium text-sm md:text-base rounded-md transition-all duration-300 flex items-center gap-2 backdrop-blur-sm whitespace-nowrap"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <i className="ri-information-line text-lg"></i>
              </span>
              Mais Informações
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 right-4 md:right-8 lg:right-12 flex items-center gap-2">
        {filmesDestaque.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-6 h-1.5 bg-red-600'
                : 'w-1.5 h-1.5 bg-gray-500/40 hover:bg-gray-400/70'
            }`}
          />
        ))}
      </div>

      {/* Curved gradient divider — estilo Netflix */}
      <div className="absolute bottom-0 left-0 right-0 h-28 md:h-36 pointer-events-none">
        <div
          className="absolute inset-x-0 bottom-0 h-full"
          style={{
            background: 'linear-gradient(to top, rgb(0,0,0) 0%, rgb(0,0,0) 55%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 -bottom-[1px] h-16 md:h-20"
          style={{
            borderRadius: '100% 100% 0 0 / 100% 100% 0 0',
            background: 'rgb(0,0,0)',
            transform: 'scaleX(1.5)',
          }}
        />
      </div>
    </div>
  );
}