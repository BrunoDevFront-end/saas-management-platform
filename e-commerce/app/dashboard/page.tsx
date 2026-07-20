"use client";

import {
  deleteForm,
  Form,
  getForms,
  getStoredCompany,
} from "@/components/request";
import React from "react";
import { useState } from "react";
import FeedbackFormItem from "@/components/feedbackFormItem";
import { useEffect } from "react";
import { toggleForm } from "@/components/request";
import { getCompanyStats, CompanyStats } from "@/components/request";
import { Company } from "@/components/request";
import CreateFormModal from "@/components/CreateFormModal";
import { CompanyPublicLink } from "@/components/CompanyPublicLink";
import FeedbackDetailsModal from "@/components/FeedbackDetailsModal";

export default function Page() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<CompanyStats | null>(null);
  const [openModalForm, setopenModalForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [erro, setErro] = useState("");
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompany(getStoredCompany());
  }, []);

  useEffect(() => {
    async function loadForms() {
      try {
        const data = await getForms();
        setForms(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadForms();
  }, []);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getCompanyStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadStats();
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      openModalForm || selectedForm !== null ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModalForm, selectedForm]);

  const handleToggle = async (id: string) => {
    try {
      const updatedForm = await toggleForm(id);

      setForms((prev) =>
        prev.map((form) =>
          form.id === id ? { ...form, isActive: updatedForm.isActive } : form,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleFeedbackDeleted = (formId: string) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId && form._count
          ? {
              ...form,
              _count: {
                ...form._count,
                feedbacks: form._count.feedbacks - 1,
              },
            }
          : form,
      ),
    );
    setStats((prev) =>
      prev
        ? {
            ...prev,
            totalFeedbacks: prev.totalFeedbacks - 1,
          }
        : prev,
    );
  };

  function handleFormCreated(newForm: Form) {
    setForms((prevForms) => [newForm, ...prevForms]);
  }
  async function handleFormDeleted(deleteId: string) {
    try {
      await deleteForm(deleteId);
      setForms((prevForms) => prevForms.filter((form) => form.id !== deleteId));
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Não foi possível deletar esse formulário!");
      }
    }
  }

  const activeFormsCount = forms.filter((form) => form.isActive).length;

  return (
    <div className="w-full min-h-screen ">
      <header className="border-1 border-[var(--GrayEdges)] md:flex md:items-center md:justify-between ">
        <h1 className=" m-5 ">
          <span className="text-[var(--greenSpan)] ">◆</span> FeedBack{"   "}
          <span className="text-[var(--textSecondary)]">Platform</span>
        </h1>
        <div className="container-Count-icons flex justify-between items-center m-5 ">
          <span className="flex items-center justify-center text-black text-2xl font-bold font-inter h-8 w-8 bg-[var(--greenSpan)] md:text-xl md:h-6 md:w-6">
            N
          </span>
          <span className="hidden md:flex mx-2 items-center text-[var(--textSecondary)] text-sm">
            empresa:
          </span>
          <strong className="hidden md:flex mr-8 items-center text-sm text-[var(--textTitles)]">
            {company?.name ?? "..."}
          </strong>

          <button className="cursor-pointer transition-colors hover:text-[var(--greenSpan)] hover:border-b-[var(--greenSpan)] px-4 py-1 border-1 border-[var(--GrayEdges)]   font-syne-mono text-center text-[var(--textSecondary)]">
            ⟶ sair
          </button>
        </div>
      </header>
      {company && (
        <div>
          <span className="mx-4 xl:mx-15 text-[var(--textPlaceholder)]">
            Link público de acesso aos formulários
          </span>
          <CompanyPublicLink slug={company.slug} />
        </div>
      )}
      <main className="flex flex-col items-center mx-4 xl:mx-15">
        <section className=" flex flex-col  my-8 w-full md:flex-row md:justify-between md:gap-7">
          <div>
            <h2 className="text-2xl font-bold font-inter text-[var(--textTitles)] xl:text-3xl">
              Seus formulários
            </h2>

            <p className="text-sm mt-1 mb-4 text-[var(--textPlaceholder)] md:mb-0">
              Gerencie os canais de escuta da sua equipe e veja o que estão
              dizendo — sem filtro, sem identificação.{" "}
            </p>
          </div>
          <button
            onClick={() => setopenModalForm(true)}
            className="bg-[var(--greenSpan)] text-black font-bold text-[14px] p-2 w-full font-inter md:w-40 md:h-10 md:self-end cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_15px_var(--greenSpan)] transition-all duration-200"
          >
            + novo formulário
          </button>
        </section>
        <section className="grid grid-cols-2 xl:grid-cols-4 border-1 border-[var(--GrayEdges)] my-4 w-full ">
          <article className="p-4">
            <strong className="text-[var(--greenSpan)] text-3xl xl:text-4xl">
              {activeFormsCount}
            </strong>
            <h3 className="text-[var(--textPlaceholder)] text-xs mt-1">
              FORMULÁRIOS ATIVOS
            </h3>
          </article>
          <article className="p-5 border-l border-[var(--GrayEdges)]">
            <strong className="text-3xl text-[var(--textTitles)] xl:text-4xl">
              {" "}
              {stats?.totalFeedbacks ?? 0}
            </strong>
            <h3 className="text-[var(--textPlaceholder)] text-xs mt-1">
              FEEDBACKS
            </h3>
            <h3 className="text-[var(--textPlaceholder)] text-xs">RECEBIDOS</h3>
            <p className="text-sm text-[#7CAC45] mt-1">
              +{stats?.feedbacksLast7Days ?? 0} nos últimos 7 dias
            </p>
          </article>
          <article className="p-5 xl:border-l border-[var(--GrayEdges)]">
            <strong className="text-3xl text-[var(--textTitles)] xl:text-4xl">
              100%
            </strong>
            <h3 className="text-[var(--textPlaceholder)] text-xs mt-1">
              ANÔNIMO
            </h3>
          </article>

          <article className="p-5 border-l border-[var(--GrayEdges)]">
            <strong className="text-3xl text-[var(--textTitles)] xl:text-4xl">
              real
            </strong>
            <h3 className="text-[var(--textPlaceholder)] text-xs mt-1">TIME</h3>
          </article>
        </section>
        <section className="mb-4 mt-7 flex justify-between text-sm w-full gap-7 text-[var(--textPlaceholder)]  ">
          <h2>TODOS OS FORMULÁRIOS</h2>

          <div>
            <label htmlFor="order">Ordenar por:</label>
            <select id="order">
              <option>Mais recentes</option>
              <option>Mais antigos</option>
            </select>
          </div>
        </section>
        <ul className="w-full">
          {forms.map((form) => (
            <FeedbackFormItem
              key={form.id}
              form={form}
              onToggle={handleToggle}
              setSelectedForm={setSelectedForm}
              onFeedbackDeleted={handleFeedbackDeleted}
              onDeleteForm={handleFormDeleted}
            />
          ))}
        </ul>

        {selectedForm && (
          <FeedbackDetailsModal
            form={selectedForm}
            onClose={() => setSelectedForm(null)}
            onFeedbackDeleted={handleFeedbackDeleted}
          />
        )}

        <button className="p-4 mb-8 mt-10 w-full text-[var(--textSecondary)] border-2 border-[var(--GrayEdges)] border-dashed font-mono ">
          criar novo formulário de feedback
        </button>
        {openModalForm && (
          <CreateFormModal
            setopenModalForm={setopenModalForm}
            onFormCreated={handleFormCreated}
          />
        )}
      </main>
    </div>
  );
}
