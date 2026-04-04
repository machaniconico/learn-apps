import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "closures")!.lessons;

export default function ClosureBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">クロージャ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クロージャの基本</h1>
        <p className="text-gray-400">{"{}"}と{"->"} による無名関数の定義と使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クロージャとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クロージャは、コードの中で作成・渡すことができる独立した機能の塊です。
          Swiftの関数もクロージャの一種で、名前を持たない「無名関数」として記述できます。
          基本構文は <code className="text-violet-300">{"{ (引数) -> 戻り値型 in 処理 }"}</code> です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">{"{ (引数名: 型) -> 戻り値型 in"}</code> — クロージャのヘッダー部分</li>
          <li><code className="text-violet-300">in</code> — ヘッダーと本体を区切るキーワード</li>
          <li>変数・定数に代入して後から呼び出せる</li>
          <li>他の関数の引数として直接渡すことができる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なクロージャ</h2>
        <SwiftEditor
          defaultCode={`// 変数にクロージャを代入
let greet = { (name: String) -> String in
    return "こんにちは、\\(name)さん！"
}

print(greet("太郎"))
print(greet("花子"))

// 引数も戻り値もないクロージャ
let sayHello = {
    print("Hello, Closure!")
}

sayHello()`}
          expectedOutput={`こんにちは、太郎さん！
こんにちは、花子さん！
Hello, Closure!`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クロージャの型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クロージャには型があります。<code className="text-violet-300">(引数型) -{">"} 戻り値型</code> という形式で表します。
          型を明示することで、変数宣言時に型推論を助けたり、関数の引数型として指定できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">(Int, Int) -{">"} Int</code> — 2つのIntを受け取りIntを返す型</li>
          <li><code className="text-violet-300">() -{">"} Void</code> — 引数も戻り値もないクロージャの型</li>
          <li>型を明示すると本体内で引数の型アノテーションを省略できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: クロージャの型と関数への受け渡し</h2>
        <SwiftEditor
          defaultCode={`// 型を明示したクロージャ
let add: (Int, Int) -> Int = { (a, b) in
    return a + b
}

let multiply: (Int, Int) -> Int = { (a, b) in
    a * b  // 単一式はreturnを省略できる
}

print(add(3, 4))
print(multiply(5, 6))

// クロージャを引数に取る関数
func applyOperation(_ a: Int, _ b: Int, operation: (Int, Int) -> Int) -> Int {
    return operation(a, b)
}

let result1 = applyOperation(10, 3, operation: add)
let result2 = applyOperation(10, 3, operation: multiply)
let result3 = applyOperation(10, 3, operation: { (a, b) in a - b })

print("足し算: \\(result1)")
print("掛け算: \\(result2)")
print("引き算: \\(result3)")`}
          expectedOutput={`7
30
足し算: 13
掛け算: 30
引き算: 7`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クロージャと関数の関係</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftでは関数もクロージャの一種です。名前付き関数をクロージャが期待される場所に渡すことができます。
          これにより、既存の関数をそのままコールバックとして活用できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>関数名だけを渡すとクロージャとして扱われる</li>
          <li><code className="text-violet-300">func</code> で定義した関数も <code className="text-violet-300">(引数型) -{">"} 戻り値型</code> の型を持つ</li>
          <li>クロージャはファーストクラス — 変数に格納・引数に渡せる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 関数をクロージャとして渡す</h2>
        <SwiftEditor
          defaultCode={`func double(_ n: Int) -> Int {
    return n * 2
}

func square(_ n: Int) -> Int {
    return n * n
}

func transform(_ value: Int, using f: (Int) -> Int) -> Int {
    return f(value)
}

// 名前付き関数をクロージャとして渡す
print(transform(5, using: double))
print(transform(5, using: square))

// クロージャをインラインで渡す
print(transform(5, using: { n in n + 100 }))

// 関数をリストに格納して順番に適用
let operations: [(Int) -> Int] = [double, square, { n in n - 1 }]
var value = 3
for op in operations {
    value = op(value)
    print(value)
}`}
          expectedOutput={`10
25
105
6
36
35`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="closures" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/closures" />
    </div>
  );
}
