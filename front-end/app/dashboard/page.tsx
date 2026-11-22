"use client";

import {
  Form,
  getStoredCompany,
  Company,
  CompanyStats,
  getCompanyStats,
  analyzeCompanyFeedbacks,
  FeedbackAnalysis,
} from "@/components/request";

import React, { useEffect, useState } from "react";

import FeedbackFormItem from "@/components/feedbackFormItem";
import CreateFormModal from "@/components/CreateFormModal";
import { CompanyPublicLink } from "@/components/CompanyPublicLink";
import FeedbackDetailsModal from "@/components/FeedbackDetailsModal";

import { useRouter } from "next/navigation";

import AnyMascot from "@/components/any";
import DialogMascot from "@/components/DialogMascot";

import { useForms } from "@/components/context/FormsContext";
import { useAuthenticated } from "@/components/context/Authenticated";

import FormsSkeleton from "@/components/FornsSkeleton";

import {
  House,
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  FileText,
  ShieldCheck,
  ArrowRight,
  Plus,
  LogOut,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";

export default function Page() {
  // ESTADOS

  const [openModalForm, setopenModalForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  const [company] = useState<Company | null>(() => getStoredCompany());
  const [stats, setStats] = useState<CompanyStats | null>(null);

  const [analysis, setAnalysis] = useState<FeedbackAnalysis | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const router = useRouter();

  const { isAuthenticated, logout } = useAuthenticated();

  const { forms, loading, createForm, deleteForm, deleteFeedback, toggleForm } =
    useForms();

  // AUTENTICAÇÃO

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    function checkAuthentication() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/");
      }
    }

    checkAuthentication();

    window.addEventListener("pageshow", checkAuthentication);

    return () => {
      window.removeEventListener("pageshow", checkAuthentication);
    };
  }, [router]);

  // ESTATÍSTICAS

  useEffect(() => {
    if (isAuthenticated !== true) return;

    async function loadStats() {
      try {
        const data = await getCompanyStats();
        setStats(data);
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      }
    }

    loadStats();
  }, [isAuthenticated]);

  // ANÁLISE INTELIGENTE

  async function handleAnalyzeFeedbacks() {
    try {
      setAnalysisLoading(true);
      setAnalysisError(null);

      const result = await analyzeCompanyFeedbacks();

      setAnalysis(result);
    } catch (error) {
      console.error("Erro ao analisar feedbacks:", error);

      setAnalysisError(
        error instanceof Error
          ? error.message
          : "Não foi possível realizar a análise.",
      );
    } finally {
      setAnalysisLoading(false);
    }
  }

  // CONTROLE DOS FORMULÁRIOS

  async function handleFormDeleted(deleteId: string) {
    await deleteForm(deleteId);
  }

  function handleFormCreated(newForm: Form) {
    createForm(newForm);
  }

  const handleFeedbackDeleted = (formId: string) => {
    deleteFeedback(formId);

    setStats((prev) =>
      prev
        ? {
            ...prev,
            totalFeedbacks: prev.totalFeedbacks - 1,
          }
        : prev,
    );
  };

  const handleToggle = async (id: string) => {
    await toggleForm(id);
  };

  // CONTROLE DOS MODAIS

  useEffect(() => {
    document.body.style.overflow =
      openModalForm || selectedForm !== null ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModalForm, selectedForm]);

  // DADOS DERIVADOS

  const activeFormsCount = forms.filter((form) => form.isActive).length;

  const companyInitial = company?.name?.charAt(0).toUpperCase() ?? "E";

  const sentimentTotal = analysis
    ? analysis.sentiment.positive +
      analysis.sentiment.negative +
      analysis.sentiment.neutral
    : 0;

  const getSentimentPercentage = (value: number) =>
    sentimentTotal > 0 ? (value / sentimentTotal) * 100 : 0;

  // AUTENTICAÇÃO - CARREGAMENTO

  if (isAuthenticated === null) {
    return null;
  }

  // AUTENTICAÇÃO - ACESSO RESTRITO

  if (isAuthenticated === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[var(--borders)] bg-[var(--foreground)] p-8 text-center shadow-sm">
          <div className="mb-5 text-4xl text-[var(--greenSpan)]">◆</div>

          <h2 className="font-inter text-xl font-bold text-[var(--textTitles)]">
            Acesso restrito
          </h2>

          <p className="mt-3 text-sm leading-6 text-[var(--textSecondary)]">
            Você precisa estar logado para acessar o dashboard.
          </p>

          <button
            onClick={() => router.replace("/login")}
            className="mt-6 w-full cursor-pointer rounded-xl bg-[var(--greenSpan)] p-3 font-bold text-white transition hover:opacity-90"
          >
            Fazer login
          </button>
        </div>
      </div>
    );
  }

  // SAIR DA CONTA

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  // DASHBOARD

  return (
    <div className="min-h-screen bg-[var(--background)] font-syne text-[var(--textTitles)]">
      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-[var(--borders)] bg-[var(--background)]/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          {/* LOGO */}

          <a
            href="/dashboard"
            className="shrink-0 text-2xl font-extrabold tracking-tight text-[var(--greenSpan)]"
          >
            anom<span className="text-[var(--greenSpan2)]">.</span>
          </a>

          {/* NAVEGAÇÃO */}

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#inicio"
              className="flex h-[76px] items-center gap-2 border-b-2 border-[var(--greenSpan2)] px-2 text-sm font-bold text-[var(--greenSpan)]"
            >
              <LayoutDashboard size={17} />
              Dashboard
            </a>

            <a
              href="#formularios"
              className="flex h-[76px] items-center gap-2 border-b-2 border-transparent px-2 text-sm text-[var(--textSecondary)] transition hover:text-[var(--greenSpan)]"
            >
              <ClipboardList size={17} />
              Formulários
            </a>

            <a
              href="#formularios"
              className="flex h-[76px] items-center gap-2 border-b-2 border-transparent px-2 text-sm text-[var(--textSecondary)] transition hover:text-[var(--greenSpan)]"
            >
              <MessageSquare size={17} />
              Feedbacks
            </a>
          </nav>

          {/* EMPRESA E LOGOUT */}

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--greenSpan)] text-sm font-bold text-white">
              {companyInitial}
            </div>

            <div className="hidden flex-col sm:flex">
              <span className="max-w-[130px] truncate text-sm font-bold text-[var(--textTitles)]">
                {company?.name ?? "Empresa"}
              </span>

              <span className="text-xs text-[var(--textSecondary)]">
                Minha empresa
              </span>
            </div>

            <button
              onClick={handleLogout}
              aria-label="Sair da conta"
              title="Sair da conta"
              className="ml-2 rounded-full p-2 text-[var(--textSecondary)] transition hover:bg-[var(--greenLeve)] hover:text-[var(--greenSpan)]"
            >
              <LogOut size={19} />
            </button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}

      <main
        id="inicio"
        className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10"
      >
        {/* SAUDAÇÃO */}

        <section className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--textTitles)] sm:text-3xl">
              Olá, {company?.name ?? "Empresa"}! 👋
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--textSecondary)] sm:text-base">
              Aqui você acompanha os formulários da sua empresa e recebe os
              feedbacks da sua equipe.
            </p>
          </div>

          {/* LINK PÚBLICO */}

          {company && <CompanyPublicLink slug={company.slug} />}
        </section>

        {/* GRID PRINCIPAL */}

        <div className="grid grid-cols-1 items-start gap-7 xl:grid-cols-[minmax(0,1fr)_300px]">
          {/* COLUNA PRINCIPAL */}

          <div className="min-w-0">
            {/* ESTATÍSTICAS */}

            <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* FORMULÁRIOS ATIVOS */}

              <article className="rounded-2xl border border-[var(--borders)] bg-[var(--foreground)]/60 p-5 transition hover:shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--greenLeve)] text-[var(--greenSpan)]">
                  <FileText size={21} />
                </div>

                {loading ? (
                  <div className="h-9 w-12 animate-pulse rounded-lg bg-[var(--greenLeve2)]" />
                ) : (
                  <strong className="text-3xl font-bold text-[var(--greenSpan)]">
                    {activeFormsCount}
                  </strong>
                )}

                <p className="mt-1 text-sm text-[var(--textSecondary)]">
                  Formulários ativos
                </p>
              </article>

              {/* FEEDBACKS RECEBIDOS */}

              <article className="rounded-2xl border border-[var(--borders)] bg-[var(--foreground)]/60 p-5 transition hover:shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--greenLeve)] text-[var(--greenSpan)]">
                  <MessageSquare size={21} />
                </div>

                {stats === null ? (
                  <div className="h-9 w-12 animate-pulse rounded-lg bg-[var(--greenLeve2)]" />
                ) : (
                  <strong className="text-3xl font-bold text-[var(--greenSpan)]">
                    {stats.totalFeedbacks}
                  </strong>
                )}

                <p className="mt-1 text-sm text-[var(--textSecondary)]">
                  Feedbacks recebidos
                </p>

                {stats && (
                  <p className="mt-2 text-xs font-semibold text-[var(--greenSpan)]">
                    +{stats.feedbacksLast7Days} nos últimos 7 dias
                  </p>
                )}
              </article>

              {/* ANONIMATO */}

              <article className="rounded-2xl border border-[var(--borders)] bg-[var(--foreground)]/60 p-5 transition hover:shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--greenLeve)] text-[var(--greenSpan)]">
                  <ShieldCheck size={21} />
                </div>

                <strong className="text-3xl font-bold text-[var(--greenSpan)]">
                  100%
                </strong>

                <p className="mt-1 text-sm text-[var(--textSecondary)]">
                  Anônimo
                </p>
              </article>
            </section>

            <section className="mb-10 overflow-hidden rounded-2xl border border-[var(--borders)] bg-[var(--foreground)]">
              <div className="flex flex-col justify-between gap-5 border-b border-[var(--borders)] p-5 sm:flex-row sm:items-center sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--greenLeve)] text-[var(--greenSpan)]">
                    <Sparkles size={22} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-[var(--textTitles)] sm:text-xl">
                      Análise inteligente
                    </h2>
                    <p className="mt-1 max-w-lg text-sm leading-relaxed text-[var(--textSecondary)]">
                      Descubra padrões, identifique problemas e encontre
                      oportunidades de melhoria nos feedbacks da sua equipe.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleAnalyzeFeedbacks}
                  disabled={
                    analysisLoading || !stats || stats.totalFeedbacks === 0
                  }
                  className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--greenSpan)] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Sparkles size={17} />
                  {analysisLoading
                    ? "Analisando..."
                    : analysis
                      ? "Atualizar análise"
                      : "Gerar análise"}
                </button>
              </div>

              <div className="p-5 sm:p-6">
                {analysisLoading ? (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-[var(--greenLeve)]" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-40 animate-pulse rounded bg-[var(--greenLeve2)]" />
                        <div className="h-3 w-full max-w-sm animate-pulse rounded bg-[var(--greenLeve2)]" />
                      </div>
                    </div>
                    <div className="h-24 animate-pulse rounded-xl bg-[var(--greenLeve)]/50" />
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="h-24 animate-pulse rounded-xl bg-[var(--greenLeve)]/50" />
                      <div className="h-24 animate-pulse rounded-xl bg-[var(--greenLeve)]/50" />
                      <div className="h-24 animate-pulse rounded-xl bg-[var(--greenLeve)]/50" />
                    </div>
                  </div>
                ) : analysisError ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                    <h3 className="font-bold text-red-700">
                      Não foi possível gerar a análise
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-red-600">
                      {analysisError}
                    </p>
                    <button
                      onClick={handleAnalyzeFeedbacks}
                      className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      Tentar novamente
                    </button>
                  </div>
                ) : analysis ? (
                  <div className="space-y-7">
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <Sparkles
                          size={17}
                          className="text-[var(--greenSpan)]"
                        />
                        <h3 className="font-bold text-[var(--textTitles)]">
                          Visão geral
                        </h3>
                      </div>
                      <p className="rounded-xl bg-[var(--backgroundSecondary)] p-4 text-sm leading-7 text-[var(--textSecondary)]">
                        {analysis.summary}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-4 font-bold text-[var(--textTitles)]">
                        Percepção dos colaboradores
                      </h3>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-[var(--borders)] p-4">
                          <p className="text-sm text-[var(--textSecondary)]">
                            Positivos
                          </p>
                          <strong className="mt-2 block text-3xl font-bold text-[var(--greenSpan)]">
                            {analysis.sentiment.positive}
                          </strong>
                          <p className="mt-1 text-xs text-[var(--textSecondary)]">
                            {getSentimentPercentage(
                              analysis.sentiment.positive,
                            ).toFixed(0)}
                            % dos feedbacks
                          </p>
                        </div>

                        <div className="rounded-xl border border-[var(--borders)] p-4">
                          <p className="text-sm text-[var(--textSecondary)]">
                            Negativos
                          </p>
                          <strong className="mt-2 block text-3xl font-bold text-red-500">
                            {analysis.sentiment.negative}
                          </strong>
                          <p className="mt-1 text-xs text-[var(--textSecondary)]">
                            {getSentimentPercentage(
                              analysis.sentiment.negative,
                            ).toFixed(0)}
                            % dos feedbacks
                          </p>
                        </div>

                        <div className="rounded-xl border border-[var(--borders)] p-4">
                          <p className="text-sm text-[var(--textSecondary)]">
                            Neutros
                          </p>
                          <strong className="mt-2 block text-3xl font-bold text-[var(--textSecondary)]">
                            {analysis.sentiment.neutral}
                          </strong>
                          <p className="mt-1 text-xs text-[var(--textSecondary)]">
                            {getSentimentPercentage(
                              analysis.sentiment.neutral,
                            ).toFixed(0)}
                            % dos feedbacks
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-[var(--greenLeve2)]">
                        <div
                          className="bg-[var(--greenSpan)] transition-all"
                          style={{
                            width: `${getSentimentPercentage(analysis.sentiment.positive)}%`,
                          }}
                        />
                        <div
                          className="bg-red-400 transition-all"
                          style={{
                            width: `${getSentimentPercentage(analysis.sentiment.negative)}%`,
                          }}
                        />
                        <div
                          className="bg-gray-400 transition-all"
                          style={{
                            width: `${getSentimentPercentage(analysis.sentiment.neutral)}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 font-bold text-[var(--textTitles)]">
                        Principais categorias
                      </h3>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {analysis.categories.map((category, index) => (
                          <article
                            key={`${category.name}-${index}`}
                            className="rounded-xl border border-[var(--borders)] p-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <h4 className="text-sm font-bold text-[var(--textTitles)]">
                                {category.name}
                              </h4>
                              <span className="shrink-0 rounded-lg bg-[var(--greenLeve)] px-2.5 py-1 text-xs font-bold text-[var(--greenSpan)]">
                                {category.count}{" "}
                                {category.count === 1 ? "menção" : "menções"}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--textSecondary)]">
                              {category.description}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 font-bold text-[var(--textTitles)]">
                        Problemas recorrentes
                      </h3>

                      {analysis.recurringProblems.length > 0 ? (
                        <div className="space-y-2">
                          {analysis.recurringProblems.map((problem, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 rounded-xl border border-[var(--borders)] p-4"
                            >
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                              <p className="text-sm leading-relaxed text-[var(--textSecondary)]">
                                {problem}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="rounded-xl bg-[var(--backgroundSecondary)] p-4 text-sm text-[var(--textSecondary)]">
                          Nenhum problema recorrente foi identificado.
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="mb-4 font-bold text-[var(--textTitles)]">
                        Sugestões de melhoria
                      </h3>

                      <div className="space-y-3">
                        {analysis.suggestions.map((suggestion, index) => (
                          <article
                            key={index}
                            className="rounded-xl border border-[var(--borders)] p-4"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="font-bold text-[var(--textTitles)]">
                                {suggestion.title}
                              </h4>

                              <span
                                className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                                  suggestion.priority === "high"
                                    ? "bg-red-50 text-red-600"
                                    : suggestion.priority === "medium"
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-[var(--greenLeve)] text-[var(--greenSpan)]"
                                }`}
                              >
                                {suggestion.priority === "high"
                                  ? "Alta prioridade"
                                  : suggestion.priority === "medium"
                                    ? "Média prioridade"
                                    : "Baixa prioridade"}
                              </span>
                            </div>

                            <p className="mt-2 text-sm leading-relaxed text-[var(--textSecondary)]">
                              {suggestion.description}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center px-4 py-10 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--greenLeve)] text-[var(--greenSpan)]">
                      <Sparkles size={26} />
                    </div>

                    <h3 className="font-bold text-[var(--textTitles)]">
                      Descubra o que sua equipe está dizendo
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--textSecondary)]">
                      Gere uma análise inteligente para identificar sentimentos,
                      problemas recorrentes e oportunidades de melhoria nos
                      feedbacks recebidos.
                    </p>

                    {stats?.totalFeedbacks === 0 && (
                      <p className="mt-4 text-xs text-[var(--textSecondary)]">
                        Você precisa receber feedbacks antes de gerar uma
                        análise.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* FORMULÁRIOS */}

            <section id="formularios" className="scroll-mt-24">
              {/* TÍTULO E BOTÃO */}

              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold text-[var(--textTitles)] sm:text-2xl">
                    Seus formulários
                  </h2>

                  <p className="mt-1 text-sm text-[var(--textSecondary)]">
                    Gerencie seus formulários e acompanhe os resultados.
                  </p>
                </div>

                <button
                  onClick={() => setopenModalForm(true)}
                  className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--greenSpan2)] px-5 py-3 text-sm font-bold text-[var(--greenSpan)] shadow-sm transition duration-300 hover:brightness-95 sm:w-auto"
                >
                  <Plus size={18} />
                  Novo formulário
                </button>
              </div>

              {/* LISTA DE FORMULÁRIOS */}

              {loading ? (
                <FormsSkeleton />
              ) : (
                <ul className="flex w-full flex-col gap-3">
                  {forms.map((form) => (
                    <FeedbackFormItem
                      key={form.id}
                      form={form}
                      handleFormDeleted={handleFormDeleted}
                      handleToggle={handleToggle}
                      setSelectedForm={setSelectedForm}
                    />
                  ))}
                </ul>
              )}

              {/* ESTADO VAZIO */}

              {!loading && forms.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--borders)] bg-[var(--foreground)]/50 px-6 py-12 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--greenLeve)] text-[var(--greenSpan)]">
                    <ClipboardList size={25} />
                  </div>

                  <h3 className="font-bold text-[var(--textTitles)]">
                    Nenhum formulário criado
                  </h3>

                  <p className="mt-2 max-w-sm text-sm text-[var(--textSecondary)]">
                    Comece criando seu primeiro formulário e dê voz à sua
                    equipe.
                  </p>

                  <button
                    onClick={() => setopenModalForm(true)}
                    className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--greenSpan)] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
                  >
                    <Plus size={17} />
                    Criar primeiro formulário
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* COLUNA LATERAL */}

          <aside className="flex flex-col gap-5">
            {/* CARD DE DESTAQUE */}

            <section className="relative overflow-hidden rounded-2xl border border-[var(--borders)] bg-[var(--backgroundSecondary)] p-5">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--greenLeve2)] opacity-60 blur-xl" />

              <div className="relative">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--greenLeve)] text-[var(--greenSpan)]">
                  <Sparkles size={22} />
                </div>

                <h3 className="text-lg font-bold text-[var(--greenSpan)]">
                  Sua equipe tem voz!
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[var(--textSecondary)]">
                  Um ambiente de escuta permite identificar oportunidades de
                  melhoria e construir equipes mais fortes.
                </p>
              </div>
            </section>

            {/* CARD DE ANONIMATO */}

            <section className="rounded-2xl border border-[var(--borders)] bg-[var(--foreground)]/60 p-5">
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck size={20} className="text-[var(--greenSpan)]" />

                <h3 className="text-sm font-bold text-[var(--textTitles)]">
                  Privacidade em primeiro lugar
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-[var(--textSecondary)]">
                Os formulários foram pensados para proporcionar um espaço seguro
                de comunicação e feedback.
              </p>

              <div className="mt-4 flex items-center gap-2 border-t border-[var(--borders)] pt-4 text-xs font-semibold text-[var(--greenSpan)]">
                <ShieldCheck size={16} />
                Feedbacks anônimos
              </div>
            </section>

            {/* CARD DE AÇÃO */}

            <section className="rounded-2xl border border-[var(--borders)] bg-[var(--foreground)]/60 p-5">
              <h3 className="font-bold text-[var(--textTitles)]">
                Precisa de um novo formulário?
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[var(--textSecondary)]">
                Crie novos canais de comunicação para conhecer melhor sua
                equipe.
              </p>

              <button
                onClick={() => setopenModalForm(true)}
                className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-xl bg-[var(--greenSpan)] px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                Criar formulário
                <ArrowRight size={17} />
              </button>
            </section>
          </aside>
        </div>
      </main>

      {/* MODAL DE DETALHES DO FEEDBACK */}

      {selectedForm && (
        <FeedbackDetailsModal
          form={selectedForm}
          onClose={() => setSelectedForm(null)}
          onFeedbackDeleted={handleFeedbackDeleted}
        />
      )}

      {/* MODAL DE CRIAÇÃO */}

      {openModalForm && (
        <CreateFormModal
          setopenModalForm={setopenModalForm}
          onFormCreated={handleFormCreated}
        />
      )}

      {/* MASCOTE */}

      <AnyMascot
        className="
          !fixed
          bottom-5
          right-5
          z-50
          !w-14
          sm:!w-16
          lg:!w-16
        "
      />

      <DialogMascot
        message={
          <>
            <span className="font-bold text-[var(--greenSpan)]">
              👋 Olá! Seja bem-vindo!
            </span>
            <br />
            <br />
            Aqui você acompanha os feedbacks enviados pela sua equipe.
            <br />
            <br />
            🔗 Para seus funcionários acessarem os formulários, compartilhe o
            link público disponível no topo da página.
          </>
        }
      />
    </div>
  );
}
