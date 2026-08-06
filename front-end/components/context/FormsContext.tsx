"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { toast } from "sonner";

import {
  Form,
  getForms,
  deleteForm as deleteFormApi,
  toggleForm as toggleFormApi,
} from "../request";

interface FormsContextType {
  forms: Form[];
  loading: boolean;
  error: string | null;

  createForm: (newForm: Form) => void;
  deleteForm: (id: string) => Promise<void>;
  deleteFeedback: (formId: string) => void;
  toggleForm: (id: string) => Promise<void>;
  fetchForms: () => Promise<void>;
}

interface FormsProviderProps {
  children: React.ReactNode;
}

const FormsContext = createContext<FormsContextType | null>(null);

export function FormsProvider({ children }: FormsProviderProps) {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForms = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getForms();

      setForms(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao buscar formulários.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchForms();
  }, [fetchForms]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  function createForm(newForm: Form) {
    setForms((prev) => [newForm, ...prev]);
  }

  function deleteFeedback(formId: string) {
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
  }

  async function toggleForm(id: string) {
    try {
      const updatedForm = await toggleFormApi(id);

      setForms((prev) =>
        prev.map((form) =>
          form.id === id ? { ...form, isActive: updatedForm.isActive } : form,
        ),
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Não foi possível alterar o status do formulário.");
      }
    }
  }

  async function deleteForm(id: string) {
    try {
      await deleteFormApi(id);

      setForms((prev) => prev.filter((form) => form.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Não foi possível deletar esse formulário.");
      }
    }
  }

  return (
    <FormsContext.Provider
      value={{
        forms,
        loading,
        error,
        createForm,
        deleteForm,
        deleteFeedback,
        toggleForm,
        fetchForms,
      }}
    >
      {children}
    </FormsContext.Provider>
  );
}

export function useForms() {
  const context = useContext(FormsContext);

  if (!context) {
    throw new Error("useForms precisa estar dentro de FormsProvider");
  }

  return context;
}
