import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Plano } from '@/mocks/planos';
import { planos } from '@/mocks/planos';
import type { Filme } from '@/mocks/filmes';

export interface UserData {
  nome: string;
  email: string;
  planoAtual: string;
  dataAssinatura: string;
  ativo: boolean;
}

interface AuthContextType {
  user: UserData | null;
  planoUsuario: Plano | null;
  filmesLiberados: Filme[];
  isAdmin: boolean;
  login: (email: string, senha: string, nome?: string, planoId?: string) => boolean;
  logout: () => void;
  trocarPlano: (planoId: string) => void;
  liberarFilmeParaPlano: (filmeId: number, planoId: string) => void;
  removerFilmeDoPlano: (filmeId: number, planoId: string) => void;
  adicionarFilme: (filme: Filme) => void;
  atualizarFilme: (filmeId: number, dados: Partial<Filme>) => void;
  removerFilme: (filmeId: number) => void;
  todosOsFilmes: Filme[];
  filmesPorPlano: Record<string, number[]>;
  todosUsuarios: UserData[];
  toggleAtivarUsuario: (email: string) => void;
  removerUsuario: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY_USER = 'screenflix_user';
const STORAGE_KEY_USUARIOS = 'screenflix_usuarios';
const STORAGE_KEY_FILMES_PLANO = 'screenflix_filmes_plano';
const STORAGE_KEY_FILMES_ADICIONAIS = 'screenflix_filmes_adicionais';

const ADMIN_EMAIL = 'admin@screenflix.com';
const ADMIN_SENHA = 'Scr33nflix@2025!';

function getUsuarios(): UserData[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_USUARIOS);
    if (saved) return JSON.parse(saved);
  } catch { /* */ }
  return [];
}

function getFilmesPorPlano(): Record<string, number[]> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_FILMES_PLANO);
    if (saved) return JSON.parse(saved);
  } catch { /* */ }
  return { basico: [], premium: [], familia: [] };
}

function getFilmesAdicionais(): Filme[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_FILMES_ADICIONAIS);
    if (saved) return JSON.parse(saved);
  } catch { /* */ }
  return [];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) {
        const u = JSON.parse(saved);
        return u.email === ADMIN_EMAIL;
      }
    } catch { /* */ }
    return false;
  });

  const [todosUsuarios, setTodosUsuarios] = useState<UserData[]>(getUsuarios);
  const [filmesPorPlano, setFilmesPorPlano] = useState<Record<string, number[]>>(getFilmesPorPlano);
  const [filmesAdicionais, setFilmesAdicionais] = useState<Filme[]>(getFilmesAdicionais);

  const todosOsFilmes = filmesAdicionais;

  const planoUsuario = user ? planos.find(p => p.id === user.planoAtual) ?? null : null;

  const filmesLiberados = (() => {
    if (!user || !planoUsuario) return [];
    if (!user.ativo) return [];
    if (isAdmin) return todosOsFilmes;
    const ids = filmesPorPlano[user.planoAtual] ?? [];
    return todosOsFilmes.filter(f => ids.includes(f.id));
  })();

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USUARIOS, JSON.stringify(todosUsuarios));
  }, [todosUsuarios]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FILMES_PLANO, JSON.stringify(filmesPorPlano));
  }, [filmesPorPlano]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FILMES_ADICIONAIS, JSON.stringify(filmesAdicionais));
  }, [filmesAdicionais]);

  const login = useCallback((email: string, senha: string, nome?: string, planoId?: string): boolean => {
    const emailLower = email.toLowerCase().trim();

    if (emailLower === ADMIN_EMAIL) {
      if (senha !== ADMIN_SENHA) return false;
      const adminUser: UserData = {
        nome: 'Administrador',
        email: ADMIN_EMAIL,
        planoAtual: 'premium',
        dataAssinatura: new Date().toISOString(),
        ativo: true,
      };
      setUser(adminUser);
      setIsAdmin(true);
      return true;
    }

    const usuarios = getUsuarios();
    const usuarioExistente = usuarios.find(u => u.email.toLowerCase() === emailLower);

    if (usuarioExistente) {
      if (!usuarioExistente.ativo) return false;
      setUser(usuarioExistente);
      setIsAdmin(false);
      return true;
    }

    if (nome && planoId) {
      const novoUsuario: UserData = {
        nome: nome.trim(),
        email: emailLower,
        planoAtual: planoId,
        dataAssinatura: new Date().toISOString(),
        ativo: true,
      };
      const updatedUsuarios = [...usuarios, novoUsuario];
      localStorage.setItem(STORAGE_KEY_USUARIOS, JSON.stringify(updatedUsuarios));
      setTodosUsuarios(updatedUsuarios);
      setUser(novoUsuario);
      setIsAdmin(false);
      return true;
    }

    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
  }, []);

  const trocarPlano = useCallback((planoId: string) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, planoAtual: planoId, dataAssinatura: new Date().toISOString() };

      setTodosUsuarios(prevUsuarios => {
        const idx = prevUsuarios.findIndex(u => u.email === updated.email);
        if (idx >= 0) {
          const copy = [...prevUsuarios];
          copy[idx] = updated;
          return copy;
        }
        return [...prevUsuarios, updated];
      });

      return updated;
    });
  }, []);

  const liberarFilmeParaPlano = useCallback((filmeId: number, planoId: string) => {
    setFilmesPorPlano(prev => {
      const atual = prev[planoId] ?? [];
      if (atual.includes(filmeId)) return prev;
      return { ...prev, [planoId]: [...atual, filmeId] };
    });
  }, []);

  const removerFilmeDoPlano = useCallback((filmeId: number, planoId: string) => {
    setFilmesPorPlano(prev => {
      const atual = prev[planoId] ?? [];
      return { ...prev, [planoId]: atual.filter(id => id !== filmeId) };
    });
  }, []);

  const adicionarFilme = useCallback((filme: Filme) => {
    setFilmesAdicionais(prev => {
      if (prev.some(f => f.id === filme.id)) return prev;
      return [...prev, filme];
    });
  }, []);

  const atualizarFilme = useCallback((filmeId: number, dados: Partial<Filme>) => {
    setFilmesAdicionais(prev => prev.map(f => f.id === filmeId ? { ...f, ...dados } : f));
  }, []);

  const removerFilme = useCallback((filmeId: number) => {
    setFilmesAdicionais(prev => prev.filter(f => f.id !== filmeId));
    setFilmesPorPlano(prev => {
      const updated: Record<string, number[]> = {};
      for (const key of Object.keys(prev)) {
        updated[key] = prev[key].filter(id => id !== filmeId);
      }
      return updated;
    });
  }, []);

  const toggleAtivarUsuario = useCallback((email: string) => {
    setTodosUsuarios(prev => {
      const updated = prev.map(u => {
        if (u.email.toLowerCase() === email.toLowerCase()) {
          return { ...u, ativo: !u.ativo };
        }
        return u;
      });
      return updated;
    });
  }, []);

  const removerUsuario = useCallback((email: string) => {
    setTodosUsuarios(prev => prev.filter(u => u.email.toLowerCase() !== email.toLowerCase()));
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      planoUsuario,
      filmesLiberados,
      isAdmin,
      login,
      logout,
      trocarPlano,
      liberarFilmeParaPlano,
      removerFilmeDoPlano,
      adicionarFilme,
      atualizarFilme,
      removerFilme,
      todosOsFilmes,
      filmesPorPlano,
      todosUsuarios,
      toggleAtivarUsuario,
      removerUsuario,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export { ADMIN_EMAIL, ADMIN_SENHA };