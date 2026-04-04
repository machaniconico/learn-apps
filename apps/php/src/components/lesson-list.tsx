"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { type Lesson } from "@/lib/lessons-data";
import { isLessonComplete } from "@/lib/progress";

interface LessonListProps { lessons: Lesson[]; basePath: string; color?: string; categoryId: string; }

const colorMap: Record<string, string> = { green: "bg-green-500 text-white", blue: "bg-blue-500 text-white", yellow: "bg-yellow-500 text-black", orange: "bg-orange-500 text-white", purple: "bg-purple-500 text-white", red: "bg-red-500 text-white", cyan: "bg-cyan-500 text-black", pink: "bg-pink-500 text-white", teal: "bg-teal-500 text-white", violet: "bg-violet-500 text-white", indigo: "bg-indigo-500 text-white" };

export function LessonList({ lessons, basePath, color = "indigo", categoryId }: LessonListProps) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const refresh = () => { const done = new Set<string>(); for (const lesson of lessons) { if (isLessonComplete(categoryId, lesson.id)) done.add(lesson.id); } setCompleted(done); };
  useEffect(() => { refresh(); const onStorage = (e: StorageEvent) => { if (e.key === "phplearn-progress") refresh(); }; window.addEventListener("storage", onStorage); return () => window.removeEventListener("storage", onStorage); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, lessons]);
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const numberColor = colorMap[color] ?? colorMap.indigo;
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {sorted.map((lesson) => { const done = completed.has(lesson.id); return (
        <Link key={lesson.id} href={`${basePath}/${lesson.id}`} className={`group flex items-start gap-3 px-4 py-3 rounded-xl border transition-colors ${done ? "bg-cyan-500/5 border-cyan-500/30 hover:bg-cyan-500/10" : "bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-gray-600"}`}>
          <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${numberColor}`}>{lesson.order}</span>
          <div className="min-w-0 flex-1"><p className={`text-sm font-medium truncate transition-colors ${done ? "text-cyan-400" : "text-gray-200 group-hover:text-gray-100"}`}>{lesson.title}</p><p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{lesson.description}</p></div>
          {done && (<svg className="w-4 h-4 text-cyan-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>)}
        </Link>); })}
    </div>
  );
}
