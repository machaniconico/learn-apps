import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "strings")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Swiftの文字列補間の正しい構文は？",
    options: ["\"Hello ${name}\"", "\"Hello \\(name)\"", "\"Hello %(name)\"", "\"Hello {name}\""],
    answer: 1,
    explanation: "Swiftでは \\(式) の形式で文字列内に値や式を埋め込めます。",
  },
  {
    question: "Swiftの文字列はどのような型ですか？",
    options: ["参照型（クラス）", "値型（構造体）", "プロトコル", "列挙型"],
    answer: 1,
    explanation: "SwiftのStringは値型（構造体）です。代入や関数引数への渡しでコピーされます。",
  },
  {
    question: "複数行文字列リテラルを作るには？",
    options: ["\"\"で囲む", "\"\"\"で囲む", "backtickで囲む", "@\"で始める"],
    answer: 1,
    explanation: "\"\"\"（三重引用符）で囲むことで複数行にわたる文字列を書けます。",
  },
  {
    question: "文字列が空かどうかを確認するには？",
    options: ["str.length == 0", "str.count == 0 または str.isEmpty", "str == null", "str.empty()"],
    answer: 1,
    explanation: "isEmptyプロパティまたはcount == 0で文字列が空かどうかを確認できます。isEmptyの方がパフォーマンスが良いです。",
  },
];

export default function StringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">文字列操作</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Swiftの文字列操作を学びます。文字列補間・メソッド・部分文字列・Unicode対応・複数行リテラルまで、
          Swiftの強力な文字列処理を理解しましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="strings" totalLessons={6} color="purple" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/strings" color="purple" categoryId="strings" />
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: 文字列操作</h2>
        <SwiftEditor
          defaultCode={`// 文字列補間
let name = "Swift"
let version = 5.9
print("\\(name) \\(version)へようこそ！")

// 文字列メソッド
let message = "  Hello, World!  "
print(message.trimmingCharacters(in: .whitespaces))
print(message.uppercased())

// 複数行文字列
let poem = """
薔薇は赤く
スミレは青い
Swiftは楽しい
"""
print(poem)`}
          expectedOutput={`Swift 5.9へようこそ！
Hello, World!
  HELLO, WORLD!
薔薇は赤く
スミレは青い
Swiftは楽しい`}
        />
      </section>
      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
