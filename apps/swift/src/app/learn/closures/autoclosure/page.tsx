import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "closures")!.lessons;

export default function AutoclosurePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">クロージャ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オートクロージャ</h1>
        <p className="text-gray-400">@autoclosureを使って式を遅延評価する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@autoclosureとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">@autoclosure</code> は、引数として渡した式を自動的にクロージャで包む機能です。
          呼び出し側では普通の式を書けますが、関数内では必要になるまで評価されません（遅延評価）。
          Swiftの <code className="text-violet-300">assert</code> や <code className="text-violet-300">??</code>
          演算子も内部でこの仕組みを使っています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">@autoclosure</code> — 引数を自動でクロージャ化</li>
          <li>呼び出し側は通常の式を渡すだけ（中括弧不要）</li>
          <li>式は関数内で実際に使うときまで評価されない</li>
          <li>副作用のある式や重い計算の遅延評価に有効</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: @autoclosureの基本</h2>
        <SwiftEditor
          defaultCode={`// 通常のクロージャ引数
func logIf(_ condition: Bool, message: () -> String) {
    if condition {
        print(message())
    }
}

// @autoclosureを使うと呼び出し側がすっきりする
func logIfAuto(_ condition: Bool, message: @autoclosure () -> String) {
    if condition {
        print(message())
    }
}

// 通常版: 中括弧が必要
logIf(true, message: { "エラーが発生しました" })

// @autoclosure版: 式をそのまま書ける
logIfAuto(true, message: "エラーが発生しました")
logIfAuto(false, message: "これは表示されない")

// 式も直接渡せる
let value = 42
logIfAuto(value > 10, message: "値は\\(value)で10より大きい")
logIfAuto(value < 10, message: "この行は評価すらされない")`}
          expectedOutput={`エラーが発生しました
エラーが発生しました
値は42で10より大きい`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">遅延評価のメリット</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常の引数として渡した式は、関数が呼ばれた時点で評価されます。
          <code className="text-violet-300">@autoclosure</code> を使うと、式はクロージャになるので、
          実際に呼び出されるまで評価されません。
          これにより、条件が偽のときに重い計算をスキップできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>早期リターンがある関数で不要な計算を避けられる</li>
          <li>副作用（print、ファイルI/O等）の実行タイミングを制御できる</li>
          <li>Swift標準の <code className="text-violet-300">assert(_:_:)</code> も遅延評価で実装</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 遅延評価の効果</h2>
        <SwiftEditor
          defaultCode={`// 副作用のある計算をシミュレート
func expensiveCalculation() -> Int {
    print("  重い計算を実行中...")
    return 42
}

// 通常の引数: 常に評価される
func checkNormal(_ condition: Bool, value: Int) {
    if condition {
        print("値: \\(value)")
    }
}

// @autoclosure: 必要なときだけ評価
func checkLazy(_ condition: Bool, value: @autoclosure () -> Int) {
    if condition {
        print("値: \\(value())")
    }
}

print("=== 通常の引数 ===")
print("conditionがtrue:")
checkNormal(true, value: expensiveCalculation())
print("conditionがfalse:")
checkNormal(false, value: expensiveCalculation())  // 評価される！

print("=== @autoclosure ===")
print("conditionがtrue:")
checkLazy(true, value: expensiveCalculation())
print("conditionがfalse:")
checkLazy(false, value: expensiveCalculation())  // 評価されない！
print("falseの場合は計算がスキップされた")`}
          expectedOutput={`=== 通常の引数 ===
conditionがtrue:
  重い計算を実行中...
値: 42
conditionがfalse:
  重い計算を実行中...
=== @autoclosure ===
conditionがtrue:
  重い計算を実行中...
値: 42
conditionがfalse:
falseの場合は計算がスキップされた`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@autoclosure @escapingの組み合わせ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">@autoclosure</code> と <code className="text-violet-300">@escaping</code>
          を組み合わせることで、後から実行するための式を保存できます。
          これにより「遅延実行リスト」のような仕組みを作ることができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">@autoclosure @escaping</code> で遅延かつ後から実行</li>
          <li>カスタム演算子と組み合わせることも可能</li>
          <li>Swiftの <code className="text-violet-300">??</code> 演算子の右辺も <code className="text-violet-300">@autoclosure</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 実用的なautoclosureパターン</h2>
        <SwiftEditor
          defaultCode={`// ??演算子の仕組みを自作で再現
func myNilCoalescing<T>(_ optional: T?, default value: @autoclosure () -> T) -> T {
    if let v = optional {
        return v
    }
    return value()
}

let name: String? = nil
let result1 = myNilCoalescing(name, default: "名無し")
print(result1)

let age: Int? = 25
let result2 = myNilCoalescing(age, default: 0)
print(result2)

// 遅延実行キュー
var deferredActions: [() -> Void] = []

func defer_(_ action: @autoclosure @escaping () -> Void) {
    deferredActions.append(action)
}

var counter = 0

defer_ { print("アクション1: counter=\\(counter)") }
counter = 10
defer_ { print("アクション2: counter=\\(counter)") }
counter = 20

print("キューを実行:")
deferredActions.forEach { $0() }`}
          expectedOutput={`名無し
25
キューを実行:
アクション1: counter=20
アクション2: counter=20`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="closures" lessonId="autoclosure" />
      </div>
      <LessonNav lessons={lessons} currentId="autoclosure" basePath="/learn/closures" />
    </div>
  );
}
