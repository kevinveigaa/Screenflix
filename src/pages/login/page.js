import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { useAuth } from '@/hooks/useAuth';
export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setErro('');
        if (!email.trim() || !senha.trim()) {
            setErro('Preencha todos os campos.');
            return;
        }
        const ok = login(email.trim(), senha);
        if (ok) {
            navigate('/');
        }
        else {
            setErro('E-mail ou senha inválidos. Verifique suas credenciais.');
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-black", children: [_jsx(Navbar, {}), _jsx("main", { className: "pt-24 md:pt-32 pb-16 px-4", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-600/10", children: _jsx("i", { className: "ri-user-3-line text-2xl text-red-500" }) }), _jsx("h1", { className: "font-heading text-4xl md:text-5xl text-white tracking-wide mb-2", children: "Entrar" }), _jsx("p", { className: "text-gray-500 text-sm", children: "Bem-vindo de volta! Continue de onde parou." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-gray-400 text-sm mb-2", children: "E-mail" }), _jsx("input", { type: "email", id: "email", name: "email", value: email, onChange: e => setEmail(e.target.value), placeholder: "seu@email.com", className: "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "senha", className: "block text-gray-400 text-sm mb-2", children: "Senha" }), _jsx("input", { type: "password", id: "senha", name: "senha", value: senha, onChange: e => setSenha(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300" })] }), erro && (_jsx("p", { className: "text-red-400 text-sm bg-red-500/10 px-4 py-3 rounded-lg", children: erro })), _jsx("button", { type: "submit", className: "w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-lg transition-all duration-300 whitespace-nowrap", children: "Entrar" })] }), _jsxs("p", { className: "text-center text-gray-500 text-sm mt-8", children: ["N\u00E3o tem conta?", ' ', _jsx(Link, { to: "/signup", className: "text-red-500 hover:text-red-400 transition-colors font-medium", children: "Criar conta" })] }), _jsx("div", { className: "mt-8 text-center", children: _jsxs(Link, { to: "/plans", className: "inline-flex items-center gap-1.5 px-5 py-2.5 bg-yellow-600/20 border border-yellow-700/50 rounded-lg text-yellow-400 text-sm font-medium hover:bg-yellow-600/30 transition-colors whitespace-nowrap", children: [_jsx("span", { className: "w-4 h-4 flex items-center justify-center", children: _jsx("i", { className: "ri-vip-crown-line" }) }), "Ver Planos"] }) })] }) }), _jsx(Footer, {})] }));
}
