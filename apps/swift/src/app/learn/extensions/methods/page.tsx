import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "extensions")!.lessons;

export default function MethodsExtPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">エクステンション レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッドの追加</h1>
        <p className="text-gray-400">extensionを使って既存の型にインスタンスメソッドや型メソッドを追加します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドの追加</h2>
        <p className="text-gray-300 mb-3">
          extensionでは通常のメソッド（インスタンスメソッド・型メソッド）を追加できます。
          値型（struct・enum）のインスタンスを変更するメソッドには
          <code className="text-cyan-300">mutating</code> キーワードが必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>インスタンスメソッド・型メソッド（static func）両方追加可能</li>
          <li>値型を変更するメソッドには mutating が必要</li>
          <li>既存メソッドのオーバーロードも可能</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Array にメソッドを追加</h2>
        <SwiftEditor
          defaultCode={`extension Array {
    func chunked(into size: Int) -> [[Element]] {
        stride(from: 0, to: count, by: size).map {
            Array(self[$0..<Swift.min($0 + size, count)])
        }
    }

    func second() -> Element? {
        count >= 2 ? self[1] : nil
    }
}

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let chunks = numbers.chunked(into: 3)
for chunk in chunks {
    print(chunk)
}

print(numbers.second() ?? "nil")`}
          expectedOutput={`[1, 2, 3]
[4, 5, 6]
[7, 8, 9]
2`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: mutatingメソッドの追加</h2>
        <SwiftEditor
          defaultCode={`extension Int {
    mutating func square() {
        self = self * self
    }

    static func random(in range: ClosedRange<Int>) -> Int {
        Int.random(in: range)
    }
}

var n = 5
n.square()
print(n)

extension String {
    mutating func addPrefix(_ prefix: String) {
        self = prefix + self
    }
    mutating func addSuffix(_ suffix: String) {
        self = self + suffix
    }
}

var greeting = "World"
greeting.addPrefix("Hello, ")
greeting.addSuffix("!")
print(greeting)`}
          expectedOutput={`25
Hello, World!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="methods" />
      </div>
      <LessonNav lessons={lessons} currentId="methods" basePath="/learn/extensions" />
    </div>
  );
}
