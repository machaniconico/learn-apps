import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "generics")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "ジェネリック関数で型パラメータを宣言するにはどうしますか？",
    options: [
      "関数名の後に<T>を付ける",
      "引数の前にgenericを付ける",
      "戻り値の型にAnyを使う",
      "typealiasを使う",
    ],
    answer: 0,
    explanation: "func myFunc<T>(_ value: T) のように、関数名の後に山括弧 <T> で型パラメータを宣言します。",
  },
  {
    question: "型制約でEquatableプロトコルに準拠させるにはどう書きますか？",
    options: [
      "func equal<T where T: Equatable>",
      "func equal<T: Equatable>",
      "func equal<T implements Equatable>",
      "func equal<T is Equatable>",
    ],
    answer: 1,
    explanation: "func equal<T: Equatable>(_ a: T, _ b: T) -> Bool のようにコロンで型制約を指定します。",
  },
  {
    question: "Swiftの標準ライブラリで最もよく使われるジェネリック型はどれですか？",
    options: ["NSObject", "Array<Element>", "Foundation", "UIView"],
    answer: 1,
    explanation: "Array<Element> はジェネリック型の代表例で、Element が型パラメータです。[Int] は Array<Int> の糖衣構文です。",
  },
  {
    question: "where句をジェネリクスで使う目的は何ですか？",
    options: [
      "ループを条件分岐させる",
      "複数の型制約や型の等価性を表現する",
      "オプショナルを安全にアンラップする",
      "クロージャをエスケープさせる",
    ],
    answer: 1,
    explanation: "where T: Equatable, T: Hashable のように複数制約や、T == U.Element のような型の等価性を where 句で表現します。",
  },
];

export default function GenericsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">ジェネリクス</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">{lessons.length}レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          ジェネリクスは型に依存しない柔軟で再利用可能なコードを書くための機能です。
          {"<T>"} による型パラメータ、型制約、ジェネリック型の定義、associated typeとの組み合わせ、
          where句による複雑な制約表現まで、Swiftの型システムの核心を学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="generics" totalLessons={lessons.length} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全{lessons.length}レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/generics" color="blue" categoryId="generics" />
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例</h2>
        <SwiftEditor
          defaultCode={`// ジェネリック関数
func swap<T>(_ a: inout T, _ b: inout T) {
    let temp = a
    a = b
    b = temp
}

var x = 10, y = 20
swap(&x, &y)
print("x=\\(x), y=\\(y)")

// 型制約付きジェネリック関数
func findMax<T: Comparable>(_ array: [T]) -> T? {
    guard !array.isEmpty else { return nil }
    return array.max()
}

print(findMax([3, 1, 4, 1, 5, 9]) ?? "nil")
print(findMax(["banana", "apple", "cherry"]) ?? "nil")

// ジェネリック型
struct Stack<Element> {
    private var items: [Element] = []
    mutating func push(_ item: Element) { items.append(item) }
    mutating func pop() -> Element? { items.popLast() }
    var top: Element? { items.last }
}

var stack = Stack<Int>()
stack.push(1); stack.push(2); stack.push(3)
print(stack.pop() ?? 0)`}
          expectedOutput={`x=20, y=10
9
cherry
3`}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
