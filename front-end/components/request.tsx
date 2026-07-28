interface RegisterCompanies {
  name: string;
  email: string;
  segment: string;
  password: string;
}

interface LoginCompany {
  email: string;
  password: string;
}

interface CreateForm {
  title: string;
  description: string;
  activeRating: boolean;
}

export interface Form {
  id: string;
  title: string;
  description: string | null;
  isActive: boolean;
  activeRating: boolean;
  createdAt: string;
  _count: {
    feedbacks: number;
  };
}

export interface Feedback {
  id: string;
  content: string;
  createdAt: string;
  rating: number;
}

export interface CreateFeedback {
  slug: string;
  content: string;
  formId: string;
  rating: number | null;
}

export interface CompanyStats {
  activeForms: number;
  totalFeedbacks: number;
  feedbacksLast7Days: number;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  email: string;
}

export interface PublicForm {
  id: string;
  title: string;
  description: string | null;
  activeRating: boolean;
  company: {
    name: string;
  };
}

export type FeedbackList = Feedback[];

function getToken() {
  return localStorage.getItem("token");
}

export function getStoredCompany(): Company | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("company");

  if (!raw) return null;

  try {
    return JSON.parse(raw) as Company;
  } catch {
    return null;
  }
}

export async function GetPublicForm(formId: string): Promise<PublicForm> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/forms/public/${formId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao buscar formulário");
    }

    return result;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function GetPublicCompanyForms(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/public/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao buscar formulários da empresa");
    }

    return result;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function getForms(): Promise<Form[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function getFeddbacks(formId: string): Promise<Feedback[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/feedbacks/${formId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
}

export async function CreateFeedback({
  content,
  slug,
  formId,
  rating,
}: CreateFeedback) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/feedbacks/public/${slug}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          formId,
          rating,
        }),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao cadastrar feedback");
    }

    return result;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function deleteFeedback(feedbackId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/feedbacks/${feedbackId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function getCompanyStats(): Promise<CompanyStats> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/stats`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function registerCompany(data: RegisterCompanies) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao cadastrar empresa");
    }

    return result;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function LoginCompany(data: LoginCompany) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao realizar login");
    }

    return result;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function CreateNewForm(data: CreateForm) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao criar formulário");
    }

    return result;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function deleteForm(deleteId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/forms/${deleteId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function toggleForm(formId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/toggle`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    handleNetworkError(error);
  }
}

function handleNetworkError(error: unknown): never {
  if (error instanceof TypeError) {
    throw new Error(
      "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
    );
  }

  throw error;
}
