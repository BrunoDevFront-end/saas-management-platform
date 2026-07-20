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
        <p className="text-[var(--textPlaceholder)] text-sm">{errorMessage}</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
        <p className="text-[var(--textPlaceholder)] text-sm">Carregando...</p>
      </div>
    );
  }

  const initial = company.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-syne px-4 py-10 md:py-16 ">
      <div className="mx-auto  max-w-[95%] md:grid md:grid-cols-[45%_1fr] sm:max-w-4/5 md:max-w-3/4 md:gap-12 md:min-h-[550px] min-[2000px]:max-w-3/5 ">
        {/* Coluna de identidade / contexto */}
        <aside className="flex flex-col justify-between  mb-8 md:mb-0 md:h-full ">
          <div className="flex items-center gap-2.5 mb-7">
            <span className="flex h-9 w-9 items-center justify-center bg-[var(--greenSpan)] text-black font-bold text-base">
              {initial}
            </span>
            <span className="text-[var(--textTitles)] font-bold text-base tracking-wide">
              {company.name}
            </span>
          </div>
          <div>
            <h1 className="text-[20px] sm:text-[28px] md:text-[35px] font-bold text-[var(--textTitles)] mb-3 leading-tight">
              Formulários disponíveis
            </h1>
            <p className="text-sm text-[var(--textPlaceholder)]  leading-relaxed mb-5 md:mb-40">
              Escolha uma pesquisa abaixo para responder. Suas respostas são
              100% anônimas.
            </p>
          </div>

          <div className="border-2 border-[var(--greenSpan)] bg-[#141a0d] p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Lock size={13} className="text-[var(--greenSpan)]" />
              <span className="text-xs uppercase tracking-widest text-[var(--greenSpan)] font-bold">
                100% anônimo
              </span>
            </div>
            <p className="text-sm text-[var(--textPlaceholder)] leading-relaxed ">
              nenhum dado pessoal, ip ou identificador é coletado. impossível
              rastrear até você.
            </p>
          </div>
        </aside>

        {/* Lista de formulários */}
        <div className="border-2 border-[var(--GrayEdges)]">
          {company.forms.length === 0 && (
            <p className="p-6 text-sm text-[var(--textPlaceholder)]">
              Nenhum formulário disponível no momento.
            </p>
          )}

          {company.forms.map((form) => (
            <Link
              key={form.id}
              href={`/feedbacks/public/${slug}/${form.id}`}
              className="flex items-center justify-between gap-5 p-5 md:p-6 border-b border-[var(--GrayEdges)] last:border-b-0 hover:bg-[#141414] transition-colors"
            >
              <div>
                <p className="text-base md:text-lg font-bold text-[var(--textTitles)] mb-1">
                  {form.title}
                </p>
                {form.description && (
                  <p className="text-xs md:text-sm text-[var(--textPlaceholder)]">
                    {form.description}
                  </p>
                )}
              </div>
              <ArrowRight
                size={20}
                className="text-[var(--greenSpan)] flex-shrink-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
