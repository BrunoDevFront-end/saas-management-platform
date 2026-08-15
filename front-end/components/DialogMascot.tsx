"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface DialogProps {
  message: ReactNode;
}

export default function DialogMascot({ message }: DialogProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 17000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="
        hidden
    sm:block
    sm:fixed
    bottom-6
    right-20
    z-[50]
    w-[420px]

    animate-[fadeInOut_8s_ease-in-out_forwards]
      "
    >
      {/* BALÃO */}
      <div className="relative ">
        {/* SVG */}
        <svg
          viewBox="0 0 1239 741"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Corpo */}
          <rect
            x="20"
            y="20"
            width="1041"
            height="701"
            rx="86"
            ry="86"
            fill="#131313"
            stroke="#C4E158"
            strokeWidth="20"
          />

          {/* Bico */}
          <path
            d="M1058 425 L1218 487 Q1239 495 1218 507 L1058 575 Z"
            fill="#131313"
            stroke="#C4E158"
            strokeWidth="20"
            strokeLinejoin="round"
          />

          {/* Decorações topo esquerdo */}
          <path
            d="M51 71 L72 51"
            fill="none"
            stroke="#C4E158"
            strokeWidth="8"
          />

          <path
            d="M85 71 L106 51"
            fill="none"
            stroke="#C4E158"
            strokeWidth="8"
          />

          <path
            d="M119 71 L140 51"
            fill="none"
            stroke="#C4E158"
            strokeWidth="8"
          />

          {/* Decoração topo direito */}
          <path d="M770 61 H991" fill="none" stroke="#C4E158" strokeWidth="4" />

          <path
            d="M1016 181 V85"
            fill="none"
            stroke="#C4E158"
            strokeWidth="4"
          />

          <path
            d="M991 36 Q1016 36 1016 61"
            fill="none"
            stroke="#C4E158"
            strokeWidth="4"
          />

          {/* Decoração esquerda */}
          <path d="M66 470 V493" fill="none" stroke="#C4E158" strokeWidth="4" />

          <path d="M66 504 V527" fill="none" stroke="#C4E158" strokeWidth="4" />

          <path d="M66 538 V561" fill="none" stroke="#C4E158" strokeWidth="4" />

          <path d="M66 572 V595" fill="none" stroke="#C4E158" strokeWidth="4" />

          <path d="M66 606 V629" fill="none" stroke="#C4E158" strokeWidth="4" />

          {/* Canto inferior esquerdo */}
          <path
            d="M66 665 Q41 665 41 640"
            fill="none"
            stroke="#C4E158"
            strokeWidth="4"
          />

          <path d="M90 666 H196" fill="none" stroke="#C4E158" strokeWidth="4" />

          {/* Bolinha */}
          <circle cx="1015" cy="675" r="10.5" fill="#C4E158" />
        </svg>

        {/* CONTEÚDO */}
        <div
          className="
            relative
            pr-12
            py-10
            flex
            items-center
            justify-center
           
          "
        >
          <p
            className="
              w-full
              max-w-[290px]
              text-start
              text-base
              leading-relaxed
              text-white
              font-inter
              
              
            "
          >
            {message}
          </p>
        </div>

        {/* BOTÃO X */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="
            absolute
            right-24
            top-7
            z-20
            text-[#C4E158]
            text-5xl
            leading-none
            cursor-pointer
          "
          aria-label="Fechar"
        >
          ×
        </button>
      </div>
    </div>
  );
}
