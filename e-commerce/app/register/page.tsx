"use client";

import { useState } from "react";
import { registerCompany } from "@/components/request";
import TextAnimate from "@/components/TextAnimate";
import { House } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * Tela de cadastro de empresas.
 *
 * Realiza validações no cliente antes de enviar os dados para a API,
 * reduzindo requisições inválidas e melhorando a experiência do usuário.
 *
 * Fluxo: valida campos -> envia cadastro -> exibe feedback visual
 * -> redireciona para login após sucesso.
 */

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [segment, setSegment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * Executa o processo de cadastro da empresa.
   *
   * Valida os campos obrigatórios, verifica formato de e-mail,
   * força a política de senha definida pela aplicação e envia
   * os dados para a API de registro.
   *
   * Em caso de sucesso, exibe uma notificação e redireciona
   * para a página de login.
   */
  const handleSubmit = async () => {
    setErrorMessage("");

    // Validação do nome
    if (!name.trim()) {
      setErrorMessage("Nome é obrigatório!");
      return;
    }

    if (name.trim().length < 3) {
      setErrorMessage("O campo nome precisa ter no mínimo 3 letras!");
      return;
    }

    // Validação do e-mail
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

    // Validação do segmento
    if (!segment) {
      setErrorMessage("Selecione um segmento!");
      return;
    }

    // Validação da senha
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password.trim()) {
      setErrorMessage("Senha é obrigatória");
      return;
    }

    // Mantém a mesma regra de complexidade aplicada no backend
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial",
      );
      return;
    }

    // Confirmação de senha
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem");
      return;
    }

    setLoading(true);
    const toastID = toast.loading("Criando conta...");
    try {
      const data = await registerCompany({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        segment,
        password,
      });

      toast.dismiss(toastID);
      toast.success("Empresa cadastrada com sucesso!");

      // Aguarda a exibição da mensagem antes do redirecionamento
      setTimeout(() => {
        router.push("/login");
      }, 1500);

      console.log(data);
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
    <main className="flex flex-col justify-center md:flex-row w-full min-h-screen bg-[#0a0a0a] text-white font-syne">
      <aside className="  bg-[#111111] p-4 md:p-10 w-full md:w-[70%] xs:p-8">
        <Link href="/" className="md:hidden">
          <House
            size={24}
            className="absolute  top-8 right-8 cursor-pointer "
          />
        </Link>
        <div className="flex flex-col aside-container justify-center  h-[90%]">
          <p className="text-[#555555] text-base lg:text-xl mt-5 mb-20">
            ◆ FeedBack Platform
          </p>

          <TextAnimate />

          <p className=" mt-10 mb-40 text-center text-[#A0A0A0] text-sm lg:text-xl lg:text-start">
            Feedbacks anônimos e honestos. Transforme cultura com dados reais.
          </p>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <strong className="text-[#c8f55a] text-4xl lg:text-5xl animate-pulse">
                100%
              </strong>
              <span className="text-[#555555] text-base lg:text-xl">
                anônimo
              </span>
            </div>

            <div className="flex flex-col">
              <strong className="text-[#c8f55a] text-4xl lg:text-5xl animate-pulse">
                real
              </strong>
              <span className="text-[#555555] text-base lg:text-xl">time</span>
            </div>
          </div>
        </div>
      </aside>
      <div className="w-full flex justify-center items-center bg-[#0a0a0a] relative">
        <Link href="/" className="hidden md:flex">
          <House
            size={24}
            className="absolute  top-8 right-8 cursor-pointer "
          />
        </Link>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-4 w-full max-w-[600px] p-4"
        >
          <h2 className="text-xl mt-10 font-bold text-center mb-6 sm:text-2xl md:mt-0">
            Cadastre sua Empresa
          </h2>

          <h3 className="text-sm text-[#555555]">
            Comece gratuitamente, sem cartão de crédito.
          </h3>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-full">
              <label className="text-[#555555] text-sm font-mono">
                NOME DA EMPRESA
              </label>
              <input
                type="text"
                placeholder="digite o nome da empresa..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-[#4b4b4b] text-[#f0ede6ce] placeholder:text-[#504e4e] text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="text-[#555555] text-sm font-mono">
                SEGMENTO
              </label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-[#4b4b4b] text-sm"
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
            <label className="text-[#555555] text-sm font-mono">EMAIL</label>
            <input
              type="text"
              placeholder="digite o email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-[#4b4b4b] text-[#f0ede6ce] placeholder:text-[#504e4e] text-sm focus:outline-none"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-full">
              <label className="text-[#555555] text-sm font-mono">SENHA</label>
              <input
                type="password"
                placeholder="digite sua senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-[#4b4b4b] text-[#f0ede6ce] placeholder:text-[#504e4e] text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="text-[#555555] text-sm font-mono">
                CONFIRMAR SENHA
              </label>
              <input
                type="password"
                value={confirmPassword}
                placeholder="confirme a senha..."
                onChange={(e) => setconfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-[#4b4b4b] text-[#f0ede6ce] placeholder:text-[#504e4e] text-sm focus:outline-none"
              />
            </div>
          </div>
          {errorMessage && (
            <span className="text-red-400 ">{errorMessage}</span>
          )}
          <button
            disabled={loading}
            type="submit"
            className="mt-6 mb-2 px-4 py-2 cursor-pointer rounded-md bg-[#c7f464] text-black font-semibold hover:opacity-90 transition"
          >
            {loading ? "Criando..." : "Criar conta →"}
          </button>

          <p className="text-center text-sm mb-10">
            Já tem conta?{" "}
            <Link href={"/login"} className="text-[#c8f55a] cursor-pointer">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
