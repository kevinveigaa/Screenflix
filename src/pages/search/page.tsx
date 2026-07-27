import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { useAuth } from '@/hooks/useAuth';

export default function Search() {
  const [query, setQuery] = useState('');
  const { todosOsFilmes, user, filmesLiberados } = useAuth();

  const resultados = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return todosOsFilmes.filter(f =>
      f.titulo.toLowerCase().includes(q) ||
      f.generos.some(g => g.toLowerCase().includes(q)) ||
      f.diretor.toLowerCase().includes(q) ||
      f.elenco.some(a => a.toLowerCase().includes(q))
    );
  }, [query, todosOsFilmes]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="font-heading text-4xl md:text-5xl text-white tracking-wide mb-6 text-center">
            Buscar
          </h1>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar filmes, gêneros, atores..."
              className="w-full px-5 py-4 pl-12 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300"
              autoFocus
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500">
              <i className="ri-search-line text-lg"></i>
            </div>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors"
              >
                <i className="ri-close-line"></i>
              </button>
            )}
          </div>
        </div>

        {query.trim() === '' && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-900">
              <i className="ri-search-line text-3xl text-gray-600"></i>
            </div>
            <p className="text-gray-500 text-lg">Digite algo para buscar no catálogo.</p>
            <p className="text-gray-600 text-sm mt-2">
              Busque por títulos, gêneros, diretores ou atores.
            </p>

            <div className="mt-12">
              <h3 className="font-heading text-xl text-gray-300 mb-5 tracking-wide">Gêneros populares</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['Ação', 'Comédia', 'Terror', 'Ficção Científica', 'Romance', 'Documentários'].map(gen => (
                  <button
                    key={gen}
                    onClick={() => setQuery(gen)}
                    className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-full text-gray-400 hover:text-gray-200 text-sm transition-all duration-300 whitespace-nowrap"
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {query.trim() !== '' && (
          <>
            <p className="text-gray-500 text-sm mb-6">
              {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'} para &quot;{query}&quot;
            </p>

            {resultados.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
                {resultados.map((filme, index) => {
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
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-gray-700">
                  <i className="ri-emotion-sad-line text-4xl"></i>
                </div>
                <p className="text-gray-500 text-lg">Nenhum resultado encontrado.</p>
                <p className="text-gray-600 text-sm mt-1">Tente outros termos de busca.</p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}