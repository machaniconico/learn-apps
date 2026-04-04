"use client";

import { useEffect, useState } from "react";
import { getCategoryCompletionCount } from "@/lib/progress";

interface ProgressBarProps {
  categoryId: string;
  totalLessons: number;
  color?: string;
}

export function ProgressBar({ categoryId, totalLessons, color = "indigo" }: ProgressBarProps) {
  const [progress, setProgress] = useState(() =>
    typeof window !== "undefined" ? getCategoryCompletionCount(categoryId, totalLessons) : { completed: 0, total: totalLessons, percent: 0 }
  );
  const [mounted] = useState(() => typeof window !== "undefined");

  useEffect(() => {
    // Re-check on storage changes (e.g., lesson completed on another tab)
    const handleStorage = () => {
      setProgress(getCategoryCompletionCount(categoryId, totalLessons));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [categoryId, totalLessons]);

  if (!mounted) return null;

  const colorMap: Record<string, string> = {
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
    cyan: "bg-cyan-500",
    pink: "bg-pink-500",
    teal: "bg-teal-500",
    violet: "bg-violet-500",
    indigo: "bg-indigo-500",
  };
  const barColor = colorMap[color] ?? colorMap.indigo;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">進捗</span>
        <span className="text-sm font-mono text-gray-400">
          {progress.completed} / {progress.total} レッスン ({progress.percent}%)
        </span>
      </div>
      <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${progress.percent}%` }}
        />
      </div>
      {progress.percent === 100 && (
        <p className="text-emerald-400 text-xs mt-2 font-semibold">&#10003; このカテゴリは全レッスン完了！</p>
      )}
    </div>
  );
}
