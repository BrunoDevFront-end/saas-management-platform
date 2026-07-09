import React, { useEffect } from "react";
import { useState } from "react";
import FeedbackDetailsModal from "./FeedbackDetailsModal";
import type { Form } from "@/components/request";

interface FeedbackItemProps {
  form: Form;
  onToggle: (id: string) => void;
  onFeedbackDeleted: (formId: string) => void;
}

export default function FeedbackFormItem({
  form,
  onToggle,
  onFeedbackDeleted,
}: FeedbackItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <li>
      <article className="flex flex-col font-inter bg-[var(--backgroundSecondary)] p-6 mb-1 border-1 border-[var(--GrayEdges)] xl:grid xl:grid-cols-5 xl:grid-cols-[40%_15%_15%_15%_15%] xl:items-center">
        <div>
          <h3 className=" font-bold text-[var(--textTitles)] text-lg mb-1">
            {form.title}
          </h3>
          <p className="text-xs text-[var(--textPlaceholder)] mb-2">
            {form.description}
          </p>
        </div>
        <div>
          <strong className="text-sm text-[var(--textTitles)]">
            {form._count?.feedbacks ?? 0}
          </strong>
          <p className="text-xs text-[var(--textPlaceholder)] mb-3">
            feedbacks
          </p>
        </div>
        <span
          className={` text-sm w-16 h-6 border grid place-items-center   mb-3 xl:m-0 ${
            form.isActive
              ? "border-[#7CAC45] text-[#7CAC45]"
              : "border-gray-500 text-gray-500"
          }`}
        >
          {form.isActive ? "ATIVO" : "INATIVO"}
        </span>
        <label className="cursor-pointer w-[5%] ">
          <input
            type="checkbox"
            className="sr-only "
            checked={form.isActive}
            onChange={() => onToggle(form.id)}
          />

          <div className="w-12 h-6 border border-[var(--greenSpan)] relative ">
            <div
              className={`w-5 h-5 bg-[var(--greenSpan)] absolute top-0.5 transition-all ${
                form.isActive ? "right-0.5" : "left-0.5"
              }`}
            />
          </div>
        </label>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[var(--textInput) self-end w-30 text-sm cursor-pointer xl:self-auto"
        >
          ver respostas →
        </button>
      </article>
      {isModalOpen && (
        <FeedbackDetailsModal
          formId={form.id}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          onFeedbackDeleted={onFeedbackDeleted}
        />
      )}
    </li>
  );
}
