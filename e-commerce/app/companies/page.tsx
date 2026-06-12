"use client";

import { useState } from "react";
import { registerCompany } from "@/components/request";
import TextAnimate from "@/components/TextAnimate";
import { House } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [segment, setSegment] = useState("");

  const handleSubmit = async () => {
    const data = await registerCompany({
      name,
      email,
      segment,
      password,
    });
    console.log(data);
  };

  return (
    <main className="flex flex-col md:flex-row w-full min-h-screen bg-[#0a0a0a] text-white font-syne">
      <aside className=" bg-[#111111] p-4 md:p-10 w-full md:w-[70%] xs:p-8">
        <Link href="http://localhost:3000/" className="md:hidden">
          <House
            size={24}
            className="absolute  top-8 right-8 cursor-pointer "
          />
        </Link>
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
            <span className="text-[#555555] text-base lg:text-xl">anônimo</span>
          </div>

          <div className="flex flex-col">
            <strong className="text-[#c8f55a] text-4xl lg:text-5xl animate-pulse">
              real
            </strong>
            <span className="text-[#555555] text-base lg:text-xl">time</span>
          </div>
        </div>
      </aside>
      <div className="w-full flex justify-center items-center bg-[#0a0a0a] relative">
        <Link href="http://localhost:3000/" className="hidden md:flex">
          <House
            size={24}
            className="absolute  top-8 right-8 cursor-pointer "
          />
        </Link>
        <form className="flex flex-col gap-4 w-full max-w-[600px]">
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
                <option>Tecnologia</option>
                <option>E-commerce</option>
                <option>Varejo</option>
                <option>Outro</option>
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
                placeholder="confirme a senha..."
                className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-[#4b4b4b] text-[#f0ede6ce] placeholder:text-[#504e4e] text-sm focus:outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 mb-2 px-4 py-2 cursor-pointer rounded-md bg-[#c7f464] text-black font-semibold hover:opacity-90 transition"
          >
            Criar conta →
          </button>

          <p className="text-center text-sm mb-10">
            Já tem conta?{" "}
            <span className="text-[#c8f55a] cursor-pointer">Entrar</span>
          </p>
        </form>
      </div>
    </main>
  );
}
