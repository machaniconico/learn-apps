import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "structs")!.lessons;

export default function MutatingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">構造体 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">mutatingメソッド</h1>
        <p className="text-gray-400">構造体のプロパティを変更するmutatingメソッドの定義と使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜmutatingが必要か</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体は<strong className="text-white">値型</strong>なので、デフォルトではメソッド内からプロパティを変更できません。
          プロパティを変更するメソッドには<code className="text-orange-300">mutating</code>キーワードを付ける必要があります。
          <code className="text-orange-300">mutating</code>メソッドが呼ばれると、Swiftは内部的に新しいコピーを作って変更し、呼び出し元の変数に上書きします。
          そのため、<code className="text-orange-300">let</code>で宣言したインスタンスからは<code className="text-orange-300">mutating</code>メソッドを呼べません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">mutating func メソッド名()</code> — プロパティ変更可能なメソッド</li>
          <li><code className="text-orange-300">var</code>インスタンスからのみ呼び出せる</li>
          <li><code className="text-orange-300">let</code>インスタンスからは呼び出せない</li>
          <li>内部的にはインスタンス全体を置き換えている</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">selfへの再代入</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">mutating</code>メソッドの中では、<code className="text-orange-300">self</code>に新しいインスタンスを代入することもできます。
          これにより、インスタンス全体を別の値に置き換えることが可能です。
          列挙型の<code className="text-orange-300">mutating</code>メソッドではこのパターンがよく使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">self = 新しいインスタンス</code> — インスタンス全体の置き換え</li>
          <li>すべてのプロパティを一度に更新したい場合に便利</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロトコルとmutating</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プロトコルでプロパティを変更するメソッドを定義する場合、<code className="text-orange-300">mutating</code>を付けて宣言します。
          クラスがこのプロトコルに準拠する場合、クラスのメソッドには<code className="text-orange-300">mutating</code>は不要です（参照型のため）。
          構造体が準拠する場合は<code className="text-orange-300">mutating</code>が必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>プロトコル宣言では<code className="text-orange-300">mutating</code>を付けて宣言</li>
          <li>クラスの実装では<code className="text-orange-300">mutating</code>不要</li>
          <li>構造体の実装では<code className="text-orange-300">mutating</code>必要</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: mutatingメソッドの基本</h2>
        <SwiftEditor
          defaultCode={`struct Counter {
    var count: Int = 0

    mutating func increment() {
        count += 1
    }

    mutating func decrement() {
        if count > 0 {
            count -= 1
        }
    }

    mutating func reset() {
        count = 0
    }

    mutating func add(_ value: Int) {
        count += value
    }
}

var counter = Counter()
print("初期値: \\(counter.count)")

counter.increment()
counter.increment()
counter.increment()
print("3回インクリメント: \\(counter.count)")

counter.add(10)
print("10追加: \\(counter.count)")

counter.decrement()
print("1回デクリメント: \\(counter.count)")

counter.reset()
print("リセット: \\(counter.count)")`}
          expectedOutput={`初期値: 0
3回インクリメント: 3
10追加: 13
1回デクリメント: 12
リセット: 0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: selfへの再代入</h2>
        <SwiftEditor
          defaultCode={`struct Vector2D {
    var x: Double
    var y: Double

    mutating func normalize() {
        let length = (x * x + y * y).squareRoot()
        guard length > 0 else { return }
        // selfに新しいインスタンスを代入
        self = Vector2D(x: x / length, y: y / length)
    }

    mutating func scale(by factor: Double) {
        self = Vector2D(x: x * factor, y: y * factor)
    }

    func length() -> Double {
        return (x * x + y * y).squareRoot()
    }
}

var v = Vector2D(x: 3.0, y: 4.0)
print("元のベクトル: (\\(v.x), \\(v.y)) 長さ=\\(v.length())")

v.normalize()
print("正規化後: (\\(String(format: "%.2f", v.x)), \\(String(format: "%.2f", v.y))) 長さ=\\(String(format: "%.2f", v.length()))")

v.scale(by: 5.0)
print("5倍スケール: (\\(String(format: "%.2f", v.x)), \\(String(format: "%.2f", v.y)))")`}
          expectedOutput={`元のベクトル: (3.0, 4.0) 長さ=5.0
正規化後: (0.60, 0.80) 長さ=1.00
5倍スケール: (3.00, 4.00)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: varとletインスタンスの違い</h2>
        <SwiftEditor
          defaultCode={`struct Stack {
    var items: [Int] = []

    mutating func push(_ item: Int) {
        items.append(item)
    }

    mutating func pop() -> Int? {
        return items.isEmpty ? nil : items.removeLast()
    }

    func peek() -> Int? {
        return items.last
    }

    var isEmpty: Bool {
        return items.isEmpty
    }

    var count: Int {
        return items.count
    }
}

var stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
print("スタック: \\(stack.items)")
print("トップ: \\(stack.peek() ?? -1)")

if let popped = stack.pop() {
    print("ポップ: \\(popped)")
}
print("残り: \\(stack.items)")
print("個数: \\(stack.count)")

// letインスタンスはmutatingメソッドを呼べない
let fixedStack = Stack()
// fixedStack.push(1)  // エラー: Cannot use mutating member on immutable value
print("letインスタンスはmutatingメソッドを呼べません")`}
          expectedOutput={`スタック: [10, 20, 30]
トップ: 30
ポップ: 30
残り: [10, 20]
個数: 2
letインスタンスはmutatingメソッドを呼べません`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="mutating" />
      </div>
      <LessonNav lessons={lessons} currentId="mutating" basePath="/learn/structs" />
    </div>
  );
}
