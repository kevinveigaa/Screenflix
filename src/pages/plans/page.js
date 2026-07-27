import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { planos } from '@/mocks/planos';
import { useAuth } from '@/hooks/useAuth';
import { gerarPixPayload, gerarQrCodePix } from '@/utils/pix';
export default function Plans() {
    const { user, login, trocarPlano } = useAuth();
    const navigate = useNavigate();
    const [modalPlano, setModalPlano] = useState(null);
    const [formNome, setFormNome] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formSenha, setFormSenha] = useState('');
    const [copiedPlan, setCopiedPlan] = useState(null);
    const [erro, setErro] = useState('');
    const handleAssinar = (planoId) => {
        if (user) {
            trocarPlano(planoId);
            navigate('/');
        }
        else {
            setModalPlano(planoId);
            setErro('');
            setFormNome('');
            setFormEmail('');
            setFormSenha('');
        }
    };
    const handleConfirmar = () => {
        if (!formNome.trim() || !formEmail.trim() || !formSenha.trim() || !modalPlano) {
            setErro('Preencha todos os campos.');
            return;
        }
        if (formSenha.length < 6) {
            setErro('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        const ok = login(formEmail.trim(), formSenha, formNome.trim(), modalPlano);
        if (ok) {
            setModalPlano(null);
            setFormNome('');
            setFormEmail('');
            setFormSenha('');
            navigate('/');
        }
        else {
            setErro('Erro ao criar conta. Tente outro e-mail.');
        }
    };
    const handleCopiarPix = async (payload, planoId) => {
        try {
            await navigator.clipboard.writeText(payload);
            setCopiedPlan(planoId);
            setTimeout(() => setCopiedPlan(null), 3000);
        }
        catch {
            const textarea = document.createElement('textarea');
            textarea.value = payload;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopiedPlan(planoId);
            setTimeout(() => setCopiedPlan(null), 3000);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-black", children: [_jsx(Navbar, {}), _jsx("main", { className: "pt-24 md:pt-32 pb-16 px-4 md:px-8 lg:px-12", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs("div", { className: "text-center mb-14", children: [_jsx("h1", { className: "font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wide", children: "Escolha seu plano" }), _jsx("p", { className: "text-gray-400 text-sm md:text-base max-w-lg mx-auto", children: "Pagamento via PIX. Ativa\u00E7\u00E3o autom\u00E1tica da conta ap\u00F3s o pagamento. Cancele quando quiser." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8", children: planos.map((plano) => {
                                const pixPayload = gerarPixPayload({
                                    pixKey: plano.pixKey,
                                    merchantName: plano.pixMerchantName,
                                    merchantCity: plano.pixMerchantCity,
                                    amount: plano.preco,
                                    txid: plano.pixTxid,
                                });
                                const qrCodeUrl = gerarQrCodePix(pixPayload, 220);
                                return (_jsxs("div", { className: `relative rounded-2xl p-6 md:p-8 flex flex-col transition-transform duration-300 hover:scale-[1.02] ${plano.destaque
                                        ? 'bg-gradient-to-b from-red-900/40 to-gray-900 border-2 border-red-600'
                                        : 'bg-gray-900/80 border border-gray-800'}`, children: [plano.destaque && (_jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1 bg-red-600 text-white text-xs font-bold rounded-full whitespace-nowrap", children: "MAIS POPULAR" })), _jsx("h3", { className: "font-heading text-2xl md:text-3xl text-white mb-1 tracking-wide", children: plano.nome }), _jsx("p", { className: "text-gray-400 text-xs md:text-sm mb-6 min-h-[40px]", children: plano.descricao }), _jsxs("div", { className: "mb-6", children: [_jsxs("span", { className: "text-4xl md:text-5xl font-heading text-white", children: ["R$ ", plano.preco.toFixed(2).replace('.', ',')] }), _jsx("span", { className: "text-gray-500 text-sm", children: "/m\u00EAs" })] }), _jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "bg-white p-3 rounded-xl", children: _jsx("img", { src: qrCodeUrl, alt: `QR Code PIX para pagamento do plano ${plano.nome}`, className: "w-[160px] h-[160px] md:w-[180px] md:h-[180px]" }) }) }), _jsxs("div", { className: "mb-6", children: [_jsxs("button", { onClick: () => handleCopiarPix(pixPayload, plano.id), className: "w-full py-2.5 bg-green-600/20 hover:bg-green-600/30 border border-green-700/50 rounded-lg text-green-400 text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap", children: [_jsx("span", { className: "w-4 h-4 flex items-center justify-center", children: _jsx("i", { className: copiedPlan === plano.id ? 'ri-check-line' : 'ri-file-copy-line' }) }), copiedPlan === plano.id ? 'PIX Copiado!' : 'Copiar PIX'] }), _jsx("p", { className: "text-center text-gray-600 text-[10px] mt-2 px-1", children: "Escaneie o QR Code ou copie o c\u00F3digo PIX para pagar no app do seu banco" })] }), _jsx("div", { className: "space-y-3 mb-8 flex-1", children: plano.beneficios.map((beneficio) => (_jsxs("div", { className: "flex items-start gap-2.5", children: [_jsx("span", { className: "w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5", children: _jsx("i", { className: "ri-check-line text-red-500" }) }), _jsx("span", { className: "text-gray-300 text-xs md:text-sm", children: beneficio })] }, beneficio))) }), _jsx("button", { onClick: () => handleAssinar(plano.id), className: `w-full py-3.5 rounded-lg font-bold text-sm transition-all duration-300 whitespace-nowrap ${plano.destaque
                                                ? 'bg-red-600 hover:bg-red-500 text-white'
                                                : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'}`, children: user && user.planoAtual === plano.id ? 'Plano Atual' : 'Assinar Agora' })] }, plano.id));
                            }) }), _jsxs("p", { className: "text-center text-gray-600 text-xs mt-10", children: ["Ao assinar, voc\u00EA concorda com os", ' ', _jsx("a", { href: "#", className: "text-gray-400 hover:text-gray-300 underline", children: "Termos de Uso" }), ' ', "e", ' ', _jsx("a", { href: "#", className: "text-gray-400 hover:text-gray-300 underline", children: "Pol\u00EDtica de Privacidade" }), "."] })] }) }), modalPlano && (_jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [_jsx("div", { className: "absolute inset-0 bg-black/80 backdrop-blur-sm", onClick: () => setModalPlano(null) }), _jsxs("div", { className: "relative bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 max-w-md w-full animate-fade-in-up max-h-[90vh] overflow-y-auto", children: [_jsx("button", { onClick: () => setModalPlano(null), className: "absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors", children: _jsx("i", { className: "ri-close-line text-xl" }) }), _jsx("h3", { className: "font-heading text-2xl text-white mb-2 tracking-wide", children: "Criar Conta" }), _jsxs("p", { className: "text-gray-400 text-sm mb-6", children: ["Preencha seus dados para ativar o plano", ' ', _jsx("strong", { className: "text-white", children: planos.find(p => p.id === modalPlano)?.nome }), ". Sua conta ser\u00E1 ativada automaticamente."] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "plan-nome", className: "block text-gray-400 text-xs mb-1.5", children: "Nome completo" }), _jsx("input", { id: "plan-nome", name: "nome", type: "text", value: formNome, onChange: e => setFormNome(e.target.value), placeholder: "Seu nome completo", className: "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "plan-email", className: "block text-gray-400 text-xs mb-1.5", children: "E-mail" }), _jsx("input", { id: "plan-email", name: "email", type: "email", value: formEmail, onChange: e => setFormEmail(e.target.value), placeholder: "seu@email.com", className: "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "plan-senha", className: "block text-gray-400 text-xs mb-1.5", children: "Senha" }), _jsx("input", { id: "plan-senha", name: "senha", type: "password", value: formSenha, onChange: e => setFormSenha(e.target.value), placeholder: "M\u00EDnimo 6 caracteres", className: "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors" })] }), erro && (_jsx("p", { className: "text-red-400 text-xs bg-red-900/20 px-3 py-2 rounded-lg", children: erro })), _jsx("button", { onClick: handleConfirmar, className: "w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-lg transition-all duration-300 whitespace-nowrap", children: "Criar Conta e Ativar Plano" })] })] })] })), _jsx(Footer, {})] }));
}
