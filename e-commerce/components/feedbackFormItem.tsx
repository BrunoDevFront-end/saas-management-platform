import React from "react";

interface FeedbackItemProps {
  handleToggleStatus: () => void;
  isActive: boolean;
}

export default function FeedbackFormItem({
  isActive,
  handleToggleStatus,
}: FeedbackItemProps) {
  return (
    <li>
      <article className="flex flex-col font-inter bg-[var(--backgroundSecondary)] p-4 mb-15 border-1 border-[var(--GrayEdges)]">
        <h3 className=" font-bold text-lg mb-1">Clima organizacional Q2</h3>
        <p className="text-xs text-[var(--textPlaceholder)] mb-2">
          Como a equipe está se sentindo neste trimenstre.
        </p>
        <strong className="text-sm">28</strong>
        <p className="text-xs text-[var(--textPlaceholder)] mb-3">feedbacks</p>
        <span
          className={`text-sm w-16 h-6 border grid place-items-center mb-3 ${
            isActive
              ? "border-[#7CAC45] text-[#7CAC45]"
              : "border-gray-500 text-gray-500"
          }`}
        >
          {isActive ? "ATIVO" : "INATIVO"}
        </span>
        <label className="cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={isActive}
            onChange={handleToggleStatus}
          />

          <div className="w-12 h-6 border border-[var(--greenSpan)] relative ">
            <div
              className={`w-5 h-5 bg-[var(--greenSpan)] absolute top-0.5 transition-all ${
                isActive ? "right-0.5" : "left-0.5"
              }`}
            />
          </div>
        </label>
        <button className="text-[var(--textInput)] text-sm cursor-pointer text-end">
          ver respostas →
        </button>
      </article>
    </li>
  );
}
