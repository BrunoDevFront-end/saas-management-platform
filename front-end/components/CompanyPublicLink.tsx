"use client";

import { Check, Copy } from "lucide-react";
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
    <div className="mx-4 flex items-center gap-3 border border-[#c8f55a] p-3 xl:mx-15">
      {" "}
      <span className="flex-1 truncate text-sm text-[#f5f5f0]">{link} </span>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-2 border-2 border-[#c8f55a] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#c8f55a] transition-colors hover:bg-[#c8f55a] hover:text-black"
      >
        {copied ? (
          <>
            <Check size={14} />
            copiado!
          </>
        ) : (
          <>
            <Copy size={14} />
            copiar link
          </>
        )}
      </button>
    </div>
  );
}
