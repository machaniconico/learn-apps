import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goで繰り返し処理に使うキーワードは？",
    options: ["while", "for", "loop", "each"],
    answer: 1,
    explanation: "Goにはforループしかありません。whileやdo-whileはありません。",
  },
  {
    question: "switch文でfallthroughしたい場合に使うキーワードは？",
    options: ["continue", "break", "fallthrough", "pass"],
    answer: 2,
    explanation: "Goのswitchはデフォルトでbreakされます。fallthroughキーワードで次のcaseに落ちます。",
  },
  {
    question: "for rangeでスライスを走査するとき、受け取る値は？",
    options: ["値のみ", "インデックスのみ", "インデックスと値", "長さと値"],
    answer: 2,
    explanation: "for i, v := range slice で、インデックスと値の両方を受け取れます。",
  },
  {
    question: "無限ループの正しい書き方は？",
    options: ["while(true) {}", "for(;;) {}", "for {}", "loop {}"],
    answer: 2,
    explanation: "Goでは for {} で無限ループを表現します。条件部分を省略します。",
  },
];

export default function ControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">制御構文</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">10レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goの制御構文を学びます。if-else条件分岐、switch文、forループ、
          range走査、break・continueなど、プログラムの流れを制御する方法をカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="control" totalLessons={10} color="cyan" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/control" color="cyan" categoryId="control" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件分岐とループ</h2>
        <p className="text-gray-400 mb-4">
          Goの <code className="text-cyan-300">if</code> は括弧が不要で、
          <code className="text-cyan-300">for</code> はGoの唯一のループ構文です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // if-else
    score := 85
    if score >= 90 {
        fmt.Println("優秀！")
    } else if score >= 70 {
        fmt.Println("良好！")
    } else {
        fmt.Println("もう少し！")
    }

    // forループ
    for i := 1; i <= 3; i++ {
        fmt.Printf("カウント: %d\\n", i)
    }
}`}
          expectedOutput={`良好！
カウント: 1
カウント: 2
カウント: 3`}
        />
      </section>
      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
