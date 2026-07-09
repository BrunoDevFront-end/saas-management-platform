import React, { useState } from "react";
import { FilePlus2 } from "lucide-react";
import { HiOutlineX } from "react-icons/hi";
import { StarRatingToggle } from "./StarRatingTogle";

interface OpemModalForm {
  openModalForm: boolean;
  setopenModalForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateFormModal({
  openModalForm,
  setopenModalForm,
}: OpemModalForm) {
  const [ratingEnabled, setRatingEnabled] = useState(false);
  return (
    <>
      {openModalForm && (
        <div
          onClick={() => setopenModalForm(false)}
          className="fixed inset-0 z-40 bg-black/50"
        ></div>
      )}

      <div className="fixed z-50   top-5  w-[55%] rounded-xl p-5 bg-[var(--backgroundSecondary)]">
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
        <form action="">
          <section className="flex gap-7 my-10">
            <div className="flex flex-col w-[50%] gap-1.5 text-[var(--textTitles)]">
              <label htmlFor="titulo">Nome do formulario</label>
              <input
                className="bg-[var(--GrayEdges)] border-2 border-[var(--borders)] p-3 text-neutral-400 focus:outline-none focus:border-l-[var(--greenSpan)] focus:shadow-[0_0_1px_var(--greenSpan)] transition-colors duration-300 "
                type="text"
                placeholder="Ex: Pesquisa de Clima..."
              />
            </div>
            <div className="flex flex-col w-[50%] gap-1.5 text-[var(--textTitles)]">
              <label htmlFor="Descrição">Descrição</label>
              <textarea
                className="bg-[var(--GrayEdges)] border-2 border-[var(--borders)] p-4 text-neutral-400 focus:outline-none focus:border-l-[var(--greenSpan)] focus:shadow-[0_0_1px_var(--greenSpan)] transition-colors duration-300"
                placeholder="Descreva o objetivo deste formulário... (opcional)"
              ></textarea>
            </div>
          </section>
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
            <button className="bg-[var(--greenSpan)] text-black font-bold text-[14px] p-2 w-full font-inter md:w-40 md:h-10 md:self-end cursor-pointer rounded-sm hover:scale-[1.02] hover:shadow-[0_0_15px_var(--greenSpan)] transition-all duration-200">
              Criar formulário
            </button>
          </footer>
        </form>
      </div>
    </>
  );
}
