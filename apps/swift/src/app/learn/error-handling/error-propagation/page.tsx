import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "error-handling")!.lessons;

export default function ErrorPropagationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラーハンドリング レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラーの伝播</h1>
        <p className="text-gray-400">rethrowsによってクロージャのエラーを上流に伝播させる仕組みを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">rethrows とは</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-orange-300">rethrows</code> を付けた関数は、
          引数として受け取るクロージャがエラーをスローする場合にのみ自身もエラーをスローします。
          クロージャがスローしない場合は通常の非スロー関数として使えます。
          Swiftの <code className="text-orange-300">map</code>・<code className="text-orange-300">filter</code> などが rethrows を使っています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">func f(_ closure: () throws -{">"} T) rethrows</code> の構文</li>
          <li>クロージャがスローしない場合は try 不要</li>
          <li>クロージャがスローする場合は try が必要</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: rethrowsの基本</h2>
        <SwiftEditor
          defaultCode={`enum TransformError: Error {
    case negative
}

// rethrows: クロージャがスローするときだけスロー
func transform<T, U>(_ value: T, using closure: (T) throws -> U) rethrows -> U {
    try closure(value)
}

// スローしないクロージャ → try 不要
let doubled = transform(5) { $0 * 2 }
print(doubled)

// スローするクロージャ → try が必要
do {
    let result = try transform(-3) { (n: Int) throws -> Int in
        if n < 0 { throw TransformError.negative }
        return n * 2
    }
    print(result)
} catch TransformError.negative {
    print("負の数はエラー")
}`}
          expectedOutput={`10
負の数はエラー`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: map・filter の rethrows</h2>
        <SwiftEditor
          defaultCode={`enum ConversionError: Error {
    case notANumber(String)
}

func toInt(_ s: String) throws -> Int {
    guard let n = Int(s) else {
        throw ConversionError.notANumber(s)
    }
    return n
}

// Array.map は rethrows なので、スロークロージャで try が必要
let strings = ["1", "2", "3", "4", "5"]
do {
    // throwing クロージャを渡すので try が必要
    let numbers = try strings.map { try toInt($0) }
    print(numbers)
} catch ConversionError.notANumber(let s) {
    print("変換失敗: \\(s)")
}

// エラーが出るケース
let mixed = ["1", "two", "3"]
do {
    let nums = try mixed.map { try toInt($0) }
    print(nums)
} catch ConversionError.notANumber(let s) {
    print("変換失敗: '\\(s)'")
}

// スローしないクロージャ → try 不要
let doubled = strings.map { ($0 as NSString).integerValue * 2 }
print(doubled)`}
          expectedOutput={`[1, 2, 3, 4, 5]
変換失敗: 'two'
[2, 4, 6, 8, 10]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="error-handling" lessonId="error-propagation" />
      </div>
      <LessonNav lessons={lessons} currentId="error-propagation" basePath="/learn/error-handling" />
    </div>
  );
}
