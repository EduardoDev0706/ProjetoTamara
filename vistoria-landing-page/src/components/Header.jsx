import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Gestão declarativa do estado do Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 2. Implementação obrigatória do Scroll Lock (Requisito Bloqueante)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Limpeza ao desmontar o componente
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
      <div className="container nav">
        <a href="#" className="brand" aria-label="Página Inicial">
          <span className="brand-mark">V</span>
          <span>Vistoria<strong style={{ color: 'var(--accent)' }}>.</strong></span>
        </a>

        {/* Menu de Navegação - Classe dinâmica baseada no estado */}
        <nav
          className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}
          aria-label="Navegação principal"
        >
          <a href="#produto" onClick={() => setIsMenuOpen(false)}>Sobre o Produto</a>
          <a href="#profissional" onClick={() => setIsMenuOpen(false)}>A Profissional</a>
          <a href="#feedbacks" onClick={() => setIsMenuOpen(false)}>Feedbacks</a>
          <a href="#faq" onClick={() => setIsMenuOpen(false)}>Perguntas Frequentes</a>
        </nav>

        <div className="nav-cta">
          <a href="#contato" className="btn btn-ghost">Falar com a equipe</a>
          <a href="#produto" className="btn btn-primary">Quero o Checklist</a>

          {/* Botão de Toggle com atributos ARIA controlados e ícones da Stack*/}
          <button
            className="menu-toggle"
            id="menuToggle"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}