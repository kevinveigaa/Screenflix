import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { useAuth, ADMIN_EMAIL, ADMIN_SENHA } from '@/hooks/useAuth';
import { planos } from '@/mocks/planos';
import type { Filme } from '@/mocks/filmes';

type TabType = 'filmes' | 'usuarios' | 'planos';

export default function Admin() {
  const {
    user,
    isAdmin,
    login,
    todosOsFilmes,
    filmesPorPlano,
    liberarFilmeParaPlano,
    removerFilmeDoPlano,
    adicionarFilme,
    atualizarFilme,
    removerFilme,
    todosUsuarios,
    toggleAtivarUsuario,
    removerUsuario,
  } = useAuth();

  const [tab, setTab] = useState<TabType>('filmes');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFilmeId, setEditFilmeId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [userDeleteConfirm, setUserDeleteConfirm] = useState<string | null>(null);

  const [adminEmail, setAdminEmail] = useState('');
  const [adminSenha, setAdminSenha] = useState('');
  const [adminErro, setAdminErro] = useState('');

  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaSinopse, setNovaSinopse] = useState('');
  const [novoAno, setNovoAno] = useState('');
  const [novaDuracao, setNovaDuracao] = useState('');
  const [novosGeneros, setNovosGeneros] = useState('');
  const [novaNota, setNovaNota] = useState('');
  const [novoVideoUrl, setNovoVideoUrl] = useState('');
  const [novoTrailerUrl, setNovoTrailerUrl] = useState('');
  const [novaImagemUrl, setNovaImagemUrl] = useState('');
  const [novaBannerUrl, setNovaBannerUrl] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novaClassificacao, setNovaClassificacao] = useState('L');
  const [novoElenco, setNovoElenco] = useState('');
  const [novoDiretor, setNovoDiretor] = useState('');
  const [addError, setAddError] = useState('');

  const handleAdminLogin = () => {
    setAdminErro('');
    if (!adminEmail.trim() || !adminSenha.trim()) {
      setAdminErro('Preencha e-mail e senha.');
      return;
    }
    const ok = login(adminEmail.trim(), adminSenha);
    if (!ok) {
      setAdminErro('Credenciais inválidas. Acesso negado.');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="pt-24 md:pt-32 pb-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-600/10 rounded-full flex items-center justify-center">
              <i className="ri-shield-keyhole-line text-3xl text-red-500"></i>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-white mb-4 tracking-wide">
              Painel Administrativo
            </h1>
            <p className="text-gray-400 text-sm mb-8">
              Faça login com suas credenciais de administrador para acessar o painel.
            </p>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  placeholder="E-mail do administrador"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors text-center"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAdminLogin();
                  }}
                />
              </div>
              <div>
                <input
                  type="password"
                  value={adminSenha}
                  onChange={e => setAdminSenha(e.target.value)}
                  placeholder="Senha"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors text-center"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAdminLogin();
                  }}
                />
              </div>

              {adminErro && (
                <p className="text-red-400 text-sm bg-red-500/10 px-4 py-3 rounded-lg">{adminErro}</p>
              )}

              <button
                onClick={handleAdminLogin}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                Acessar Painel
              </button>
              <Link
                to="/"
                className="block py-2.5 text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Voltar para o início
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddFilme = () => {
    setAddError('');
    if (!novoTitulo.trim() || !novoVideoUrl.trim()) {
      setAddError('Título e URL do vídeo são obrigatórios.');
      return;
    }

    const novoFilme: Filme = {
      id: Date.now(),
      titulo: novoTitulo.trim(),
      sinopse: novaSinopse.trim() || 'Sinopse não informada.',
      ano: Number(novoAno) || new Date().getFullYear(),
      duracao: novaDuracao.trim() || '1h 30min',
      generos: novosGeneros.split(',').map(g => g.trim()).filter(Boolean).length > 0
        ? novosGeneros.split(',').map(g => g.trim()).filter(Boolean)
        : ['Geral'],
      nota: Number(novaNota) || 7.0,
      imagem: novaImagemUrl.trim() || 'https://readdy.ai/api/search-image?query=cinematic%20movie%20poster%20with%20dramatic%20lighting%2C%20film%20noir%20aesthetic%2C%20dark%20atmospheric%20background%2C%20professional%20movie%20poster%20style%2C%20rich%20contrast%20and%20deep%20shadows%2C%20golden%20accent%20highlights&width=600&height=900&seq=admin-add-poster&orientation=portrait',
      banner: novaBannerUrl.trim() || 'https://readdy.ai/api/search-image?query=cinematic%20film%20banner%20with%20dramatic%20lighting%2C%20dark%20atmospheric%20scene%2C%20professional%20movie%20aesthetic%2C%20wide%20cinematic%20shot%2C%20epic%20composition%20with%20rich%20warm%20tones&width=1600&height=900&seq=admin-add-banner&orientation=landscape',
      trailerUrl: novoTrailerUrl.trim() || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      videoUrl: novoVideoUrl.trim(),
      elenco: novoElenco.split(',').map(e => e.trim()).filter(Boolean).length > 0
        ? novoElenco.split(',').map(e => e.trim()).filter(Boolean)
        : ['Elenco não informado'],
      diretor: novoDiretor.trim() || 'Diretor não informado',
      categoria: novaCategoria.trim() || 'Novos',
      classificacao: novaClassificacao,
    };

    adicionarFilme(novoFilme);
    limparFormulario();
    setShowAddModal(false);
  };

  const limparFormulario = () => {
    setNovoTitulo('');
    setNovaSinopse('');
    setNovoAno('');
    setNovaDuracao('');
    setNovosGeneros('');
    setNovaNota('');
    setNovoVideoUrl('');
    setNovoTrailerUrl('');
    setNovaImagemUrl('');
    setNovaBannerUrl('');
    setNovaCategoria('');
    setNovaClassificacao('L');
    setNovoElenco('');
    setNovoDiretor('');
  };

  const abrirEdicao = (filme: Filme) => {
    setEditFilmeId(filme.id);
    setNovoTitulo(filme.titulo);
    setNovaSinopse(filme.sinopse);
    setNovoAno(String(filme.ano));
    setNovaDuracao(filme.duracao);
    setNovosGeneros(filme.generos.join(', '));
    setNovaNota(String(filme.nota));
    setNovoVideoUrl(filme.videoUrl);
    setNovoTrailerUrl(filme.trailerUrl || '');
    setNovaImagemUrl(filme.imagem || '');
    setNovaBannerUrl(filme.banner || '');
    setNovaCategoria(filme.categoria);
    setNovaClassificacao(filme.classificacao);
    setNovoElenco(filme.elenco.join(', '));
    setNovoDiretor(filme.diretor);
    setShowEditModal(true);
  };

  const handleUpdateFilme = () => {
    setAddError('');
    if (!novoTitulo.trim() || !novoVideoUrl.trim()) {
      setAddError('Título e URL do vídeo são obrigatórios.');
      return;
    }
    if (editFilmeId === null) return;

    atualizarFilme(editFilmeId, {
      titulo: novoTitulo.trim(),
      sinopse: novaSinopse.trim() || 'Sinopse não informada.',
      ano: Number(novoAno) || new Date().getFullYear(),
      duracao: novaDuracao.trim() || '1h 30min',
      generos: novosGeneros.split(',').map(g => g.trim()).filter(Boolean).length > 0
        ? novosGeneros.split(',').map(g => g.trim()).filter(Boolean)
        : ['Geral'],
      nota: Number(novaNota) || 7.0,
      imagem: novaImagemUrl.trim() || undefined,
      banner: novaBannerUrl.trim() || undefined,
      trailerUrl: novoTrailerUrl.trim() || undefined,
      videoUrl: novoVideoUrl.trim(),
      elenco: novoElenco.split(',').map(e => e.trim()).filter(Boolean).length > 0
        ? novoElenco.split(',').map(e => e.trim()).filter(Boolean)
        : ['Elenco não informado'],
      diretor: novoDiretor.trim() || 'Diretor não informado',
      categoria: novaCategoria.trim() || 'Novos',
      classificacao: novaClassificacao,
    });

    limparFormulario();
    setShowEditModal(false);
    setEditFilmeId(null);
  };

  const handleRemoverFilme = (filmeId: number) => {
    removerFilme(filmeId);
    setDeleteConfirm(null);
  };

  const handleRemoverUsuarioConfirmado = (email: string) => {
    removerUsuario(email);
    setUserDeleteConfirm(null);
  };

  const togglePlanoAcesso = (filmeId: number, planoId: string, temAcesso: boolean) => {
    if (temAcesso) {
      removerFilmeDoPlano(filmeId, planoId);
    } else {
      liberarFilmeParaPlano(filmeId, planoId);
    }
  };

  const usuariosNormais = todosUsuarios.filter(u => u.email !== ADMIN_EMAIL);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-20 md:pt-24 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl text-white tracking-wide mb-1">
                Painel de Controle
              </h1>
              <p className="text-gray-500 text-sm">
                Gerencie filmes, usuários e controle de acesso
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors whitespace-nowrap"
              >
                <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                  <i className="ri-home-4-line"></i>
                </span>
                Início
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 bg-gray-900/50 rounded-full p-1 w-fit overflow-x-auto">
            <button
              onClick={() => setTab('filmes')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                tab === 'filmes'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                <i className="ri-movie-2-line"></i>
              </span>
              Filmes
            </button>
            <button
              onClick={() => setTab('usuarios')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                tab === 'usuarios'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                <i className="ri-group-line"></i>
              </span>
              Usuários
            </button>
            <button
              onClick={() => setTab('planos')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                tab === 'planos'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                <i className="ri-vip-crown-line"></i>
              </span>
              Planos
            </button>
          </div>

          {/* Tab: Filmes */}
          {tab === 'filmes' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-400 text-sm">
                  <strong className="text-white">{todosOsFilmes.length}</strong> filmes no catálogo
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-medium text-sm rounded-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-add-line"></i>
                  </span>
                  Adicionar Filme
                </button>
              </div>

              {todosOsFilmes.length === 0 ? (
                <div className="text-center py-16 bg-gray-900/30 border border-gray-800 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <i className="ri-movie-2-line text-2xl text-gray-600"></i>
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">Catálogo Vazio</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                    Nenhum filme cadastrado ainda. Clique em "Adicionar Filme" para começar a montar seu catálogo.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todosOsFilmes.map((filme) => (
                    <div
                      key={filme.id}
                      className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 md:p-5 flex flex-col lg:flex-row lg:items-center gap-4"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img
                          src={filme.imagem}
                          alt={filme.titulo}
                          className="w-12 h-16 md:w-14 md:h-20 rounded object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="text-white font-semibold text-sm md:text-base truncate">
                            {filme.titulo}
                          </h3>
                          <p className="text-gray-500 text-xs truncate">
                            {filme.ano} · {filme.duracao} · {filme.categoria}
                          </p>
                          <p className="text-gray-600 text-[10px] truncate mt-0.5">
                            Video: {filme.videoUrl.substring(0, 50)}...
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        {planos.map((plano) => {
                          const temAcesso = (filmesPorPlano[plano.id] ?? []).includes(filme.id);
                          return (
                            <button
                              key={plano.id}
                              onClick={() => togglePlanoAcesso(filme.id, plano.id, temAcesso)}
                              className={`px-3 py-1.5 rounded-full text-[11px] md:text-xs font-medium transition-all duration-200 whitespace-nowrap border ${
                                temAcesso
                                  ? 'bg-green-900/40 border-green-700 text-green-400 hover:bg-green-900/60'
                                  : 'bg-gray-800 border-gray-700 text-gray-500 hover:border-gray-600 hover:text-gray-400'
                              }`}
                            >
                              {plano.nome}
                              <span className="ml-1">
                                {temAcesso ? (
                                  <i className="ri-checkbox-circle-fill"></i>
                                ) : (
                                  <i className="ri-checkbox-blank-circle-line"></i>
                                )}
                              </span>
                            </button>
                          );
                        })}
                        <button
                          onClick={() => abrirEdicao(filme)}
                          className="px-2.5 py-1.5 bg-blue-900/30 hover:bg-blue-900/60 border border-blue-800 text-blue-400 rounded-lg text-xs transition-colors whitespace-nowrap"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(filme.id)}
                          className="px-2.5 py-1.5 bg-red-900/30 hover:bg-red-900/60 border border-red-800 text-red-400 rounded-lg text-xs transition-colors whitespace-nowrap"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Tab: Usuários */}
          {tab === 'usuarios' && (
            <>
              <div className="mb-6">
                <p className="text-gray-400 text-sm">
                  <strong className="text-white">{usuariosNormais.length}</strong> usuários cadastrados
                </p>
              </div>

              {usuariosNormais.length === 0 ? (
                <div className="text-center py-16 bg-gray-900/30 border border-gray-800 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <i className="ri-group-line text-2xl text-gray-600"></i>
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">Nenhum Usuário</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto">
                    Quando alguém se cadastrar pelo site, aparecerá aqui.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {usuariosNormais.map((usuario) => (
                    <div
                      key={usuario.email}
                      className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          usuario.ativo ? 'bg-green-600/20' : 'bg-red-600/20'
                        }`}>
                          <span className={`text-sm font-bold ${usuario.ativo ? 'text-green-400' : 'text-red-400'}`}>
                            {usuario.nome.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-white font-semibold text-sm truncate">
                            {usuario.nome}
                          </h3>
                          <p className="text-gray-500 text-xs truncate">
                            {usuario.email}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-600 flex-wrap">
                            <span className="bg-gray-800 px-2 py-0.5 rounded-full">
                              {planos.find(p => p.id === usuario.planoAtual)?.nome || usuario.planoAtual}
                            </span>
                            <span>
                              Desde {new Date(usuario.dataAssinatura).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleAtivarUsuario(usuario.email)}
                          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap border ${
                            usuario.ativo
                              ? 'bg-green-900/30 border-green-700/50 text-green-400 hover:bg-green-900/50'
                              : 'bg-red-900/30 border-red-700/50 text-red-400 hover:bg-red-900/50'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 inline-flex items-center justify-center mr-1.5">
                            <i className={usuario.ativo ? 'ri-toggle-fill' : 'ri-toggle-line'}></i>
                          </span>
                          {usuario.ativo ? 'Ativo' : 'Desativado'}
                        </button>
                        <button
                          onClick={() => setUserDeleteConfirm(usuario.email)}
                          className="px-2.5 py-2 bg-red-900/20 hover:bg-red-900/50 border border-red-800/50 text-red-400 rounded-lg text-xs transition-colors whitespace-nowrap"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Tab: Planos */}
          {tab === 'planos' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {planos.map((plano) => {
                const filmesDoPlano = todosOsFilmes.filter(f =>
                  (filmesPorPlano[plano.id] ?? []).includes(f.id)
                );
                const usuariosDoPlano = usuariosNormais.filter(u => u.planoAtual === plano.id);
                return (
                  <div
                    key={plano.id}
                    className="bg-gray-900/60 border border-gray-800 rounded-xl p-6"
                  >
                    <h3 className="font-heading text-xl text-white mb-1 tracking-wide">
                      {plano.nome}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      R$ {plano.preco.toFixed(2).replace('.', ',')}/mês
                    </p>

                    <div className="flex gap-6 mb-4">
                      <div>
                        <div className="text-3xl font-heading text-red-500">
                          {filmesDoPlano.length}
                        </div>
                        <p className="text-gray-600 text-xs">filmes</p>
                      </div>
                      <div>
                        <div className="text-3xl font-heading text-green-500">
                          {usuariosDoPlano.length}
                        </div>
                        <p className="text-gray-600 text-xs">usuários</p>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      <p className="text-gray-500 text-xs font-medium mb-2">Filmes liberados:</p>
                      {filmesDoPlano.map((f) => (
                        <div key={f.id} className="flex items-center gap-2.5 py-1.5 border-b border-gray-800/50 last:border-0">
                          <img
                            src={f.imagem}
                            alt={f.titulo}
                            className="w-8 h-11 rounded object-cover flex-shrink-0"
                          />
                          <span className="text-gray-300 text-xs truncate">{f.titulo}</span>
                        </div>
                      ))}
                      {filmesDoPlano.length === 0 && (
                        <p className="text-gray-600 text-xs py-4 text-center">
                          Nenhum filme liberado
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Modal Adicionar Filme */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            <h3 className="font-heading text-2xl text-white mb-6 tracking-wide">
              Adicionar Novo Filme
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Título *</label>
                  <input
                    type="text"
                    value={novoTitulo}
                    onChange={e => setNovoTitulo(e.target.value)}
                    placeholder="Nome do filme"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Duração</label>
                  <input
                    type="text"
                    value={novaDuracao}
                    onChange={e => setNovaDuracao(e.target.value)}
                    placeholder="2h 00min"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">URL do Vídeo *</label>
                <input
                  type="text"
                  value={novoVideoUrl}
                  onChange={e => setNovoVideoUrl(e.target.value)}
                  placeholder="https://...mp4 ou .m3u8"
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors font-mono text-xs"
                />
                <p className="text-gray-600 text-[10px] mt-1">
                  Insira a URL do vídeo hospedado externamente (ex: seu servidor, CDN, S3, etc.)
                </p>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">Sinopse</label>
                <textarea
                  value={novaSinopse}
                  onChange={e => setNovaSinopse(e.target.value)}
                  placeholder="Descrição do filme..."
                  rows={3}
                  maxLength={500}
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Ano</label>
                  <input
                    type="text"
                    value={novoAno}
                    onChange={e => setNovoAno(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Nota</label>
                  <input
                    type="text"
                    value={novaNota}
                    onChange={e => setNovaNota(e.target.value)}
                    placeholder="8.5"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Classificação</label>
                  <select
                    value={novaClassificacao}
                    onChange={e => setNovaClassificacao(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  >
                    <option value="L">Livre</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Categoria</label>
                  <input
                    type="text"
                    value={novaCategoria}
                    onChange={e => setNovaCategoria(e.target.value)}
                    placeholder="Ação"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Gêneros (vírgula)</label>
                  <input
                    type="text"
                    value={novosGeneros}
                    onChange={e => setNovosGeneros(e.target.value)}
                    placeholder="Ação, Aventura"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Diretor</label>
                  <input
                    type="text"
                    value={novoDiretor}
                    onChange={e => setNovoDiretor(e.target.value)}
                    placeholder="Nome do diretor"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">Elenco (vírgula)</label>
                <input
                  type="text"
                  value={novoElenco}
                  onChange={e => setNovoElenco(e.target.value)}
                  placeholder="Ator 1, Atriz 2"
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">URL do Trailer (YouTube embed)</label>
                <input
                  type="text"
                  value={novoTrailerUrl}
                  onChange={e => setNovoTrailerUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">URL da Capa (poster)</label>
                <input
                  type="text"
                  value={novaImagemUrl}
                  onChange={e => setNovaImagemUrl(e.target.value)}
                  placeholder="https://...poster.jpg — deixe vazio para gerar automático"
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">URL do Banner</label>
                <input
                  type="text"
                  value={novaBannerUrl}
                  onChange={e => setNovaBannerUrl(e.target.value)}
                  placeholder="https://...banner.jpg — deixe vazio para gerar automático"
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors font-mono text-xs"
                />
              </div>

              {addError && (
                <p className="text-red-400 text-xs bg-red-900/20 px-3 py-2 rounded-lg">{addError}</p>
              )}

              <button
                onClick={handleAddFilme}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                  <i className="ri-add-line"></i>
                </span>
                Adicionar Filme
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Filme */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { setShowEditModal(false); limparFormulario(); }} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <button
              onClick={() => { setShowEditModal(false); limparFormulario(); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            <h3 className="font-heading text-2xl text-white mb-6 tracking-wide">
              Editar Filme
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Título *</label>
                  <input
                    type="text"
                    value={novoTitulo}
                    onChange={e => setNovoTitulo(e.target.value)}
                    placeholder="Nome do filme"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Duração</label>
                  <input
                    type="text"
                    value={novaDuracao}
                    onChange={e => setNovaDuracao(e.target.value)}
                    placeholder="2h 00min"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">URL do Vídeo *</label>
                <input
                  type="text"
                  value={novoVideoUrl}
                  onChange={e => setNovoVideoUrl(e.target.value)}
                  placeholder="https://...mp4 ou .m3u8"
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">URL do Trailer (YouTube embed)</label>
                <input
                  type="text"
                  value={novoTrailerUrl}
                  onChange={e => setNovoTrailerUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">Sinopse</label>
                <textarea
                  value={novaSinopse}
                  onChange={e => setNovaSinopse(e.target.value)}
                  placeholder="Descrição do filme..."
                  rows={3}
                  maxLength={500}
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">URL da Capa (poster)</label>
                <input
                  type="text"
                  value={novaImagemUrl}
                  onChange={e => setNovaImagemUrl(e.target.value)}
                  placeholder="https://...poster.jpg"
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">URL do Banner</label>
                <input
                  type="text"
                  value={novaBannerUrl}
                  onChange={e => setNovaBannerUrl(e.target.value)}
                  placeholder="https://...banner.jpg"
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Ano</label>
                  <input
                    type="text"
                    value={novoAno}
                    onChange={e => setNovoAno(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Nota</label>
                  <input
                    type="text"
                    value={novaNota}
                    onChange={e => setNovaNota(e.target.value)}
                    placeholder="8.5"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Classificação</label>
                  <select
                    value={novaClassificacao}
                    onChange={e => setNovaClassificacao(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  >
                    <option value="L">Livre</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Categoria</label>
                  <input
                    type="text"
                    value={novaCategoria}
                    onChange={e => setNovaCategoria(e.target.value)}
                    placeholder="Ação"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Gêneros (vírgula)</label>
                  <input
                    type="text"
                    value={novosGeneros}
                    onChange={e => setNovosGeneros(e.target.value)}
                    placeholder="Ação, Aventura"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Diretor</label>
                  <input
                    type="text"
                    value={novoDiretor}
                    onChange={e => setNovoDiretor(e.target.value)}
                    placeholder="Nome do diretor"
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1.5">Elenco (vírgula)</label>
                <input
                  type="text"
                  value={novoElenco}
                  onChange={e => setNovoElenco(e.target.value)}
                  placeholder="Ator 1, Atriz 2"
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-red-600 transition-colors"
                />
              </div>

              {addError && (
                <p className="text-red-400 text-xs bg-red-900/20 px-3 py-2 rounded-lg">{addError}</p>
              )}

              <button
                onClick={handleUpdateFilme}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                  <i className="ri-save-line"></i>
                </span>
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Deleção Filme */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 max-w-sm w-full animate-fade-in-up text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-red-900/30 rounded-full flex items-center justify-center">
              <i className="ri-error-warning-line text-2xl text-red-500"></i>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Remover Filme?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Esta ação é permanente. O filme será removido de todos os planos.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors whitespace-nowrap"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleRemoverFilme(deleteConfirm)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-medium text-sm rounded-lg transition-colors whitespace-nowrap"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Deleção Usuário */}
      {userDeleteConfirm !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setUserDeleteConfirm(null)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 max-w-sm w-full animate-fade-in-up text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-red-900/30 rounded-full flex items-center justify-center">
              <i className="ri-error-warning-line text-2xl text-red-500"></i>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Remover Usuário?</h3>
            <p className="text-gray-400 text-sm mb-6">
              O usuário <strong className="text-white">{userDeleteConfirm}</strong> será removido permanentemente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setUserDeleteConfirm(null)}
                className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors whitespace-nowrap"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleRemoverUsuarioConfirmado(userDeleteConfirm)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-medium text-sm rounded-lg transition-colors whitespace-nowrap"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}