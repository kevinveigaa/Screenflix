import { useState } from 'react';
import type { FormEvent } from 'react';
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!email.trim() || !senha.trim()) {
      setErro('Preencha todos os campos.');
      return;
    }

    const ok = login(email.trim(), senha);
    if (ok) {
      navigate('/');
    } else {
      setErro('E-mail ou senha inválidos. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-600/10">
              <i className="ri-user-3-line text-2xl text-red-500"></i>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl text-white tracking-wide mb-2">
              Entrar
            </h1>
            <p className="text-gray-500 text-sm">
              Bem-vindo de volta! Continue de onde parou.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors duration-300"
              />
            </div>

            {erro && (
              <p className="text-red-400 text-sm bg-red-500/10 px-4 py-3 rounded-lg">{erro}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-lg transition-all duration-300 whitespace-nowrap"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Não tem conta?{' '}
            <Link to="/signup" className="text-red-500 hover:text-red-400 transition-colors font-medium">
              Criar conta
            </Link>
          </p>

          <div className="mt-8 text-center">
            <Link
              to="/plans"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-yellow-600/20 border border-yellow-700/50 rounded-lg text-yellow-400 text-sm font-medium hover:bg-yellow-600/30 transition-colors whitespace-nowrap"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-vip-crown-line"></i>
              </span>
              Ver Planos
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
