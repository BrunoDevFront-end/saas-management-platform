interface RegisterCompanies {
  name: string;
  email: string;
  segment: string;
  password: string;
}

export async function registerCompany(data: RegisterCompanies) {
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
    throw new Error(result.error);
  }

  return result;
}
