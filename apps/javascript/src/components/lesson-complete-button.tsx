"use client";

import { useState } from "react";
import { markLessonComplete, isLessonComplete } from "@/lib/progress";

interface LessonCompleteButtonProps {
  categoryId: string;
  lessonId: string;
  color?: string;
}

export function LessonCompleteButton({ categoryId, lessonId, color = "indigo" }: LessonCompleteButtonProps) {
  const [completed, setCompleted] = useState(() =>
    typeof window !== "undefined" ? isLessonComplete(categoryId, lessonId) : false
  );
  const [mounted] = useState(() => typeof window !== "undefined");

  if (!mounted) return null;

  const colorMap: Record<string, { bg: string; hover: string; ring: string }> = {
    orange: { bg: "bg-orange-500", hover: "hover:bg-orange-600", ring: "ring-orange-500/50" },
    blue: { bg: "bg-blue-500", hover: "hover:bg-blue-600", ring: "ring-blue-500/50" },
    yellow: { bg: "bg-yellow-500", hover: "hover:bg-yellow-600", ring: "ring-yellow-500/50" },
    green: { bg: "bg-green-500", hover: "hover:bg-green-600", ring: "ring-green-500/50" },
    purple: { bg: "bg-purple-500", hover: "hover:bg-purple-600", ring: "ring-purple-500/50" },
    red: { bg: "bg-red-500", hover: "hover:bg-red-600", ring: "ring-red-500/50" },
    cyan: { bg: "bg-cyan-500", hover: "hover:bg-cyan-600", ring: "ring-cyan-500/50" },
    pink: { bg: "bg-pink-500", hover: "hover:bg-pink-600", ring: "ring-pink-500/50" },
    teal: { bg: "bg-teal-500", hover: "hover:bg-teal-600", ring: "ring-teal-500/50" },
    violet: { bg: "bg-violet-500", hover: "hover:bg-violet-600", ring: "ring-violet-500/50" },
    indigo: { bg: "bg-indigo-500", hover: "hover:bg-indigo-600", ring: "ring-indigo-500/50" },
  };
  const c = colorMap[color] ?? colorMap.indigo;

  if (completed) {
    return (
      <div className="mt-8 flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
        <span className="text-2xl">&#10003;</span>
        <div>
          <p className="text-emerald-400 font-semibold text-sm">このレッスンは完了済みです</p>
          <button
            onClick={() => {
              setCompleted(false);
              // Re-mark to update timestamp if needed
            }}
            className="text-xs text-emerald-600 hover:text-emerald-400 mt-1"
          >
            完了を取り消す
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        markLessonComplete(categoryId, lessonId);
        setCompleted(true);
      }}
      className={`mt-8 w-full py-3 rounded-xl ${c.bg} ${c.hover} text-white font-semibold text-sm transition-colors ring-2 ring-transparent hover:${c.ring}`}
    >
      このレッスンを完了にする
    </button>
  );
}
