import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import HeroBanner from '@/components/feature/HeroBanner';
import MovieRow from '@/components/feature/MovieRow';
import Top10Row from '@/components/feature/Top10Row';
import FeatureCards from '@/components/feature/FeatureCards';
import FAQ from '@/components/feature/FAQ';
import { useAuth } from '@/hooks/useAuth';
function getFilmesPorCategoria(filmes, categoria) {
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
    const outros = todosOsFilmes.filter(f => !['Em Alta', 'Aclamados', 'Ação', 'Comédia', 'Terror', 'Ficção Científica', 'Documentários'].includes(f.categoria));
    return (_jsxs("div", { className: "min-h-screen bg-black", children: [_jsx(Navbar, {}), _jsx(HeroBanner, {}), _jsxs("main", { className: `relative z-10 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`, children: [_jsx("div", { className: "px-4 md:px-8 lg:px-12 pt-2", children: emAlta.length > 0 && _jsx(Top10Row, { titulo: "Brasil: Top 10 de Hoje", filmes: emAlta }) }), _jsxs("div", { className: "space-y-2 md:space-y-4 px-4 md:px-8 lg:px-12", children: [aclamados.length > 0 && _jsx(MovieRow, { titulo: "Aclamados pela Cr\u00EDtica", filmes: aclamados }), acao.length > 0 && _jsx(MovieRow, { titulo: "A\u00E7\u00E3o e Aventura", filmes: acao }), ficcao.length > 0 && _jsx(MovieRow, { titulo: "Fic\u00E7\u00E3o Cient\u00EDfica", filmes: ficcao }), comedia.length > 0 && _jsx(MovieRow, { titulo: "Com\u00E9dia", filmes: comedia }), terror.length > 0 && _jsx(MovieRow, { titulo: "Terror e Suspense", filmes: terror }), outros.length > 0 && _jsx(MovieRow, { titulo: "Mais Populares", filmes: outros }), documentarios.length > 0 && _jsx(MovieRow, { titulo: "Document\u00E1rios", filmes: documentarios })] }), _jsx(FeatureCards, {}), _jsx(FAQ, {}), _jsx("div", { className: "px-4 md:px-8 lg:px-12 pb-8 pt-4", children: _jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [_jsx("p", { className: "text-white text-base md:text-lg mb-4", children: "Pronto para come\u00E7ar a maratonar?" }), _jsxs("a", { href: "/plans", className: "inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm md:text-base rounded-md transition-all duration-300 whitespace-nowrap", children: ["Ver Planos", _jsx("span", { className: "w-5 h-5 flex items-center justify-center", children: _jsx("i", { className: "ri-arrow-right-line" }) })] })] }) })] }), _jsx(Footer, {})] }));
}
