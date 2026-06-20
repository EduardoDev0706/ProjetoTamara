// AUTOR: Eduardo do Carmo

import { useState, useRef, useEffect } from 'react';
import { Shield, Clock, CheckCircle, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const cardsData = [
  {
    id: '01',
    title: 'Economia financeira',
    icon: <Shield size={26} />,
    items: [
      'Evite prejuízos e gastos com reparos após a mudança',
      'Proteja seus móveis e acabamentos ao identificar uma infiltração',
      'Evite reformas caras por itens em mau funcionamento',
      'Valorize e proteja o investimento feito na compra do imóvel'
    ]
  },
  {
    id: '02',
    title: 'Economia de tempo',
    icon: <Clock size={26} />,
    items: [
      'Material visualmente didático e direto ao ponto',
      'Checklist pronto e organizado por ambientes',
      'Orientação sobre quais ferramentas levar para a vistoria',
      'Apoio passo a passo para registrar as inconformidades'
    ]
  },
  {
    id: '03',
    title: 'Fim da insegurança técnica',
    icon: <CheckCircle size={26} />,
    items: [
      'Material explicativo em linguagem simples, sem termos complicados',
      'Orientações pensadas especialmente para pessoas leigas',
      'Explicação dos principais defeitos encontrados em apartamentos',
      'Conteúdo desenvolvido por arquiteta e urbanista experiente'
    ]
  },
  {
    id: '04',
    title: 'Conheça seus direitos',
    icon: <FileText size={26} />,
    items: [
      'Entenda o que realmente pode ser exigido da construtora',
      'Tenha mais confiança para solicitar correções',
      'Normativas técnicas indicadas para consulta',
      'Saiba exatamente o que conferir antes de assinar a ata'
    ]
  }
];

export default function Motivos() {
  // activeIndex AGORA REPRESENTA O CARD FOCADO (0 a 3)
  const [activeIndex, setActiveIndex] = useState(1);
  const [perView, setPerView] = useState(3);

  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);
  const clickedCardIndex = useRef(null);

  useEffect(() => {
    const calcPerView = () => {
      const w = window.innerWidth;
      setPerView(w < 680 ? 1 : w < 980 ? 2 : 3);
    };
    calcPerView();
    window.addEventListener('resize', calcPerView);
    return () => window.removeEventListener('resize', calcPerView);
  }, []);

  const maxIndex = cardsData.length - 1; // Máximo de CARDS, não de rolagens

  // O NOVO MOTOR MATEMÁTICO DO CARROSSEL
  const updateTransform = (delta = 0, targetIndex = activeIndex) => {
    if (!trackRef.current) return;
    const card = trackRef.current.children[0];
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width + 24;
    
    // 1. Limite físico da trilha para não mostrar espaço vazio
    const maxScrollIndex = Math.max(0, cardsData.length - perView);
    
    // 2. Tenta centralizar o card alvo deslocando metade da visão para trás
    const idealScrollIndex = targetIndex - Math.floor(perView / 2);
    
    // 3. Clamping: Trava o movimento entre 0 e o limite físico máximo
    const clampedScrollIndex = Math.max(0, Math.min(maxScrollIndex, idealScrollIndex));

    const offset = -(clampedScrollIndex * cardWidth);
    trackRef.current.style.transform = `translateX(${offset + delta}px)`;
  };

  useEffect(() => {
    updateTransform(0, activeIndex);
  }, [activeIndex, perView]);

  const goTo = (index) => {
    const safeIndex = Math.max(0, Math.min(maxIndex, index));
    setActiveIndex(safeIndex);
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;

    const card = e.target.closest('.bcard');
    clickedCardIndex.current = card ? parseInt(card.dataset.index, 10) : null;

    if (trackRef.current) {
      trackRef.current.classList.add('dragging');
      trackRef.current.setPointerCapture(e.pointerId);
      trackRef.current.style.transition = 'none';
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    dragDeltaX.current = e.clientX - dragStartX.current;
    updateTransform(dragDeltaX.current);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (trackRef.current) {
      trackRef.current.classList.remove('dragging');
      trackRef.current.style.transition = 'transform .55s cubic-bezier(.22,.61,.36,1)';

      // CLIQUE ESTÁTICO: O activeIndex recebe exatamente o card clicado
      if (Math.abs(dragDeltaX.current) < 5) {
        if (clickedCardIndex.current !== null) {
          goTo(clickedCardIndex.current);
        }
      } else {
        // ARRASTO: Muda o activeIndex com base no percurso movido
        const cardWidth = trackRef.current.children[0].getBoundingClientRect().width + 24;
        const movedCards = Math.round(-dragDeltaX.current / cardWidth);
        goTo(activeIndex + movedCards);
      }

      updateTransform(0, activeIndex);
      dragDeltaX.current = 0;
      clickedCardIndex.current = null;
    }
  };

  return (
    <section className="cards-section" id="motivos">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Por que adquirir</span>
          <h2>Motivos para garantir seu checklist antes da vistoria</h2>
          <p>Quatro proteções essenciais para quem está prestes a receber as chaves do imóvel que tanto sonhou.</p>
        </div>

        <div className="carousel" id="carousel">
          <div className="carousel-viewport">
            <div
              className="carousel-track"
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {cardsData.map((card, i) => (
                <article
                  key={card.id}
                  data-index={i}
                  className={`bcard ${i === activeIndex ? 'is-active' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="ico-wrap" aria-hidden="true">
                    {card.icon}
                  </div>
                  <div className="num">{card.id} · {card.title.split(' ')[0]}</div>
                  <h3>{card.title}</h3>
                  <ul>
                    {card.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button
              className="car-btn"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Card anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="car-dots" role="tablist">
              {/* AS BOLINHAS AGORA REPRESENTAM CADA CARD EXATO */}
              {cardsData.map((_, i) => (
                <button
                  key={i}
                  className={`car-dot ${i === activeIndex ? 'is-active' : ''}`}
                  role="tab"
                  aria-label={`Ir para card ${i + 1}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button
              className="car-btn"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex >= maxIndex}
              aria-label="Próximo card"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="cards-cta">
            <a href="#produto" className="btn btn-primary">Garantir minha vistoria sem dor de cabeça</a>
          </div>
        </div>
      </div>
    </section>
  );
}