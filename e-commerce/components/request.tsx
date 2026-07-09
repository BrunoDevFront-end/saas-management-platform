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

export interface Form {
  id: string;
  title: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;

  _count: {
    feedbacks: number;
  };
}

export interface Feedback {
  id: string;
  content: string;
  createdAt: string;
}

export interface CompanyStats {
  activeForms: number;
  totalFeedbacks: number;
  feedbacksLast7Days: number;
}

export type FeedbackList = Feedback[];

function getToken() {
  return localStorage.getItem("token");
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

/**
 * Trata falhas de comunicação com a API.
 * Utilizado quando o servidor está indisponível,
 * ocorre timeout ou há problemas de rede.
 */
function handleNetworkError(error: unknown): never {
  if (error instanceof TypeError) {
    throw new Error(
      "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
    );
  }

  throw error;
}

/**
 * Realiza o cadastro de uma nova empresa.
 */
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

/**
 * Realiza a autenticação da empresa.
 */
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
