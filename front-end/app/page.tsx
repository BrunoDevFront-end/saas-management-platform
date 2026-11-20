"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Lock, Zap, RefreshCw, ShieldCheck } from "lucide-react";

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <nav className="sticky top-0 z-40 border-b border-[var(--borders)] bg-[var(--background)]/90 backdrop-blur-sm">
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-6 lg:px-10">
          <div className="text-[22px] text-[var(--greenSpan)] font-extrabold tracking-tight">
            anom<span className="text-[var(--greenSpan2)]">.</span>
          </div>

          <div className="flex items-center gap-9">
            <Link
              href="/login"
              className="hidden text-sm text-[var(--textSecondary)] transition-colors hover:text-[var(--textTitles)] sm:flex"
            >
              Entrar
            </Link>

            <Link
              href="#how"
              className="hidden text-sm text-[var(--textSecondary)] transition-colors hover:text-[var(--textTitles)] sm:flex"
            >
              Como funciona
            </Link>

            <Link
              href="#privacy"
              className="hidden text-sm text-[var(--textSecondary)] transition-colors hover:text-[var(--textTitles)] sm:flex"
            >
              Anonimato
            </Link>

            <Link
              href="/register"
              className="bg-[var(--greenSpan2)] rounded-3xl px-2 py-1 text-sm font-bold text-[var(--textTitles)] transition-opacity hover:opacity-90 active:scale-[0.97] sm:px-6 sm:py-3"
            >
              Criar formulário
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <header className="border-[var(--borders)] px-4 py-14 sm:px-6 sm:py-20 lg:px-5 lg:py-12">
          <div className="mx-auto flex max-w-[1300px] flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-8 min-[1600px]:max-w-[1600px]">
            <div className="flex w-full max-w-[650px] min-[1600px]:max-w-[750px]  flex-col items-center lg:items-start">
              <div className="mb-6 flex items-center gap-2.5 rounded-3xl bg-[var(--greenLeve)] px-3 py-2 font-manrope text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--greenSpan)] sm:text-xs">
                <ShieldCheck size={18} strokeWidth={2.5} />
                Feedback 100% anônimo
              </div>

              <h1 className="hero-title max-w-[600px] text-center font-poppins text-4xl font-extrabold leading-[1.08] tracking-tighter text-[var(--textTitles)] sm:text-5xl lg:text-left lg:text-[55px] xl:text-[68px] min-[1600px]:max-w-[800px]">
                Um espaço seguro para ouvir sua equipe.
              </h1>

              <p className="hero-description my-6 max-w-[520px] text-center font-poppins text-base leading-relaxed text-[var(--textSecondary)] sm:text-lg lg:text-left">
                Crie formulários de feedback anônimos, compartilhe com sua
                equipe e receba opiniões sinceras em um único lugar.
              </p>

              <div className="flex w-full flex-wrap justify-center gap-3 sm:w-auto lg:justify-start">
                <Link
                  href="/register"
                  className="hero-buttons rounded-2xl bg-[var(--greenSpan)] px-5 py-3 text-center text-sm font-bold text-[var(--background)] transition-opacity hover:opacity-90 sm:px-6 sm:text-base"
                >
                  Criar formulário grátis
                </Link>

                <Link
                  href="#how"
                  className="hero-buttons hidden px-4 py-3 text-base font-bold text-[var(--textTitles)] underline underline-offset-8 transition-colors hover:scale-105 hover:text-[var(--greenSpan2)] sm:flex"
                >
                  Entenda como funciona ➝
                </Link>
              </div>
            </div>

            <div className="relative w-full max-w-[650px] min-[1600px]:max-w-[750px] shrink-0">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/Mascote Verde Conectado à Segurança.png"
                  alt="Mascote verde representando segurança e anonimato"
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />

                <Image
                  src="/Cartão de citação em tons de verde.png"
                  alt="Cartão ilustrativo com uma citação sobre feedback"
                  width={350}
                  height={300}
                  sizes="(max-width: 640px) 48vw, 350px"
                  className="absolute left-[18%] top-[-5%] h-auto w-[52%] transition-transform duration-300 hover:scale-105"
                />

                <Image
                  src="/Balão de feedback em verde menta.png"
                  alt="Balão ilustrativo de mensagem de feedback"
                  width={350}
                  height={300}
                  sizes="(max-width: 640px) 48vw, 350px"
                  className="absolute bottom-[-4%] right-[-4%] h-auto w-[48%] transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="px-4 sm:px-6">
          <div className="mx-auto grid max-w-[1300px] grid-cols-1 overflow-hidden rounded-3xl bg-[linear-gradient(110deg,#edf5e8_0%,#eef6eb_45%,#eaf3e7_100%)] sm:grid-cols-2 lg:grid-cols-3 min-[1600px]:max-w-[1600px]">
            <div className="flex items-center gap-4 border-b border-[#d5dfd2] px-5 py-7 sm:border-r lg:border-b-0 lg:px-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--greenLeve2)] sm:h-16 sm:w-16">
                <Lock size={30} strokeWidth={2} className="text-[#073f35]" />
              </div>
              <div>
                <h2 className="mb-1 font-poppins text-base font-semibold text-[var(--textTitles)] sm:text-lg">
                  Anonimato de verdade
                </h2>
                <p className="font-poppins text-xs text-[var(--textSecondary)] sm:text-sm">
                  Sem identificação, sem rastros. Apenas a sua opinião.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b border-[#d5dfd2] px-5 py-7 lg:border-b-0 lg:border-r lg:px-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--greenLeve2)] sm:h-16 sm:w-16">
                <Zap size={30} strokeWidth={2} className="text-[#073f35]" />
              </div>
              <div>
                <h2 className="mb-1 font-poppins text-base font-semibold text-[var(--textTitles)] sm:text-lg">
                  Configuração simples
                </h2>
                <p className="font-poppins text-xs text-[var(--textSecondary)] sm:text-sm">
                  Em poucos minutos sua empresa já pode começar a receber
                  feedbacks.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-5 py-7 sm:col-span-2 lg:col-span-1 lg:px-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--greenLeve2)] sm:h-16 sm:w-16">
                <RefreshCw
                  size={30}
                  strokeWidth={2}
                  className="text-[#073f35]"
                />
              </div>
              <div>
                <h2 className="mb-1 font-poppins text-base font-semibold text-[var(--textTitles)] sm:text-lg">
                  Escuta contínua
                </h2>
                <p className="font-poppins text-xs text-[var(--textSecondary)] sm:text-sm">
                  Mais insights para decisões melhores, sempre.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how"
          className="border-b border-[var(--borders)] bg-[linear-gradient(180deg,#f7faf5_0%,var(--background)_100%)] px-6 py-[100px] lg:px-10"
        >
          <div className="mx-auto max-w-[1300px] min-[1600px]:max-w-[1600px] ">
            <div className="scroll-reveal mb-14 max-w-[560px]">
              <h2 className="text-[28px] font-bold tracking-tight text-[var(--textTitles)] sm:text-4xl">
                Feedbacks que ajudam sua empresa a evoluir
              </h2>

              <p className="mt-4 text-base text-[var(--textSecondary)]">
                Uma forma simples de ouvir sua equipe e transformar opiniões em
                informações importantes para a tomada de decisões.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px border border-[var(--borders)] bg-[var(--borders)] md:grid-cols-3">
              <article className="scroll-reveal bg-[var(--background)] p-9 transition-colors duration-300 hover:bg-[var(--greenLeve2)]">
                <span className="mb-[18px] block text-[13px] text-[var(--greenSpan)]">
                  01
                </span>

                <h3 className="mb-3 text-xl font-semibold text-[var(--textTitles)]">
                  Crie seu formulário
                </h3>

                <p className="text-[15px] leading-relaxed text-[var(--textSecondary)]">
                  Crie uma pesquisa de feedback de forma rápida e defina o
                  objetivo que deseja alcançar com as respostas.
                </p>
              </article>

              <article className="scroll-reveal bg-[var(--background)] p-9 transition-colors duration-300 hover:bg-[var(--greenLeve2)]">
                <span className="mb-[18px] block text-[13px] text-[var(--greenSpan)]">
                  02
                </span>

                <h3 className="mb-3 text-xl font-semibold text-[var(--textTitles)]">
                  Compartilhe com sua equipe
                </h3>

                <p className="text-[15px] leading-relaxed text-[var(--textSecondary)]">
                  Disponibilize o formulário através de um link e permita que
                  sua equipe envie feedbacks de maneira simples e segura.
                </p>
              </article>

              <article className="scroll-reveal bg-[var(--background)] p-9 transition-colors duration-300 hover:bg-[var(--greenLeve2)]">
                <span className="mb-[18px] block text-[13px] text-[var(--greenSpan)]">
                  03
                </span>

                <h3 className="mb-3 text-xl font-semibold text-[var(--textTitles)]">
                  Analise as respostas
                </h3>

                <p className="text-[15px] leading-relaxed text-[var(--textSecondary)]">
                  Acompanhe os feedbacks recebidos no painel da sua empresa e
                  tenha uma visão mais clara sobre o que sua equipe pensa.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="privacy"
          className="border-b border-[var(--borders)] bg-[linear-gradient(135deg,#f0f7ed_0%,var(--background)_55%,#f7faf5_100%)] px-6 py-[100px] lg:px-10"
        >
          <div className="scroll-reveal mx-auto max-w-[1300px] min-[1600px]:max-w-[1600px]">
            <div className="grid grid-cols-1 items-center gap-[60px] md:grid-cols-[1.1fr_1fr]">
              <div>
                <h2 className="max-w-[560px] text-[28px] font-bold tracking-tight text-[var(--textTitles)] sm:text-4xl">
                  Mais liberdade para falar. Mais informação para decidir.
                </h2>

                <p className="mt-5 max-w-[560px] text-base leading-relaxed text-[var(--textSecondary)]">
                  O anonimato é parte essencial da experiência. Ao remover a
                  identificação do respondente, sua equipe pode compartilhar
                  percepções e opiniões com mais liberdade.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-[var(--greenSpan)]">✓</span>

                    <div>
                      <h3 className="font-semibold text-[var(--textTitles)]">
                        Feedbacks sem identificação
                      </h3>

                      <p className="mt-1 text-sm text-[var(--textSecondary)]">
                        As respostas são apresentadas sem associar o conteúdo ao
                        nome de quem respondeu.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-[var(--greenSpan)]">✓</span>

                    <div>
                      <h3 className="font-semibold text-[var(--textTitles)]">
                        Mais confiança para sua equipe
                      </h3>

                      <p className="mt-1 text-sm text-[var(--textSecondary)]">
                        Um ambiente pensado para incentivar opiniões mais
                        honestas e construtivas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-[var(--greenSpan)]">✓</span>

                    <div>
                      <h3 className="font-semibold text-[var(--textTitles)]">
                        Informações centralizadas
                      </h3>

                      <p className="mt-1 text-sm text-[var(--textSecondary)]">
                        Tenha os feedbacks organizados em um único painel para
                        facilitar o acompanhamento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dce9d7] bg-[linear-gradient(145deg,#f4f9f1_0%,var(--backgroundSecondary)_100%)] p-9 shadow-sm">
                <span className="text-sm font-medium text-[var(--greenSpan)]">
                  ANOM
                </span>

                <h3 className="mt-3 text-2xl font-bold text-[var(--textTitles)]">
                  A voz da sua equipe importa.
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[var(--textSecondary)]">
                  Crie um espaço onde as pessoas possam compartilhar suas
                  percepções e ajude sua empresa a tomar decisões baseadas em
                  feedbacks reais.
                </p>

                <div className="mt-8 border-t border-[var(--borders)] pt-6">
                  <p className="text-sm font-medium text-[var(--textTitles)]">
                    Feedback anônimo
                  </p>

                  <p className="mt-1 text-sm text-[var(--textSecondary)]">
                    Mais transparência para quem responde. Mais clareza para
                    quem gerencia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="cta"
          className="bg-[linear-gradient(180deg,var(--background)_0%,#f0f7ed_100%)] px-6 py-[100px] lg:px-10"
        >
          <div className="mx-auto max-w-[1300px] min-[1600px]:max-w-[1600px]">
            <div className="scroll-reveal mx-auto max-w-[720px] rounded-2xl border border-[#dce9d7] bg-[linear-gradient(145deg,#f7faf5_0%,#edf5e9_100%)] px-8 py-16 text-center shadow-sm sm:px-14">
              <h2 className="mb-4 text-[28px] font-bold tracking-tight text-[var(--textTitles)] sm:text-4xl">
                Pronto para ouvir o que sua equipe realmente pensa?
              </h2>

              <p className="mb-8 text-base text-[var(--textSecondary)]">
                Crie sua conta gratuitamente e comece a coletar feedbacks
                anônimos da sua equipe.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="bg-[var(--greenSpan)] px-6 py-3 text-sm font-bold text-[var(--background)] transition-opacity hover:opacity-90 active:scale-[0.97]"
                >
                  Criar minha conta
                </Link>

                <Link
                  href="/login"
                  className="border border-[var(--borders)] px-6 py-3 text-sm font-bold text-[var(--textTitles)] transition-colors hover:scale-105 hover:text-[var(--greenSpan2)]"
                >
                  Já tenho uma conta
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="scroll-reveal mx-auto flex max-w-[1300px] min-[1600px]:max-w-[1600px] flex-wrap items-center justify-between gap-4 border-t border-[var(--borders)] bg-[#f7faf5] px-6 py-12 lg:px-10">
        <div className="text-base font-extrabold tracking-tight text-[var(--textTitles)]">
          anom<span className="text-[var(--greenSpan)]">.</span>
        </div>

        <div className="text-[13px] text-[var(--textSecondary)]">
          Feedbacks anônimos para empresas que querem ouvir de verdade.
        </div>
      </footer>
    </div>
  );
}
