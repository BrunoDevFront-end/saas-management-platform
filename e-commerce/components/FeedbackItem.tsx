import { Feedback } from "./request";

interface FeedbackItemProps {
  feedback: Feedback;
}

export default function FeedbackItem({ feedback }: FeedbackItemProps) {
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return (
    <li className="p-4 mb-2 border-l-4 border-[var(--greenSpan)] text-lg text-[var(--textInput)] bg-[var(--borders)]  rounded">
      {feedback.content}

      <div className="flex justify-between text-sm text-[var(--textSecondary)] pt-4">
        <span>Anônimo</span>

        <time className="text-sm font-syne-mono text-[var(--textSecondary)]">
          {formatDate(feedback.createdAt)}
        </time>
      </div>
    </li>
  );
}
