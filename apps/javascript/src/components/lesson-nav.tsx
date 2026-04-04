import Link from "next/link";
import type { Lesson } from "@/lib/lessons-data";

interface LessonNavProps {
  lessons: Lesson[];
  currentId: string;
  basePath: string;
  color?: string;
}

export function LessonNav({ lessons, currentId, basePath, color = "indigo" }: LessonNavProps) {
  const currentIndex = lessons.findIndex((l) => l.id === currentId);
  if (currentIndex === -1) return null;
  const prev = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const next = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const colorMap: Record<string, string> = {
    orange: "hover:border-orange-500/50 hover:bg-orange-500/10",
    blue: "hover:border-blue-500/50 hover:bg-blue-500/10",
    yellow: "hover:border-yellow-500/50 hover:bg-yellow-500/10",
    green: "hover:border-green-500/50 hover:bg-green-500/10",
    purple: "hover:border-purple-500/50 hover:bg-purple-500/10",
    red: "hover:border-red-500/50 hover:bg-red-500/10",
    cyan: "hover:border-cyan-500/50 hover:bg-cyan-500/10",
    pink: "hover:border-pink-500/50 hover:bg-pink-500/10",
    teal: "hover:border-teal-500/50 hover:bg-teal-500/10",
    violet: "hover:border-violet-500/50 hover:bg-violet-500/10",
    indigo: "hover:border-indigo-500/50 hover:bg-indigo-500/10",
  };
  const hoverClass = colorMap[color] ?? colorMap.indigo;

  return (
    <div className="mt-12 flex items-stretch gap-4">
      {prev ? (
        <Link
          href={`${basePath}/${prev.id}`}
          className={`flex-1 p-4 rounded-xl border border-gray-800 transition-colors ${hoverClass} group`}
        >
          <span className="text-xs text-gray-500 group-hover:text-gray-400">&#8592; 前のレッスン</span>
          <p className="text-sm font-semibold text-white mt-1 truncate">{prev.title}</p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`${basePath}/${next.id}`}
          className={`flex-1 p-4 rounded-xl border border-gray-800 transition-colors ${hoverClass} group text-right`}
        >
          <span className="text-xs text-gray-500 group-hover:text-gray-400">次のレッスン &#8594;</span>
          <p className="text-sm font-semibold text-white mt-1 truncate">{next.title}</p>
        </Link>
      ) : (
        <Link
          href={basePath}
          className={`flex-1 p-4 rounded-xl border border-gray-800 transition-colors ${hoverClass} group text-right`}
        >
          <span className="text-xs text-gray-500 group-hover:text-gray-400">コース一覧へ &#8594;</span>
          <p className="text-sm font-semibold text-white mt-1 truncate">トップに戻る</p>
        </Link>
      )}
    </div>
  );
}
