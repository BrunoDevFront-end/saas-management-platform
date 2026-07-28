"use client";

import { useState } from "react";

import TextAnimate from "@/components/TextAnimate";
import { House } from "lucide-react";
import Link from "next/link";
import { LoginCompany } from "@/components/request";
import { useRouter } from "next/navigation";
import AnyMascot from "@/components/any";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailFormatado = email.trim().toLowerCase();

    if (!emailRegex.test(emailFormatado)) {
      setErrorMessage("Digite um e-mail válido");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("E-mail é obrigatório");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Senha é obrigatória");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("A senha precisa ter no míninimo 8 caracteres");
      return;
    }

    setLoading(true);

    try {
      const result = await LoginCompany({
        email,
        password,
      });

      localStorage.setItem("token", result.token);
      localStorage.setItem("company", JSON.stringify(result.company));

      // delay proposital pra evitar flash de UI entre o login e a navegação
      setTimeout(() => {
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
    <main className="flex flex-col w-full min-h-screen bg-[#0a0a0a] font-syne text-white md:flex-row">
      <aside className="w-full bg-[#111111] p-4 xs:p-8 md:w-[70%] md:p-10">
        <Link href="/" className="md:hidden">
          <House size={24} className="absolute top-8 right-8 cursor-pointer" />
        </Link>

        <div className="aside-container flex flex-col justify-center h-[90%]">
          <p className="mt-5 mb-20 text-base text-[#555555] lg:text-xl">
            ◆ FeedBack Platform
          </p>

          <TextAnimate />

          <p className="mt-10 mb-40 text-center text-sm text-[#A0A0A0] lg:text-xl lg:text-start">
            Feedbacks anônimos e honestos. Transforme cultura com dados reais.
          </p>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <strong className="text-4xl text-[#c8f55a] animate-pulse lg:text-5xl">
                100%
              </strong>
              <span className="text-base text-[#555555] lg:text-xl">
                anônimo
              </span>
            </div>

            <div className="flex flex-col">
              <strong className="text-4xl text-[#c8f55a] animate-pulse lg:text-5xl">
                real
              </strong>
              <span className="text-base text-[#555555] lg:text-xl">time</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="relative flex w-full items-center justify-center bg-[#0a0a0a]">
        <Link href="/" className="hidden md:flex">
          <House size={24} className="absolute top-8 right-8 cursor-pointer" />
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex w-full max-w-[600px] flex-col gap-4 p-4"
        >
          <h2 className="mt-10 mb-6 text-xl font-bold text-center sm:text-2xl md:mt-0">
            Entrar na Plataforma
          </h2>

          <h3 className="text-sm text-[#555555]">
            Acesse seu dashboard e acompanhe os feedbacks da sua equipe.
          </h3>

          <div className="flex flex-col">
            <label className="text-sm font-mono text-[#555555]">EMAIL</label>

            <input
              type="text"
              placeholder="digite o email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[#4b4b4b] bg-[#1e1e1e] px-3 py-2 text-sm text-[#f0ede6ce] placeholder:text-[#504e4e] focus:outline-none"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex w-full flex-col">
              <label className="text-sm font-mono text-[#555555]">SENHA</label>

              <input
                type="password"
                placeholder="digite sua senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-[#4b4b4b] bg-[#1e1e1e] px-3 py-2 text-sm text-[#f0ede6ce] placeholder:text-[#504e4e] focus:outline-none"
              />
            </div>
          </div>

          {errorMessage && <span className="text-red-400">{errorMessage}</span>}

          <button
            disabled={loading}
            type="submit"
            className="mt-6 mb-2 cursor-pointer rounded-md bg-[#c7f464] px-4 py-2 font-semibold text-black transition hover:opacity-90"
          >
            {loading ? "Entrando..." : "Entrar →"}
          </button>

          <p className="mb-10 text-center text-sm">
            Não possui conta?{" "}
            <Link href="/register" className="text-[#c8f55a] cursor-pointer">
              Criar conta
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
        <p className="!fixed bottom-1 right-24 z-50 h-24 w-64 max-w-52 text-sm text-[var(--textInput)]">
          Faça o login para entrar em seu dashboard!💚
        </p>
      </div>
    </main>
  );
}
