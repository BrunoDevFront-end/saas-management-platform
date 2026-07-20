"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { CreateFeedback } from "../../components/request";

export default function CreatePublicFeedback() {
  const { slug, formId } = useParams<{ slug: string; formId: string }>();
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState("");

  async function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const data = await CreateFeedback({
        content,
        slug,
        formId,
      });

      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocorreu um erro inesperado");
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleForm}>
        <header>
          <h1>Pesquisa de Clima</h1>
        </header>
        <label htmlFor="content">Responda</label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
        />

        <button type="submit" className="p-5">
          Confirmar
        </button>
        <span>{errorMessage}</span>
      </form>
    </div>
  );
}
