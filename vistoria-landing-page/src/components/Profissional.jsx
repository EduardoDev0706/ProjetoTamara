// AUTOR: Maxsuel Silva Teles
import fotoTamara from '../assets/img/tamaraProfissional.webp';

export default function Profissional() {
  return (
    <section className="profissional" id="profissional">
      <div className="container">
        <div className="prof-grid">

          {/* ===== Foto ===== */}
          <div className="prof-photo">
            <img
              src={fotoTamara}
              alt="Arquiteta e urbanista responsável pelo conteúdo"
              loading="lazy"
            />
          </div>

          {/* ===== Card de texto ===== */}
          <div className="prof-card">
            <span className="eyebrow">Quem desenvolveu</span>
            <h2>Arquiteta e urbanista com 6 anos de experiência prática</h2>

            <blockquote>
              "Esse material nasceu da minha vivência em centenas de vistorias.
              Quero que cada cliente receba as chaves do seu apartamento com a mesma segurança
              que um profissional teria — sem precisar entender de obra para isso."
            </blockquote>

            <p>
              Especialista em reformas e design de interiores para apartamentos, desenvolve projetos
              que aliam rigor técnico, otimização de espaços e estética — garantindo ambientes confortáveis,
              práticos e elegantes.
            </p>

            <div className="sig">
              <div
                aria-hidden="true"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--accent-soft)',
                  color: 'var(--accent)',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '600',
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}
              >
                A
              </div>
              <div>
                <div className="name">Tamara Porfírio</div>
                <div className="role">Arquiteta e Urbanista · CAU XXXXX-X</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
