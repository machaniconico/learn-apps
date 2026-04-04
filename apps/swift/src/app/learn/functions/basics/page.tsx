import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function FunctionBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数の基本</h1>
        <p className="text-gray-400">funcキーワードを使った関数定義の基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数の定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-300">func</code> キーワードで関数を定義します。
          関数名・引数リスト・戻り値の型・本体から構成されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">func 関数名(引数: 型) -{">"} 戻り値型 {"{"} 本体 {"}"}</code></li>
          <li>引数も戻り値もない場合は省略可能</li>
          <li>関数は定義の前後どちらからでも呼び出せる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的な関数</h2>
        <SwiftEditor
          defaultCode={`// 引数・戻り値なし
func sayHello() {
    print("Hello, Swift!")
}
sayHello()

// 引数あり、戻り値なし
func greet(name: String) {
    print("こんにちは、\\(name)さん！")
}
greet(name: "太郎")

// 引数あり、戻り値あり
func square(_ n: Int) -> Int {
    return n * n
}
let result = square(5)
print("5の二乗: \\(result)")`}
          expectedOutput={`Hello, Swift!
こんにちは、太郎さん！
5の二乗: 25`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">暗黙的なreturn</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 5.1以降、関数の本体が単一の式の場合、<code className="text-teal-300">return</code> キーワードを省略できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 暗黙的なreturnと複数行</h2>
        <SwiftEditor
          defaultCode={`// 暗黙的なreturn（単一式）
func double(_ n: Int) -> Int {
    n * 2  // returnを省略
}

func isEven(_ n: Int) -> Bool {
    n % 2 == 0
}

print(double(7))
print(isEven(4))
print(isEven(7))

// 複数の処理がある場合はreturnが必要
func clamp(_ value: Int, min: Int, max: Int) -> Int {
    if value < min { return min }
    if value > max { return max }
    return value
}

print(clamp(5, min: 0, max: 10))
print(clamp(-3, min: 0, max: 10))
print(clamp(15, min: 0, max: 10))`}
          expectedOutput={`14
true
false
5
0
10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/functions" />
    </div>
  );
}
