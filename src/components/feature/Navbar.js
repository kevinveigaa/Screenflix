import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { user, logout, isAdmin } = useAuth();
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);
    return (_jsxs("nav", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-black/95 backdrop-blur-md shadow-lg'
            : 'bg-gradient-to-b from-black/90 to-transparent'}`, children: [_jsx("div", { className: "px-4 md:px-8 lg:px-12", children: _jsxs("div", { className: "flex items-center justify-between h-16 md:h-20", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [_jsx("div", { className: "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center", children: _jsx("i", { className: "ri-movie-2-fill text-2xl md:text-3xl text-red-600 group-hover:scale-110 transition-transform duration-300" }) }), _jsxs("span", { className: "font-heading text-2xl md:text-3xl text-white tracking-wider", children: ["SCREEN", _jsx("span", { className: "text-red-600", children: "FLIX" })] })] }), _jsxs("div", { className: "hidden md:flex items-center gap-8", children: [_jsx(Link, { to: "/", className: `text-sm font-medium transition-colors duration-300 whitespace-nowrap ${location.pathname === '/'
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-gray-200'}`, children: "In\u00EDcio" }), _jsx(Link, { to: "/movies", className: `text-sm font-medium transition-colors duration-300 whitespace-nowrap ${location.pathname === '/movies'
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-gray-200'}`, children: "Filmes" }), _jsx(Link, { to: "/plans", className: `text-sm font-medium transition-colors duration-300 whitespace-nowrap ${location.pathname === '/plans'
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-gray-200'}`, children: "Planos" }), isAdmin && (_jsx(Link, { to: "/admin", className: `text-sm font-medium transition-colors duration-300 whitespace-nowrap ${location.pathname === '/admin'
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-gray-200'}`, children: "Painel" })), _jsx(Link, { to: "/search", className: "w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors duration-300", children: _jsx("i", { className: "ri-search-line text-lg" }) }), user ? (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-full", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-red-600 flex items-center justify-center", children: _jsx("span", { className: "text-white text-[10px] font-bold", children: user.nome.charAt(0).toUpperCase() }) }), _jsx("span", { className: "text-white text-xs whitespace-nowrap", children: user.nome.split(' ')[0] })] }), _jsx("button", { onClick: logout, className: "text-gray-400 hover:text-gray-200 text-xs transition-colors whitespace-nowrap", children: "Sair" })] })) : (_jsx(Link, { to: "/login", className: "px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-md transition-all duration-300 whitespace-nowrap", children: "Entrar" }))] }), _jsx("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), className: "md:hidden w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-lg border border-white/30", children: _jsx("i", { className: `text-xl text-white ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}` }) })] }) }), _jsx("div", { className: `md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`, children: _jsxs("div", { className: "px-4 pb-6 space-y-1 bg-black/95 backdrop-blur-md border-t border-gray-800/50", children: [_jsxs(Link, { to: "/", className: `block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/'
                                ? 'text-red-500 bg-red-600/10'
                                : 'text-white hover:text-white hover:bg-gray-900/50'}`, children: [_jsx("i", { className: "ri-home-4-line mr-3" }), " In\u00EDcio"] }), _jsxs(Link, { to: "/movies", className: `block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/movies'
                                ? 'text-red-500 bg-red-600/10'
                                : 'text-white hover:text-white hover:bg-gray-900/50'}`, children: [_jsx("i", { className: "ri-movie-2-line mr-3" }), " Filmes"] }), _jsxs(Link, { to: "/plans", className: `block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/plans'
                                ? 'text-red-500 bg-red-600/10'
                                : 'text-white hover:text-white hover:bg-gray-900/50'}`, children: [_jsx("i", { className: "ri-vip-crown-line mr-3" }), " Planos"] }), isAdmin && (_jsxs(Link, { to: "/admin", className: "block py-3 px-4 rounded-lg text-sm font-medium text-white hover:text-white hover:bg-gray-900/50 transition-colors", children: [_jsx("i", { className: "ri-shield-keyhole-line mr-3" }), " Painel Admin"] })), _jsxs(Link, { to: "/search", className: "block py-3 px-4 rounded-lg text-sm font-medium text-white hover:text-white hover:bg-gray-900/50 transition-colors", children: [_jsx("i", { className: "ri-search-line mr-3" }), " Buscar"] }), user ? (_jsxs("button", { onClick: () => { logout(); setMobileMenuOpen(false); }, className: "block w-full py-3 px-4 mt-3 text-center bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-lg transition-colors", children: ["Sair (", user.nome.split(' ')[0], ")"] })) : (_jsx(Link, { to: "/login", className: "block py-3 px-4 mt-3 text-center bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-lg transition-colors", children: "Entrar" }))] }) })] }));
}
