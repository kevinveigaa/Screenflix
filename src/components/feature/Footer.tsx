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
  return (
    <footer className="bg-black border-t border-gray-800/40">
      <div className="px-4 md:px-8 lg:px-12 py-12 md:py-16 max-w-6xl mx-auto">
        {/* Link de contato estilo Netflix */}
        <p className="text-gray-500 text-base mb-8">
          Dúvidas? <a href="/search" className="underline hover:text-gray-300 transition-colors">Entre em contato.</a>
        </p>

        {/* Grid de links — 4 colunas no desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 mb-10">
          {footerLinks.navegar.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-gray-500 hover:text-gray-300 text-sm underline underline-offset-2 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          {footerLinks.generos.map((label) => (
            <span key={label} className="text-gray-500 text-sm">
              {label}
            </span>
          ))}
          {footerLinks.conta.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-gray-500 hover:text-gray-300 text-sm underline underline-offset-2 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          {footerLinks.legal.map((label) => (
            <span key={label} className="text-gray-500 text-sm">
              {label}
            </span>
          ))}
        </div>

        {/* Language / Region */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-600 rounded text-gray-500 text-sm cursor-pointer hover:border-gray-400 hover:text-gray-300 transition-colors">
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-global-line"></i>
            </span>
            <span>Português</span>
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-down-s-line"></i>
            </span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-xs mb-6">
          Screenflix Brasil
        </p>

        {/* Redes sociais */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-200"
            aria-label="Instagram"
          >
            <i className="ri-instagram-line text-lg"></i>
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-200"
            aria-label="Twitter"
          >
            <i className="ri-twitter-x-line text-lg"></i>
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-200"
            aria-label="YouTube"
          >
            <i className="ri-youtube-line text-lg"></i>
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-200"
            aria-label="Facebook"
          >
            <i className="ri-facebook-line text-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}