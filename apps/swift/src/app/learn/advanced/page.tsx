import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "advanced")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "@resultBuilder を使う主な目的はどれですか？",
    options: [
      "プロパティに初期値を与える",
      "ドメイン固有言語（DSL）を構築する",
      "非同期処理を管理する",
      "メモリ解放を制御する",
    ],
    answer: 1,
    explanation: "@resultBuilder はSwiftUIのViewBuilderのようなDSLを実装するための機能です。",
  },
  {
    question: "some Protocol（opaque型）と any Protocol（existential型）の主な違いは何ですか？",
    options: [
      "some は実行時に型が決まり、any はコンパイル時に型が決まる",
      "some はコンパイル時に具体型が固定され、any は実行時に異なる型を保持できる",
      "some はクラスにのみ使え、any は構造体にのみ使える",
      "違いはなく同義である",
    ],
    answer: 1,
    explanation: "some（opaque型）はコンパイル時に具体型が1つに固定されます。any（existential）は実行時に異なる型の値を保持できますが、パフォーマンスコストがあります。",
  },
  {
    question: "KeyPath<Person, String> が表すものはどれですか？",
    options: [
      "Person型のインスタンスを返す関数",
      "Person型のString型プロパティへの参照",
      "PersonとStringを比較する演算子",
      "Person型のStringの配列",
    ],
    answer: 1,
    explanation: "KeyPath<Root, Value> はRoot型のValue型プロパティへの型安全な参照を表します。",
  },
];

export default function AdvancedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-red-400">{category.name}</h1>
          <DifficultyBadge difficulty={category.difficulty} />
          <span className="text-sm text-gray-500">{category.lessons.length} レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Swiftの上級機能を習得しましょう。Result Builder によるDSL構築、Swift Macros、
          KeyPathによる型安全なプロパティアクセス、opaque型とexistential型の違い、
          そしてメタタイプの活用まで、Swiftの深い部分を探求します。
        </p>
        <ProgressBar categoryId="advanced" totalLessons={category.lessons.length} color="red" />
      </div>

      {/* Lesson List */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-4">レッスン一覧</h2>
        <LessonList lessons={category.lessons} basePath="/learn/advanced" color="red" categoryId="advanced" />
      </section>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-100">コード例</h2>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">@resultBuilder の例</h3>
          <SwiftEditor
            defaultCode={`@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ components: String...) -> String {
        components.joined(separator: "\\n")
    }
}

func html(@HTMLBuilder content: () -> String) -> String {
    "<html>\\n\\(content())\\n</html>"
}

let page = html {
    "<head><title>Swift</title></head>"
    "<body><p>Hello, Result Builder!</p></body>"
}

print(page)`}
            height="240px"
            expectedOutput="<html>\n<head><title>Swift</title></head>\n<body><p>Hello, Result Builder!</p></body>\n</html>"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">KeyPath の活用</h3>
          <SwiftEditor
            defaultCode={`struct Person {
    let name: String
    let age: Int
}

let people = [
    Person(name: "Alice", age: 30),
    Person(name: "Bob", age: 25),
    Person(name: "Charlie", age: 35),
]

// KeyPath を使ってソート
let sorted = people.sorted(by: \\.age)
sorted.forEach { print("\\($0.name): \\($0.age)") }
// Bob: 25
// Alice: 30
// Charlie: 35

// map に KeyPath を渡す
let names = people.map(\\.name)
print(names)  // ["Alice", "Bob", "Charlie"]`}
            height="260px"
            expectedOutput={"Bob: 25\nAlice: 30\nCharlie: 35\n[\"Alice\", \"Bob\", \"Charlie\"]"}
          />
        </div>
      </section>

      {/* Quiz */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-2">確認クイズ</h2>
        <Quiz questions={quizQuestions} color="red" />
      </section>
    </div>
  );
}
