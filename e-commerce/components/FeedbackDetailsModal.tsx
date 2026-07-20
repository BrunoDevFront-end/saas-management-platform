import { X } from "lucide-react";
import { useState, useEffect } from "react";

import { Feedback, Form, getFeddbacks } from "./request";
import FeedbackItem from "./FeedbackItem";

interface ModalOpen {
  form: Form;
  onClose: () => void;
  onFeedbackDeleted: (formId: string) => void;
}

export default function FeedbackDetailsModal({
  form,
  onClose,
  onFeedbackDeleted,
}: ModalOpen) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeedbacks() {
      try {
        const data = await getFeddbacks(form.id);
        console.log(data);
        setFeedbacks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadFeedbacks();
  }, [form.id]);

  return (
    <div>
      <div className="fixed inset-0 max-h-[100vh] overflow-y-auto xl:inset-auto xl:right-0 xl:top-0 xl:w-[30%] h-full z-100 bg-[var(--backgroundSecondary)]">
        <header className="flex p-5 justify-between items-center gap-10 border-1 border-[var(--GrayEdges)]">
          <div>
            <h1 className="text-2xl text-[var(--textTitles)] font-bold font-inter">
              {form.title}
            </h1>
            <p className="text-sm mt-1 font-inter text-[var(--textPlaceholder)]">
              {feedbacks.length} feedbacks - ordenado por mais recentes
            </p>
          </div>

          <button
            className="p-3 border-1 border-[var(--GrayEdges)] text-[var(--textPlaceholder)] cursor-pointer"
            aria-label="close"
            onClick={onClose}
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
                setFeedbacks((prev) => prev.filter((f) => f.id !== id));
                onFeedbackDeleted(form.id);
              }}
            />
          ))}

          {!feedbacks.length && (
            <p className="text-xl text-center mt-20 text-[var(--textPlaceholder)]">
              Ainda não há feedbacks!
            </p>
          )}
        </ul>
      </div>

      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}></div>
    </div>
  );
}
