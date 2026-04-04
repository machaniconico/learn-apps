import { type Difficulty, getDifficultyLabel } from "@/lib/lessons-data";

const difficultyClassName: Record<Difficulty, string> = {
  beginner: "bg-green-500/15 text-green-400 border border-green-500/30",
  intermediate: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  advanced: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyClassName[difficulty]}`}>{getDifficultyLabel(difficulty)}</span>);
}
