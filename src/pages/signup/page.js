import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { useAuth } from '@/hooks/useAuth';
import { planos } from '@/mocks/planos';
export default function Signup() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [planoSelecionado, setPlanoSelecionado] = useState('basico');
    const [erro, setErro] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome || !email || !senha || !confirmar) {
            setErro('Preencha todos os campos.');
            return;
        }
        if (senha !== confirmar) {
            setErro('As senhas não conferem.');
            return;
        }
        if (senha.length < 6) {
            setErro('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        setErro('');
        const ok = login(email.trim(), senha, nome.trim(), planoSelecionado);
        if (ok) {
            navigate('/');
        }
        else {
            setErro('Erro ao criar conta. Tente novamente.');
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-black", children: [_jsx(Navbar, {}), _jsx("main", { className: "pt-24 md:pt-28 pb-16 px-4", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsxs("div", { className: "text-center mb-10 animate-fade-in-up", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-600/10", children: _jsx("i", { className: "ri-user-add-line text-2xl text-red-500" }) }), _jsx("h1", { className: "font-heading text-4xl md:text-5xl text-white tracking-wide mb-2", children: "Criar Conta" }), _jsx("p", { className: "text-gray-500 text-sm", children: "Comece sua jornada com a gente. Escolha seu plano!" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 animate-fade-in-up", style: { animationDelay: '0.1s' }, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "nome", className: "block text-gray-400 text-sm mb-2", children: "Nome completo" }), _jsx("input", { type: "text", id: "nome", name: "nome", value: nome, onChange: e => setNome(e.target.value), placeholder: "Seu nome", className: "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-gray-400 text-sm mb-2", children: "E-mail" }), _jsx("input", { type: "email", id: "email", name: "email", value: email, onChange: e => setEmail(e.target.value), placeholder: "seu@email.com", className: "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "senha", className: "block text-gray-400 text-sm mb-2", children: "Senha" }), _jsx("input", { type: "password", id: "senha", name: "senha", value: senha, onChange: e => setSenha(e.target.value), placeholder: "M\u00EDnimo 6 caracteres", className: "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmar", className: "block text-gray-400 text-sm mb-2", children: "Confirmar senha" }), _jsx("input", { type: "password", id: "confirmar", name: "confirmar", value: confirmar, onChange: e => setConfirmar(e.target.value), placeholder: "Repita a senha", className: "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 text-sm mb-3", children: "Escolha seu plano" }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: planos.map((plano) => (_jsxs("button", { type: "button", onClick: () => setPlanoSelecionado(plano.id), className: `p-3 rounded-xl border text-center transition-all duration-300 ${planoSelecionado === plano.id
                                                    ? 'border-red-600 bg-red-600/10'
                                                    : 'border-gray-700 bg-gray-900 hover:border-gray-600'}`, children: [_jsx("div", { className: "text-white font-semibold text-xs mb-1", children: plano.nome }), _jsxs("div", { className: "text-red-500 font-bold text-sm", children: ["R$ ", plano.preco.toFixed(2).replace('.', ',')] }), _jsx("div", { className: "text-gray-600 text-[10px]", children: "/m\u00EAs" })] }, plano.id))) })] }), erro && (_jsx("p", { className: "text-red-400 text-sm bg-red-500/10 px-4 py-3 rounded-lg", children: erro })), _jsx("button", { type: "submit", className: "w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-lg transition-all duration-300 whitespace-nowrap", children: "Criar Conta" })] }), _jsxs("p", { className: "text-center text-gray-500 text-sm mt-8 animate-fade-in-up", style: { animationDelay: '0.2s' }, children: ["J\u00E1 tem conta?", ' ', _jsx(Link, { to: "/login", className: "text-red-500 hover:text-red-400 transition-colors font-medium", children: "Entrar" })] }), _jsxs("p", { className: "text-center text-gray-600 text-xs mt-6 animate-fade-in-up", style: { animationDelay: '0.3s' }, children: ["Ao criar sua conta, voc\u00EA concorda com nossos", ' ', _jsx("a", { href: "#", className: "text-gray-500 hover:text-gray-400 transition-colors", children: "Termos de Uso" }), ' ', "e", ' ', _jsx("a", { href: "#", className: "text-gray-500 hover:text-gray-400 transition-colors", children: "Pol\u00EDtica de Privacidade" }), "."] })] }) }), _jsx(Footer, {})] }));
}
