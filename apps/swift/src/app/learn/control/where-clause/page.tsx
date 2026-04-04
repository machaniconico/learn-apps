import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function WhereClausePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">where句</h1>
        <p className="text-gray-400">条件付きパターンマッチングを実現するwhere句の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">where句とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">where</code> 句はパターンマッチングに追加の条件を付けるために使います。
          <code className="text-cyan-300">for-in</code> ループや <code className="text-cyan-300">switch</code> 文の <code className="text-cyan-300">case</code> に付けられます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">for x in array where x {">"} 0</code> — 条件に合う要素だけ処理</li>
          <li><code className="text-cyan-300">case let x where x % 2 == 0</code> — switchで条件付きマッチ</li>
          <li>コードをより表現力豊かに書ける</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: for-inでのwhere句</h2>
        <SwiftEditor
          defaultCode={`let numbers = [1, -3, 5, -2, 8, -7, 4, 0, 6]

// where句でフィルタリング
print("正の数:")
for n in numbers where n > 0 {
    print(n, terminator: " ")
}
print("")

// 複数条件
print("偶数かつ正の数:")
for n in numbers where n > 0 && n % 2 == 0 {
    print(n, terminator: " ")
}
print("")

// 文字列のフィルタリング
let words = ["Swift", "is", "awesome", "programming", "fun"]
print("5文字以上の単語:")
for word in words where word.count >= 5 {
    print(word)
}`}
          expectedOutput={`正の数:
1 5 8 4 6
偶数かつ正の数:
8 4 6
5文字以上の単語:
Swift
awesome
programming`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switch文でのwhere句</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          switch文のcaseにwhere句を付けることで、より細かいパターンマッチングができます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: switchでのwhere句</h2>
        <SwiftEditor
          defaultCode={`// switchとwhere句
for number in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] {
    switch number {
    case let n where n % 3 == 0 && n % 5 == 0:
        print("\\(n): FizzBuzz")
    case let n where n % 3 == 0:
        print("\\(n): Fizz")
    case let n where n % 5 == 0:
        print("\\(n): Buzz")
    default:
        print("\\(number)")
    }
}`}
          expectedOutput={`1
2
3: Fizz
4
5: Buzz
6: Fizz
7
8
9: Fizz
10: Buzz`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="where-clause" />
      </div>
      <LessonNav lessons={lessons} currentId="where-clause" basePath="/learn/control" />
    </div>
  );
}
