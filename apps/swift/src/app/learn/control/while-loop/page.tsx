import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function WhileLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">whileループ</h1>
        <p className="text-gray-400">条件が真の間繰り返すwhileループの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">whileループの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">while</code> ループは条件が <code className="text-cyan-300">true</code> の間、ブロックを繰り返し実行します。
          繰り返し回数が事前にわからない場合に適しています。
          条件はループの先頭で評価されるため、条件が最初から <code className="text-cyan-300">false</code> なら一度も実行されません。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: whileループの基本</h2>
        <SwiftEditor
          defaultCode={`// カウントダウン
var count = 5
while count > 0 {
    print("カウント: \\(count)")
    count -= 1
}
print("発射！")

// 合計が100を超えるまで加算
var total = 0
var n = 1
while total < 100 {
    total += n
    n += 1
}
print("合計が100を超えたのは \\(n - 1) を足したとき")
print("合計: \\(total)")`}
          expectedOutput={`カウント: 5
カウント: 4
カウント: 3
カウント: 2
カウント: 1
発射！
合計が100を超えたのは14を足したとき
合計: 105`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">for-inとwhileの使い分け</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          反復回数が決まっている場合は <code className="text-cyan-300">for-in</code>、
          条件によって回数が変わる場合は <code className="text-cyan-300">while</code> を使います。
          無限ループには <code className="text-cyan-300">while true</code> を使い、<code className="text-cyan-300">break</code> で脱出します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: コレbクションの処理</h2>
        <SwiftEditor
          defaultCode={`// 配列の要素を条件付きで処理
var numbers = [3, 7, 2, 9, 1, 5, 8, 4, 6]
var index = 0
var sum = 0

while index < numbers.count && sum < 15 {
    sum += numbers[index]
    print("追加: \\(numbers[index]), 合計: \\(sum)")
    index += 1
}
print("終了。処理した要素数: \\(index)")`}
          expectedOutput={`追加: 3, 合計: 3
追加: 7, 合計: 10
追加: 2, 合計: 12
追加: 9, 合計: 21
終了。処理した要素数: 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="while-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="while-loop" basePath="/learn/control" />
    </div>
  );
}
