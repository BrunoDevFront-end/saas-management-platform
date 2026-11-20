"use client";

import {
  Form,
  getStoredCompany,
  Company,
  CompanyStats,
  getCompanyStats,
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
