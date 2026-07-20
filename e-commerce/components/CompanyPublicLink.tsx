"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CompanyPublicLink({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const link = `${process.env.NEXT_PUBLIC_APP_URL}/feedbacks/public/${slug}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Erro ao copiar link:", error);
    }
  }

  return (
    <div className="flex items-center gap-3 border-1 border-[#c8f55a] p-3 mx-4 xl:mx-15">
      <span className="flex-1 truncate text-sm text-[#f5f5f0]">{link}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-2 border-2 border-[#c8f55a] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#c8f55a] hover:bg-[#c8f55a] hover:text-black transition-colors"
      >
        {copied ? (
          <>
            <Check size={14} /> copiado!
          </>
        ) : (
          <>
            <Copy size={14} /> copiar link
          </>
        )}
      </button>
    </div>
  );
}
