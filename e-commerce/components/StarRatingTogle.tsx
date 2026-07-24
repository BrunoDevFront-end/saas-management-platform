"use client";
import { useState } from "react";
import { Star } from "lucide-react";

export function StarRatingToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className=" items-center justify-between gap-4">
      <div className="flex justify-between">
        <div>
          <p className="text-[var(--textTitles)] text-[15px] font-medium ">
            Habilitar avaliação estrela
          </p>
          <p className="text-neutral-500 text-sm mb-3 mt-1">
            Quer habilitar avaliação de estrelas?
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onChange(!enabled)}
          className={`w-11 h-6 rounded-full cursor-pointer relative transition-colors ${
            enabled ? "bg-[#c8f55a]" : "bg-neutral-800"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="flex justify-between items-center gap-6">
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={37}
              strokeWidth={1.5}
              className={
                enabled
                  ? "stroke-[#c8f55a] fill-transparent transition-colors"
                  : "stroke-neutral-700 fill-transparent transition-colors"
              }
            />
          ))}
        </div>
      </div>
      <p className="text-[var(--textPlaceholder)] mt-2 text-sm">
        Clica no toggle pra ver a transição
      </p>
    </div>
  );
}
