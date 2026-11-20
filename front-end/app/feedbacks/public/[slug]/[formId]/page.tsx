"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  CreateFeedback,
  GetPublicForm,
  PublicForm,
} from "../../../../../components/request";

import {
  Star,
  Lock,
  ShieldCheck,
  ArrowRight,
  Building2,
  MessageSquareText,
  CheckCircle2,
} from "lucide-react";

export default function CreatePublicFeedback() {
  const router = useRouter();

  const { slug, formId } = useParams<{
    slug: string;
    formId: string;
  }>();

  const [form, setForm] = useState<PublicForm | null>(null);
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [rating, setRating] = useState(0);
  const [isFeedbackSent, setIsFeedbackSent] = useState(false);

  // CARREGAR FORMULÁRIO

  useEffect(() => {
    let isMounted = true;

    async function fetchForm() {
      try {
        setLoading(true);
        setErrorMessage("");

        const data = await GetPublicForm(formId);

        if (isMounted) {
          setForm(data);
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Formulário não encontrado ou inativo.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchForm();

    return () => {
      isMounted = false;
    };
  }, [formId]);

  // ENVIAR FEEDBACK

  async function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form) return;

    if (!content.trim()) {
      setErrorMessage("Escreva um comentário antes de enviar.");
      return;
    }

    if (form.activeRating && rating === 0) {
      setErrorMessage("Selecione uma avaliação antes de enviar.");
      return;
    }

    try {
      setSending(true);
      setErrorMessage("");

      await CreateFeedback({
        content: content.trim(),
        slug,
        formId,
        rating: form.activeRating ? rating : null,
      });

      setContent("");
      setIsFeedbackSent(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocorreu um erro inesperado.");
      }
    } finally {
      setSending(false);
    }
  }

  // CARREGAMENTO

  if (loading) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[var(--background)] font-syne">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--greenLeve2)] border-t-[var(--greenSpan)]" />

          <p className="text-sm text-[var(--textSecondary)]">
            Carregando formulário...
          </p>

          <strong className="text-xl text-[var(--greenSpan)]">
            anom<span className="text-[var(--greenSpan2)]">.</span>
          </strong>
        </div>
      </main>
    );
  }

  // FORMULÁRIO NÃO ENCONTRADO

  if (!form) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[var(--background)] px-4 font-syne">
        <div className="w-full max-w-md rounded-2xl border border-[var(--borders)] bg-[var(--foreground)] p-8 text-center shadow-sm">
          <Lock size={35} className="mx-auto mb-5 text-[var(--greenSpan)]" />

          <h1 className="text-xl font-bold text-[var(--textTitles)]">
            Formulário indisponível
          </h1>

          <p className="mt-3 text-sm text-[var(--textSecondary)]">
            {errorMessage}
          </p>

          <button
            onClick={() => router.back()}
            className="mt-7 w-full rounded-xl bg-[var(--greenSpan)] p-3 font-bold text-[var(--foreground)] transition hover:opacity-90"
          >
            Voltar
          </button>
        </div>
      </main>
    );
  }

  const initial = form.company.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <main className="min-h-dvh bg-[var(--background)] px-4 py-5 font-syne text-[var(--textTitles)] sm:px-7 sm:py-7">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* HEADER */}

        <header className="flex h-[65px] items-center justify-between border-b border-[var(--borders)] px-3 sm:px-6">
          <span className="text-2xl font-extrabold tracking-tight text-[var(--greenSpan)]">
            anom<span className="text-[var(--greenSpan2)]">.</span>
          </span>

          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--greenLeve2)] text-sm font-bold text-[var(--greenSpan)]">
              {initial}
            </span>

            <div className="hidden sm:block">
              <p className="text-xs text-[var(--textPlaceholder)]">
                Organização
              </p>

              <p className="max-w-[180px] truncate text-sm font-bold text-[var(--textTitles)]">
                {form.company.name}
              </p>
            </div>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}

        <section className="grid grid-cols-1 gap-8 py-8 sm:py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:py-14 xl:gap-20">
          {/* PAINEL ESQUERDO */}

          <aside className="flex flex-col justify-between gap-8 lg:sticky lg:top-10 lg:h-[calc(100dvh-150px)] lg:min-h-[480px]">
            <div>
              {/* IDENTIFICAÇÃO */}

              <div className="mb-9 inline-flex items-center gap-2 rounded-full border border-[var(--borders)] bg-[var(--foreground)]/60 px-3 py-2">
                <Building2 size={15} className="text-[var(--greenSpan)]" />

                <span className="text-xs font-semibold text-[var(--textSecondary)]">
                  Pesquisa de feedback
                </span>
              </div>

              {/* TÍTULO */}

              <h1 className="max-w-[550px] break-words text-3xl font-bold leading-[1.15] tracking-tight text-[var(--textTitles)] sm:text-4xl xl:text-5xl">
                Sua opinião faz a{" "}
                <span className="text-[var(--greenSpan2)]">diferença.</span>
              </h1>

              <p className="mt-6 max-w-[460px] text-sm leading-relaxed text-[var(--textSecondary)] sm:text-base sm:leading-7">
                Sua experiência é importante. Compartilhe sua opinião com
                sinceridade e ajude a construir melhorias reais dentro da
                empresa.
              </p>

              {/* INFORMAÇÕES */}

              <div className="mt-10 flex flex-col gap-5 border-t border-[var(--borders)] pt-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--greenLeve2)] text-[var(--greenSpan)]">
                    <ShieldCheck size={23} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[var(--textTitles)]">
                      Participação anônima
                    </h3>

                    <p className="mt-1 text-xs text-[var(--textSecondary)]">
                      Sua identidade não é exibida junto à resposta.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--greenLeve2)] text-[var(--greenSpan)]">
                    <MessageSquareText size={22} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[var(--textTitles)]">
                      Sua voz importa
                    </h3>

                    <p className="mt-1 text-xs text-[var(--textSecondary)]">
                      Cada feedback pode gerar mudanças positivas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PRIVACIDADE */}

            <div className="relative overflow-hidden rounded-2xl border border-[var(--borders)] bg-[var(--backgroundSecondary)] p-5 sm:p-6">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--greenSpan2)]/15 blur-2xl" />

              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2">
                  <Lock size={17} className="text-[var(--greenSpan)]" />

                  <strong className="text-sm text-[var(--textTitles)]">
                    Sua privacidade importa
                  </strong>
                </div>

                <p className="text-xs leading-relaxed text-[var(--textSecondary)] sm:text-sm">
                  Compartilhe sua opinião com tranquilidade. Suas respostas são
                  tratadas de forma anônima.
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[var(--greenSpan)]">
                  <ShieldCheck size={15} />
                  Ambiente de escuta anônima
                </div>
              </div>
            </div>
          </aside>

          {/* PAINEL DIREITO - FORMULÁRIO */}

          <section className="min-w-0">
            <div className="rounded-2xl border border-[var(--borders)] bg-[var(--foreground)]/60 p-5 shadow-sm sm:p-8 lg:p-10">
              {/* CABEÇALHO */}

              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--greenSpan)]">
                    Feedback
                  </span>

                  <span className="rounded-full bg-[var(--greenLeve2)] px-3 py-1.5 text-[10px] font-bold text-[var(--greenSpan)]">
                    ANÔNIMO
                  </span>
                </div>

                <h2 className="break-words text-2xl font-bold leading-snug text-[var(--textTitles)] sm:text-3xl">
                  {form.title}
                </h2>

                {form.description && (
                  <p className="mt-3 text-sm leading-relaxed text-[var(--textSecondary)] sm:text-base">
                    {form.description}
                  </p>
                )}

                <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-[var(--greenLeve2)]">
                  <div className="h-full w-1/3 rounded-full bg-[var(--greenSpan2)]" />
                </div>
              </div>

              {/* FORMULÁRIO */}

              <form onSubmit={handleForm} className="flex flex-col gap-8">
                {/* AVALIAÇÃO */}

                {form.activeRating && (
                  <fieldset>
                    <legend className="mb-3 text-sm font-bold text-[var(--textTitles)]">
                      Como você avalia?
                    </legend>

                    <p className="mb-4 text-xs text-[var(--textSecondary)]">
                      Selecione uma nota de 1 a 5 estrelas.
                    </p>

                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            setRating(star);
                            setErrorMessage("");
                          }}
                          aria-label={`Avaliar com ${star} estrelas`}
                          aria-pressed={rating === star}
                          className="rounded-lg p-1 transition duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-[var(--greenSpan)]"
                        >
                          <Star
                            size={34}
                            strokeWidth={1.7}
                            className={
                              star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-[var(--borders)]"
                            }
                          />
                        </button>
                      ))}

                      <span className="ml-2 text-sm font-bold text-[var(--textSecondary)]">
                        {rating > 0 ? `${rating}/5` : ""}
                      </span>
                    </div>
                  </fieldset>
                )}

                {/* COMENTÁRIO */}

                <div>
                  <label
                    htmlFor="comment"
                    className="mb-3 block text-sm font-bold text-[var(--textTitles)]"
                  >
                    Qual a sua opinião?
                  </label>

                  <textarea
                    id="comment"
                    rows={6}
                    maxLength={2000}
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="Compartilhe sua experiência, sugestões ou pontos que acredita que podem melhorar..."
                    className="w-full resize-y rounded-xl border border-[var(--borders)] bg-[var(--backgroundSecondary)] p-4 text-sm leading-relaxed text-[var(--textInput)] outline-none transition placeholder:text-[var(--textPlaceholder)] focus:border-[var(--greenSpan)] focus:ring-2 focus:ring-[var(--greenSpan2)]/30"
                  />

                  <div className="mt-2 flex justify-end">
                    <span className="text-xs text-[var(--textPlaceholder)]">
                      {content.length}/2000
                    </span>
                  </div>
                </div>

                {/* ERRO */}

                {errorMessage && (
                  <span
                    role="alert"
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {errorMessage}
                  </span>
                )}

                {/* BOTÕES */}

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={sending}
                    className="flex-1 rounded-xl border border-[var(--borders)] px-5 py-3.5 text-sm font-bold text-[var(--textSecondary)] transition hover:bg-[var(--backgroundSecondary)] disabled:opacity-50"
                  >
                    Voltar
                  </button>

                  <button
                    type="submit"
                    disabled={sending}
                    className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-[var(--greenSpan)] px-5 py-3.5 text-sm font-bold text-[var(--foreground)] transition duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sending ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar feedback
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* RODAPÉ */}

              <div className="mt-8 flex items-center justify-center gap-2 border-t border-[var(--borders)] pt-6">
                <Lock size={13} className="text-[var(--greenSpan)]" />

                <p className="text-center text-xs text-[var(--textPlaceholder)]">
                  Nenhum dado pessoal é exibido junto ao feedback.
                </p>
              </div>
            </div>
          </section>
        </section>
      </div>

      {/* MODAL DE SUCESSO */}

      {isFeedbackSent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[var(--borders)] bg-[var(--background)] p-7 shadow-2xl sm:p-9">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--greenLeve2)] text-[var(--greenSpan)]">
              <CheckCircle2 size={35} />
            </div>

            <h2 className="text-center text-2xl font-bold text-[var(--textTitles)]">
              Feedback enviado!
            </h2>

            <p className="mt-3 text-center text-sm leading-relaxed text-[var(--textSecondary)]">
              Sua participação foi registrada com sucesso. Obrigado por
              contribuir para um ambiente melhor!
            </p>

            <button
              type="button"
              onClick={() => {
                setIsFeedbackSent(false);
                router.back();
              }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--greenSpan)] p-3.5 text-sm font-bold text-[var(--foreground)] transition hover:opacity-90"
            >
              Voltar aos formulários
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
