"use client";

import { useState, useEffect } from "react";
import { markLessonComplete, isLessonComplete } from "@/lib/progress";

interface LessonCompleteButtonProps {
  categoryId: string;
  lessonId: string;
}

export function LessonCompleteButton({ categoryId, lessonId }: LessonCompleteButtonProps) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setComplete(isLessonComplete(categoryId, lessonId));
  }, [categoryId, lessonId]);

  const toggle = () => {
    if (!complete) {
      markLessonComplete(categoryId, lessonId);
      setComplete(true);
      window.dispatchEvent(new StorageEvent("storage", { key: "cpplearn-progress" }));
    } else {
      const STORAGE_KEY = "cpplearn-progress";
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const progress = JSON.parse(stored);
          if (progress.categories?.[categoryId]?.lessons?.[lessonId]) {
            delete progress.categories[categoryId].lessons[lessonId];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
            window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
          }
        }
      } catch {
        // ignore
      }
      setComplete(false);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
        complete
          ? "bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500/30"
          : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-gray-100"
      }`}
    >
      <span className={`w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors ${
        complete ? "border-blue-500 bg-blue-500" : "border-gray-600"
      }`}>
        {complete && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {complete ? "完了済み" : "完了にする"}
    </button>
  );
}
