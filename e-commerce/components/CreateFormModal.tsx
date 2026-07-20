import React, { useState } from "react";
import { FilePlus2 } from "lucide-react";
import { HiOutlineX } from "react-icons/hi";
import { StarRatingToggle } from "./StarRatingTogle";
import { CreateNewForm } from "./request";
import { Form } from "./request";

interface OpemModalForm {
  setopenModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  onFormCreated: (newForm: Form) => void;
}

export default function CreateFormModal({
  setopenModalForm,
  onFormCreated,
}: OpemModalForm) {
  const [ratingEnabled, setRatingEnabled] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      });
      onFormCreated(data);
      setopenModalForm(false);
      console.log(data);
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
      ></div>

      <div
        className="
    fixed
    inset-x-0
    top-4
    mx-auto
    z-50
    w-full
    md:w-[75%]
    lg:w-[60%]
    xl:w-[55%]
    max-h-[90dvh]
    overflow-y-auto
    rounded-xl
    bg-[var(--backgroundSecondary)]
    p-5
  "
      >
        <header className="flex gap-5">
          <FilePlus2 size={40} className="text-[var(--greenSpan)] " />
          <div>
            <h1 className="text-xl text-[var(--textTitles)]">
              Criar novo formulário
            </h1>
            <p className="text-sm text-[var(--textPlaceholder)]">
              Ouça sua equipe de verdade
            </p>
          </div>
          <button
            onClick={() => setopenModalForm(false)}
            className="absolute right-5 top-5 cursor-pointer"
          >
            <HiOutlineX size={22} className="text-[var(--textPlaceholder)]" />
          </button>
        </header>
        <form onSubmit={handleCreateForm}>
          <section className="flex flex-col gap-7 my-10 sm:flex-row">
            <div className="flex flex-col w-full gap-1.5 text-[var(--textTitles)] sm:w-[50%]">
              <label htmlFor="titulo">Nome do formulario</label>
              <input
                className="bg-[var(--GrayEdges)] border-2 border-[var(--borders)] p-3 text-neutral-400 focus:outline-none focus:border-l-[var(--greenSpan)] focus:shadow-[0_0_1px_var(--greenSpan)] transition-colors duration-300 "
                type="text"
                placeholder="Ex: Pesquisa de Clima..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full  gap-1.5 text-[var(--textTitles)] sm:w-[50%]">
              <label htmlFor="Descrição">Descrição</label>
              <textarea
                className="bg-[var(--GrayEdges)] border-2 border-[var(--borders)] p-4 text-neutral-400 focus:outline-none focus:border-l-[var(--greenSpan)] focus:shadow-[0_0_1px_var(--greenSpan)] transition-colors duration-300"
                placeholder="Descreva o objetivo deste formulário... (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </section>
          {errorMessage && (
            <span className=" text-red-400 text-sm ">{errorMessage}</span>
          )}
          <section className="">
            <StarRatingToggle
              enabled={ratingEnabled}
              onChange={setRatingEnabled}
            />
          </section>
          <span className="flex  w-full h-0.5 bg-[var(--borders)] mx-auto mt-7"></span>
          <footer className="flex justify-end gap-10 mt-5 mb-10">
            <button
              onClick={() => setopenModalForm(false)}
              className="text-[var(--textPlaceholder)] cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[var(--greenSpan)] text-black font-bold text-[14px] p-2 font-inter md:w-40 md:h-10 md:self-end cursor-pointer rounded-sm hover:scale-[1.02] hover:shadow-[0_0_15px_var(--greenSpan)] transition-all duration-200"
            >
              Criar formulário
            </button>
          </footer>
        </form>
      </div>
    </>
  );
}
