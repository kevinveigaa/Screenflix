import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { planos } from '@/mocks/planos';
const AuthContext = createContext(null);
const STORAGE_KEY_USER = 'screenflix_user';
const STORAGE_KEY_USUARIOS = 'screenflix_usuarios';
const STORAGE_KEY_FILMES_PLANO = 'screenflix_filmes_plano';
const STORAGE_KEY_FILMES_ADICIONAIS = 'screenflix_filmes_adicionais';
const ADMIN_EMAIL = 'admin@screenflix.com';
const ADMIN_SENHA = 'Scr33nflix@2025!';
function getUsuarios() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_USUARIOS);
        if (saved)
            return JSON.parse(saved);
    }
    catch { /* */ }
    return [];
}
function getFilmesPorPlano() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_FILMES_PLANO);
        if (saved)
            return JSON.parse(saved);
    }
    catch { /* */ }
    return { basico: [], premium: [], familia: [] };
}
function getFilmesAdicionais() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_FILMES_ADICIONAIS);
        if (saved)
            return JSON.parse(saved);
    }
    catch { /* */ }
    return [];
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_USER);
            return saved ? JSON.parse(saved) : null;
        }
        catch {
            return null;
        }
    });
    const [isAdmin, setIsAdmin] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_USER);
            if (saved) {
                const u = JSON.parse(saved);
                return u.email === ADMIN_EMAIL;
            }
        }
        catch { /* */ }
        return false;
    });
    const [todosUsuarios, setTodosUsuarios] = useState(getUsuarios);
    const [filmesPorPlano, setFilmesPorPlano] = useState(getFilmesPorPlano);
    const [filmesAdicionais, setFilmesAdicionais] = useState(getFilmesAdicionais);
    const todosOsFilmes = filmesAdicionais;
    const planoUsuario = user ? planos.find(p => p.id === user.planoAtual) ?? null : null;
    const filmesLiberados = (() => {
        if (!user || !planoUsuario)
            return [];
        if (!user.ativo)
            return [];
        if (isAdmin)
            return todosOsFilmes;
        const ids = filmesPorPlano[user.planoAtual] ?? [];
        return todosOsFilmes.filter(f => ids.includes(f.id));
    })();
    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        }
        else {
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
    const login = useCallback((email, senha, nome, planoId) => {
        const emailLower = email.toLowerCase().trim();
        if (emailLower === ADMIN_EMAIL) {
            if (senha !== ADMIN_SENHA)
                return false;
            const adminUser = {
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
            if (!usuarioExistente.ativo)
                return false;
            setUser(usuarioExistente);
            setIsAdmin(false);
            return true;
        }
        if (nome && planoId) {
            const novoUsuario = {
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
    const trocarPlano = useCallback((planoId) => {
        setUser(prev => {
            if (!prev)
                return prev;
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
    const liberarFilmeParaPlano = useCallback((filmeId, planoId) => {
        setFilmesPorPlano(prev => {
            const atual = prev[planoId] ?? [];
            if (atual.includes(filmeId))
                return prev;
            return { ...prev, [planoId]: [...atual, filmeId] };
        });
    }, []);
    const removerFilmeDoPlano = useCallback((filmeId, planoId) => {
        setFilmesPorPlano(prev => {
            const atual = prev[planoId] ?? [];
            return { ...prev, [planoId]: atual.filter(id => id !== filmeId) };
        });
    }, []);
    const adicionarFilme = useCallback((filme) => {
        setFilmesAdicionais(prev => {
            if (prev.some(f => f.id === filme.id))
                return prev;
            return [...prev, filme];
        });
    }, []);
    const atualizarFilme = useCallback((filmeId, dados) => {
        setFilmesAdicionais(prev => prev.map(f => f.id === filmeId ? { ...f, ...dados } : f));
    }, []);
    const removerFilme = useCallback((filmeId) => {
        setFilmesAdicionais(prev => prev.filter(f => f.id !== filmeId));
        setFilmesPorPlano(prev => {
            const updated = {};
            for (const key of Object.keys(prev)) {
                updated[key] = prev[key].filter(id => id !== filmeId);
            }
            return updated;
        });
    }, []);
    const toggleAtivarUsuario = useCallback((email) => {
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
    const removerUsuario = useCallback((email) => {
        setTodosUsuarios(prev => prev.filter(u => u.email.toLowerCase() !== email.toLowerCase()));
    }, []);
    return (_jsx(AuthContext.Provider, { value: {
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
        }, children: children }));
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
export { ADMIN_EMAIL, ADMIN_SENHA };
