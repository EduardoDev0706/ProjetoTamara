// AUTOR: MAXSUEL SILVA TELES

import { ClipboardCheck } from 'lucide-react';
import heroData from '../data/heroData.json';

export default function Hero() {
  const { eyebrow, titulo, tituloDestaque, subtitulo, cta, trust, badge, stats } = heroData;

  // Divide o título em duas partes: antes e depois do trecho destacado
  const partes = titulo.split(tituloDestaque);

  return (
    <section className="hero">
      {/* Glows de fundo */}
      <div className="hero-glow glow-1" aria-hidden="true" />
      <div className="hero-glow glow-2" aria-hidden="true" />

      <div className="container">
        <div className="hero-grid">

          {/* ===== Coluna de texto ===== */}
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1 style={{ marginTop: '18px' }}>
              {partes[0]}
              <span className="acc">{tituloDestaque}</span>
              {partes[1]}
            </h1>
            <p className="lead">{subtitulo}</p>

            <div className="hero-cta">
              <a href={cta.primario.href} className="btn btn-accent">
                {cta.primario.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href={cta.secundario.href} className="btn btn-ghost">
                {cta.secundario.label}
              </a>
            </div>

            <div className="hero-trust">
              <span className="stars" aria-label={`Avaliação ${trust.estrelas} de 5`}>
                {'★'.repeat(trust.estrelas)}
              </span>
              <span dangerouslySetInnerHTML={{
                __html: trust.texto.replace('+1.200 compradores', '<strong>+1.200 compradores</strong>')
              }} />
            </div>
          </div>

          {/* ===== Coluna visual ===== */}
          <div className="hero-visual">
            <img
              src="img/hero-apartment.jpg"
              alt="Apartamento novo, vazio e iluminado por luz natural"
              loading="eager"
            />
            <div className="hero-badge">
              <div className="ico" aria-hidden="true">
                <ClipboardCheck size={22} />
              </div>
              <div>
                <div className="t">{badge.titulo}</div>
                <div className="s">{badge.subtitulo}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Stats ===== */}
        <div className="hero-meta">
          {stats.map((stat, i) => (
            <div className="item" key={i}>
              <div className="n">{stat.numero}</div>
              <div className="l">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
