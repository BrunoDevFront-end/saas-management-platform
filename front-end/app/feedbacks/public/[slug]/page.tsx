"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { GetPublicCompanyForms } from "../../../../components/request";

interface Form {
  id: string;
  title: string;
  description: string | null;
}

interface CompanyData {
  name: string;
  forms: Form[];
}

export default function CompanyFormsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchCompany() {
      try {
        const data = await GetPublicCompanyForms(slug);
        setCompany(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Não foi possível carregar os formulários");
        }
      }
    }
    fetchCompany();
  }, [slug]);

  if (errorMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
        <p className="text-sm text-[var(--textPlaceholder)]">{errorMessage}</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
        <p className="text-sm text-[var(--textPlaceholder)]">Carregando...</p>
      </div>
    );
  }

  const initial = company.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-10 font-syne md:py-16">
      <div className="mx-auto max-w-[95%] sm:max-w-4/5 md:grid md:max-w-3/4 md:grid-cols-[45%_1fr] md:min-h-[550px] md:gap-12 min-[2000px]:max-w-3/5">
        <aside className="flex flex-col justify-between mb-8 md:mb-0 md:h-full">
          <div className="flex items-center gap-2.5 mb-7">
            <span className="flex h-9 w-9 items-center justify-center bg-[var(--greenSpan)] text-base font-bold text-black">
              {initial}
            </span>
            <span className="text-base font-bold tracking-wide text-[var(--textTitles)]">
              {company.name}
            </span>
          </div>
          <div>
            <h1 className="mb-3 text-[20px] font-bold leading-tight text-[var(--textTitles)] sm:text-[28px] md:text-[35px]">
              Formulários disponíveis
            </h1>
            <p className="mb-5 text-sm leading-relaxed text-[var(--textPlaceholder)] md:mb-40">
              Escolha uma pesquisa abaixo para responder. Suas respostas são
              100% anônimas.
            </p>
          </div>

          <div className="border-2 border-[var(--greenSpan)] bg-[#141a0d] p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Lock size={13} className="text-[var(--greenSpan)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--greenSpan)]">
                100% anônimo
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--textPlaceholder)]">
              nenhum dado pessoal, ip ou identificador é coletado. impossível
              rastrear até você.
            </p>
          </div>
        </aside>

        <div className="border-2 border-[var(--GrayEdges)]">
          {company.forms.length === 0 && (
            <p className="p-6 text-sm text-[var(--textPlaceholder)]">
              Nenhum formulário disponível no momento.
            </p>
          )}
          <ul className="max-h-[550px] list-none overflow-y-auto custom-scrollbar">
            {company.forms.map((form) => (
              <li key={form.id}>
                <Link
                  href={`/feedbacks/public/${slug}/${form.id}`}
                  className="flex items-center justify-between gap-5 border-b border-[var(--GrayEdges)] p-5 transition-colors last:border-b-0 hover:bg-[#141414] md:p-6"
                >
                  <div>
                    <p className="mb-1 text-base font-bold text-[var(--textTitles)] md:text-lg">
                      {form.title}
                    </p>
                    {form.description && (
                      <p className="text-xs text-[var(--textPlaceholder)] md:text-sm">
                        {form.description}
                      </p>
                    )}
                  </div>
                  <ArrowRight
                    size={20}
                    className="flex-shrink-0 text-[var(--greenSpan)]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
