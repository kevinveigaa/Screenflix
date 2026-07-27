import { useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

function detectarTipoVideo(url: string): 'youtube' | 'mp4' | 'outro' {
  if (!url) return 'outro';
  if (/youtube\.com|youtu\.be/i.test(url)) return 'youtube';
  if (/\.(mp4|webm|ogg|mov|mkv)/i.test(url)) return 'mp4';
  return 'outro';
}

function extrairYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?&]+)/,
    /(?:youtube\.com\/embed\/)([^?&]+)/,
    /(?:youtube\.com\/shorts\/)([^?&]+)/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

export default function Watch() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin, filmesLiberados, todosOsFilmes } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const filme = todosOsFilmes.find(f => f.id === Number(id));
  const isLiberado = isAdmin || (user && user.ativo && filmesLiberados.some(f => f.id === Number(id)));

  const tipoVideo = useMemo(() => filme ? detectarTipoVideo(filme.videoUrl) : 'outro', [filme]);
  const youtubeId = useMemo(() => filme ? extrairYoutubeId(filme.videoUrl) : null, [filme]);

  useEffect(() => {
    if (!filme || !isLiberado) return;

    const goFullScreen = () => {
      const el = containerRef.current;
      if (el && document.fullscreenEnabled) {
        el.requestFullscreen().catch(() => {});
      }
    };

    const timer = setTimeout(goFullScreen, 600);
    return () => clearTimeout(timer);
  }, [filme, isLiberado]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (!filme) {
    return (
      <div className="fixed inset-0 z-[300] bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">Filme não encontrado</p>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!isLiberado) {
    return (
      <div className="fixed inset-0 z-[300] bg-black flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-yellow-900/30">
            <i className="ri-lock-line text-4xl text-yellow-500"></i>
          </div>
          <h2 className="text-white text-xl font-heading mb-3">Conteúdo Bloqueado</h2>
          <p className="text-gray-400 text-sm mb-6">
            {!user
              ? 'Faça login e assine um plano para assistir.'
              : !user.ativo
                ? 'Sua conta está desativada. Entre em contato com o suporte.'
                : 'Seu plano atual não inclui este filme. Faça upgrade para assistir.'}
          </p>
          <div className="flex items-center gap-3 justify-center">
            {!user ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-md transition-all duration-300 whitespace-nowrap"
                >
                  Fazer Login
                </button>
                <button
                  onClick={() => navigate('/plans')}
                  className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm rounded-md transition-all duration-300 whitespace-nowrap"
                >
                  Ver Planos
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/plans')}
                className="px-6 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-white font-bold text-sm rounded-md transition-all duration-300 whitespace-nowrap"
              >
                Fazer Upgrade
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-[300] bg-black">

      {tipoVideo === 'youtube' && youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1&iv_load_policy=3&fs=1&showinfo=0&cc_load_policy=0`}
          title={filme.titulo}
          className="w-full h-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : tipoVideo === 'mp4' ? (
        <video
          src={filme.videoUrl}
          controls
          autoPlay
          className="w-full h-full object-contain bg-black"
          poster={filme.banner}
        >
          Seu navegador não suporta o player de vídeo.
        </video>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-gray-300 text-sm mb-4">Clique abaixo para abrir o vídeo:</p>
          <a
            href={filme.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-md transition-all duration-300 whitespace-nowrap"
          >
            Abrir Vídeo
          </a>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 text-gray-500 hover:text-gray-300 text-xs transition-colors"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}