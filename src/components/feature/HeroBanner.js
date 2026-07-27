import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { filmesDestaque } from '@/mocks/filmes';
export default function HeroBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const semFilmes = filmesDestaque.length === 0;
    const filme = filmesDestaque[currentIndex];
    const goTo = useCallback((index) => {
        if (isTransitioning || semFilmes)
            return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 700);
    }, [isTransitioning, semFilmes]);
    useEffect(() => {
        if (semFilmes)
            return;
        const timer = setInterval(() => {
            goTo((currentIndex + 1) % filmesDestaque.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [currentIndex, goTo, semFilmes]);
    // Placeholder quando não há filmes no catálogo
    if (semFilmes || !filme) {
        return (_jsxs("div", { className: "relative w-full h-[500px] md:h-[620px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.15)_0%,transparent_70%)]" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/30" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" }), _jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center px-4", children: [_jsx("div", { className: "w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6 rounded-full bg-red-600/20", children: _jsx("i", { className: "ri-film-line text-4xl md:text-5xl text-red-500" }) }), _jsx("h1", { className: "font-heading text-3xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wide", children: "Cat\u00E1logo Vazio" }), _jsx("p", { className: "text-gray-400 text-sm md:text-base max-w-lg mb-8", children: "Ainda n\u00E3o h\u00E1 filmes no cat\u00E1logo. Acesse o painel de administra\u00E7\u00E3o para adicionar seus primeiros filmes." }), _jsxs(Link, { to: "/admin", className: "px-6 py-3 md:px-8 md:py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm md:text-base rounded-md transition-all duration-300 flex items-center gap-2 whitespace-nowrap", children: [_jsx("span", { className: "w-5 h-5 flex items-center justify-center", children: _jsx("i", { className: "ri-settings-3-line text-lg" }) }), "Painel Admin"] })] }), _jsxs("div", { className: "absolute bottom-0 left-0 right-0 h-28 md:h-36 pointer-events-none", children: [_jsx("div", { className: "absolute inset-x-0 bottom-0 h-full", style: {
                                background: 'linear-gradient(to top, rgb(0,0,0) 0%, rgb(0,0,0) 55%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0) 100%)',
                            } }), _jsx("div", { className: "absolute inset-x-0 -bottom-[1px] h-16 md:h-20", style: {
                                borderRadius: '100% 100% 0 0 / 100% 100% 0 0',
                                background: 'rgb(0,0,0)',
                                transform: 'scaleX(1.5)',
                            } })] })] }));
    }
    return (_jsxs("div", { className: "relative w-full h-[500px] md:h-[620px] lg:h-[700px] overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 transition-opacity duration-700", style: { opacity: isTransitioning ? 0.4 : 1 }, children: _jsx("img", { src: filme.banner, alt: filme.titulo, className: "w-full h-full object-cover object-top" }) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/30" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-12 pb-16 md:pb-20 lg:pb-28", children: _jsxs("div", { className: "max-w-2xl animate-fade-in-up", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("span", { className: "bg-red-600 text-white text-xs font-bold px-2 py-1 rounded", children: "EM DESTAQUE" }), _jsx("span", { className: "text-gray-400 text-sm", children: filme.ano }), _jsx("span", { className: "text-gray-400 text-sm", children: filme.duracao }), _jsx("span", { className: "bg-gray-800/80 text-gray-300 text-xs px-1.5 py-0.5 rounded", children: filme.classificacao })] }), _jsx("h1", { className: "font-heading text-4xl md:text-5xl lg:text-7xl text-white mb-4 tracking-wide leading-none", children: filme.titulo }), _jsx("p", { className: "text-gray-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-3 max-w-xl", children: filme.sinopse }), _jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [_jsxs(Link, { to: `/movie/${filme.id}`, className: "px-6 py-3 md:px-8 md:py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm md:text-base rounded-md transition-all duration-300 flex items-center gap-2 whitespace-nowrap", children: [_jsx("span", { className: "w-5 h-5 flex items-center justify-center", children: _jsx("i", { className: "ri-play-fill text-lg" }) }), "Assistir"] }), _jsxs(Link, { to: `/movie/${filme.id}`, className: "px-6 py-3 md:px-8 md:py-3.5 bg-gray-700/50 hover:bg-gray-600/50 text-white font-medium text-sm md:text-base rounded-md transition-all duration-300 flex items-center gap-2 backdrop-blur-sm whitespace-nowrap", children: [_jsx("span", { className: "w-5 h-5 flex items-center justify-center", children: _jsx("i", { className: "ri-information-line text-lg" }) }), "Mais Informa\u00E7\u00F5es"] })] })] }, filme.id) }), _jsx("div", { className: "absolute bottom-6 md:bottom-8 right-4 md:right-8 lg:right-12 flex items-center gap-2", children: filmesDestaque.map((_, index) => (_jsx("button", { onClick: () => goTo(index), className: `transition-all duration-300 rounded-full ${index === currentIndex
                        ? 'w-6 h-1.5 bg-red-600'
                        : 'w-1.5 h-1.5 bg-gray-500/40 hover:bg-gray-400/70'}` }, index))) }), _jsxs("div", { className: "absolute bottom-0 left-0 right-0 h-28 md:h-36 pointer-events-none", children: [_jsx("div", { className: "absolute inset-x-0 bottom-0 h-full", style: {
                            background: 'linear-gradient(to top, rgb(0,0,0) 0%, rgb(0,0,0) 55%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0) 100%)',
                        } }), _jsx("div", { className: "absolute inset-x-0 -bottom-[1px] h-16 md:h-20", style: {
                            borderRadius: '100% 100% 0 0 / 100% 100% 0 0',
                            background: 'rgb(0,0,0)',
                            transform: 'scaleX(1.5)',
                        } })] })] }));
}
