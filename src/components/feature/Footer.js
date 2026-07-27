import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const footerLinks = {
    navegar: [
        { label: 'Início', to: '/' },
        { label: 'Filmes', to: '/movies' },
        { label: 'Buscar', to: '/search' },
        { label: 'Cadastrar', to: '/signup' },
    ],
    generos: [
        'Ação',
        'Comédia',
        'Terror',
        'Ficção Científica',
        'Romance',
        'Drama',
        'Fantasia',
        'Documentários',
    ],
    conta: [
        { label: 'Entrar', to: '/login' },
        { label: 'Criar Conta', to: '/signup' },
        { label: 'Ajuda', to: '/search' },
        { label: 'Centro de Mídia', to: '/movies' },
    ],
    legal: [
        'Privacidade',
        'Termos de Uso',
        'Cookies',
        'Informações Corporativas',
        'Entre em Contato',
    ],
};
export default function Footer() {
    return (_jsx("footer", { className: "bg-black border-t border-gray-800/40", children: _jsxs("div", { className: "px-4 md:px-8 lg:px-12 py-12 md:py-16 max-w-6xl mx-auto", children: [_jsxs("p", { className: "text-gray-500 text-base mb-8", children: ["D\u00FAvidas? ", _jsx("a", { href: "/search", className: "underline hover:text-gray-300 transition-colors", children: "Entre em contato." })] }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 mb-10", children: [footerLinks.navegar.map((link) => (_jsx(Link, { to: link.to, className: "text-gray-500 hover:text-gray-300 text-sm underline underline-offset-2 transition-colors duration-200", children: link.label }, link.label))), footerLinks.generos.map((label) => (_jsx("span", { className: "text-gray-500 text-sm", children: label }, label))), footerLinks.conta.map((link) => (_jsx(Link, { to: link.to, className: "text-gray-500 hover:text-gray-300 text-sm underline underline-offset-2 transition-colors duration-200", children: link.label }, link.label))), footerLinks.legal.map((label) => (_jsx("span", { className: "text-gray-500 text-sm", children: label }, label)))] }), _jsx("div", { className: "mb-8", children: _jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 border border-gray-600 rounded text-gray-500 text-sm cursor-pointer hover:border-gray-400 hover:text-gray-300 transition-colors", children: [_jsx("span", { className: "w-4 h-4 flex items-center justify-center", children: _jsx("i", { className: "ri-global-line" }) }), _jsx("span", { children: "Portugu\u00EAs" }), _jsx("span", { className: "w-4 h-4 flex items-center justify-center", children: _jsx("i", { className: "ri-arrow-down-s-line" }) })] }) }), _jsx("p", { className: "text-gray-600 text-xs mb-6", children: "Screenflix Brasil" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("a", { href: "#", className: "w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-200", "aria-label": "Instagram", children: _jsx("i", { className: "ri-instagram-line text-lg" }) }), _jsx("a", { href: "#", className: "w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-200", "aria-label": "Twitter", children: _jsx("i", { className: "ri-twitter-x-line text-lg" }) }), _jsx("a", { href: "#", className: "w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-200", "aria-label": "YouTube", children: _jsx("i", { className: "ri-youtube-line text-lg" }) }), _jsx("a", { href: "#", className: "w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-200", "aria-label": "Facebook", children: _jsx("i", { className: "ri-facebook-line text-lg" }) })] })] }) }));
}
