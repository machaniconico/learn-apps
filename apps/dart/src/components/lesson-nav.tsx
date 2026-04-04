import Link from "next/link";
import { type Lesson } from "@/lib/lessons-data";

interface LessonNavProps { lessons: Lesson[]; currentId: string; basePath: string; }

export function LessonNav({ lessons, currentId, basePath }: LessonNavProps) {
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const currentIdx = sorted.findIndex((l) => l.id === currentId);
  const prev = currentIdx > 0 ? sorted[currentIdx - 1] : null;
  const next = currentIdx < sorted.length - 1 ? sorted[currentIdx + 1] : null;
  return (
    <nav className="mt-12 flex items-center justify-between gap-4 border-t border-gray-800 pt-8">
      {prev ? (<Link href={`${basePath}/${prev.id}`} className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 hover:border-gray-600 hover:bg-gray-700 transition-colors max-w-xs"><svg className="w-5 h-5 text-gray-400 group-hover:text-gray-200 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg><div className="min-w-0"><p className="text-xs text-gray-500 mb-0.5">前のレッスン</p><p className="text-sm text-gray-200 font-medium truncate group-hover:text-gray-100">{prev.title}</p></div></Link>) : <div />}
      {next ? (<Link href={`${basePath}/${next.id}`} className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 hover:border-gray-600 hover:bg-gray-700 transition-colors max-w-xs ml-auto"><div className="min-w-0 text-right"><p className="text-xs text-gray-500 mb-0.5">次のレッスン</p><p className="text-sm text-gray-200 font-medium truncate group-hover:text-gray-100">{next.title}</p></div><svg className="w-5 h-5 text-gray-400 group-hover:text-gray-200 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></Link>) : <div />}
    </nav>
  );
}
