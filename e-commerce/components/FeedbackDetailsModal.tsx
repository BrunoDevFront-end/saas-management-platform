import { X } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

import { Feedback, getFeddbacks } from "./request";

import FeedbackItem from "./FeedbackItem";

interface ModalOpen {
  formId: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FeedbackDetailsModal({
  setIsModalOpen,
  isModalOpen,
  formId,
}: ModalOpen) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeedbacks() {
      try {
        const data = await getFeddbacks(formId);
        setFeedbacks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadFeedbacks();
  }, [formId]);

  return (
    <div>
      <div className="fixed inset-0 xl:inset-auto xl:right-0 xl:top-0 xl:w-[30%] h-full z-100 bg-[var(--backgroundSecondary)]">
        <header className=" flex p-5 justify-between items-center gap-10  border-1 border-[var(--GrayEdges)]">
          <div>
            <h1 className="text-2xl text-[var(--textTitles)] font-bold font-inter">
              Clima organizacional
            </h1>
            <p className="text-sm mt-1 font-inter text-[var(--textPlaceholder)]">
              {feedbacks.length} feedbacks - ordenado por mais recentes
            </p>
          </div>
          <button
            className="p-3 border-1 border-[var(--GrayEdges)] text-[var(--textPlaceholder)] cursor-pointer  "
            aria-label="close"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={20} />
          </button>
        </header>
        <ul className="mx-4 my-5">
          {feedbacks?.map((feedback) => (
            <FeedbackItem key={feedback.id} feedback={feedback} />
          ))}
          {!feedbacks.length && (
            <p className="text-xl text-center mt-20 text-[var(--textPlaceholder)]">
              Ainda não á feedbacks!
            </p>
          )}
        </ul>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsModalOpen(false)}
        ></div>
      )}
    </div>
  );
}
