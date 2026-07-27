export interface Filme {
  id: number;
  titulo: string;
  sinopse: string;
  ano: number;
  duracao: string;
  generos: string[];
  nota: number;
  imagem: string;
  banner: string;
  trailerUrl: string;
  videoUrl: string;
  elenco: string[];
  diretor: string;
  categoria: string;
  classificacao: string;
}

export const filmesDestaque: Filme[] = [];

export const filmes: Filme[] = [];

export const categorias = [
  { nome: "Em Alta", slug: "em-alta" },
  { nome: "Aclamados", slug: "aclamados" },
  { nome: "Ação", slug: "acao" },
  { nome: "Comédia", slug: "comedia" },
  { nome: "Terror", slug: "terror" },
  { nome: "Ficção Científica", slug: "ficcao-cientifica" },
  { nome: "Romance", slug: "romance" },
  { nome: "Família", slug: "familia" },
  { nome: "Documentários", slug: "documentarios" }
];