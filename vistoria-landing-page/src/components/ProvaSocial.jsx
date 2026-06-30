// Autor: Gabriel Manzi

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import depoimentosData from "../assets/avaliacoes/depoimento.js";

function ProvaSocial() {
  const [depoimentos, setDepoimentos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  const trackRef = useRef(null);
  
  // NOVOS REFS: Necessários para controlar o estado do arrasto (mouse/touch)
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);
  const clickedCardIndex = useRef(null);

  useEffect(() => {
    setDepoimentos(depoimentosData);

    const calcPerView = () => {
      const w = window.innerWidth;
      setPerView(w < 680 ? 1 : w < 980 ? 2 : 3);
    };

    calcPerView();
    window.addEventListener("resize", calcPerView);

    return () => window.removeEventListener("resize", calcPerView);
  }, []);

  // MOTOR MATEMÁTICO ATUALIZADO: Agora aceita um 'delta' para o movimento em tempo real
  function updateTransform(delta = 0, targetIndex = activeIndex) {
    if (!trackRef.current) return;
    const card = trackRef.current.children[0];
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width + 24;

    const maxScrollIndex = Math.max(0, depoimentos.length - perView);
    const idealScrollIndex = targetIndex - Math.floor(perView / 2);
    const scrollIndex = Math.max(0, Math.min(maxScrollIndex, idealScrollIndex));

    // Soma o delta (arrasto do mouse) com o cálculo base do transform
    const offset = -(scrollIndex * cardWidth);
    trackRef.current.style.transform = `translateX(${offset + delta}px)`;
  }

  // Hook que garante que o carrossel se alinhe se a janela mudar ou um botão for clicado
  useEffect(() => {
    updateTransform(0, activeIndex);
  }, [activeIndex, perView, depoimentos]);

  // FUNÇÕES DE EVENTO DE ARRASTO 
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;

    const card = e.target.closest(".depo-card");
    clickedCardIndex.current = card ? parseInt(card.dataset.index, 10) : null;

    if (trackRef.current) {
      trackRef.current.classList.add("dragging");
      trackRef.current.setPointerCapture(e.pointerId);
      trackRef.current.style.transition = "none";
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    dragDeltaX.current = e.clientX - dragStartX.current;
    // Chama o transform ao vivo baseando-se no movimento do mouse
    updateTransform(dragDeltaX.current, activeIndex);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (trackRef.current) {
      trackRef.current.classList.remove("dragging");
      trackRef.current.style.transition = "transform .55s cubic-bezier(.22,.61,.36,1)";

      const cardWidth = trackRef.current.children[0].getBoundingClientRect().width + 24;

      // Se moveu menos que 5px, entende-se como clique no card
      if (Math.abs(dragDeltaX.current) < 5) {
        if (clickedCardIndex.current !== null) {
          setActiveIndex(clickedCardIndex.current);
        }
      } else {
        // Se arrastou, calcula quantos cards avançou/retrocedeu e define um limite seguro
        const movedCards = Math.round(-dragDeltaX.current / cardWidth);
        const newIndex = Math.max(0, Math.min(depoimentos.length - 1, activeIndex + movedCards));
        setActiveIndex(newIndex);
      }

      // Limpa as variáveis de controle
      dragDeltaX.current = 0;
      clickedCardIndex.current = null;
    }
  };

  function proximo() {
    setActiveIndex((prev) => (prev >= depoimentos.length - 1 ? 0 : prev + 1));
  }

  function anterior() {
    setActiveIndex((prev) => (prev <= 0 ? depoimentos.length - 1 : prev - 1));
  }

  return (
    <section className="prova-social" id="feedbacks">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Feedback dos clientes</span>
          <h2>Quem usou, recebeu as chaves com tranquilidade</h2>
        </div>

        <div className="carousel">
          <div className="carousel-viewport">
            {/* ADICIONADOS OS EVENTOS DO MOUSE AQUI */}
            <div 
              className="carousel-track" 
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {depoimentos.map((depoimento, i) => (
                <article
                  key={depoimento.id}
                  data-index={i} // IMPORTANTE: Adicionado para identificar qual card foi clicado
                  className={`depo-card ${i === activeIndex ? "is-active" : ""}`}
                  style={{ cursor: "pointer" }} // Mostra a "mãozinha" para o usuário saber que é clicável
                >
                  <div className="topo-card">
                    <div className="estrelas">
                      {"★".repeat(depoimento.estrelas)}
                    </div>
                    <span className="data">{depoimento.data}</span>
                  </div>

                  <p className="comentario">"{depoimento.comentario}"</p>

                  <div className="rodape-card">{depoimento.nome}</div>
                </article>
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button className="car-btn" onClick={anterior} aria-label="Anterior">
              <ChevronLeft size={20} />
            </button>

            <div className="car-dots">
              {depoimentos.map((_, i) => (
                <button
                  key={i}
                  className={`car-dot ${i === activeIndex ? "is-active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>

            <button className="car-btn" onClick={proximo} aria-label="Próximo">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProvaSocial;