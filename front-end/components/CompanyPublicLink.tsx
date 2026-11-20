"use client";

import { Check, Copy, Link2 } from "lucide-react";
import { useState } from "react";

export function CompanyPublicLink({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const link = `${process.env.NEXT_PUBLIC_APP_URL}/feedbacks/public/${slug}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // A API de clipboard pode falhar dependendo das permissões do navegador.
    }
  }

  return (
    <div
      className="
        flex flex-col gap-4
        rounded-xl
        border border-[var(--borders)]
        bg-[var(--backgroundSecondary)]
        p-4
        sm:flex-row sm:items-center
        
      "
    >
      {/* TÍTULO */}

      <div className="flex items-center gap-2 sm:hidden">
        <Link2 size={19} className="shrink-0 text-[var(--greenSpan)]" />

        <strong className="text-sm font-semibold text-[var(--textTitles)]">
          Link público da empresa
        </strong>
      </div>

      <div className="hidden items-center gap-2 sm:flex sm:w-full sm:flex-col sm:items-start sm:gap-4">
        <div className="flex items-center gap-2">
          <Link2 size={19} className="text-[var(--greenSpan)]" />

          <strong className="text-sm font-semibold text-[var(--textTitles)]">
            Link público da empresa
          </strong>
        </div>

        <div className="flex w-full items-center gap-4">
          {/* LINK */}

          <div
            className="
              min-w-0 flex-1 truncate
              rounded-xl
              border border-[var(--borders)]
              bg-[var(--foreground)]
              px-3 py-2.5
              text-xs text-[var(--textSecondary)]
            "
            title={link}
          >
            {link}
          </div>

          {/* COPIAR */}

          <button
            type="button"
            onClick={handleCopy}
            className="
              flex shrink-0 cursor-pointer items-center
              justify-center gap-2
              rounded-full
              bg-[var(--greenSpan2)]
              px-5 py-2.5
              text-xs font-bold
              text-[var(--greenSpan)]
              shadow-sm
              transition-all duration-200
              hover:brightness-95 hover:shadow-md
              active:scale-95
            "
          >
            {copied ? (
              <>
                <Check size={15} />
                Copiado!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copiar link
              </>
            )}
          </button>
        </div>
      </div>

      {/* VERSÃO MOBILE */}

      <div className="flex w-full items-center gap-2 sm:hidden">
        <div
          className="
            min-w-0 flex-1 truncate
            rounded-xl
            border border-[var(--borders)]
            bg-[var(--foreground)]
            px-3 py-2.5
            text-xs text-[var(--textSecondary)]
          "
          title={link}
        >
          {link}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar link público"
          className="
            flex h-10 w-10 shrink-0 cursor-pointer
            items-center justify-center
            rounded-full
            bg-[var(--greenSpan2)]
            text-[var(--greenSpan)]
            transition-all
            hover:brightness-95
            active:scale-95
          "
        >
          {copied ? <Check size={17} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}
