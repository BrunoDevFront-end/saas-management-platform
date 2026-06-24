"use client";

import React from "react";
import { useState } from "react";
import FeedbackFormItem from "@/components/feedbackFormItem";

export default function Page() {
  const [isActive, setActive] = useState(true);

  const handleToggleStatus = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className="w-full min-h-screen ">
      <header className="border-1 border-[var(--GrayEdges)]">
        <h1 className=" m-5 ">
          <span className="text-[var(--greenSpan)]">◆</span> FeedBack{"   "}
          <span className="text-[var(--textSecondary)]">Platform</span>
        </h1>
        <div className="container-Count-icons flex justify-between m-5">
          <span className="text-black text-center text-2xl font-bold font-inter h-8 w-8 bg-[var(--greenSpan)]">
            N
          </span>
          <button className="px-4 py-1 border-1 border-[var(--GrayEdges)] font-syne-mono text-center text-[var(--textSecondary)]">
            ⟶ sair
          </button>
        </div>
      </header>
      <main className="flex flex-col items-center mx-4">
        <section className=" my-8 w-full ">
          <h2 className="text-2xl font-bold font-inter">Seus formulários</h2>
          <p className="text-sm mt-1 mb-4 text-[var(--textPlaceholder)]">
            Gerencie os canais de escuta da sua equipe e veja o que estão
            dizendo — sem filtro, sem identificação.{" "}
          </p>
          <button className="bg-[var(--greenSpan)] text-black font-bold text-[14px] p-2 w-full font-inter">
            + novo formulário
          </button>
        </section>
        <section className="flex border-1 border-[var(--GrayEdges)] my-4 w-full">
          <article className="flex flex-col justify-between w-[50%] p-4">
            <div>
              <strong className="text-[var(--greenSpan)] text-3xl ">3</strong>
              <h3 className="text-[var(--textPlaceholder)] text-xs mt-1">
                FORMULÁRIOS ATIVOS
              </h3>
            </div>
            <div>
              <strong className="text-3xl">100%</strong>
              <h3 className="text-[var(--textPlaceholder)] text-xs mt-1">
                ANÔNIMO
              </h3>
            </div>
          </article>
          <article className="flex flex-col justify-between w-[50%] border-l border-[var(--GrayEdges)] h-60 p-4">
            <div>
              <strong className="text-3xl">47</strong>
              <h3 className="text-[var(--textPlaceholder)] text-xs mt-1">
                FEEDBACKS
              </h3>
              <h3 className="text-[var(--textPlaceholder)] text-xs">
                RECEBIDOS
              </h3>
              <p className="text-sm text-[#7CAC45] mt-1">
                +12 nos últimos 7 dias
              </p>
            </div>
            <div>
              <strong className="text-3xl">real</strong>
              <h3 className="text-[var(--textPlaceholder)] text-xs mt-1">
                TIME
              </h3>
            </div>
          </article>
        </section>
        <section className="mb-4 mt-7 flex justify-between text-sm w-full gap-7 text-[var(--textPlaceholder)]  ">
          <h2>TODOS OS FORMULÁRIOS</h2>

          <div>
            <label htmlFor="order">Ordenar por:</label>
            <select id="order">
              <option>Mais recentes</option>
              <option>Mais antigos</option>
            </select>
          </div>
        </section>
        <ul className="w-full">
          <FeedbackFormItem
            handleToggleStatus={handleToggleStatus}
            isActive={isActive}
          />
        </ul>
        <button className="p-4 mb-8 w-full text-[var(--textSecondary)] border-2 border-[var(--GrayEdges)] border-dashed font-mono ">
          criar novo formulário de feedback
        </button>
      </main>
    </div>
  );
}
