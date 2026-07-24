"use client";
import { useState } from "react";
import { deleteFeedback, Feedback } from "./request";
import { HiOutlineTrash } from "react-icons/hi";
import { Star } from "lucide-react";

interface FeedbackItemProps {
  feedback: Feedback;
  onDeleted?: (id: string) => void; // avisa o pai que foi deletado
}

export default function FeedbackItem({
  feedback,
  onDeleted,
}: FeedbackItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteFeedback(feedback.id);
      onDeleted?.(feedback.id); // avisa o componente pai pra remover da lista
    } catch (error) {
      console.error("Erro ao deletar feedback:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <li className="relative break-words p-4 mb-2 border-l-4 border-[var(--greenSpan)] text-lg text-[var(--textInput)] bg-[var(--borders)] rounded">
      <div className="flex mb-4">
        {Array.from({ length: feedback.rating }).map((_, i) => (
          <Star
            key={i}
            size={15}
            strokeWidth={1.5}
            className="text-yellow-300 fill-current"
          />
        ))}
      </div>
      {feedback.content}
      <div className="flex justify-between text-sm text-[var(--textSecondary)] pt-4">
        <span>Anônimo</span>
        <time className="text-sm font-syne-mono text-[var(--textSecondary)]">
          {formatDate(feedback.createdAt)}
        </time>
      </div>

      <button
        onClick={handleDelete}
        className="cursor-pointer absolute right-2 top-2 text-[var(--greenSpan)]"
        disabled={isDeleting}
      >
        <HiOutlineTrash size={15} />
      </button>
    </li>
  );
}
