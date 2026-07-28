"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Feedback, Form, getFeddbacks } from "./request";
import FeedbackItem from "./FeedbackItem";

interface FeedbackDetailsModalProps {
  form: Form;
  onClose: () => void;
  onFeedbackDeleted: (formId: string) => void;
}

export default function FeedbackDetailsModal({
  form,
  onClose,
  onFeedbackDeleted,
}: FeedbackDetailsModalProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeedbacks() {
      try {
        const data = await getFeddbacks(form.id);
        setFeedbacks(data);
      } catch {
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    }

    loadFeedbacks();
  }, [form.id]);

  return (
    <div>
      {" "}
      <div className="fixed inset-0 z-50 h-full max-h-[100vh] overflow-y-auto bg-[var(--backgroundSecondary)] xl:right-0 xl:top-0 xl:w-[30%]">
        {" "}
        <header className="flex items-center justify-between gap-10 border border-[var(--GrayEdges)] p-5">
          {" "}
          <div>
            {" "}
            <h1 className="font-inter text-2xl font-bold text-[var(--textTitles)]">
              {form.title}{" "}
            </h1>
            <p className="mt-1 font-inter text-sm text-[var(--textPlaceholder)]">
              {feedbacks.length} feedbacks - ordenado por mais recentes
            </p>
          </div>
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="cursor-pointer border border-[var(--GrayEdges)] p-3 text-[var(--textPlaceholder)]"
          >
            <X size={20} />
          </button>
        </header>
        <ul className="mx-4 my-5">
          {feedbacks.map((feedback) => (
            <FeedbackItem
              key={feedback.id}
              feedback={feedback}
              onDeleted={(id) => {
                setFeedbacks((prev) =>
                  prev.filter((feedback) => feedback.id !== id),
                );

                onFeedbackDeleted(form.id);
              }}
            />
          ))}

          {!loading && !feedbacks.length && (
            <p className="mt-20 text-center text-xl text-[var(--textPlaceholder)]">
              Ainda não há feedbacks!
            </p>
          )}
        </ul>
      </div>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/50" />
    </div>
  );
}
