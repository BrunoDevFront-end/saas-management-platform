import { type Form } from "@/components/request";
import { HiOutlineTrash } from "react-icons/hi";

interface FeedbackItemProps {
  form: Form;
  onToggle: (id: string) => void;
  setSelectedForm: React.Dispatch<React.SetStateAction<Form | null>>;

  onDeleteForm: (deleteId: string) => void;
}

export default function FeedbackFormItem({
  form,
  onToggle,
  setSelectedForm,
  onDeleteForm,
}: FeedbackItemProps) {
  return (
    <li>
      {" "}
      <article className="relative mb-1 flex flex-col border border-[var(--GrayEdges)] bg-[var(--backgroundSecondary)] p-6 font-inter xl:grid xl:grid-cols-[40%_15%_15%_15%_15%] xl:items-center">
        {" "}
        <div>
          {" "}
          <h3 className="mb-1 text-lg font-bold text-[var(--textTitles)]">
            {form.title}{" "}
          </h3>
          <p className="mb-2 text-xs text-[var(--textPlaceholder)]">
            {form.description}
          </p>
        </div>
        <div>
          <strong className="text-sm text-[var(--textTitles)]">
            {form._count?.feedbacks ?? 0}
          </strong>

          <p className="mb-3 text-xs text-[var(--textPlaceholder)]">
            feedbacks
          </p>
        </div>
        <span
          className={`mb-3 grid h-6 w-16 place-items-center border text-sm xl:m-0 ${
            form.isActive
              ? "border-[#7CAC45] text-[#7CAC45]"
              : "border-gray-500 text-gray-500"
          }`}
        >
          {form.isActive ? "ATIVO" : "INATIVO"}
        </span>
        <label className="w-[5%] cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={form.isActive}
            onChange={() => onToggle(form.id)}
          />

          <div className="relative h-6 w-12 border border-[var(--greenSpan)]">
            <div
              className={`absolute top-0.5 h-5 w-5 bg-[var(--greenSpan)] transition-all ${
                form.isActive ? "right-0.5" : "left-0.5"
              }`}
            />
          </div>
        </label>
        <button
          type="button"
          onClick={() => setSelectedForm(form)}
          className="w-30 cursor-pointer self-end text-sm text-[var(--textInput)] xl:self-auto"
        >
          ver respostas →
        </button>
        <button
          type="button"
          onClick={() => onDeleteForm(form.id)}
          className="absolute right-3 top-3 cursor-pointer text-[var(--greenSpan)]"
          aria-label={`Excluir formulário ${form.title}`}
        >
          <HiOutlineTrash size={17} />
        </button>
      </article>
    </li>
  );
}
