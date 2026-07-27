export interface Plano {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  qualidade: string;
  telas: number;
  downloads: boolean;
  filmesLiberados: 'selecionados' | 'todos';
  destaque: boolean;
  pixKey: string;
  pixMerchantName: string;
  pixMerchantCity: string;
  pixTxid: string;
  beneficios: string[];
}

export const planos: Plano[] = [
  {
    id: 'basico',
    nome: 'Básico',
    preco: 19.90,
    descricao: 'Perfeito pra começar sua maratona com os filmes essenciais.',
    qualidade: 'HD',
    telas: 1,
    downloads: false,
    filmesLiberados: 'selecionados',
    destaque: false,
    pixKey: 'veigakevin71@gmail.com',
    pixMerchantName: 'Screenflix',
    pixMerchantCity: 'Sao Paulo',
    pixTxid: 'BASICO001',
    beneficios: [
      'Filmes selecionados pelo admin',
      'Qualidade HD',
      '1 tela por vez',
      'Sem anúncios',
      'Cancele quando quiser'
    ]
  },
  {
    id: 'premium',
    nome: 'Premium',
    preco: 39.90,
    descricao: 'Acesso completo a todo o catálogo com qualidade 4K e downloads.',
    qualidade: '4K Ultra HD',
    telas: 2,
    downloads: true,
    filmesLiberados: 'todos',
    destaque: true,
    pixKey: 'veigakevin71@gmail.com',
    pixMerchantName: 'Screenflix',
    pixMerchantCity: 'Sao Paulo',
    pixTxid: 'PREMIUM001',
    beneficios: [
      'Catálogo completo de filmes',
      'Qualidade 4K Ultra HD',
      '2 telas simultâneas',
      'Downloads offline',
      'Conteúdo exclusivo',
      'Sem anúncios',
      'Cancele quando quiser'
    ]
  },
  {
    id: 'familia',
    nome: 'Família',
    preco: 59.90,
    descricao: 'Diversão pra casa toda com 4 telas e controle parental.',
    qualidade: '4K Ultra HD',
    telas: 4,
    downloads: true,
    filmesLiberados: 'todos',
    destaque: false,
    pixKey: 'veigakevin71@gmail.com',
    pixMerchantName: 'Screenflix',
    pixMerchantCity: 'Sao Paulo',
    pixTxid: 'FAMILIA001',
    beneficios: [
      'Catálogo completo de filmes',
      'Qualidade 4K Ultra HD',
      '4 telas simultâneas',
      'Downloads offline',
      'Conteúdo exclusivo',
      'Controle parental',
      'Perfis personalizados',
      'Sem anúncios',
      'Cancele quando quiser'
    ]
  }
];