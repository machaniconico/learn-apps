import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "basics")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Swiftで変数を宣言するキーワードはどれですか？",
    options: ["let", "var", "const", "def"],
    answer: 1,
    explanation: "varは変更可能な変数を宣言します。letは変更できない定数に使います。",
  },
  {
    question: "Swiftで定数を宣言するキーワードはどれですか？",
    options: ["var", "const", "let", "final"],
    answer: 2,
    explanation: "letは変更不可能な定数を宣言します。一度値を設定したら変更できません。",
  },
  {
    question: "Swiftの文字列補間の正しい書き方は？",
    options: ["\"Hello ${name}\"", "\"Hello \\(name)\"", "\"Hello %s\" % name", "f\"Hello {name}\""],
    answer: 1,
    explanation: "Swiftの文字列補間は \\(変数名) の形式を使います。",
  },
  {
    question: "Int型とDouble型を足し算するには何が必要ですか？",
    options: ["何も不要、自動変換される", "明示的な型変換が必要", "as演算子を使う", "型は関係ない"],
    answer: 1,
    explanation: "Swiftは型安全な言語です。異なる数値型を演算するには Double(intValue) のように明示的に変換する必要があります。",
  },
];

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">Swift基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">12レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Swiftプログラミングの基礎を学びます。Hello Worldから変数・定数・データ型・型アノテーション・演算子・print関数まで、
          Swiftの基本的な構文と概念をしっかりカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="basics" totalLessons={12} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全12レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/basics" color="blue" categoryId="basics" />
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: 変数・定数・print関数</h2>
        <SwiftEditor
          defaultCode={`// 変数と定数
var greeting = "Hello"
let name = "Swift"
greeting = "Hi"  // varは変更可能

// print関数と文字列補間
print("\\(greeting), \\(name)!")

// 型アノテーション
let age: Int = 3
let version: Double = 5.9
print("Swift \\(version), \\(age)年目")`}
          expectedOutput={`Hi, Swift!
Swift 5.9, 3年目`}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
