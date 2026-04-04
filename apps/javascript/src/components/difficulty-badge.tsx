import { getDifficultyLabel, getDifficultyColor, type Difficulty } from "@/lib/lessons-data";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const label = getDifficultyLabel(difficulty);
  const { bg, text } = getDifficultyColor(difficulty);

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${bg} ${text}`}>
      {label}
    </span>
  );
}
