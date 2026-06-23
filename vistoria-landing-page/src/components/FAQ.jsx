// AUTOR: Eduardo do Carmo

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "O checklist serve para imóveis usados?",
    answer: "Não. Este checklist foi desenvolvido especificamente para vistorias de entrega de imóveis novos, comprados na planta, onde o foco é identificar vícios construtivos e garantir que a construtora entregue exatamente o que foi prometido em memorial descritivo."
  },
  {
    id: 2,
    question: "Preciso ter conhecimento técnico para usar?",
    answer: "De forma alguma. Toda a linguagem técnica foi traduzida para termos do dia a dia. Você saberá exatamente para onde olhar, o que testar (e como testar) sem precisar ser engenheiro ou arquiteto."
  },
  {
    id: 3,
    question: "Como recebo o material?",
    answer: "Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link para baixar o arquivo em PDF de alta qualidade. Você pode levá-lo no celular ou impresso no dia da vistoria."
  },
  {
    id: 4,
    question: "E se eu não gostar?",
    answer: "Você tem 7 dias de garantia incondicional. Se você abrir o checklist e achar que não vai te ajudar na sua vistoria, basta enviar um e-mail para nossa equipe e devolvemos 100% do seu dinheiro, sem burocracia."
  }
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Dúvidas Frequentes</span>
          <h2>Ainda tem dúvidas?</h2>
          <p>Tudo o que você precisa saber antes de adquirir o seu checklist de vistoria.</p>
        </div>

        {/* Classe alterada para bater com o CSS (.faq) */}
        <div className="faq">
          {faqData.map((item) => {
            const isOpen = openItem === item.id;
            return (
              <div
                key={item.id}
                // Injeta is-open em vez de is-active
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  // Classe faq-q em vez de faq-question
                  className="faq-q"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${item.id}`}
                >
                  {item.question}
                  {/* Ícone único com a classe chev para rotacionar via CSS */}
                  <ChevronDown className="chev" size={20} aria-hidden="true" />
                </button>
                <div
                  id={`faq-a-${item.id}`}
                  // Classe faq-a que contém o max-height
                  className="faq-a"
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
