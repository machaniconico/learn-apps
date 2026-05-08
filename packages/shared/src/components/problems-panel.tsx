"use client";

interface LintMessage {
  line: number;
  col: number;
  message: string;
  type: "error" | "warning";
}

interface ProblemsPanelProps {
  problems: LintMessage[];
  runtimeErrors?: string[];
}

export function ProblemsPanel({
  problems,
  runtimeErrors = [],
}: ProblemsPanelProps) {
  const total = problems.length + runtimeErrors.length;
  if (total === 0) return null;

  return (
    <div className="border-t border-gray-700 bg-[#0d1117]">
      <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Problems
        </span>
        <span className="text-[11px] rounded-full bg-red-500/20 text-red-400 px-1.5 py-0.5 font-mono">
          {total}
        </span>
      </div>
      <div className="max-h-[140px] overflow-auto px-2 py-1.5 font-mono text-xs">
        {problems.map((p, i) => (
          <div
            key={`lint-${i}`}
            className="flex items-start gap-2 py-1 px-2 rounded hover:bg-slate-800/50"
          >
            <span
              className={`shrink-0 mt-0.5 ${p.type === "error" ? "text-red-400" : "text-amber-400"}`}
            >
              {p.type === "error" ? "\u25cf" : "\u25b2"}
            </span>
            <span className="text-slate-300 flex-1">{p.message}</span>
            <span className="text-slate-600 shrink-0">
              [Ln {p.line}, Col {p.col}]
            </span>
          </div>
        ))}
        {runtimeErrors.map((err, i) => (
          <div
            key={`rt-${i}`}
            className="flex items-start gap-2 py-1 px-2 rounded hover:bg-slate-800/50"
          >
            <span className="shrink-0 mt-0.5 text-red-400">{"\u25cf"}</span>
            <span className="text-slate-300 flex-1">{err}</span>
            <span className="text-slate-600 shrink-0">[Runtime]</span>
          </div>
        ))}
      </div>
    </div>
  );
}
