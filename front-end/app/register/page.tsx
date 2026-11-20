"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  House,
  ShieldCheck,
  Smile,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { toast } from "sonner";

import TextAnimate from "@/components/TextAnimate";
import AnyMascot from "@/components/any";
import DialogMascot from "@/components/DialogMascot";
import { registerCompany } from "@/components/request";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [segment, setSegment] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // CADASTRO

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Nome é obrigatório!");
      return;
    }

    if (name.trim().length < 3) {
      setErrorMessage("O campo nome precisa ter no mínimo 3 letras!");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("E-mail é obrigatório");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailFormatado = email.trim().toLowerCase();

    if (!emailRegex.test(emailFormatado)) {
      setErrorMessage("Digite um e-mail válido");
      return;
    }

    if (!segment) {
      setErrorMessage("Selecione um segmento!");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password.trim()) {
      setErrorMessage("Senha é obrigatória");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial",
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem");
      return;
    }

    setLoading(true);

    const toastID = toast.loading("Criando conta...");

    try {
      await registerCompany({
        name: name.trim(),
        email: emailFormatado,
        segment,
        password,
      });

      toast.dismiss(toastID);
      toast.success("Empresa cadastrada com sucesso!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocorreu um erro inesperado");
        toast.error("Ocorreu um erro inesperado");
      }
    } finally {
      toast.dismiss(toastID);
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

        {/* PAINEL DIREITO - CADASTRO */}

        <section className="flex items-center justify-center px-4 py-8 sm:px-8 lg:h-full lg:overflow-y-auto lg:px-10 lg:py-4 xl:px-16">
          <div className="w-full max-w-[540px] rounded-2xl border border-[var(--borders)] bg-[var(--foreground)]/50 p-5 shadow-sm sm:p-7 lg:p-8">
            {/* TÍTULO */}

            <div className="mb-5">
              <h1 className="text-2xl font-bold tracking-tight text-[var(--textTitles)] sm:text-3xl">
                Comece gratuitamente
              </h1>

              <p className="mt-2 text-sm text-[var(--textSecondary)] sm:text-base">
                Cadastre sua empresa e transforme feedbacks em decisões
                melhores.
              </p>
            </div>

            {/* FORMULÁRIO */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col gap-4"
            >
              {/* NOME DA EMPRESA */}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[var(--textTitles)]"
                >
                  Nome da empresa
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="organization"
                  placeholder="Digite o nome da sua empresa"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-[var(--borders)] bg-[var(--backgroundSecondary)] px-4 py-2.5 text-sm text-[var(--textInput)] outline-none transition placeholder:text-[var(--textPlaceholder)] focus:border-[var(--greenSpan)] focus:ring-2 focus:ring-[var(--greenSpan2)]/30"
                />
              </div>

              {/* SEGMENTO */}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="segment"
                  className="text-sm font-semibold text-[var(--textTitles)]"
                >
                  Segmento
                </label>

                <select
                  id="segment"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-[var(--borders)] bg-[var(--backgroundSecondary)] px-4 py-2.5 text-sm text-[var(--textInput)] outline-none transition focus:border-[var(--greenSpan)] focus:ring-2 focus:ring-[var(--greenSpan2)]/30"
                >
                  <option value="">Selecione o segmento</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Varejo">Varejo</option>
                  <option value="Finanças">Finanças</option>
                  <option value="Educação">Educação</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Indústria">Indústria</option>
                  <option value="Construção">Construção</option>
                  <option value="Imobiliário">Imobiliário</option>
                  <option value="Marketing e Publicidade">
                    Marketing e Publicidade
                  </option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                  <option value="Consultoria">Consultoria</option>
                  <option value="Transporte e Logística">
                    Transporte e Logística
                  </option>
                  <option value="Turismo e Hotelaria">
                    Turismo e Hotelaria
                  </option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Agronegócio">Agronegócio</option>
                  <option value="Serviços Profissionais">
                    Serviços Profissionais
                  </option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

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
                  className="w-full rounded-lg border border-[var(--borders)] bg-[var(--backgroundSecondary)] px-4 py-2.5 text-sm text-[var(--textInput)] outline-none transition placeholder:text-[var(--textPlaceholder)] focus:border-[var(--greenSpan)] focus:ring-2 focus:ring-[var(--greenSpan2)]/30"
                />
              </div>

              {/* SENHAS */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      autoComplete="new-password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-[var(--borders)] bg-[var(--backgroundSecondary)] px-3 py-2.5 pr-10 text-sm text-[var(--textInput)] outline-none transition placeholder:text-[var(--textPlaceholder)] focus:border-[var(--greenSpan)] focus:ring-2 focus:ring-[var(--greenSpan2)]/30"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--textSecondary)] transition hover:text-[var(--greenSpan)]"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {/* CONFIRMAR SENHA */}

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-[var(--textTitles)]"
                  >
                    Confirmar senha
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Confirme sua senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border border-[var(--borders)] bg-[var(--backgroundSecondary)] px-3 py-2.5 pr-10 text-sm text-[var(--textInput)] outline-none transition placeholder:text-[var(--textPlaceholder)] focus:border-[var(--greenSpan)] focus:ring-2 focus:ring-[var(--greenSpan2)]/30"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--textSecondary)] transition hover:text-[var(--greenSpan)]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
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

              {/* BOTÃO DE CADASTRO */}

              <button
                disabled={loading}
                type="submit"
                className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--greenSpan)] px-5 py-3 text-sm font-bold text-[var(--foreground)] transition duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  "Criando conta..."
                ) : (
                  <>
                    Criar conta
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            {/* LOGIN */}

            <div className="mt-5 border-t border-[var(--borders)] pt-5 text-center">
              <p className="text-sm text-[var(--textSecondary)]">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="cursor-pointer font-bold text-[var(--greenSpan)] transition hover:text-[var(--textSecondary)]"
                >
                  Entrar
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
        message={
          <>Cadastre sua empresa para ter acesso a todos os recursos! 💚</>
        }
      />
    </main>
  );
}
