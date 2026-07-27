import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { categorias } from '@/mocks/filmes';
import { useAuth } from '@/hooks/useAuth';

export default function Movies() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const { todosOsFilmes, user, filmesLiberados } = useAuth();

  const filmesFiltrados = filtroAtivo === 'Todos'
    ? todosOsFilmes
    : todosOsFilmes.filter(f => f.categoria === filtroAtivo || f.generos.includes(filtroAtivo));

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-16 px-4 md:px-8 lg:px-12">
        <div className="mb-8">
          <h1 className="font-heading text-4xl md:text-5xl text-white tracking-wide mb-2">
            Todos os Filmes
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Explore nosso catálogo completo
          </p>
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 flex-wrap">
          <button
            onClick={() => setFiltroAtivo('Todos')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              filtroAtivo === 'Todos'
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-gray-200 hover:bg-gray-800'
            }`}
          >
            Todos
          </button>
          {categorias.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setFiltroAtivo(cat.nome)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                filtroAtivo === cat.nome
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          {filmesFiltrados.map((filme, index) => {
            const isLiberado = !user || filmesLiberados.some(f => f.id === filme.id);
            return (
              <Link
                key={filme.id}
                to={`/movie/${filme.id}`}
                className="group relative animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900">
                  <img
                    src={filme.imagem}
                    alt={filme.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {!isLiberado && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <div className="text-center px-2">
                        <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center bg-gray-800 rounded-full">
                          <i className="ri-lock-line text-lg text-gray-400"></i>
                        </div>
                        <span className="text-gray-400 text-[10px] md:text-xs font-medium">Premium</span>
                      </div>
                    </div>
                  )}
                  {isLiberado && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center">
                          <i className="ri-play-fill text-2xl text-white ml-0.5"></i>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 backdrop-blur-sm rounded text-xs font-bold text-yellow-400">
                        {filme.nota.toFixed(1)}
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-gray-200 text-sm font-medium truncate">{filme.titulo}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{filme.ano} • {filme.duracao}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {filmesFiltrados.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-gray-700">
              <i className="ri-movie-2-line text-4xl"></i>
            </div>
            <p className="text-gray-500 text-lg">Nenhum filme encontrado nesta categoria.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}