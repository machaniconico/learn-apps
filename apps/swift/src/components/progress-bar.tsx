"use client";

import { useState, useEffect } from "react";
import { getCategoryCompletionCount } from "@/lib/progress";

interface ProgressBarProps {
  categoryId: string;
  totalLessons: number;
  color?: string;
}

const colorMap: Record<string, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  cyan: "bg-cyan-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
  violet: "bg-violet-500",
  indigo: "bg-indigo-500",
};

export function ProgressBar({ categoryId, totalLessons, color = "orange" }: ProgressBarProps) {
  const [completed, setCompleted] = useState(0);
  const [percent, setPercent] = useState(0);

  const barColor = colorMap[color] ?? colorMap.orange;

  const refresh = () => {
    const { completed: c, percent: p } = getCategoryCompletionCount(categoryId, totalLessons);
    setCompleted(c);
    setPercent(p);
  };

  useEffect(() => {
    refresh();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "swiftlearn-progress") {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, totalLessons]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">進捗</span>
        <span className="text-gray-300 font-medium">
          {completed} / {totalLessons} 完了 ({percent}%)
        </span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
