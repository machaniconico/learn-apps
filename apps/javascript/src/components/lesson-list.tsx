import Link from "next/link";
import type { Lesson } from "@/lib/lessons-data";

interface LessonListProps {
  lessons: Lesson[];
  basePath: string;
  color: string;
}

export function LessonList({ lessons, basePath, color }: LessonListProps) {
  const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
    orange: { border: "border-orange-500/30", bg: "hover:bg-orange-500/10", text: "text-orange-400", badge: "bg-orange-500/20 text-orange-400" },
    blue: { border: "border-blue-500/30", bg: "hover:bg-blue-500/10", text: "text-blue-400", badge: "bg-blue-500/20 text-blue-400" },
    yellow: { border: "border-yellow-500/30", bg: "hover:bg-yellow-500/10", text: "text-yellow-400", badge: "bg-yellow-500/20 text-yellow-400" },
    green: { border: "border-green-500/30", bg: "hover:bg-green-500/10", text: "text-green-400", badge: "bg-green-500/20 text-green-400" },
    purple: { border: "border-purple-500/30", bg: "hover:bg-purple-500/10", text: "text-purple-400", badge: "bg-purple-500/20 text-purple-400" },
    red: { border: "border-red-500/30", bg: "hover:bg-red-500/10", text: "text-red-400", badge: "bg-red-500/20 text-red-400" },
    cyan: { border: "border-cyan-500/30", bg: "hover:bg-cyan-500/10", text: "text-cyan-400", badge: "bg-cyan-500/20 text-cyan-400" },
    pink: { border: "border-pink-500/30", bg: "hover:bg-pink-500/10", text: "text-pink-400", badge: "bg-pink-500/20 text-pink-400" },
    teal: { border: "border-teal-500/30", bg: "hover:bg-teal-500/10", text: "text-teal-400", badge: "bg-teal-500/20 text-teal-400" },
    violet: { border: "border-violet-500/30", bg: "hover:bg-violet-500/10", text: "text-violet-400", badge: "bg-violet-500/20 text-violet-400" },
    indigo: { border: "border-indigo-500/30", bg: "hover:bg-indigo-500/10", text: "text-indigo-400", badge: "bg-indigo-500/20 text-indigo-400" },
  };
  const c = colorMap[color] ?? colorMap.orange;

  return (
    <div className="space-y-2">
      {lessons.map((lesson) => (
        <Link
          key={lesson.id}
          href={`${basePath}/${lesson.id}`}
          className={`flex items-center gap-4 p-4 rounded-xl border ${c.border} ${c.bg} transition-colors group`}
        >
          <span className={`w-8 h-8 rounded-lg ${c.badge} flex items-center justify-center text-sm font-bold shrink-0`}>
            {lesson.order}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm group-hover:text-white/90 truncate">
              {lesson.title}
            </h3>
            <p className="text-gray-500 text-xs truncate">{lesson.description}</p>
          </div>
          <span className="text-gray-600 text-lg">&#8594;</span>
        </Link>
      ))}
    </div>
  );
}
