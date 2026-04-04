import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "numbers")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyで整数の割り算 7 / 2 の結果はどれですか？",
    options: ["3.5", "3", "4", "3.0"],
    answer: 1,
    explanation: "整数同士の割り算は整数除算となり、小数点以下は切り捨てられます。浮動小数点を得るには 7.0 / 2 とします。",
  },
  {
    question: "Math.sqrt(16) の戻り値の型はどれですか？",
    options: ["Integer", "Float", "Rational", "Complex"],
    answer: 1,
    explanation: "Math モジュールのメソッドは常に Float を返します。",
  },
  {
    question: "Rational(1, 3) は何を表しますか？",
    options: ["0.333...", "1/3 の有理数オブジェクト", "1と3の配列", "エラー"],
    answer: 1,
    explanation: "Rational は分数を正確に表現する有理数クラスです。Rational(1,3) は 1/3 を正確に保持します。",
  },
  {
    question: "SecureRandom の主な用途はどれですか？",
    options: [
      "数学計算",
      "暗号論的に安全な乱数生成",
      "整数変換",
      "浮動小数点精度の向上",
    ],
    answer: 1,
    explanation: "SecureRandom はトークンやパスワード生成など、セキュリティ要件のある乱数生成に使います。",
  },
];

export default function NumbersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">数値と演算</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Rubyの数値型を体系的に学びます。Integer の times/upto などのメソッド、Float の精度と注意点、Rational と Complex による精密計算、Math モジュールの数学関数、rand/Random/SecureRandom による乱数生成まで幅広くカバーします。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="numbers" totalLessons={6} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/numbers" color="green" categoryId="numbers" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">数値演算を試してみよう</h2>
        <RubyEditor
          defaultCode={`# 整数メソッド
3.times { |i| puts "Count: #{i}" }

# 数学演算
puts 2 ** 10
puts 17 % 5
puts Math.sqrt(144)

# 有理数
r = Rational(1, 3)
puts r
puts (r + Rational(1, 6))`}
          expectedOutput={`Count: 0
Count: 1
Count: 2
1024
2
12.0
1/3
1/2`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="green" />
      </section>
    </div>
  );
}
