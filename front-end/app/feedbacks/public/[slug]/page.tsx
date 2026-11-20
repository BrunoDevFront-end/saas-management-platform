"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  ArrowRight,
  Lock,
  ShieldCheck,
  MessageSquareText,
  Building2,
  LoaderCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

import { GetPublicCompanyForms } from "../../../../components/request";

interface Form {
  id: string;
  title: string;
  description: string | null;
}

interface CompanyData {
  name: string;
  forms: Form[];
}

export default function CompanyFormsPage() {
  const { slug } = useParams<{ slug: string }>();

  const [company, setCompany] = useState<CompanyData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchCompany() {
      try {
        setLoading(true);
        setErrorMessage("");

        const data = await GetPublicCompanyForms(slug);

        if (isMounted) {
          setCompany(data);
        }
      } catch (error) {
        if (isMounted) {
          if (error instanceof Error) {
            setErrorMessage(error.message);
          } else {
            setErrorMessage("Não foi possível carregar os formulários.");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCompany();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // CARREGAMENTO

  if (loading) {
    return (
      <main
        className="
        flex min-h-dvh items-center justify-center
        bg-[var(--background)] px-4
        font-syne text-[var(--textTitles)]
      "
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl bg-[var(--greenLeve2)]
          "
          >
            <LoaderCircle
              size={28}
              className="animate-spin text-[var(--greenSpan)]"
            />
          </div>

          <p className="text-sm text-[var(--textSecondary)]">
            Carregando formulários...
          </p>

          <span className="text-xl font-extrabold tracking-tight text-[var(--greenSpan)]">
            anom<span className="text-[var(--greenSpan2)]">.</span>
          </span>
        </div>
      </main>
    );
  }

  // ERRO

  if (errorMessage || !company) {
    return (
      <main
        className="
        flex min-h-dvh items-center justify-center
        bg-[var(--background)] px-4
        font-syne
      "
      >
        <div
          className="
          w-full max-w-md rounded-2xl
          border border-[var(--borders)]
          bg-[var(--foreground)]/60
          p-8 text-center shadow-sm
        "
        >
          <div
            className="
            mx-auto mb-5 flex h-14 w-14
            items-center justify-center rounded-full
            bg-red-50 text-red-500
          "
          >
            <AlertCircle size={27} />
          </div>

          <h1 className="text-xl font-bold text-[var(--textTitles)]">
            Não foi possível acessar
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[var(--textSecondary)]">
            {errorMessage || "Empresa não encontrada ou indisponível."}
          </p>

          <Link
            href="/"
            className="
              mt-7 inline-flex items-center justify-center gap-2
              rounded-lg bg-[var(--greenSpan)]
              px-6 py-3 text-sm font-bold
              text-[var(--foreground)]
              transition hover:opacity-90
            "
          >
            Voltar ao início
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const initial = company.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <main
      className="
      min-h-dvh w-full
      bg-[var(--background)]
      px-4 py-5 sm:px-7 sm:py-7
      font-syne text-[var(--textTitles)]
    "
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* HEADER */}

        <header
          className="
          flex h-[65px] items-center justify-between
          border-b border-[var(--borders)]
          px-3 sm:px-6
        "
        >
          <Link
            href="/"
            className="
              text-2xl font-extrabold tracking-tight
              text-[var(--greenSpan)]
            "
          >
            anom<span className="text-[var(--greenSpan2)]">.</span>
          </Link>

          <div className="flex items-center gap-2">
            <span
              className="
              flex h-9 w-9 items-center justify-center
              rounded-full bg-[var(--greenLeve2)]
              text-sm font-bold text-[var(--greenSpan)]
            "
            >
              {initial}
            </span>

            <div className="hidden sm:block">
              <p className="text-xs text-[var(--textPlaceholder)]">
                Organização
              </p>

              <p className="max-w-[180px] truncate text-sm font-bold text-[var(--textTitles)]">
                {company.name}
              </p>
            </div>
          </div>
        </header>

        {/* CONTEÚDO */}

        <section
          className="
          grid grid-cols-1 gap-8
          py-8 sm:py-12
          lg:grid-cols-[0.85fr_1.15fr]
          lg:gap-12 lg:py-14
          xl:gap-20
        "
        >
          {/* PAINEL ESQUERDO */}

          <aside
            className="
            flex flex-col justify-between
            gap-8 lg:sticky lg:top-10
            lg:h-[calc(100dvh-150px)]
            lg:min-h-[480px]
          "
          >
            <div>
              {/* IDENTIFICAÇÃO */}

              <div
                className="
                mb-9 inline-flex items-center gap-2
                rounded-full border border-[var(--borders)]
                bg-[var(--foreground)]/60
                px-3 py-2
              "
              >
                <Building2 size={15} className="text-[var(--greenSpan)]" />

                <span className="text-xs font-semibold text-[var(--textSecondary)]">
                  Espaço de feedback
                </span>
              </div>

              {/* TÍTULO */}

              <h1
                className="
                max-w-[550px]
                text-3xl font-bold leading-[1.15]
                tracking-tight text-[var(--textTitles)]
                sm:text-4xl xl:text-5xl
              "
              >
                Sua opinião faz a{" "}
                <span className="text-[var(--greenSpan2)]">diferença.</span>
              </h1>

              <p
                className="
                mt-6 max-w-[460px]
                text-sm leading-relaxed
                text-[var(--textSecondary)]
                sm:text-base sm:leading-7
              "
              >
                Escolha uma pesquisa e compartilhe sua experiência. Sua
                participação ajuda a construir um ambiente de trabalho melhor
                para todos.
              </p>

              {/* INFORMAÇÕES */}

              <div
                className="
                mt-10 flex flex-col gap-5
                border-t border-[var(--borders)]
                pt-7
              "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                    flex h-11 w-11 shrink-0 items-center justify-center
                    rounded-xl bg-[var(--greenLeve2)]
                    text-[var(--greenSpan)]
                  "
                  >
                    <ShieldCheck size={23} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[var(--textTitles)]">
                      Participação anônima
                    </h3>

                    <p className="mt-1 text-xs text-[var(--textSecondary)]">
                      Responda com liberdade e sinceridade.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="
                    flex h-11 w-11 shrink-0 items-center justify-center
                    rounded-xl bg-[var(--greenLeve2)]
                    text-[var(--greenSpan)]
                  "
                  >
                    <MessageSquareText size={22} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[var(--textTitles)]">
                      Sua voz importa
                    </h3>

                    <p className="mt-1 text-xs text-[var(--textSecondary)]">
                      Cada resposta contribui para melhorias reais.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD DE PRIVACIDADE */}

            <div
              className="
              relative overflow-hidden
              rounded-2xl border border-[var(--borders)]
              bg-[var(--backgroundSecondary)]
              p-5 sm:p-6
            "
            >
              <div
                className="
                absolute -right-8 -top-8
                h-28 w-28 rounded-full
                bg-[var(--greenSpan2)]/15 blur-2xl
              "
              />

              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2">
                  <Lock size={17} className="text-[var(--greenSpan)]" />

                  <strong className="text-sm text-[var(--textTitles)]">
                    Sua privacidade importa
                  </strong>
                </div>

                <p
                  className="
                  text-xs leading-relaxed
                  text-[var(--textSecondary)]
                  sm:text-sm
                "
                >
                  As respostas são apresentadas de forma anônima. Compartilhe
                  sua opinião com tranquilidade.
                </p>

                <div
                  className="
                  mt-4 flex items-center gap-2
                  text-xs font-semibold text-[var(--greenSpan)]
                "
                >
                  <ShieldCheck size={15} />
                  Ambiente de escuta anônima
                </div>
              </div>
            </div>
          </aside>

          {/* PAINEL DIREITO */}

          <section className="min-w-0">
            {/* CABEÇALHO DA LISTA */}

            <div
              className="
              mb-6 flex flex-col justify-between gap-3
              sm:flex-row sm:items-end
            "
            >
              <div>
                <p
                  className="
                  mb-2 text-xs font-bold uppercase
                  tracking-widest text-[var(--greenSpan)]
                "
                >
                  Sua participação
                </p>

                <h2
                  className="
                  text-2xl font-bold tracking-tight
                  text-[var(--textTitles)] sm:text-3xl
                "
                >
                  Formulários disponíveis
                </h2>

                <p
                  className="
                  mt-2 text-sm text-[var(--textSecondary)]
                "
                >
                  Escolha uma pesquisa para começar.
                </p>
              </div>

              <span
                className="
                w-fit rounded-full
                bg-[var(--greenLeve2)]
                px-3 py-1.5
                text-xs font-bold
                text-[var(--greenSpan)]
              "
              >
                {company.forms.length}{" "}
                {company.forms.length === 1 ? "formulário" : "formulários"}
              </span>
            </div>

            {/* LISTA */}

            {company.forms.length === 0 ? (
              <div
                className="
                flex flex-col items-center justify-center
                rounded-2xl border border-[var(--borders)]
                bg-[var(--foreground)]/50
                px-6 py-20 text-center
              "
              >
                <div
                  className="
                  mb-5 flex h-16 w-16 items-center justify-center
                  rounded-2xl bg-[var(--greenLeve2)]
                  text-[var(--greenSpan)]
                "
                >
                  <FileText size={29} />
                </div>

                <h3 className="text-lg font-bold text-[var(--textTitles)]">
                  Nenhum formulário disponível
                </h3>

                <p
                  className="
                  mt-2 max-w-[300px]
                  text-sm leading-relaxed
                  text-[var(--textSecondary)]
                "
                >
                  Esta empresa ainda não disponibilizou pesquisas. Volte em
                  outro momento!
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {company.forms.map((form, index) => (
                  <Link
                    key={form.id}
                    href={`/feedbacks/public/${slug}/${form.id}`}
                    className="
                      group relative flex items-center gap-4
                      overflow-hidden rounded-2xl
                      border border-[var(--borders)]
                      bg-[var(--foreground)]/60
                      p-5 sm:p-6
                      shadow-sm
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-[var(--greenSpan2)]
                      hover:shadow-md
                    "
                  >
                    {/* ÍCONE */}

                    <div
                      className="
                      flex h-12 w-12 shrink-0
                      items-center justify-center
                      rounded-xl bg-[var(--greenLeve2)]
                      text-[var(--greenSpan)]
                      transition-all duration-300
                      group-hover:bg-[var(--greenSpan2)]
                    "
                    >
                      <FileText size={23} />
                    </div>

                    {/* INFORMAÇÕES */}

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className="
                          text-[10px] font-bold uppercase
                          tracking-wider text-[var(--textPlaceholder)]
                        "
                        >
                          Pesquisa {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3
                        className="
                        break-words text-base font-bold
                        text-[var(--textTitles)]
                        transition-colors
                        group-hover:text-[var(--greenSpan)]
                        sm:text-lg
                      "
                      >
                        {form.title}
                      </h3>

                      {form.description && (
                        <p
                          className="
                          mt-1 line-clamp-2
                          text-xs leading-relaxed
                          text-[var(--textSecondary)]
                          sm:text-sm
                        "
                        >
                          {form.description}
                        </p>
                      )}
                    </div>

                    {/* SETA */}

                    <div
                      className="
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-full bg-[var(--backgroundSecondary)]
                      text-[var(--greenSpan)]
                      transition-all duration-300
                      group-hover:translate-x-1
                      group-hover:bg-[var(--greenSpan)]
                      group-hover:text-[var(--foreground)]
                    "
                    >
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* RODAPÉ */}

            <div
              className="
              mt-8 flex items-center justify-center gap-2
              border-t border-[var(--borders)]
              pt-6 text-center
            "
            >
              <Lock size={13} className="text-[var(--greenSpan)]" />

              <p className="text-xs text-[var(--textPlaceholder)]">
                anom. · Sua opinião ajuda a transformar ambientes.
              </p>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
