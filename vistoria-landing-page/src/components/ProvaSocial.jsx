//Autor Gabriel Manzi


import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import depoimentosData from "../assets/avaliações/depoimento";

function ProvaSocial() {
  const [depoimentos, setDepoimentos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  const trackRef = useRef(null);

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

  function updateTransform(targetIndex = activeIndex) {
    if (!trackRef.current) return;

    const card = trackRef.current.children[0];
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width + 24;

    // Número máximo de "rolagens" possíveis
    const maxScrollIndex = Math.max(0, depoimentos.length - perView);

    // Tenta centralizar o card ativo
    const idealScrollIndex = targetIndex - Math.floor(perView / 2);

    // Impede mostrar espaço vazio no final
    const scrollIndex = Math.max(
      0,
      Math.min(maxScrollIndex, idealScrollIndex)
    );

    trackRef.current.style.transform = `translateX(-${
      scrollIndex * cardWidth
    }px)`;
  }

  useEffect(() => {
    updateTransform(activeIndex);
  }, [activeIndex, perView, depoimentos]);

  function proximo() {
    setActiveIndex((prev) =>
      prev >= depoimentos.length - 1 ? 0 : prev + 1
    );
  }

  function anterior() {
    setActiveIndex((prev) =>
      prev <= 0 ? depoimentos.length - 1 : prev - 1
    );
  }

  return (
    <section className="prova-social">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Feedback dos clientes</span>
          <h2>Quem usou, recebeu as chaves com tranquilidade</h2>
        </div>

        <div className="carousel">
          <div className="carousel-viewport">
            <div className="carousel-track" ref={trackRef}>
              {depoimentos.map((depoimento, i) => (
                <article
                  key={depoimento.id}
                  className={`depo-card ${
                    i === activeIndex ? "is-active" : ""
                  }`}
                >
                  <div className="topo-card">
                    <div className="estrelas">
                      {"★".repeat(depoimento.estrelas)}
                    </div>

                    <span className="data">{depoimento.data}</span>
                  </div>

                  <p className="comentario">
                    "{depoimento.comentario}"
                  </p>

                  <div className="rodape-card">
                    {depoimento.nome}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button
              className="car-btn"
              onClick={anterior}
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="car-dots">
              {depoimentos.map((_, i) => (
                <button
                  key={i}
                  className={`car-dot ${
                    i === activeIndex ? "is-active" : ""
                  }`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="car-btn"
              onClick={proximo}
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProvaSocial;