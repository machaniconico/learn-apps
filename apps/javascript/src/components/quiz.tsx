"use client";

import { useState } from "react";

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  color?: string;
}

export function Quiz({ questions, color = "indigo" }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  if (!questions.length) return null;
  const q = questions[current];

  const colorMap: Record<string, { accent: string; bg: string; border: string }> = {
    orange: { accent: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/50" },
    blue: { accent: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/50" },
    yellow: { accent: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/50" },
    green: { accent: "text-green-400", bg: "bg-green-500/20", border: "border-green-500/50" },
    purple: { accent: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/50" },
    red: { accent: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/50" },
    cyan: { accent: "text-cyan-400", bg: "bg-cyan-500/20", border: "border-cyan-500/50" },
    pink: { accent: "text-pink-400", bg: "bg-pink-500/20", border: "border-pink-500/50" },
    teal: { accent: "text-teal-400", bg: "bg-teal-500/20", border: "border-teal-500/50" },
    violet: { accent: "text-violet-400", bg: "bg-violet-500/20", border: "border-violet-500/50" },
    indigo: { accent: "text-indigo-400", bg: "bg-indigo-500/20", border: "border-indigo-500/50" },
  };
  const c = colorMap[color] ?? colorMap.indigo;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === q.answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className={`text-xl font-bold mb-4 ${c.accent}`}>クイズ結果</h2>
        <div className="text-center py-6">
          <p className="text-4xl font-extrabold text-white mb-2">
            {score} / {questions.length}
          </p>
          <p className="text-gray-400 mb-1">{pct}% 正解</p>
          <p className="text-lg mt-2">
            {pct === 100 ? "パーフェクト！" : pct >= 80 ? "すばらしい！" : pct >= 60 ? "いい感じ！" : "もう一度挑戦しよう！"}
          </p>
          <button
            onClick={handleReset}
            className={`mt-6 px-6 py-2.5 rounded-lg ${c.bg} ${c.accent} font-semibold text-sm hover:opacity-80 transition-opacity`}
          >
            もう一度挑戦する
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold ${c.accent}`}>確認クイズ</h2>
        <span className="text-sm text-gray-500">
          {current + 1} / {questions.length}
        </span>
      </div>

      <p className="text-white font-medium mb-4">{q.question}</p>

      <div className="space-y-2 mb-4">
        {q.options.map((option, i) => {
          let optionClass = "border-gray-700 hover:border-gray-600";
          if (answered) {
            if (i === q.answer) {
              optionClass = "border-emerald-500/50 bg-emerald-500/10";
            } else if (i === selected && i !== q.answer) {
              optionClass = "border-red-500/50 bg-red-500/10";
            } else {
              optionClass = "border-gray-800 opacity-50";
            }
          } else if (i === selected) {
            optionClass = `${c.border} ${c.bg}`;
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors text-sm ${optionClass}`}
            >
              <span className="text-gray-500 mr-3 font-mono text-xs">
                {String.fromCharCode(65 + i)}.
              </span>
              <span className="text-gray-300">{option}</span>
            </button>
          );
        })}
      </div>

      {answered && q.explanation && (
        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700 mb-4">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-gray-300">解説: </span>
            {q.explanation}
          </p>
        </div>
      )}

      {answered && (
        <button
          onClick={handleNext}
          className={`px-5 py-2 rounded-lg ${c.bg} ${c.accent} font-semibold text-sm hover:opacity-80 transition-opacity`}
        >
          {current + 1 >= questions.length ? "結果を見る" : "次の問題"}
        </button>
      )}
    </section>
  );
}
