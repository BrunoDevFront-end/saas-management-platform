"use client";

import { useEffect, useState } from "react";
import { X, MessageCircle, MessageSquare, LoaderCircle } from "lucide-react";

import { Feedback, Form, getFeddbacks } from "./request";
import FeedbackItem from "./FeedbackItem";

interface FeedbackDetailsModalProps {
  form: Form;
  onClose: () => void;
  onFeedbackDeleted: (formId: string) => void;
}

export default function FeedbackDetailsModal({
  form,
  onClose,
  onFeedbackDeleted,
}: FeedbackDetailsModalProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeedbacks() {
      try {
        setLoading(true);

        const data = await getFeddbacks(form.id);
        setFeedbacks(data);
      } catch {
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    }

    loadFeedbacks();
  }, [form.id]);

  // Impede a rolagem do conteúdo atrás do painel.
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* FUNDO ESCURECIDO */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[#082e24]/35 backdrop-blur-[2px]"
      />

      {/* PAINEL LATERAL */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        className="
          fixed right-0 top-0 z-50
          flex h-dvh w-full flex-col
          border-l border-[var(--borders)]
          bg-[var(--background)]
          shadow-2xl
          sm:max-w-[480px]
          lg:max-w-[500px]
          animate-in slide-in-from-right duration-300
        "
      >
        {/* CABEÇALHO */}

        <header className="shrink-0 border-b border-[var(--borders)] bg-[var(--foreground)]/60 px-6 py-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--greenSpan)]">
              <MessageCircle size={19} />

              <span>Feedbacks recebidos</span>
            </div>

            <button
              type="button"
              aria-label="Fechar painel"
              onClick={onClose}
              className="
                rounded-full p-2
                text-[var(--textSecondary)]
                transition
                hover:bg-[var(--greenLeve)]
                hover:text-[var(--greenSpan)]
              "
            >
              <X size={21} />
            </button>
          </div>

          <h2
            id="feedback-title"
            className="text-xl font-bold tracking-tight text-[var(--textTitles)] sm:text-2xl"
          >
            {form.title}
          </h2>

          <div className="mt-3 flex items-center gap-2">
            <span
              className="
              flex h-7 w-7 items-center justify-center
              rounded-full bg-[var(--greenLeve2)]
              text-[var(--greenSpan)]
            "
            >
              <MessageSquare size={14} />
            </span>

            <p className="text-sm text-[var(--textSecondary)]">
              <strong className="text-[var(--textTitles)]">
                {feedbacks.length}
              </strong>{" "}
              {feedbacks.length === 1
                ? "resposta recebida"
                : "respostas recebidas"}
            </p>
          </div>

          <p className="mt-3 text-xs text-[var(--textPlaceholder)]">
            Todas as respostas são anônimas e organizadas por data.
          </p>
        </header>

        {/* CONTEÚDO */}

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-24">
              <LoaderCircle
                size={30}
                className="animate-spin text-[var(--greenSpan)]"
              />

              <p className="text-sm text-[var(--textSecondary)]">
                Carregando feedbacks...
              </p>
            </div>
          ) : feedbacks.length > 0 ? (
            <div className="flex flex-col gap-4">
              {feedbacks.map((feedback) => (
                <article
                  key={feedback.id}
                  className="
                    rounded-xl border border-[var(--borders)]
                    bg-[var(--foreground)]/60
                    p-4 shadow-sm
                    transition duration-200
                    hover:border-[var(--greenSpan2)]
                  "
                >
                  <FeedbackItem
                    feedback={feedback}
                    onDeleted={(id) => {
                      setFeedbacks((prev) =>
                        prev.filter((item) => item.id !== id),
                      );

                      onFeedbackDeleted(form.id);
                    }}
                  />
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div
                className="
                mb-5 flex h-16 w-16 items-center justify-center
                rounded-full bg-[var(--greenLeve2)]
                text-[var(--greenSpan)]
              "
              >
                <MessageCircle size={29} />
              </div>

              <h3 className="text-lg font-bold text-[var(--textTitles)]">
                Nenhum feedback ainda
              </h3>

              <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-[var(--textSecondary)]">
                Quando sua equipe enviar respostas por este formulário, elas
                aparecerão aqui.
              </p>
            </div>
          )}
        </div>

        {/* RODAPÉ */}

        <footer
          className="
          shrink-0 border-t border-[var(--borders)]
          bg-[var(--foreground)]/50
          px-6 py-4
        "
        >
          <p className="text-center text-xs text-[var(--textPlaceholder)]">
            <span className="font-semibold text-[var(--greenSpan)]">anom.</span>{" "}
            · Feedbacks anônimos e seguros.
          </p>
        </footer>
      </aside>
    </>
  );
}
