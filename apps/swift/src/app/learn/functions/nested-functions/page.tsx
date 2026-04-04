import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function NestedFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ネスト関数</h1>
        <p className="text-gray-400">関数の中に関数を定義するネスト関数の書き方と活用法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ネスト関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数の中に別の関数を定義できます。ネスト関数は外側の関数のスコープ内でのみ使えます。
          ロジックをカプセル化し、コードを整理するのに役立ちます。
          外側の関数から戻り値として返すこともできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>外側の変数・定数にアクセスできる（クロージャとして振る舞う）</li>
          <li>スコープ外からは呼び出せない</li>
          <li>ヘルパー関数を外部に公開せずに整理できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ネスト関数の基本</h2>
        <SwiftEditor
          defaultCode={`func calculateFibonacci(_ n: Int) -> Int {
    // ネスト関数
    func fib(_ k: Int) -> Int {
        if k <= 1 { return k }
        return fib(k - 1) + fib(k - 2)
    }

    guard n >= 0 else { return -1 }
    return fib(n)
}

for i in 0...8 {
    print("fib(\\(i)) = \\(calculateFibonacci(i))")
}`}
          expectedOutput={`fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ネスト関数を返す</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ネスト関数を外側の関数から返すことができます。
          このとき返されたネスト関数は外側の変数をキャプチャするクロージャになります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ネスト関数を返す</h2>
        <SwiftEditor
          defaultCode={`func makeCounter(start: Int = 0, step: Int = 1) -> () -> Int {
    var current = start

    func counter() -> Int {
        let value = current
        current += step
        return value
    }

    return counter
}

let countByOne = makeCounter()
print(countByOne())  // 0
print(countByOne())  // 1
print(countByOne())  // 2

let countByFive = makeCounter(start: 0, step: 5)
print(countByFive()) // 0
print(countByFive()) // 5
print(countByFive()) // 10`}
          expectedOutput={`0
1
2
0
5
10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="nested-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="nested-functions" basePath="/learn/functions" />
    </div>
  );
}
