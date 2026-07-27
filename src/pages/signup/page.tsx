import { useState } from 'react';
import type { FormEvent } from 'react';
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

  const handleSubmit = (e: FormEvent) => {
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
    } else {
      setErro('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10 animate-fade-in-up">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-600/10">
              <i className="ri-user-add-line text-2xl text-red-500"></i>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl text-white tracking-wide mb-2">
              Criar Conta
            </h1>
            <p className="text-gray-500 text-sm">
              Comece sua jornada com a gente. Escolha seu plano!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div>
              <label htmlFor="nome" className="block text-gray-400 text-sm mb-2">
                Nome completo
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Seu nome"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-gray-400 text-sm mb-2">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300"
              />
            </div>

            <div>
              <label htmlFor="confirmar" className="block text-gray-400 text-sm mb-2">
                Confirmar senha
              </label>
              <input
                type="password"
                id="confirmar"
                name="confirmar"
                value={confirmar}
                onChange={e => setConfirmar(e.target.value)}
                placeholder="Repita a senha"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300"
              />
            </div>

            {/* Seletor de Plano */}
            <div>
              <label className="block text-gray-400 text-sm mb-3">
                Escolha seu plano
              </label>
              <div className="grid grid-cols-3 gap-2">
                {planos.map((plano) => (
                  <button
                    key={plano.id}
                    type="button"
                    onClick={() => setPlanoSelecionado(plano.id)}
                    className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                      planoSelecionado === plano.id
                        ? 'border-red-600 bg-red-600/10'
                        : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-white font-semibold text-xs mb-1">{plano.nome}</div>
                    <div className="text-red-500 font-bold text-sm">
                      R$ {plano.preco.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-gray-600 text-[10px]">/mês</div>
                  </button>
                ))}
              </div>
            </div>

            {erro && (
              <p className="text-red-400 text-sm bg-red-500/10 px-4 py-3 rounded-lg">{erro}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-lg transition-all duration-300 whitespace-nowrap"
            >
              Criar Conta
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Já tem conta?{' '}
            <Link to="/login" className="text-red-500 hover:text-red-400 transition-colors font-medium">
              Entrar
            </Link>
          </p>

          <p className="text-center text-gray-600 text-xs mt-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Ao criar sua conta, você concorda com nossos{' '}
            <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">Termos de Uso</a>
            {' '}e{' '}
            <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">Política de Privacidade</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
