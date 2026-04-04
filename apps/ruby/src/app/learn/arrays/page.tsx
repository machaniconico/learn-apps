import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "arrays")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyで配列を作成する正しい方法はどれですか？",
    options: ["Array(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)"],
    answer: 1,
    explanation: "Rubyでは [] リテラルで配列を作成します。",
  },
  {
    question: "%w[] リテラルは何を作成しますか？",
    options: ["数値の配列", "文字列の配列", "シンボルの配列", "ハッシュ"],
    answer: 1,
    explanation: "%w[] は文字列の配列を簡単に作成するリテラルです。",
  },
  {
    question: "配列の末尾に要素を追加するメソッドはどれですか？",
    options: ["unshift", "shift", "push", "pop"],
    answer: 2,
    explanation: "push は配列の末尾に要素を追加します。<<演算子も同様に使えます。",
  },
  {
    question: "Array.new(3, 0) の結果はどれですか？",
    options: ["[3, 0]", "[0, 0, 0]", "[1, 2, 3]", "[3, 3, 3]"],
    answer: 1,
    explanation: "Array.new(size, default) は指定サイズのデフォルト値で埋めた配列を作成します。",
  },
];

export default function ArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">配列</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Rubyの配列はオブジェクトの順序付きリストです。[] リテラルや %w[] を使った作成方法から、push/pop/shift/unshift による要素操作、each/map/select によるイテレーション、sort/sort_by によるソートまで幅広く学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="arrays" totalLessons={7} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/arrays" color="green" categoryId="arrays" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">配列の基本を試してみよう</h2>
        <RubyEditor
          defaultCode={`# 配列の作成
fruits = ["apple", "banana", "cherry"]
puts fruits[0]
puts fruits.length

# %w[] リテラル
colors = %w[red green blue]
puts colors.inspect

# Array.new
zeros = Array.new(3, 0)
puts zeros.inspect`}
          expectedOutput={`apple
3
["red", "green", "blue"]
[0, 0, 0]`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="green" />
      </section>
    </div>
  );
}
