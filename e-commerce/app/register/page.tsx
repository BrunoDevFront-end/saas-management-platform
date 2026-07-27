"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { House } from "lucide-react";
import { toast } from "sonner";

import AnyMascot from "@/components/any";
import TextAnimate from "@/components/TextAnimate";
import { registerCompany } from "@/components/request";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [segment, setSegment] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setErrorMessage("");

    // Valida os dados antes de enviar a requisição.
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

    // Mantém a mesma regra de complexidade aplicada no backend.
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
        email: email.trim().toLowerCase(),
        segment,
        password,
      });

      toast.dismiss(toastID);
      toast.success("Empresa cadastrada com sucesso!");

      // Aguarda a exibição da confirmação antes de redirecionar.
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
    <main className="flex min-h-screen w-full flex-col bg-[#0a0a0a] font-syne text-white md:flex-row">
      <aside className="w-full bg-[#111111] p-4 md:w-[70%] md:p-10 xs:p-8">
        <Link href="/" className="md:hidden">
          <House size={24} className="absolute right-8 top-8 cursor-pointer" />
        </Link>

        <div className="aside-container flex h-[90%] flex-col justify-center">
          <p className="mb-20 mt-5 text-base text-[#555555] lg:text-xl">
            ◆ FeedBack Platform
          </p>

          <TextAnimate />

          <p className="mb-40 mt-10 text-center text-sm text-[#A0A0A0] lg:text-start lg:text-xl">
            Feedbacks anônimos e honestos. Transforme cultura com dados reais.
          </p>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <strong className="animate-pulse text-4xl text-[#c8f55a] lg:text-5xl">
                100%
              </strong>

              <span className="text-base text-[#555555] lg:text-xl">
                anônimo
              </span>
            </div>

            <div className="flex flex-col">
              <strong className="animate-pulse text-4xl text-[#c8f55a] lg:text-5xl">
                real
              </strong>

              <span className="text-base text-[#555555] lg:text-xl">time</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="relative flex w-full items-center justify-center bg-[#0a0a0a]">
        <Link href="/" className="hidden md:flex">
          <House size={24} className="absolute right-8 top-8 cursor-pointer" />
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex w-full max-w-[600px] flex-col gap-4 p-4"
        >
          <h2 className="mb-6 mt-10 text-center text-xl font-bold sm:text-2xl md:mt-0">
            Cadastre sua Empresa
          </h2>

          <h3 className="text-sm text-[#555555]">
            Comece gratuitamente, sem cartão de crédito.
          </h3>

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex w-full flex-col">
              <label className="font-mono text-sm text-[#555555]">
                NOME DA EMPRESA
              </label>

              <input
                type="text"
                placeholder="digite o nome da empresa..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-[#4b4b4b] bg-[#1e1e1e] px-3 py-2 text-sm text-[#f0ede6ce] placeholder:text-[#504e4e] focus:outline-none"
              />
            </div>

            <div className="flex w-full flex-col">
              <label className="font-mono text-sm text-[#555555]">
                SEGMENTO
              </label>

              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full rounded-md border border-[#4b4b4b] bg-[#1e1e1e] px-3 py-2 text-sm"
              >
                <option value="">Selecione um segmento</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Varejo">Varejo</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-mono text-sm text-[#555555]">EMAIL</label>

            <input
              type="text"
              placeholder="digite o email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[#4b4b4b] bg-[#1e1e1e] px-3 py-2 text-sm text-[#f0ede6ce] placeholder:text-[#504e4e] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex w-full flex-col">
              <label className="font-mono text-sm text-[#555555]">SENHA</label>

              <input
                type="password"
                placeholder="digite sua senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-[#4b4b4b] bg-[#1e1e1e] px-3 py-2 text-sm text-[#f0ede6ce] placeholder:text-[#504e4e] focus:outline-none"
              />
            </div>

            <div className="flex w-full flex-col">
              <label className="font-mono text-sm text-[#555555]">
                CONFIRMAR SENHA
              </label>

              <input
                type="password"
                value={confirmPassword}
                placeholder="confirme a senha..."
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-[#4b4b4b] bg-[#1e1e1e] px-3 py-2 text-sm text-[#f0ede6ce] placeholder:text-[#504e4e] focus:outline-none"
              />
            </div>
          </div>

          {errorMessage && <span className="text-red-400">{errorMessage}</span>}

          <button
            disabled={loading}
            type="submit"
            className="mb-2 mt-6 cursor-pointer rounded-md bg-[#c7f464] px-4 py-2 font-semibold text-black transition hover:opacity-90"
          >
            {loading ? "Criando..." : "Criar conta →"}
          </button>

          <p className="mb-10 text-center text-sm">
            Já tem conta?{" "}
            <Link href="/login" className="cursor-pointer text-[#c8f55a]">
              Entrar
            </Link>
          </p>
        </form>
      </div>

      <AnyMascot className="!fixed bottom-6 right-6 z-50 !w-14 sm:!w-16 lg:!w-16" />

      <div className="animate-[fadeInOut_8s_ease-in-out_forwards]">
        <Image
          src="/image/speechbubble.png"
          alt=""
          width={200}
          height={50}
          className="!fixed bottom-6 right-16 z-50 h-24 w-64"
        />

        <p className="!fixed bottom-2 right-24 z-50 h-24 w-64 max-w-52 text-sm text-[var(--textInput)]">
          Cadastre sua empresa para ter acesso a todos os recursos!
        </p>
      </div>
    </main>
  );
}
