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
