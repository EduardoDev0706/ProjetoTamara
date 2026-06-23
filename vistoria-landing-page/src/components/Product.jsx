// AUTOR: Maxsuel Silva Teles
import checkVistoria from '../assets/img/checkVistoria.webp'

import {
  CalendarDays,
  BookOpen,
  Wrench,
  Camera,
  AlertCircle,
  Layers,
  CheckSquare,
} from 'lucide-react';
import productData from '../data/productData.json';

// Mapa de ícones: chave bate com o campo "icone" do JSON
const ICONES = {
  clipboard: <CalendarDays size={20} />,
  book: <BookOpen size={20} />,
  wrench: <Wrench size={20} />,
  camera: <Camera size={20} />,
  'alert-circle': <AlertCircle size={20} />,
  layers: <Layers size={20} />,
  'check-square': <CheckSquare size={20} />,
};

export default function Product() {
  const { eyebrow, titulo, descricao, imagemAlt, cta, itens } = productData;

  return (
    <section className="product" id="produto">
      <div className="container">
        <div className="product-grid">

          {/* ===== Visual (imagem) ===== */}
          <div className="product-visual">
            <span className="product-tag">O que você recebe</span>
            <img
              src={checkVistoria}
              alt={imagemAlt}
              loading="lazy"
            />
          </div>

          {/* ===== Conteúdo ===== */}
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{titulo}</h2>
            <p className="lead">
              O <strong>Checklist e Manual de Vistoria</strong>{' '}
              {descricao.replace('O Checklist e Manual de Vistoria ', '')}
            </p>

            {/* Lista de recursos renderizada via .map() */}
            <div className="product-list">
              {itens.map((item) => (
                <div className="product-item" key={item.id}>
                  <div className="pi-ico" aria-hidden="true">
                    {ICONES[item.icone]}
                  </div>
                  <div>
                    <h4>{item.titulo}</h4>
                    <p>{item.descricao}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="product-cta">
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
          </div>

        </div>
      </div>
    </section>
  );
}
