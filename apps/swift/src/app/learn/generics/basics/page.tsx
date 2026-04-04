import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "generics")!.lessons;

export default function GenericsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ジェネリクス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリクスの基本</h1>
        <p className="text-gray-400">型パラメータ{"<T>"}を使って型に依存しない汎用コードを書きます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクスとは</h2>
        <p className="text-gray-300 mb-3">
          ジェネリクスは型安全さを保ちながら、あらゆる型で動作する柔軟なコードを書く仕組みです。
          <code className="text-blue-300">{"<T>"}</code> のような型パラメータを使って、
          具体的な型をあとで決定できます。Swiftの Array・Dictionary・Optional はすべてジェネリック型です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>型パラメータは慣例的に <code className="text-blue-300">T</code>・<code className="text-blue-300">U</code>・<code className="text-blue-300">Element</code> などを使う</li>
          <li>複数の型パラメータはカンマ区切りで指定 <code className="text-blue-300">{"<K, V>"}</code></li>
          <li>Any を使うより型安全で高パフォーマンス</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 型パラメータの基本</h2>
        <SwiftEditor
          defaultCode={`// 非ジェネリック版（型ごとに関数が必要）
func swapInts(_ a: inout Int, _ b: inout Int) {
    let temp = a; a = b; b = temp
}

// ジェネリック版（あらゆる型で動作）
func swapValues<T>(_ a: inout T, _ b: inout T) {
    let temp = a; a = b; b = temp
}

var x = 10, y = 20
swapValues(&x, &y)
print("x=\\(x), y=\\(y)")

var hello = "Hello", world = "World"
swapValues(&hello, &world)
print("\\(hello), \\(world)")

var pi = 3.14, e = 2.72
swapValues(&pi, &e)
print("pi=\\(pi), e=\\(e)")`}
          expectedOutput={`x=20, y=10
World, Hello
pi=2.72, e=3.14`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数の型パラメータ</h2>
        <SwiftEditor
          defaultCode={`// 2つの型パラメータ
func printPair<K, V>(_ key: K, _ value: V) {
    print("\\(key): \\(value)")
}

printPair("name", "Swift")
printPair(1, true)
printPair("count", 42)

// ジェネリックなPair型
struct Pair<First, Second> {
    var first: First
    var second: Second

    func swapped() -> Pair<Second, First> {
        Pair<Second, First>(first: second, second: first)
    }
}

let pair = Pair(first: "hello", second: 42)
print("\\(pair.first), \\(pair.second)")

let swapped = pair.swapped()
print("\\(swapped.first), \\(swapped.second)")`}
          expectedOutput={`name: Swift
1: true
count: 42
hello, 42
42, hello`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/generics" />
    </div>
  );
}
