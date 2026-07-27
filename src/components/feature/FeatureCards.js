import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const features = [
    {
        titulo: 'Aproveite na sua TV',
        descricao: 'Assista em Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, aparelhos de Blu-ray e muito mais.',
        icon: 'ri-tv-2-line',
    },
    {
        titulo: 'Baixe para assistir offline',
        descricao: 'Salve seus favoritos com facilidade e sempre tenha algo para assistir quando estiver sem internet.',
        icon: 'ri-download-cloud-line',
    },
    {
        titulo: 'Assista onde quiser',
        descricao: 'Stream ilimitado de filmes e séries no seu celular, tablet, notebook e TV, sem restrições.',
        icon: 'ri-smartphone-line',
    },
    {
        titulo: 'Crie perfis para crianças',
        descricao: 'Perfis infantis com aventuras e conteúdo adequado para toda a família, sempre protegido e divertido.',
        icon: 'ri-emotion-happy-line',
    },
];
export default function FeatureCards() {
    return (_jsxs("section", { className: "py-12 md:py-16 px-4 md:px-8 lg:px-12", children: [_jsx("h2", { className: "font-heading text-2xl md:text-3xl text-white text-center mb-8 md:mb-10 tracking-wide", children: "Mais Raz\u00F5es para Usar o Screenflix" }), _jsx("div", { className: "max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5", children: features.map((feature, index) => (_jsxs("div", { className: "relative bg-gradient-to-b from-gray-800/80 to-gray-900/90 rounded-xl p-6 md:p-7 border border-gray-700/40 overflow-hidden hover:border-gray-600/60 transition-all duration-300", children: [_jsx("h3", { className: "font-heading text-lg md:text-xl text-white mb-2 leading-snug", children: feature.titulo }), _jsx("p", { className: "text-gray-400 text-sm leading-relaxed mb-8 md:mb-10", children: feature.descricao }), _jsx("div", { className: "absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center", children: _jsx("i", { className: `${feature.icon} text-3xl md:text-4xl text-red-500/40` }) })] }, index))) })] }));
}
