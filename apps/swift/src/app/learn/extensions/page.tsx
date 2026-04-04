import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "extensions")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Swiftでエクステンションを定義するキーワードはどれですか？",
    options: ["extend", "extension", "mixin", "augment"],
    answer: 1,
    explanation: "extension キーワードを使って既存の型に機能を追加します。",
  },
  {
    question: "エクステンションでできないことはどれですか？",
    options: [
      "算出プロパティの追加",
      "ストアドプロパティの追加",
      "メソッドの追加",
      "プロトコル準拠の追加",
    ],
    answer: 1,
    explanation: "エクステンションではストアドプロパティを追加することはできません。算出プロパティは追加可能です。",
  },
  {
    question: "条件付き拡張で使うキーワードはどれですか？",
    options: ["if", "when", "where", "guard"],
    answer: 2,
    explanation: "extension Array where Element: Comparable のように where 句を使って条件付き拡張を行います。",
  },
  {
    question: "エクステンションで既存の型にプロトコルを採用させることを何と呼びますか？",
    options: [
      "プロトコル継承",
      "後付けプロトコル準拠（Retroactive Conformance）",
      "プロトコル拡張",
      "プロトコル合成",
    ],
    answer: 1,
    explanation: "後付けプロトコル準拠（Retroactive Conformance）は、既存の型（標準ライブラリの型を含む）にプロトコルを採用させる技法です。",
  },
];

export default function ExtensionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">エクステンション</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">{lessons.length}レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          エクステンションは既存の型に新しい機能を追加する強力な仕組みです。
          算出プロパティ・メソッド・イニシャライザの追加から、プロトコル準拠の後付け、
          where句を使った条件付き拡張まで、Swiftの表現力を高めるテクニックを習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="extensions" totalLessons={lessons.length} color="cyan" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全{lessons.length}レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/extensions" color="cyan" categoryId="extensions" />
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例</h2>
        <SwiftEditor
          defaultCode={`// Int に算出プロパティとメソッドを追加
extension Int {
    var isEven: Bool { self % 2 == 0 }
    var isOdd: Bool { !isEven }
    func times(_ action: () -> Void) {
        for _ in 0..<self { action() }
    }
}

print(4.isEven)   // true
print(7.isOdd)    // true

var count = 0
3.times { count += 1 }
print("count: \\(count)")

// String にコンビニエンスイニシャライザ追加
extension String {
    init(repeating char: Character, count: Int) {
        self = String(repeating: char, count: count)
    }
}

let stars = String(repeating: "*", count: 5)
print(stars)`}
          expectedOutput={`true
true
count: 3
*****`}
        />
      </section>
      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
