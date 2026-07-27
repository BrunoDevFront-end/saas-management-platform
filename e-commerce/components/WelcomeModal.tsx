"use client";

import Image from "next/image";
import { Sparkles, X } from "lucide-react";

import AnyMascot from "./any";

interface WelcomeModalProps {
  welcomeModal: boolean;
  onClose: () => void;
}

export default function WelcomeModal({
  onClose,
  welcomeModal,
}: WelcomeModalProps) {
  return (
    <>
      {" "}
      <div className="fixed inset-0 z-40 bg-black/90" />
      <dialog className="absolute inset-0 z-100 m-auto flex h-[550px] w-full max-w-3xl flex-col items-center justify-center rounded-2xl border-2 border-[var(--greenSpan)] bg-[var(--background)] sm:w-[90%] md:w-3/4">
        <header className="relative flex h-[25%] w-full justify-center sm:h-[35%]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="absolute right-6 top-4 cursor-pointer text-lime-300"
          >
            <X
              width={30}
              height={30}
              className="rounded-full border border-lime-700 p-1"
            />
          </button>

          <div className="relative flex">
            <p className="absolute left-6 top-12 z-30 max-w-52 text-center text-base text-amber-50 sm:max-w-72 sm:text-xl">
              Olá Eu sou a <span className="text-[var(--greenSpan)]">Any</span>.
              Estou aqui para te ajudar.💚
            </p>

            <Image
              src="/image/AnySpeechBubble.svg"
              alt=""
              width={350}
              height={160}
              className="w-full"
            />
          </div>
        </header>

        <div className="flex h-[75%] w-full flex-col items-center justify-center sm:h-[65%] sm:flex-row sm:items-start sm:justify-between">
          <aside className="flex w-[35%] items-center justify-center">
            <AnyMascot welcomeModal={welcomeModal} />
          </aside>

          <section className="w-[95%] text-center sm:w-[65%] sm:pt-4 sm:pr-8 sm:text-start">
            <header className="mb-2 text-4xl font-bold font-inter">
              <h1 className="bg-gradient-to-r from-[#a8dc26] via-[#d6f47c] to-white bg-clip-text text-transparent">
                Bem - vindo! <span className="text-amber-300">👋</span>
              </h1>
            </header>

            <section className="flex flex-col gap-5">
              <p className="text-[var(--textInput)]">
                Aqui no Anom, sua empresa coleta feedbacks anônimos e tramsforma
                opiniões em{" "}
                <span className="text-[var(--greenSpan)]">insights</span> que
                realmente fazem a{" "}
                <span className="text-[var(--greenSpan)]">diferença</span>.
              </p>

              <aside className="hidden rounded-xl border-2 border-[var(--borders)] p-2 sm:flex">
                <span className="flex w-[20%] items-center justify-center text-lime-500">
                  <Sparkles size={35} className="rounded-2xl border p-1" />
                </span>

                <p className="w-[80%] text-[var(--textInput)]">
                  Vamos juntos construir uma cultura mais{" "}
                  <span className="text-[var(--greenSpan)]">aberta</span> e{" "}
                  <span className="text-[var(--greenSpan)]">transparente</span>?
                </p>
              </aside>

              <footer>
                <button
                  type="button"
                  onClick={onClose}
                  className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-[#b9fa17] via-[#cff854] to-[#b9fa17] px-6 py-3 font-bold"
                >
                  <span className="absolute left-[-30%] top-[-50%] h-[200%] w-10 rotate-12 bg-white/50 blur-sm transition-all duration-600 group-hover:left-[120%]" />

                  <span className="relative z-10">Continuar navegando</span>
                </button>
              </footer>
            </section>
          </section>
        </div>
      </dialog>
    </>
  );
}
