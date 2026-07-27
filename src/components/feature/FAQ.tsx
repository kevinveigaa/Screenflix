import { useState } from 'react';

const faqs = [
  {
    pergunta: 'O que é o Screenflix?',
    resposta:
      'Screenflix é uma plataforma de streaming onde você pode assistir a filmes, séries e documentários de diversos gêneros. Com um catálogo sempre atualizado, oferecemos conteúdo de alta qualidade para todos os gostos, acessível em qualquer dispositivo.',
  },
  {
    pergunta: 'Quanto custa usar o Screenflix?',
    resposta:
      'O Screenflix oferece planos a partir de R$ 19,90 por mês. Você pode escolher entre diferentes níveis de qualidade e número de telas simultâneas. O primeiro mês é grátis para novos usuários, sem compromisso.',
  },
  {
    pergunta: 'Onde posso assistir?',
    resposta:
      'Assista onde e quando quiser. Acesse o Screenflix pelo seu computador, celular, tablet, smart TV ou videogame. Basta fazer login em sua conta para começar a assistir instantaneamente.',
  },
  {
    pergunta: 'Como faço para cancelar?',
    resposta:
      'O Screenflix é flexível. Você pode cancelar sua assinatura a qualquer momento diretamente nas configurações da sua conta, sem taxas de cancelamento nem contratos de fidelidade.',
  },
  {
    pergunta: 'O que posso assistir no Screenflix?',
    resposta:
      'Nosso catálogo conta com centenas de filmes, séries e documentários de diversos gêneros. Temos ação, comédia, terror, ficção científica, romance, drama, documentários e muito mais. Novos títulos são adicionados toda semana.',
  },
  {
    pergunta: 'O Screenflix é bom para crianças?',
    resposta:
      'Sim! Oferecemos perfis infantis com conteúdo selecionado e adequado para todas as idades. Os pais podem controlar o que as crianças assistem e definir restrições por classificação indicativa.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 lg:px-12">
      <h2 className="font-heading text-2xl md:text-3xl text-white text-center mb-8 md:mb-10 tracking-wide">
        Perguntas Frequentes
      </h2>

      <div className="max-w-3xl mx-auto space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-900/60 hover:bg-gray-800/60 transition-colors duration-200"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-5 py-4 md:px-6 md:py-5 text-left cursor-pointer"
              aria-expanded={openIndex === index}
            >
              <span className="text-white text-base md:text-lg font-medium pr-4">
                {faq.pergunta}
              </span>
              <span className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <i
                  className={`ri-add-line text-2xl text-white transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                ></i>
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-400 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-5 pb-5 md:px-6 md:pb-6 text-gray-300 text-sm md:text-base leading-relaxed">
                {faq.resposta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}