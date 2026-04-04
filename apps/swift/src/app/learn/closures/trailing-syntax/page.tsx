import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "closures")!.lessons;

export default function TrailingSyntaxPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">クロージャ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">末尾クロージャ構文</h1>
        <p className="text-gray-400">関数の最後の引数がクロージャのとき、括弧の外に書く省略構文を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">末尾クロージャとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数の最後の引数がクロージャの場合、そのクロージャを引数リストの外（関数呼び出しの後ろ）に
          書くことができます。これを「末尾クロージャ構文（Trailing Closure Syntax）」といいます。
          コードが読みやすくなり、SwiftUIや標準ライブラリでよく使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>最後の引数がクロージャのときだけ使える</li>
          <li>クロージャが唯一の引数なら <code className="text-violet-300">()</code> も省略できる</li>
          <li>複数のクロージャ引数がある場合、最初のものだけ末尾に出せる</li>
          <li>SwiftUIの <code className="text-violet-300">VStack {"{"} ... {"}"}</code> もこの構文</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 通常記法と末尾クロージャの比較</h2>
        <SwiftEditor
          defaultCode={`func doSomething(label: String, action: () -> Void) {
    print("\\(label)を実行します")
    action()
    print("完了")
}

// 通常の書き方
doSomething(label: "タスクA", action: {
    print("  処理中...")
})

print("---")

// 末尾クロージャ構文
doSomething(label: "タスクB") {
    print("  処理中...")
}

print("---")

// クロージャが唯一の引数の場合
func execute(task: () -> Void) {
    task()
}

execute {
    print("シンプルなタスク実行")
}`}
          expectedOutput={`タスクAを実行します
  処理中...
完了
---
タスクBを実行します
  処理中...
完了
---
シンプルなタスク実行`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">標準ライブラリでの活用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">sorted</code>、<code className="text-violet-300">filter</code>、
          <code className="text-violet-300">map</code> など、配列の標準メソッドは末尾クロージャと相性抜群です。
          末尾クロージャを使うと、条件や変換ロジックが視覚的に明確になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">array.sorted {"{"} $0 {"<"} $1 {"}"}</code> — 末尾クロージャでソート</li>
          <li><code className="text-violet-300">array.filter {"{"} $0 {">"} 5 {"}"}</code> — 末尾クロージャでフィルタリング</li>
          <li>複数行のクロージャも読みやすく書ける</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 配列操作での末尾クロージャ</h2>
        <SwiftEditor
          defaultCode={`let numbers = [5, 2, 8, 1, 9, 3, 7, 4, 6]

// 通常記法
let sorted1 = numbers.sorted(by: { a, b in a < b })

// 末尾クロージャ
let sorted2 = numbers.sorted { a, b in
    a < b
}

print("昇順: \\(sorted2)")

// 偶数のみフィルタリング
let evens = numbers.filter { n in
    n % 2 == 0
}
print("偶数: \\(evens)")

// 2倍に変換
let doubled = numbers.map { n in
    n * 2
}
print("2倍: \\(doubled)")

// 複雑な条件でソート（文字列）
let words = ["banana", "apple", "cherry", "date"]
let sortedByLength = words.sorted { a, b in
    a.count < b.count
}
print("長さ順: \\(sortedByLength)")`}
          expectedOutput={`昇順: [1, 2, 3, 4, 5, 6, 7, 8, 9]
偶数: [2, 8, 4, 6]
2倍: [10, 4, 16, 2, 18, 6, 14, 8, 12]
長さ順: ["date", "apple", "banana", "cherry"]`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数クロージャ引数と末尾クロージャ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 5.3以降、複数のクロージャ引数を持つ関数では、2番目以降のクロージャも
          ラベル付きで末尾に続けて書けます。ただし1つ目のクロージャのラベルは省略されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>最初の末尾クロージャ: ラベルなし</li>
          <li>2番目以降: <code className="text-violet-300">ラベル: {"{"} ... {"}"}</code> の形式</li>
          <li>UIKit/SwiftUIのアニメーションAPIなどで多用される</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数クロージャの末尾構文</h2>
        <SwiftEditor
          defaultCode={`// 成功・失敗・完了を受け取る関数
func fetchData(
    onSuccess: (String) -> Void,
    onFailure: (String) -> Void,
    onComplete: () -> Void
) {
    let success = true
    if success {
        onSuccess("データ取得成功")
    } else {
        onFailure("エラーが発生しました")
    }
    onComplete()
}

// 複数クロージャの末尾構文（Swift 5.3+）
fetchData {
    print("成功: \\($0)")
} onFailure: {
    print("失敗: \\($0)")
} onComplete: {
    print("処理完了")
}

// カスタム制御構造のような見た目にできる
func retry(times: Int, task: () -> Bool) {
    for i in 1...times {
        print("試行 \\(i)")
        if task() {
            print("成功!")
            return
        }
    }
    print("失敗: \\(times)回試みました")
}

var attempts = 0
retry(times: 3) {
    attempts += 1
    return attempts >= 2
}`}
          expectedOutput={`成功: データ取得成功
処理完了
試行 1
試行 2
成功!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="closures" lessonId="trailing-syntax" />
      </div>
      <LessonNav lessons={lessons} currentId="trailing-syntax" basePath="/learn/closures" />
    </div>
  );
}
