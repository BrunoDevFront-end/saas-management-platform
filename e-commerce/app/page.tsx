import AnyMascot from "@/components/any";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <nav className="sticky top-0 z-40 border-b border-[var(--borders)] bg-[var(--background)]/90 backdrop-blur-sm">
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-6 lg:px-10">
          <div className="text-[22px] font-extrabold tracking-tight">
            anom<span className="text-[var(--greenSpan)]">.</span>
          </div>

          <div className="flex items-center gap-9">
            <a
              href="#how"
              className="hidden text-sm text-[var(--textSecondary)] transition-colors hover:text-[var(--textTitles)] sm:flex"
            >
              Como funciona
            </a>

            <a
              href="#privacy"
              className="hidden text-sm text-[var(--textSecondary)] transition-colors hover:text-[var(--textTitles)] sm:flex"
            >
              Anonimato
            </a>

            <a
              href="/register"
              className="bg-[var(--greenSpan)] px-2 py-1 text-sm font-bold text-[var(--background)] transition-opacity hover:opacity-90 active:scale-[0.97] sm:px-6 sm:py-3"
            >
              Criar formulário
            </a>
          </div>
        </div>
      </nav>

      <main>
        <header className="pt-10  border-b border-[var(--borders)] px-6 py-[100px] lg:px-10   lg:py-[90px] ">
          <div className="flex mb-[22px] flex items-center gap-2.5 text-xs uppercase tracking-[0.14em] text-[var(--greenSpan)] before:h-px before:w-6 before:bg-[var(--greenSpan)] before:content-[''] sm:hidden">
            Feedback 100% anônimo
          </div>
          <AnyMascot className="fixed ml-auto top-3 -translate-y-10  h-17 md:hidden " />
          <div className="mx-auto flex  justify-between  max-w-[1180px]">
            <div>
              <div className="hidden mb-[22px] flex items-center  gap-2.5 text-xs uppercase tracking-[0.14em] text-[var(--greenSpan)] before:h-px before:w-6 before:bg-[var(--greenSpan)] before:content-[''] sm:flex">
                Feedback 100% anônimo
              </div>

              <h1 className="text-center max-w-[850px]  text-[24px] font-extrabold leading-[1] tracking-tighter text-[var(--textTitles)] sm:text-[28px] md:text-[38px] sm:text-start lg:text-[55px] xl:text-[64px] ">
                O que sua equipe pensa. Sem filtro, sem medo.
              </h1>

              <p className="text-center my-[26px] max-w-[520px] text-lg text-[var(--textSecondary)] sm:text-start">
                Crie formulários de feedback anônimos, compartilhe com sua
                equipe e receba opiniões sinceras em um único lugar.
              </p>

              <div className="flex justify-center sm:justify-self-start flex-wrap gap-4">
                <a
                  href="/register"
                  className=" bg-[var(--greenSpan)] px-6 py-3 text-sm font-bold text-[var(--background)] transition-opacity hover:opacity-90 active:scale-[0.97] "
                >
                  Criar formulário grátis
                </a>

                <a
                  href="#how"
                  className="hidden border border-[var(--borders)] px-6 py-3 text-sm font-bold text-[var(--textTitles)] transition-colors hover:border-[var(--greenSpan)] active:scale-[0.97] sm:flex "
                >
                  Ver como funciona
                </a>
              </div>

              <div className="text-center mt-7 text-xs text-[var(--textSecondary)] sm:text-start">
                Crie sua conta gratuitamente e comece a receber feedbacks.
              </div>
            </div>
            <div className="relative self-end pt-28 w-70 hidden  md:flex lg:pt-35">
              <AnyMascot className="hidden  md:flex h-45 lg:h-65" />
              <p className="absolute top-6 left-7  z-10 text-sm font-[family-name:var(--font-space-grotesk)] text-[var(--greenSpan)] max-w-36 min-[1070px]:max-w-56 xl:text-base min-[878px]:top-8">
                <span className="text-[var(--textTitles)] hidden  min-[1070]:flex ">
                  Toda empresa pode evoluir.
                </span>{" "}
                Clique em criar formulário!💚
              </p>
              <Image
                src="/image/AnySpeechBubble.svg"
                alt=""
                width={300}
                height={160}
                className="absolute right-0 top-0"
              />
            </div>
          </div>
        </header>

        <section
          id="how"
          className="border-b border-[var(--borders)] px-6 py-[100px] lg:px-10"
        >
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-14 max-w-[560px]">
              <h2 className="text-[28px] font-bold tracking-tight text-[var(--textTitles)] sm:text-4xl">
                Feedbacks que ajudam sua empresa a evoluir
              </h2>

              <p className="mt-4 text-base text-[var(--textSecondary)]">
                Uma forma simples de ouvir sua equipe e transformar opiniões em
                informações importantes para a tomada de decisões.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px border border-[var(--borders)] bg-[var(--borders)] md:grid-cols-3">
              <article className="bg-[var(--background)] p-9">
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

              <article className="bg-[var(--background)] p-9">
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

              <article className="bg-[var(--background)] p-9">
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
          className="border-b border-[var(--borders)] px-6 py-[100px] lg:px-10"
        >
          <div className="mx-auto max-w-[1180px]">
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

              <div className="border border-[var(--borders)] bg-[var(--backgroundSecondary)] p-9">
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

        <section id="cta" className="px-6 py-[100px] lg:px-10">
          <div className="mx-auto max-w-[1180px]">
            <div className="mx-auto max-w-[720px] border border-[var(--borders)] bg-[var(--backgroundSecondary)] px-8 py-16 text-center sm:px-14">
              <h2 className="mb-4 text-[28px] font-bold tracking-tight text-[var(--textTitles)] sm:text-4xl">
                Pronto para ouvir o que sua equipe realmente pensa?
              </h2>

              <p className="mb-8 text-base text-[var(--textSecondary)]">
                Crie sua conta gratuitamente e comece a coletar feedbacks
                anônimos da sua equipe.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/register"
                  className="bg-[var(--greenSpan)] px-6 py-3 text-sm font-bold text-[var(--background)] transition-opacity hover:opacity-90 active:scale-[0.97]"
                >
                  Criar minha conta
                </a>

                <a
                  href="/login"
                  className="border border-[var(--borders)] px-6 py-3 text-sm font-bold text-[var(--textTitles)] transition-colors hover:border-[var(--greenSpan)] active:scale-[0.97]"
                >
                  Já tenho uma conta
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 border-t border-[var(--borders)] px-6 py-12 lg:px-10">
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
