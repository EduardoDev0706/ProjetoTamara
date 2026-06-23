//autor Gabriel Manzi

import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

function Forms() {
    const form = useRef();

    const enviarEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_7jnll9s",
                "template_q2ifwzz",
                form.current,
                "AZ1QfDRKk8Vh-NfuC"
            )
            .then(
                () => {
                    Swal.fire({
                        icon: "success",
                        title: "Mensagem enviada!",
                        text: "Muito obrigada pela atenção! responderemos assim que possivel.",
                        confirmButtonText: "Fechar",
                        background: "#fff",
                        color: "#333",
                        confirmButtonColor: "#D4AF37",
                        customClass: {
                            popup: "meu-alerta"
                        }
                    });

                    form.current.reset();
                },
                (error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops!",
                        text: "Não foi possível enviar a mensagem. Tente novamente.",
                        confirmButtonText: "Fechar",
                        background: "#fff",
                        color: "#333",
                        confirmButtonColor: "#D4AF37",
                        customClass: {
                            popup: "meu-alerta"
                        }
                    });

                    console.log(error);
                }
            );
    };

    return (
        <section className="forms-section" id="contato">
            <div className="container forms-grid">
                <div className="forms-info">
                    <span className="eyebrow">Entre em contato</span>

                    <h2>
                        Tem alguma dúvida antes de garantir o seu?
                    </h2>

                    <p>
                        Conte um pouco sobre o seu momento e nossa equipe responderá em até
                        24h úteis.
                    </p>

                    <div className="forms-beneficios">
                        <div className="forms-item">
                            <div className="forms-icone">📞</div>
                            <span>Atendimento rápido e humano</span>
                        </div>

                        <div className="forms-item">
                            <div className="forms-icone">✉️</div>
                            <span>Resposta em até 24h úteis</span>
                        </div>

                        <div className="forms-item">
                            <div className="forms-icone">👤</div>
                            <span>Suporte direto com a arquiteta</span>
                        </div>
                    </div>
                </div>

                <div className="forms-card">
                    <form ref={form} onSubmit={enviarEmail}>
                        <div className="forms-row">
                            <div className="forms-campo">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    placeholder="Seu nome completo"
                                    required
                                />
                            </div>

                            <div className="forms-campo">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="forms-row">
                            <div className="forms-campo">
                                <label htmlFor="telefone">Telefone</label>
                                <input
                                    id="telefone"
                                    name="telefone"
                                    type="tel"
                                    placeholder="(00) 00000-0000"
                                />
                            </div>

                            <div className="forms-campo">
                                <label htmlFor="primeiro_imovel">
                                    Primeiro imóvel?
                                </label>

                                <select
                                    id="primeiro_imovel"
                                    name="primeiro_imovel"
                                    required
                                >
                                    <option value="">Selecione uma opção</option>
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </select>
                            </div>
                        </div>

                        <div className="forms-campo">
                            <label htmlFor="observacoes">Observações</label>

                            <textarea
                                id="observacoes"
                                name="observacoes"
                                placeholder="Como podemos te ajudar?"
                                rows="5"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary forms-btn"
                        >
                            Enviar mensagem
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Forms;