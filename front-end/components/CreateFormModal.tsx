"use client";

import React, { useEffect, useState } from "react";
import { FilePlus2, X } from "lucide-react";
import { toast } from "sonner";

import { StarRatingToggle } from "./StarRatingTogle";
import { CreateNewForm, Form } from "./request";

interface OpemModalForm {
  setopenModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  onFormCreated: (newForm: Form) => void;
}

export default function CreateFormModal({
  setopenModalForm,
  onFormCreated,
}: OpemModalForm) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeRating, setActiveRating] = useState(true);

  // Bloqueia a rolagem do fundo
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Fecha com ESC
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && !loading) {
        setopenModalForm(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [loading, setopenModalForm]);

  async function handleCreateForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const tituloFormatado = title.trim();

    if (!tituloFormatado) {
      setErrorMessage("O campo Nome do formulário não pode ficar vazio!");
      return;
    }

    if (tituloFormatado.length < 3) {
      setErrorMessage(
        "O nome do formulário precisa ter no mínimo 3 caracteres!",
      );
      return;
    }

    setLoading(true);

    try {
      const data = await CreateNewForm({
        title: tituloFormatado,
        description: description.trim(),
        activeRating,
      });

      onFormCreated(data);
      toast.success("Formulário criado!");
      setopenModalForm(false);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "Não foi possível criar o formulário. Tente novamente.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* OVERLAY */}

      <div
        onClick={() => !loading && setopenModalForm(false)}
        className="
          fixed inset-0 z-40
          bg-[#082e24]/40
          backdrop-blur-[3px]
          transition-opacity
        "
      />

      {/* MODAL */}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-form-title"
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          overflow-y-auto
          p-3 sm:p-6
          pointer-events-none
        "
      >
        <div
          className="
            pointer-events-auto
            relative my-auto
            flex w-full max-w-[760px]
            flex-col
            overflow-hidden
            rounded-2xl
            border border-[var(--borders)]
            bg-[var(--background)]
            shadow-2xl
            animate-in fade-in zoom-in-95 duration-200
          "
        >
          {/* CABEÇALHO */}

          <header
            className="
            flex items-center justify-between
            border-b border-[var(--borders)]
            bg-[var(--foreground)]/50
            px-5 py-5 sm:px-8 sm:py-6
          "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-xl
                bg-[var(--greenLeve2)]
                text-[var(--greenSpan)]
              "
              >
                <FilePlus2 size={25} />
              </div>

              <div>
                <h1
                  id="create-form-title"
                  className="
                    text-lg font-bold tracking-tight
                    text-[var(--textTitles)]
                    sm:text-xl
                  "
                >
                  Criar novo formulário
                </h1>

                <p className="mt-1 text-xs text-[var(--textSecondary)] sm:text-sm">
                  Crie um novo canal de escuta para sua equipe.
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => setopenModalForm(false)}
              aria-label="Fechar modal"
              className="
                rounded-full p-2
                text-[var(--textSecondary)]
                transition
                hover:bg-[var(--greenLeve)]
                hover:text-[var(--greenSpan)]
                disabled:opacity-40
              "
            >
              <X size={21} />
            </button>
          </header>

          {/* FORMULÁRIO */}

          <form onSubmit={handleCreateForm} className="flex flex-col">
            <div className="flex flex-col gap-7 px-5 py-7 sm:px-8 sm:py-8">
              {/* INFORMAÇÕES */}

              <div>
                <h2
                  className="
                  mb-1 text-base font-bold
                  text-[var(--textTitles)]
                "
                >
                  Informações do formulário
                </h2>

                <p className="text-xs text-[var(--textSecondary)]">
                  Defina um nome e explique o objetivo da pesquisa.
                </p>
              </div>

              {/* NOME */}

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="titulo"
                    className="text-sm font-semibold text-[var(--textTitles)]"
                  >
                    Nome do formulário
                  </label>

                  <span className="text-xs text-[var(--textPlaceholder)]">
                    {title.length}/35
                  </span>
                </div>

                <input
                  id="titulo"
                  type="text"
                  placeholder="Ex: Pesquisa de Clima Organizacional"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={35}
                  disabled={loading}
                  className="
                    w-full rounded-lg
                    border border-[var(--borders)]
                    bg-[var(--backgroundSecondary)]
                    px-4 py-3
                    text-sm text-[var(--textInput)]
                    outline-none transition-all
                    placeholder:text-[var(--textPlaceholder)]
                    focus:border-[var(--greenSpan)]
                    focus:ring-2
                    focus:ring-[var(--greenSpan2)]/25
                  "
                />
              </div>

              {/* DESCRIÇÃO */}

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="descricao"
                    className="text-sm font-semibold text-[var(--textTitles)]"
                  >
                    Descrição
                  </label>

                  <span className="text-xs text-[var(--textPlaceholder)]">
                    {description.length}/90
                  </span>
                </div>

                <textarea
                  id="descricao"
                  placeholder="Descreva o objetivo deste formulário..."
                  value={description}
                  maxLength={90}
                  rows={3}
                  disabled={loading}
                  onChange={(e) => setDescription(e.target.value)}
                  className="
                    w-full resize-none rounded-lg
                    border border-[var(--borders)]
                    bg-[var(--backgroundSecondary)]
                    px-4 py-3
                    text-sm text-[var(--textInput)]
                    outline-none transition-all
                    placeholder:text-[var(--textPlaceholder)]
                    focus:border-[var(--greenSpan)]
                    focus:ring-2
                    focus:ring-[var(--greenSpan2)]/25
                  "
                />

                <p className="text-xs text-[var(--textPlaceholder)]">
                  Campo opcional. Ajude sua equipe a entender o propósito.
                </p>
              </div>

              {/* AVALIAÇÃO */}

              <div
                className="
                rounded-xl border border-[var(--borders)]
                bg-[var(--foreground)]/50
                p-4 sm:p-5
              "
              >
                <h3
                  className="
                  mb-2 text-sm font-bold
                  text-[var(--textTitles)]
                "
                >
                  Configurações de avaliação
                </h3>

                <p
                  className="
                  mb-4 text-xs leading-relaxed
                  text-[var(--textSecondary)]
                "
                >
                  Defina se os participantes poderão avaliar suas respostas
                  utilizando estrelas.
                </p>

                <StarRatingToggle
                  enabled={activeRating}
                  onChange={setActiveRating}
                />
              </div>

              {/* ERRO */}

              {errorMessage && (
                <div
                  role="alert"
                  className="
                    rounded-lg border border-red-200
                    bg-red-50 px-4 py-3
                    text-sm text-red-600
                  "
                >
                  {errorMessage}
                </div>
              )}
            </div>

            {/* RODAPÉ */}

            <footer
              className="
              flex flex-col-reverse gap-3
              border-t border-[var(--borders)]
              bg-[var(--foreground)]/50
              px-5 py-5
              sm:flex-row sm:items-center sm:justify-end
              sm:px-8
            "
            >
              <button
                type="button"
                disabled={loading}
                onClick={() => setopenModalForm(false)}
                className="
                  rounded-lg px-5 py-3
                  text-sm font-semibold
                  text-[var(--textSecondary)]
                  transition
                  hover:bg-[var(--greenLeve)]
                  disabled:opacity-40
                "
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  flex items-center justify-center gap-2
                  rounded-lg
                  bg-[var(--greenSpan2)]
                  px-6 py-3
                  text-sm font-bold
                  text-[var(--greenSpan)]
                  shadow-sm
                  transition-all duration-200
                  hover:brightness-95 hover:shadow-md
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <FilePlus2 size={17} />

                {loading ? "Criando formulário..." : "Criar formulário"}
              </button>
            </footer>
          </form>
        </div>
      </div>
    </>
  );
}
