"use client";

import { useState } from "react";

import TextAnimate from "@/components/TextAnimate";
import AnyMascot from "@/components/any";
import DialogMascot from "@/components/DialogMascot";
import { LoginCompany } from "@/components/request";
import { useAuthenticated } from "@/components/context/Authenticated";

import {
  House,
  ShieldCheck,
  Smile,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login, logout } = useAuthenticated();

  // LOGIN

  const handleSubmit = async () => {
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailFormatado = email.trim().toLowerCase();

    if (!emailRegex.test(emailFormatado)) {
      setErrorMessage("Digite um e-mail válido");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Senha é obrigatória");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("A senha precisa ter no mínimo 8 caracteres");
      return;
    }

    setLoading(true);

    try {
      logout();

      const result = await LoginCompany({
        email: emailFormatado,
        password,
      });

      localStorage.setItem("token", result.token);
      localStorage.setItem("company", JSON.stringify(result.company));

      login();

      setTimeout(() => {
        toast.success("Login efetuado com sucesso!");
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocorreu um erro inesperado");
      }

      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh bg-[var(--background)] px-3 pt-3 font-syne text-[var(--textTitles)] sm:px-5 sm:pt-4 lg:h-dvh lg:overflow-hidden lg:px-7 lg:pt-5">
      {/* HEADER */}

      <header className="mx-auto flex h-[65px] w-full max-w-[1440px] shrink-0 items-center justify-between border-b border-[var(--borders)] px-5 sm:px-8">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-[var(--greenSpan)]"
        >
          anom<span className="text-[var(--greenSpan2)]">.</span>
        </Link>

        <Link
          href="/"
          aria-label="Voltar para a página inicial"
          className="rounded-full p-2 transition hover:bg-[var(--greenLeve)]"
        >
          <House size={21} />
        </Link>
      </header>

      {/* CONTEÚDO PRINCIPAL */}

      <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 lg:h-[calc(100dvh-85px)] lg:grid-cols-[0.95fr_1.05fr] lg:overflow-hidden">
        {/* PAINEL ESQUERDO */}

        <aside className="relative flex flex-col justify-center overflow-hidden rounded-bl-xl bg-[var(--backgroundSecondary)] px-7 py-10 sm:px-12 lg:h-full lg:min-h-0 lg:px-10 lg:py-6 xl:px-16">
          <div className="login-left-content relative z-10 mx-auto flex w-full max-w-[520px] flex-col">
            <p className="mb-8 text-sm font-semibold tracking-wide text-[var(--textSecondary)] sm:mb-10 lg:mb-8">
              ◆ Feedback Platform
            </p>

            {/* TÍTULO */}

            <div className="max-w-[500px]">
              <TextAnimate />
            </div>

            <p className="mb-5 mt-5 max-w-[420px] text-base leading-relaxed text-[var(--textSecondary)] sm:text-lg lg:mb-3 lg:mt-5">
              Feedbacks anônimos e honestos. Transforme cultura com dados reais.
            </p>

            {/* ILUSTRAÇÃO */}

            <div className="relative my-3 flex h-[150px] shrink-0 items-center justify-center sm:h-[180px] lg:h-[190px]">
              <div className="absolute h-40 w-40 rounded-full bg-[var(--greenLeve2)] opacity-60 blur-2xl sm:h-52 sm:w-52" />

              <div className="relative flex items-center">
                <div className="z-10 flex h-24 w-36 items-center justify-center rounded-[50%] rounded-bl-xl bg-[var(--greenSpan)] shadow-lg sm:h-32 sm:w-48">
                  <div className="flex gap-3">
                    <span className="h-3 w-3 rounded-full bg-[var(--greenLeve)]" />
                    <span className="h-3 w-3 rounded-full bg-[var(--greenLeve)]" />
                    <span className="h-3 w-3 rounded-full bg-[var(--greenLeve)]" />
                  </div>
                </div>

                <div className="-ml-7 mt-12 flex h-20 w-32 items-center justify-center rounded-[50%] rounded-br-xl bg-[var(--greenSpan2)] shadow-md sm:h-28 sm:w-40">
                  <div className="flex flex-col gap-2">
                    <span className="h-1.5 w-10 rounded-full bg-[var(--textSecondary)] opacity-60" />
                    <span className="h-1.5 w-10 rounded-full bg-[var(--textSecondary)] opacity-60" />
                    <span className="h-1.5 w-7 rounded-full bg-[var(--textSecondary)] opacity-60" />
                  </div>
                </div>
              </div>
            </div>

            {/* BENEFÍCIOS */}

            <div className="mt-4 grid shrink-0 grid-cols-2 gap-4 border-t border-[var(--borders)] pt-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--greenLeve2)] text-[var(--greenSpan)]">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <strong className="text-sm font-bold text-[var(--textTitles)]">
                    100% anônimo
                  </strong>

                  <p className="mt-2 text-xs leading-relaxed text-[var(--textSecondary)]">
                    Sem identificação, sem rastros.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--greenLeve2)] text-[var(--greenSpan)]">
                  <Smile size={21} />
                </div>

                <div>
                  <strong className="text-sm font-bold text-[var(--textTitles)]">
                    Feito para ouvir melhor
                  </strong>

                  <p className="mt-2 text-xs leading-relaxed text-[var(--textSecondary)]">
                    Decisões mais justas e equipes mais fortes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* PAINEL DIREITO - LOGIN */}

        <section className="flex items-center justify-center px-4 py-10 sm:px-8 lg:h-full lg:overflow-y-auto lg:px-10 lg:py-6 xl:px-16">
          <div className="w-full max-w-[540px] rounded-2xl border border-[var(--borders)] bg-[var(--foreground)]/50 p-6 shadow-sm sm:p-8 lg:p-9">
            {/* TÍTULO */}

            <div className="mb-9">
              <h1 className="text-2xl font-bold tracking-tight text-[var(--textTitles)] sm:text-3xl">
                Bem-vindo de volta!
              </h1>

              <p className="mt-2 text-sm text-[var(--textSecondary)] sm:text-base">
                Entre na sua conta e acompanhe os feedbacks da sua equipe.
              </p>
            </div>

            {/* FORMULÁRIO */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col gap-6"
            >
              {/* EMAIL */}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[var(--textTitles)]"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Digite seu email corporativo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[var(--borders)] bg-[var(--backgroundSecondary)] px-4 py-3 text-sm text-[var(--textInput)] outline-none transition placeholder:text-[var(--textPlaceholder)] focus:border-[var(--greenSpan)] focus:ring-2 focus:ring-[var(--greenSpan2)]/30"
                />
              </div>

              {/* SENHA */}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[var(--textTitles)]"
                >
                  Senha
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-[var(--borders)] bg-[var(--backgroundSecondary)] px-4 py-3 pr-12 text-sm text-[var(--textInput)] outline-none transition placeholder:text-[var(--textPlaceholder)] focus:border-[var(--greenSpan)] focus:ring-2 focus:ring-[var(--greenSpan2)]/30"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--textSecondary)] transition hover:text-[var(--greenSpan)]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* MENSAGEM DE ERRO */}

              {errorMessage && (
                <span
                  role="alert"
                  className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {errorMessage}
                </span>
              )}

              {/* BOTÃO DE LOGIN */}

              <button
                disabled={loading}
                type="submit"
                className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--greenSpan)] px-5 py-3.5 text-sm font-bold text-[var(--foreground)] transition duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  "Entrando..."
                ) : (
                  <>
                    Entrar na plataforma
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            {/* CADASTRO */}

            <div className="mt-8 border-t border-[var(--borders)] pt-7 text-center">
              <p className="text-sm text-[var(--textSecondary)]">
                Ainda não possui uma conta?{" "}
                <Link
                  href="/register"
                  className="cursor-pointer font-bold text-[var(--greenSpan)] transition hover:text-[var(--textSecondary)]"
                >
                  Criar conta
                </Link>
              </p>
            </div>
          </div>
        </section>
      </section>

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
        message={<>Faça o login para entrar em seu dashboard! 💚</>}
      />
    </main>
  );
}
