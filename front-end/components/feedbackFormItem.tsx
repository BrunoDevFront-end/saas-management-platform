import { type Form } from "@/components/request";
import { HiOutlineTrash } from "react-icons/hi";

interface FeedbackItemProps {
  form: Form;
  handleToggle: (id: string) => void;
  handleFormDeleted: (deleteId: string) => void;
  setSelectedForm: React.Dispatch<React.SetStateAction<Form | null>>;
}

export default function FeedbackFormItem({
  form,
  handleToggle,
  setSelectedForm,
  handleFormDeleted,
}: FeedbackItemProps) {
  return (
    <li className="mb-2">
      <article
        className="
          grid grid-cols-[minmax(0,1fr)_auto]
          gap-x-4 gap-y-4
          rounded-xl
          border border-[var(--borders)]
          bg-[var(--foreground)]/70
          p-4
          font-inter
          shadow-sm
          transition-all duration-200
          hover:border-[var(--greenSpan2)]
          hover:shadow-md
          sm:p-5
          lg:grid-cols-[minmax(0,1fr)_90px_90px_56px_auto_36px]
          lg:items-center
          lg:gap-5
          lg:px-6
        "
      >
        {/* INFORMAÇÕES DO FORMULÁRIO */}

        <div className="min-w-0">
          <h3 className="mb-1 truncate text-sm font-bold text-[var(--textTitles)] sm:text-base">
            {form.title}
          </h3>

          <p className="line-clamp-2 max-w-lg text-xs leading-relaxed text-[var(--textSecondary)]">
            {form.description}
          </p>
        </div>

        {/* AÇÕES DO FORMULÁRIO */}

        <div className="col-span-2 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 lg:contents">
          {/* QUANTIDADE DE FEEDBACKS */}

          <div className="flex flex-col">
            <strong className="text-base font-bold text-[var(--greenSpan)]">
              {form._count?.feedbacks ?? 0}
            </strong>

            <span className="text-xs text-[var(--textSecondary)]">
              feedbacks
            </span>
          </div>

          {/* STATUS */}

          <span
            className={`
              w-fit rounded-full px-3 py-1
              text-[11px] font-semibold
              ${
                form.isActive
                  ? "bg-[var(--greenLeve)] text-[var(--greenSpan)]"
                  : "bg-[var(--backgroundSecondary)] text-[var(--textSecondary)]"
              }
            `}
          >
            {form.isActive ? "Ativo" : "Inativo"}
          </span>

          {/* SWITCH */}

          <label
            className="
              relative inline-flex w-fit cursor-pointer
              items-center
            "
            title={form.isActive ? "Desativar formulário" : "Ativar formulário"}
          >
            <input
              type="checkbox"
              className="peer sr-only"
              checked={form.isActive}
              onChange={() => handleToggle(form.id)}
              aria-label={`${
                form.isActive ? "Desativar" : "Ativar"
              } formulário ${form.title}`}
            />

            <span
              className="
                h-6 w-11 rounded-full
                bg-[var(--borders)]
                transition-colors duration-200
                peer-checked:bg-[var(--greenSpan2)]
                peer-focus-visible:ring-2
                peer-focus-visible:ring-[var(--greenSpan2)]
                peer-focus-visible:ring-offset-2
              "
            />

            <span
              className="
                absolute left-1
                h-4 w-4 rounded-full
                bg-[var(--foreground)]
                shadow-sm
                transition-transform duration-200
                peer-checked:translate-x-5
              "
            />
          </label>

          {/* VER RESPOSTAS */}

          <button
            type="button"
            onClick={() => setSelectedForm(form)}
            className="
              flex w-fit cursor-pointer items-center
              justify-self-end gap-2
              whitespace-nowrap
              text-xs font-semibold
              text-[var(--greenSpan)]
              transition-colors
              hover:text-[var(--textSecondary)]
              sm:text-sm
            "
          >
            Ver respostas
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* EXCLUIR */}

        <button
          type="button"
          onClick={() => handleFormDeleted(form.id)}
          className="
            col-start-2 row-start-1
            flex h-9 w-9 cursor-pointer
            items-center justify-center
            justify-self-end
            rounded-lg
            text-[var(--textSecondary)]
            transition-all duration-200
            hover:bg-red-50
            hover:text-red-500
            lg:col-auto lg:row-auto
          "
          aria-label={`Excluir formulário ${form.title}`}
          title="Excluir formulário"
        >
          <HiOutlineTrash size={19} />
        </button>
      </article>
    </li>
  );
}
