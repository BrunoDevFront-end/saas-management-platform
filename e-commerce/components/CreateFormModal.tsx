"use client";

import React, { useState } from "react";
import { FilePlus2 } from "lucide-react";
import { HiOutlineX } from "react-icons/hi";

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
      <div
        onClick={() => setopenModalForm(false)}
        className="fixed inset-0 z-40 bg-black/50"
      />

      <div className="fixed inset-x-0 top-4 z-50 mx-auto max-h-[90dvh] w-full overflow-y-auto rounded-xl bg-[var(--backgroundSecondary)] p-5 custom-scrollbar md:w-[75%] lg:w-[60%] xl:w-[55%]">
        <header className="flex gap-5">
          <FilePlus2 size={40} className="text-[var(--greenSpan)]" />

          <div>
            <h1 className="text-xl text-[var(--textTitles)]">
              Criar novo formulário
            </h1>

            <p className="text-sm text-[var(--textPlaceholder)]">
              Ouça sua equipe de verdade
            </p>
          </div>

          <button
            type="button"
            onClick={() => setopenModalForm(false)}
            className="absolute right-5 top-5 cursor-pointer"
          >
            <HiOutlineX size={22} className="text-[var(--textPlaceholder)]" />
          </button>
        </header>

        <form onSubmit={handleCreateForm}>
          <section className="my-10 flex flex-col gap-7 sm:flex-row">
            <div className="flex w-full flex-col gap-1.5 text-[var(--textTitles)] sm:w-1/2">
              <label htmlFor="titulo">Nome do formulário</label>

              <input
                id="titulo"
                type="text"
                placeholder="Ex: Pesquisa de Clima..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 border-[var(--borders)] bg-[var(--GrayEdges)] p-3 text-neutral-400 transition-colors duration-300 focus:border-l-[var(--greenSpan)] focus:outline-none focus:shadow-[0_0_1px_var(--greenSpan)]"
              />
            </div>

            <div className="flex w-full flex-col gap-1.5 text-[var(--textTitles)] sm:w-1/2">
              <label htmlFor="descricao">Descrição</label>

              <textarea
                id="descricao"
                placeholder="Descreva o objetivo deste formulário... (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-2 border-[var(--borders)] bg-[var(--GrayEdges)] p-4 text-neutral-400 transition-colors duration-300 focus:border-l-[var(--greenSpan)] focus:outline-none focus:shadow-[0_0_1px_var(--greenSpan)]"
              />
            </div>
          </section>

          {errorMessage && (
            <span className="text-sm text-red-400">{errorMessage}</span>
          )}

          <section>
            <StarRatingToggle
              enabled={activeRating}
              onChange={setActiveRating}
            />
          </section>

          <span className="mx-auto mt-7 flex h-0.5 w-full bg-[var(--borders)]" />

          <footer className="mb-10 mt-5 flex justify-end gap-10">
            <button
              type="button"
              onClick={() => setopenModalForm(false)}
              className="cursor-pointer text-[var(--textPlaceholder)]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-sm bg-[var(--greenSpan)] p-2 text-[14px] font-bold font-inter text-black transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_var(--greenSpan)] md:h-10 md:w-40 md:self-end"
            >
              {loading ? "Criando..." : "Criar formulário"}
            </button>
          </footer>
        </form>
      </div>
    </>
  );
}
