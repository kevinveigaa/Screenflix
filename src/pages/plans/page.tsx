import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { planos } from '@/mocks/planos';
import { useAuth } from '@/hooks/useAuth';
import { gerarPixPayload, gerarQrCodePix } from '@/utils/pix';

export default function Plans() {
  const { user, login, trocarPlano } = useAuth();
  const navigate = useNavigate();
  const [modalPlano, setModalPlano] = useState<string | null>(null);
  const [formNome, setFormNome] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSenha, setFormSenha] = useState('');
  const [copiedPlan, setCopiedPlan] = useState<string | null>(null);
  const [erro, setErro] = useState('');

  const handleAssinar = (planoId: string) => {
    if (user) {
      trocarPlano(planoId);
      navigate('/');
    } else {
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
    } else {
      setErro('Erro ao criar conta. Tente outro e-mail.');
    }
  };

  const handleCopiarPix = async (payload: string, planoId: string) => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedPlan(planoId);
      setTimeout(() => setCopiedPlan(null), 3000);
    } catch {
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

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 md:pt-32 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wide">
              Escolha seu plano
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
              Pagamento via PIX. Ativação automática da conta após o pagamento.
              Cancele quando quiser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {planos.map((plano) => {
              const pixPayload = gerarPixPayload({
                pixKey: plano.pixKey,
                merchantName: plano.pixMerchantName,
                merchantCity: plano.pixMerchantCity,
                amount: plano.preco,
                txid: plano.pixTxid,
              });
              const qrCodeUrl = gerarQrCodePix(pixPayload, 220);

              return (
                <div
                  key={plano.id}
                  className={`relative rounded-2xl p-6 md:p-8 flex flex-col transition-transform duration-300 hover:scale-[1.02] ${
                    plano.destaque
                      ? 'bg-gradient-to-b from-red-900/40 to-gray-900 border-2 border-red-600'
                      : 'bg-gray-900/80 border border-gray-800'
                  }`}
                >
                  {plano.destaque && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1 bg-red-600 text-white text-xs font-bold rounded-full whitespace-nowrap">
                      MAIS POPULAR
                    </div>
                  )}

                  <h3 className="font-heading text-2xl md:text-3xl text-white mb-1 tracking-wide">
                    {plano.nome}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm mb-6 min-h-[40px]">
                    {plano.descricao}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl md:text-5xl font-heading text-white">
                      R$ {plano.preco.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-gray-500 text-sm">/mês</span>
                  </div>

                  {/* QR Code PIX */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-3 rounded-xl">
                      <img
                        src={qrCodeUrl}
                        alt={`QR Code PIX para pagamento do plano ${plano.nome}`}
                        className="w-[160px] h-[160px] md:w-[180px] md:h-[180px]"
                      />
                    </div>
                  </div>

                  {/* Botão Copia e Cola PIX */}
                  <div className="mb-6">
                    <button
                      onClick={() => handleCopiarPix(pixPayload, plano.id)}
                      className="w-full py-2.5 bg-green-600/20 hover:bg-green-600/30 border border-green-700/50 rounded-lg text-green-400 text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <span className="w-4 h-4 flex items-center justify-center">
                        <i className={copiedPlan === plano.id ? 'ri-check-line' : 'ri-file-copy-line'}></i>
                      </span>
                      {copiedPlan === plano.id ? 'PIX Copiado!' : 'Copiar PIX'}
                    </button>
                    <p className="text-center text-gray-600 text-[10px] mt-2 px-1">
                      Escaneie o QR Code ou copie o código PIX para pagar no app do seu banco
                    </p>
                  </div>

                  <div className="space-y-3 mb-8 flex-1">
                    {plano.beneficios.map((beneficio) => (
                      <div key={beneficio} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-check-line text-red-500"></i>
                        </span>
                        <span className="text-gray-300 text-xs md:text-sm">{beneficio}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAssinar(plano.id)}
                    className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all duration-300 whitespace-nowrap ${
                      plano.destaque
                        ? 'bg-red-600 hover:bg-red-500 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                    }`}
                  >
                    {user && user.planoAtual === plano.id ? 'Plano Atual' : 'Assinar Agora'}
                  </button>
                </div>
              );
            })}
          </div>

          <p className="text-center text-gray-600 text-xs mt-10">
            Ao assinar, você concorda com os{' '}
            <a href="#" className="text-gray-400 hover:text-gray-300 underline">Termos de Uso</a>
            {' '}e{' '}
            <a href="#" className="text-gray-400 hover:text-gray-300 underline">Política de Privacidade</a>.
          </p>
        </div>
      </main>

      {/* Modal de cadastro */}
      {modalPlano && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalPlano(null)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 max-w-md w-full animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalPlano(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            <h3 className="font-heading text-2xl text-white mb-2 tracking-wide">
              Criar Conta
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Preencha seus dados para ativar o plano{' '}
              <strong className="text-white">{planos.find(p => p.id === modalPlano)?.nome}</strong>.
              Sua conta será ativada automaticamente.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="plan-nome" className="block text-gray-400 text-xs mb-1.5">Nome completo</label>
                <input
                  id="plan-nome"
                  name="nome"
                  type="text"
                  value={formNome}
                  onChange={e => setFormNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="plan-email" className="block text-gray-400 text-xs mb-1.5">E-mail</label>
                <input
                  id="plan-email"
                  name="email"
                  type="email"
                  value={formEmail}
                  onChange={e => setFormEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="plan-senha" className="block text-gray-400 text-xs mb-1.5">Senha</label>
                <input
                  id="plan-senha"
                  name="senha"
                  type="password"
                  value={formSenha}
                  onChange={e => setFormSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                />
              </div>

              {erro && (
                <p className="text-red-400 text-xs bg-red-900/20 px-3 py-2 rounded-lg">{erro}</p>
              )}

              <button
                onClick={handleConfirmar}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                Criar Conta e Ativar Plano
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}