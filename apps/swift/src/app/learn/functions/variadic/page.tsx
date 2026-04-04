import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function VariadicPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">可変長引数</h1>
        <p className="text-gray-400">...を使って任意の数の引数を受け取れる可変長引数関数を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">可変長引数（Variadic Parameters）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型名の後に <code className="text-teal-300">...</code> を付けると可変長引数になります。
          関数内では配列として扱われます。
          1つの関数に複数の可変長引数は持てませんが、他の引数と組み合わせられます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">func f(_ nums: Int...)</code> — 0個以上のIntを受け取る</li>
          <li>関数内では <code className="text-teal-300">nums</code> は <code className="text-teal-300">[Int]</code> として扱われる</li>
          <li>配列を渡すことはできない（展開は不可）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 可変長引数の基本</h2>
        <SwiftEditor
          defaultCode={`func sum(_ numbers: Int...) -> Int {
    return numbers.reduce(0, +)
}

print(sum(1, 2, 3))
print(sum(10, 20, 30, 40, 50))
print(sum())  // 0個でもOK

func average(_ numbers: Double...) -> Double {
    guard !numbers.isEmpty else { return 0 }
    return numbers.reduce(0, +) / Double(numbers.count)
}

print(average(3.0, 7.0, 5.0, 9.0, 1.0))`}
          expectedOutput={`6
150
0
5.0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">他の引数との組み合わせ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          可変長引数は他の引数と組み合わせて使えます。
          可変長引数の後に通常の引数を置く場合は、呼び出し時にラベルが必要です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 他の引数との組み合わせ</h2>
        <SwiftEditor
          defaultCode={`func printAll(_ items: String..., separator: String = ", ") {
    print(items.joined(separator: separator))
}

printAll("Apple", "Banana", "Cherry")
printAll("Red", "Green", "Blue", separator: " | ")

func log(level: String, _ messages: String...) {
    let combined = messages.joined(separator: " ")
    print("[\\(level)] \\(combined)")
}

log(level: "INFO", "アプリ", "起動しました")
log(level: "ERROR", "接続", "に", "失敗しました")`}
          expectedOutput={`Apple, Banana, Cherry
Red | Green | Blue
[INFO] アプリ 起動しました
[ERROR] 接続 に 失敗しました`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="variadic" />
      </div>
      <LessonNav lessons={lessons} currentId="variadic" basePath="/learn/functions" />
    </div>
  );
}
