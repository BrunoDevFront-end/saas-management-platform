"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CreateFeedback,
  GetPublicForm,
  PublicForm,
} from "../../../../../components/request";
import { Star } from "lucide-react";

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

  useEffect(() => {
    async function fetchForm() {
      console.log(formId);
      try {
        setLoading(true);
        setErrorMessage("");

        const data = await GetPublicForm(formId);
        setForm(data);
      } catch {
        setErrorMessage("Formulário não encontrado ou inativo.");
      } finally {
        setLoading(false);
      }
    }

    fetchForm();
  }, [formId]);

  async function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      setErrorMessage("Escreva um comentário.");
      return;
    }

    try {
      setSending(true);
      setErrorMessage("");

      await CreateFeedback({
        content: content.trim(),
        slug,
        formId,
      });

      setContent("");

      alert("Feedback enviado com sucesso!");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-syne">
        Carregando...
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-red-400 font-syne">
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="flex items-center h-screen bg-[#0a0a0a] font-syne">
      <div className="mx-auto w-[90%] max-w-[1400px]  md:grid md:grid-cols-[40%_1fr] md:border-2 md:border-[var(--greenSpan)] lg:w-[80%]">
        {/* Sidebar */}
        <aside className="border-b-2 border-[var(--greenSpan)] p-5 md:border-b-0 md:border-r-2 md:p-8 md:flex md:flex-col md:justify-between">
          <div>
            <div className="flex items-center justify-between md:block ">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center bg-[var(--greenSpan)] text-black font-bold">
                  {form.company.name.charAt(0).toUpperCase()}
                </span>

                <span className="text-base  font-bold text-[var(--textTitles)]">
                  {form.company.name}
                </span>
              </div>

              <span className="border border-[var(--greenSpan)] px-3 py-1 text-xs font-bold text-[var(--greenSpan)] md:hidden">
                ANÔNIMO
              </span>
            </div>

            <h1 className="hidden break-words  md:block mt-15 mb-3 text-2xl font-bold text-[var(--textTitles)] leading-snug">
              {form.title}
            </h1>

            <p className="hidden md:block text-lg text-[var(--textPlaceholder)] leading-relaxed">
              Suas respostas ajudam a empresa a melhorar. leva menos de 3
              minutos.
            </p>
          </div>

          <div className="hidden  md:block">
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--greenSpan)]">
              100% Anônimo
            </span>

            <p className="mt-2 text-xs leading-relaxed text-[var(--textPlaceholder)]">
              Nenhum dado pessoal, IP ou identificador é coletado. É impossível
              rastrear sua resposta.
            </p>
          </div>
        </aside>

        {/* Formulário */}
        <form
          onSubmit={handleForm}
          className="flex flex-col  gap-6 p-5 md:p-10"
        >
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-[var(--textPlaceholder)]">
              Feedback
            </p>

            <div className="h-1 bg-[var(--greenSpan)]" />
          </div>

          <h2 className="text-lg break-words font-bold leading-snug text-[var(--textTitles)] md:text-2xl md:break-all">
            {form.description}
          </h2>

          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="cursor-pointer text-[var(--borders)]"
              >
                <Star
                  size={45}
                  className={
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }
                />
              </button>
            ))}
          </div>

          <div>
            <label
              htmlFor="comment"
              className="mb-2 block text-xs uppercase tracking-wide text-[var(--textPlaceholder)]"
            >
              Qual a sua opinião?
            </label>

            <textarea
              id="comment"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva aqui..."
              className="w-full resize-none border border-[var(--GrayEdges)] bg-transparent p-3 text-sm text-[var(--textTitles)] focus:border-[var(--greenSpan)] focus:outline-none"
            />
          </div>

          {errorMessage && (
            <span className="text-sm text-red-400">{errorMessage}</span>
          )}

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 border-2 border-[var(--GrayEdges)] py-3 text-sm font-bold uppercase text-[var(--textPlaceholder)]"
            >
              Voltar
            </button>

            <button
              type="submit"
              disabled={sending}
              className="flex-[2] bg-[var(--greenSpan)] cursor-pointer py-3 text-sm font-bold uppercase text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              {sending ? "Enviando..." : "Enviar Feedback"}
            </button>
          </div>

          <p className="hidden text-center text-xs text-[var(--textPlaceholder)] md:block">
            Nenhum dado pessoal é coletado ou armazenado.
          </p>
        </form>
      </div>
    </div>
  );
}
