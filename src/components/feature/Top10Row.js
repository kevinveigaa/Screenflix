import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Link } from 'react-router-dom';
export default function Top10Row({ titulo, filmes }) {
    const scrollRef = useRef(null);
    const scroll = (direction) => {
        if (!scrollRef.current)
            return;
        const scrollAmount = direction === 'left' ? -400 : 400;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };
    const top10Filmes = filmes.slice(0, 10);
    return (_jsxs("section", { className: "mb-10 md:mb-14", children: [_jsxs("div", { className: "flex items-center justify-between mb-5 md:mb-6 px-4 md:px-8 lg:px-12", children: [_jsx("h2", { className: "font-heading text-xl md:text-2xl text-white tracking-wide", children: titulo }), _jsxs(Link, { to: "/movies", className: "text-xs md:text-sm text-red-500 hover:text-red-400 transition-colors duration-200 flex items-center gap-1 whitespace-nowrap", children: ["Ver todos", _jsx("span", { className: "w-4 h-4 flex items-center justify-center", children: _jsx("i", { className: "ri-arrow-right-s-line" }) })] })] }), _jsxs("div", { className: "relative group", children: [_jsx("button", { onClick: () => scroll('left'), className: "absolute left-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer", "aria-label": "Anterior", children: _jsx("span", { className: "w-8 h-8 flex items-center justify-center", children: _jsx("i", { className: "ri-arrow-left-s-line text-2xl text-white" }) }) }), _jsx("div", { ref: scrollRef, className: "flex overflow-x-auto pb-4 scroll-smooth px-4 md:px-8 lg:px-12 gap-3 md:gap-4 no-scrollbar", children: top10Filmes.map((filme, index) => (_jsxs(Link, { to: `/movie/${filme.id}`, className: "group/item relative flex-shrink-0 flex items-end gap-0 cursor-pointer", style: { width: 'auto' }, children: [_jsxs("span", { className: "font-heading leading-none select-none self-end -mr-2 md:-mr-4 z-10", style: {
                                        fontSize: 'clamp(80px, 12vw, 140px)',
                                        WebkitTextStroke: '3px #404040',
                                        color: 'transparent',
                                        fontWeight: 700,
                                        textShadow: 'none',
                                        position: 'relative',
                                    }, children: [_jsx("span", { style: {
                                                position: 'absolute',
                                                WebkitTextStroke: '0px',
                                                color: '#e5e5e5',
                                                fontWeight: 900,
                                            }, children: index + 1 }), index + 1] }), _jsxs("div", { className: "relative flex-shrink-0 w-[120px] md:w-[160px] lg:w-[180px] aspect-[2/3] rounded-lg overflow-hidden bg-gray-900 ml-0", children: [_jsx("img", { src: filme.imagem, alt: filme.titulo, title: `${filme.titulo} - ${filme.ano}`, className: "w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-400" }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover/item:translate-y-0 transition-transform duration-400", children: _jsx("p", { className: "text-white text-xs font-semibold leading-tight line-clamp-2", children: filme.titulo }) })] })] }, filme.id))) }), _jsx("button", { onClick: () => scroll('right'), className: "absolute right-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer", "aria-label": "Pr\u00F3ximo", children: _jsx("span", { className: "w-8 h-8 flex items-center justify-center", children: _jsx("i", { className: "ri-arrow-right-s-line text-2xl text-white" }) }) })] })] }));
}
