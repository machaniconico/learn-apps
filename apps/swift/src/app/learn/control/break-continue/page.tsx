import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function BreakContinuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">break・continue</h1>
        <p className="text-gray-400">ループの流れを制御するbreak・continueの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">breakとcontinue</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ループの制御に使う2つのキーワードです：
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">break</code> — ループまたはswitch文を即座に終了する</li>
          <li><code className="text-cyan-300">continue</code> — 現在のイテレーションをスキップして次へ進む</li>
          <li>switch文でも <code className="text-cyan-300">break</code> を使ってcaseを終了できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: breakとcontinue</h2>
        <SwiftEditor
          defaultCode={`// break: 条件を満たしたらループ終了
print("=== break ===")
for i in 1...10 {
    if i == 5 {
        break
    }
    print(i, terminator: " ")
}
print("")

// continue: 条件を満たした要素をスキップ
print("=== continue ===")
for i in 1...10 {
    if i % 2 == 0 {
        continue  // 偶数をスキップ
    }
    print(i, terminator: " ")
}
print("")

// switch文でのbreak
print("=== switch with break ===")
let value = 3
switch value {
case 1...5:
    if value == 3 {
        print("3は特別")
        break
    }
    print("1-5の範囲")
default:
    print("その他")
}`}
          expectedOutput={`=== break ===
1 2 3 4
=== continue ===
1 3 5 7 9
=== switch with break ===
3は特別`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実用的な使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列から条件に合う要素を探す場合、見つかったら <code className="text-cyan-300">break</code> で効率よくループを終了できます。
          フィルタリングには <code className="text-cyan-300">continue</code> が役立ちます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 実用的な使い方</h2>
        <SwiftEditor
          defaultCode={`// 配列から最初の負の数を探す
let numbers = [3, 7, -2, 5, -8, 1]
var firstNegative: Int? = nil

for num in numbers {
    if num < 0 {
        firstNegative = num
        break
    }
}

if let neg = firstNegative {
    print("最初の負の数: \\(neg)")
}

// 有効な値のみ処理
let rawData = ["10", "abc", "25", "xyz", "30"]
var validNumbers: [Int] = []

for str in rawData {
    guard let num = Int(str) else {
        continue  // 変換できないものをスキップ
    }
    validNumbers.append(num)
}
print("有効な数値: \\(validNumbers)")`}
          expectedOutput={`最初の負の数: -2
有効な数値: [10, 25, 30]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="break-continue" />
      </div>
      <LessonNav lessons={lessons} currentId="break-continue" basePath="/learn/control" />
    </div>
  );
}
