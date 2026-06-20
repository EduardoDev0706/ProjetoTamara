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
  const [activeIndex, setActiveIndex] = useState(1);
  const [perView, setPerView] = useState(3);

  // Referências para ignorar o ciclo de renderização do React durante o arrasto
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);

  // Recálculo de itens por tela baseado no protótipo original (visualizar pdf)
  useEffect(() => {
    const calcPerView = () => {
      const w = window.innerWidth;
      setPerView(w < 680 ? 1 : w < 980 ? 2 : 3);
    };
    calcPerView();
    window.addEventListener('resize', calcPerView);
    return () => window.removeEventListener('resize', calcPerView);
  }, []);

  const maxIndex = Math.max(0, cardsData.length - perView);

  // Função centralizada para atualizar o DOM imperativamente ou via estado
  const updateTransform = (delta = 0, targetIndex = activeIndex) => {
    if (!trackRef.current) return;
    const card = trackRef.current.children[0];
    if (!card) return;

    // Protótipo usa 24px de gap
    const cardWidth = card.getBoundingClientRect().width + 24;
    const offset = -(targetIndex * cardWidth);

    trackRef.current.style.transform = `translateX(${offset + delta}px)`;
  };

  // Garante que o CSS reflita o estado sempre que o activeIndex mudar
  useEffect(() => {
    updateTransform(0, activeIndex);
  }, [activeIndex, perView]);

  const goTo = (index) => {
    const safeIndex = Math.max(0, Math.min(maxIndex, index));
    setActiveIndex(safeIndex);
  };

  // Controladores de eventos de ponteiro 
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;

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

      const cardWidth = trackRef.current.children[0].getBoundingClientRect().width + 24;
      const movedCards = Math.round(-dragDeltaX.current / cardWidth);

      dragDeltaX.current = 0;
      goTo(activeIndex + movedCards);
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
            {/* Aplicação dos ouvintes sintéticos do React */}
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
                  className={`bcard ${i === activeIndex + Math.floor(perView / 2) ? 'is-active' : ''}`}
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
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
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
