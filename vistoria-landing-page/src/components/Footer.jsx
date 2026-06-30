import {
  FaInstagram,
  FaArrowRight,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta">
        <span className="eyebrow">
          Sua tranquilidade na hora da chave
        </span>

        <h2>
          Receba as chaves do seu apartamento com a segurança de um profissional
        </h2>

        <p>
          Em poucos minutos você baixa o material e começa a se preparar para sua vistoria.
        </p>

        <a
          href="https://hotmart.com/pt-br/marketplace/produtos/vistoria-de-imovel-o-que-verificar-ao-receber-as-chaves-do-seu-apartamento/T100581025D"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-footer"
        >
          Quero meu Checklist agora
          <FaArrowRight />
        </a>
      </div>

      <div className="container footer-grid">
        <div className="footer-col">
          <div className="footer-logo">
            <a href="#hero">
              <div className="logo-icon">V</div>
              <h3>Vistoria</h3>
            </a>
          </div>

          <p>
            Checklist e Manual de Vistoria para você receber as chaves do
            seu apartamento com autonomia e segurança técnica.
          </p>
        </div>

        <div className="footer-col">
          <h4>Links rápidos</h4>

          <a href="#produto">Sobre o produto</a>
          <a href="#profissional">A profissional</a>
          <a href="#feedbacks">Feedbacks</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="footer-col">
          <h4>Contato</h4>
          
          <a 
            href="mailto:casabelisarquitetura@gmail.com"
            className="contact-link"
          >
            <FaEnvelope size={18} className="contact-icon" />
          </a>

          <a 
            href="https://www.instagram.com/tamaraporfirio.arquiteta?igsh=MXZxbDdpZmthbmJuYw=="
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaInstagram size={18} className="contact-icon" />
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2025 Vistoria. Todos os direitos reservados.</span>

        <span>
          Desenvolvido com cuidado por arquiteta e urbanista
        </span>
      </div>
    </footer>
  );
}

export default Footer;