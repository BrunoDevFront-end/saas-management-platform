"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { HiOutlineTrash } from "react-icons/hi";

import { deleteFeedback, Feedback } from "./request";

interface FeedbackItemProps {
  feedback: Feedback;
  onDeleted?: (id: string) => void;
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
      onDeleted?.(feedback.id);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <li className="relative mb-2 break-words rounded border-l-4 border-[var(--greenSpan)] bg-[var(--borders)] p-4 text-lg text-[var(--textInput)]">
      {" "}
      <div className="mb-4 flex">
        {Array.from({ length: feedback.rating }).map((_, index) => (
          <Star
            key={index}
            size={15}
            strokeWidth={1.5}
            className="fill-current text-yellow-300"
          />
        ))}{" "}
      </div>
      {feedback.content}
      <div className="flex justify-between pt-4 text-sm text-[var(--textSecondary)]">
        <span>Anônimo</span>

        <time className="font-syne-mono text-sm text-[var(--textSecondary)]">
          {formatDate(feedback.createdAt)}
        </time>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label="Excluir feedback"
        className="absolute right-2 top-2 cursor-pointer text-[var(--greenSpan)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <HiOutlineTrash size={15} />
      </button>
    </li>
  );
}
