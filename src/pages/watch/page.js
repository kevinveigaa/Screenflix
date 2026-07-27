import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
function detectarTipoVideo(url) {
    if (!url)
        return 'outro';
    if (/youtube\.com|youtu\.be/i.test(url))
        return 'youtube';
    if (/\.(mp4|webm|ogg|mov|mkv)/i.test(url))
        return 'mp4';
    return 'outro';
}
function extrairYoutubeId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=)([^&]+)/,
        /(?:youtu\.be\/)([^?&]+)/,
        /(?:youtube\.com\/embed\/)([^?&]+)/,
        /(?:youtube\.com\/shorts\/)([^?&]+)/,
    ];
    for (const p of patterns) {
        const match = url.match(p);
        if (match)
            return match[1];
    }
    return null;
}
export default function Watch() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAdmin, filmesLiberados, todosOsFilmes } = useAuth();
    const containerRef = useRef(null);
    const filme = todosOsFilmes.find(f => f.id === Number(id));
    const isLiberado = isAdmin || (user && user.ativo && filmesLiberados.some(f => f.id === Number(id)));
    const tipoVideo = useMemo(() => filme ? detectarTipoVideo(filme.videoUrl) : 'outro', [filme]);
    const youtubeId = useMemo(() => filme ? extrairYoutubeId(filme.videoUrl) : null, [filme]);
    useEffect(() => {
        if (!filme || !isLiberado)
            return;
        const goFullScreen = () => {
            const el = containerRef.current;
            if (el && document.fullscreenEnabled) {
                el.requestFullscreen().catch(() => { });
            }
        };
        const timer = setTimeout(goFullScreen, 600);
        return () => clearTimeout(timer);
    }, [filme, isLiberado]);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' || e.key === 'Backspace') {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                navigate(-1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);
    if (!filme) {
        return (_jsx("div", { className: "fixed inset-0 z-[300] bg-black flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Filme n\u00E3o encontrado" }), _jsx("button", { onClick: () => navigate(-1), className: "px-5 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors", children: "Voltar" })] }) }));
    }
    if (!isLiberado) {
        return (_jsx("div", { className: "fixed inset-0 z-[300] bg-black flex items-center justify-center", children: _jsxs("div", { className: "text-center px-4 max-w-md", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-yellow-900/30", children: _jsx("i", { className: "ri-lock-line text-4xl text-yellow-500" }) }), _jsx("h2", { className: "text-white text-xl font-heading mb-3", children: "Conte\u00FAdo Bloqueado" }), _jsx("p", { className: "text-gray-400 text-sm mb-6", children: !user
                            ? 'Faça login e assine um plano para assistir.'
                            : !user.ativo
                                ? 'Sua conta está desativada. Entre em contato com o suporte.'
                                : 'Seu plano atual não inclui este filme. Faça upgrade para assistir.' }), _jsx("div", { className: "flex items-center gap-3 justify-center", children: !user ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => navigate('/login'), className: "px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-md transition-all duration-300 whitespace-nowrap", children: "Fazer Login" }), _jsx("button", { onClick: () => navigate('/plans'), className: "px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm rounded-md transition-all duration-300 whitespace-nowrap", children: "Ver Planos" })] })) : (_jsx("button", { onClick: () => navigate('/plans'), className: "px-6 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-white font-bold text-sm rounded-md transition-all duration-300 whitespace-nowrap", children: "Fazer Upgrade" })) })] }) }));
    }
    return (_jsx("div", { ref: containerRef, className: "fixed inset-0 z-[300] bg-black", children: tipoVideo === 'youtube' && youtubeId ? (_jsx("iframe", { src: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1&iv_load_policy=3&fs=1&showinfo=0&cc_load_policy=0`, title: filme.titulo, className: "w-full h-full", allow: "autoplay; encrypted-media; picture-in-picture; fullscreen", allowFullScreen: true })) : tipoVideo === 'mp4' ? (_jsx("video", { src: filme.videoUrl, controls: true, autoPlay: true, className: "w-full h-full object-contain bg-black", poster: filme.banner, children: "Seu navegador n\u00E3o suporta o player de v\u00EDdeo." })) : (_jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center text-center px-4", children: [_jsx("p", { className: "text-gray-300 text-sm mb-4", children: "Clique abaixo para abrir o v\u00EDdeo:" }), _jsx("a", { href: filme.videoUrl, target: "_blank", rel: "noopener noreferrer", className: "px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-md transition-all duration-300 whitespace-nowrap", children: "Abrir V\u00EDdeo" }), _jsx("button", { onClick: () => navigate(-1), className: "mt-3 text-gray-500 hover:text-gray-300 text-xs transition-colors", children: "Voltar" })] })) }));
}
