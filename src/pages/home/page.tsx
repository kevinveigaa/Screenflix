import { useEffect, useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import HeroBanner from '@/components/feature/HeroBanner';
import MovieRow from '@/components/feature/MovieRow';
import Top10Row from '@/components/feature/Top10Row';
import FeatureCards from '@/components/feature/FeatureCards';
import FAQ from '@/components/feature/FAQ';
import { useAuth } from '@/hooks/useAuth';
import type { Filme } from '@/mocks/filmes';

function getFilmesPorCategoria(filmes: Filme[], categoria: string): Filme[] {
  return filmes.filter(f => f.categoria === categoria);
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const { todosOsFilmes } = useAuth();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const emAlta = getFilmesPorCategoria(todosOsFilmes, 'Em Alta');
  const aclamados = getFilmesPorCategoria(todosOsFilmes, 'Aclamados');
  const acao = getFilmesPorCategoria(todosOsFilmes, 'Ação');
  const comedia = getFilmesPorCategoria(todosOsFilmes, 'Comédia');
  const terror = getFilmesPorCategoria(todosOsFilmes, 'Terror');
  const ficcao = getFilmesPorCategoria(todosOsFilmes, 'Ficção Científica');
  const documentarios = getFilmesPorCategoria(todosOsFilmes, 'Documentários');
  const outros = todosOsFilmes.filter(f =>
    !['Em Alta', 'Aclamados', 'Ação', 'Comédia', 'Terror', 'Ficção Científica', 'Documentários'].includes(f.categoria)
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroBanner />

      <main className={`relative z-10 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top 10 estilo Netflix */}
        <div className="px-4 md:px-8 lg:px-12 pt-2">
          {emAlta.length > 0 && <Top10Row titulo="Brasil: Top 10 de Hoje" filmes={emAlta} />}
        </div>

        <div className="space-y-2 md:space-y-4 px-4 md:px-8 lg:px-12">
          {aclamados.length > 0 && <MovieRow titulo="Aclamados pela Crítica" filmes={aclamados} />}
          {acao.length > 0 && <MovieRow titulo="Ação e Aventura" filmes={acao} />}
          {ficcao.length > 0 && <MovieRow titulo="Ficção Científica" filmes={ficcao} />}
          {comedia.length > 0 && <MovieRow titulo="Comédia" filmes={comedia} />}
          {terror.length > 0 && <MovieRow titulo="Terror e Suspense" filmes={terror} />}
          {outros.length > 0 && <MovieRow titulo="Mais Populares" filmes={outros} />}
          {documentarios.length > 0 && <MovieRow titulo="Documentários" filmes={documentarios} />}
        </div>

        {/* Feature cards — Mais Razões para Usar */}
        <FeatureCards />

        {/* FAQ */}
        <FAQ />

        {/* CTA final */}
        <div className="px-4 md:px-8 lg:px-12 pb-8 pt-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white text-base md:text-lg mb-4">
              Pronto para começar a maratonar?
            </p>
            <a
              href="/plans"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm md:text-base rounded-md transition-all duration-300 whitespace-nowrap"
            >
              Ver Planos
              <span className="w-5 h-5 flex items-center justify-center">
                <i className="ri-arrow-right-line"></i>
              </span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}