import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import MovieRow from '@/components/feature/MovieRow';
import { useAuth } from '@/hooks/useAuth';

function extrairYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?&]+)/,
    /(?:youtube\.com\/embed\/)([^?&]+)/,
    /(?:youtube\.com\/shorts\/)([^?&]+)/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const { user, filmesLiberados, todosOsFilmes, isAdmin } = useAuth();

  const filme = todosOsFilmes.find(f => f.id === Number(id));
  const isLiberado = isAdmin || (user && user.ativo && filmesLiberados.some(f => f.id === Number(id)));

  const trailerYoutubeId = useMemo(() => filme ? extrairYoutubeId(filme.trailerUrl) : null, [filme]);

  if (!filme) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="pt-24 md:pt-28 pb-16 px-4 md:px-8 lg:px-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center text-gray-700">
            <i className="ri-emotion-sad-line text-5xl"></i>
          </div>
          <h1 className="font-heading text-3xl text-gray-200 mb-4">Filme não encontrado</h1>
          <Link to="/movies" className="text-red-500 hover:text-red-400 transition-colors">
            Voltar para o catálogo
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relacionados = todosOsFilmes
    .filter(f => f.id !== filme.id && f.generos.some(g => filme.generos.includes(g)))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Banner Area */}
      <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
        {showTrailer && trailerYoutubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerYoutubeId}?autoplay=1&rel=0&controls=1`}
            title={`Trailer - ${filme.titulo}`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : showTrailer && filme.trailerUrl ? (
          <iframe
            src={`${filme.trailerUrl}?autoplay=1&controls=1&rel=0`}
            title={`Trailer - ${filme.titulo}`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={filme.banner}
              alt={filme.titulo}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          </>
        )}
      </div>

      <main className="relative z-10 -mt-32 md:-mt-40 px-4 md:px-8 lg:px-12 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-shrink-0 w-[180px] md:w-[220px] lg:w-[280px] mx-auto lg:mx-0 -mt-20 lg:-mt-24">
            <img
              src={filme.imagem}
              alt={filme.titulo}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {filme.generos.map(g => (
                <span key={g} className="bg-gray-900 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700">
                  {g}
                </span>
              ))}
              <span className="bg-red-600/20 text-red-400 text-xs px-2 py-1 rounded font-bold">
                {filme.classificacao}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white tracking-wide mb-4 leading-none">
              {filme.titulo}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 flex items-center justify-center text-yellow-400">
                  <i className="ri-star-fill text-sm"></i>
                </span>
                <span className="text-yellow-400 font-bold text-base">{filme.nota.toFixed(1)}</span>
              </span>
              <span className="w-0.5 h-0.5 rounded-full bg-gray-600"></span>
              <span>{filme.ano}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-gray-600"></span>
              <span>{filme.duracao}</span>
            </div>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
              {filme.sinopse}
            </p>

            {/* Botões de ação */}
            {isLiberado ? (
              <div className="flex items-center gap-3 flex-wrap mb-8">
                <button
                  onClick={() => { setShowTrailer(false); navigate(`/watch/${filme.id}`); }}
                  className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-md transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-play-fill text-lg"></i>
                  </span>
                  Assistir Agora
                </button>
                <button
                  onClick={() => setShowTrailer(!showTrailer)}
                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 font-medium text-sm rounded-md transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-film-line text-lg"></i>
                  </span>
                  Trailer
                </button>
              </div>
            ) : (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border border-yellow-800/50 rounded-xl p-5 max-w-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 flex-shrink-0 rounded-full bg-yellow-900/40 flex items-center justify-center">
                      <i className="ri-vip-crown-fill text-xl text-yellow-500"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">
                        Conteúdo Exclusivo
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm">
                        Este filme está disponível apenas para assinantes. Assine um de nossos planos para assistir ilimitado.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link
                      to="/plans"
                      className="px-6 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-white font-bold text-sm rounded-lg transition-all duration-300 whitespace-nowrap"
                    >
                      Ver Planos
                    </Link>
                    <button
                      onClick={() => setShowTrailer(!showTrailer)}
                      className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm rounded-lg transition-all duration-300 whitespace-nowrap"
                    >
                      <i className="ri-film-line mr-1.5"></i> Ver Trailer
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Diretor: </span>
                <span className="text-gray-200">{filme.diretor}</span>
              </div>
              <div>
                <span className="text-gray-500">Elenco: </span>
                <span className="text-gray-200">{filme.elenco.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {relacionados.length > 0 && (
          <div className="mt-16">
            <MovieRow titulo="Filmes Relacionados" filmes={relacionados} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}