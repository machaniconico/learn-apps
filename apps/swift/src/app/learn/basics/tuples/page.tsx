import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function TuplesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン13</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">タプル</h1>
        <p className="text-gray-400">複数の値をひとまとめにできるタプル型の作成・分解・活用方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">タプルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          タプルは異なる型の複数の値を1つにまとめるデータ構造です。
          関数から複数の値を返したい場合や、一時的なグループ化に役立ちます。
          専用の構造体を定義するほどではない軽量なデータのまとめに最適です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">(value1, value2)</code> — 匿名タプルの作成</li>
          <li><code className="text-blue-300">(name: value1, age: value2)</code> — 名前付きタプルの作成</li>
          <li><code className="text-blue-300">tuple.0</code> — インデックスで要素にアクセス</li>
          <li><code className="text-blue-300">tuple.name</code> — 名前で要素にアクセス</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: タプルの作成とアクセス</h2>
        <SwiftEditor
          defaultCode={`// 匿名タプル
let point = (3, 5)
print("x: \\(point.0), y: \\(point.1)")

// 名前付きタプル
let person = (name: "Alice", age: 25)
print("名前: \\(person.name)")
print("年齢: \\(person.age)")`}
          expectedOutput={`x: 3, y: 5
名前: Alice
年齢: 25`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">タプルの分解</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          タプルは複数の変数に一度に分解（デコンポーズ）できます。
          不要な要素は <code className="text-blue-300">_</code> で無視できます。
          パターンマッチングと組み合わせることでコードが簡潔になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">let (a, b) = tuple</code> — タプルを変数に分解</li>
          <li><code className="text-blue-300">let (a, _) = tuple</code> — 不要な要素を _ で無視</li>
          <li><code className="text-blue-300">switch tuple</code> — パターンマッチングで分岐</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: タプルの分解と _ による無視</h2>
        <SwiftEditor
          defaultCode={`let coordinates = (x: 10, y: 20, z: 30)

// 全要素を分解
let (x, y, z) = coordinates
print("x=\\(x), y=\\(y), z=\\(z)")

// 一部を無視
let (first, _, third) = coordinates
print("first=\\(first), third=\\(third)")

// switchでパターンマッチング
let status = (200, "OK")
switch status {
case (200, let message):
    print("成功: \\(message)")
case (404, _):
    print("未検出")
default:
    print("その他")
}`}
          expectedOutput={`x=10, y=20, z=30
first=10, third=30
成功: OK`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数からの複数戻り値</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftではタプルを使って関数から複数の値を返せます。
          名前付きタプルを使うと呼び出し側でラベルを使ってアクセスでき、可読性が上がります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">func f() -&gt; (Int, String)</code> — タプルを戻り値型に指定</li>
          <li><code className="text-blue-300">return (value1, value2)</code> — タプルを返す</li>
          <li>名前付きタプルで戻り値の意図を明確にできる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: タプルで複数値を返す関数</h2>
        <SwiftEditor
          defaultCode={`func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1...] {
        if value < currentMin { currentMin = value }
        if value > currentMax { currentMax = value }
    }
    return (currentMin, currentMax)
}

let numbers = [3, 1, 7, 2, 9, 4]
let result = minMax(array: numbers)
print("最小値: \\(result.min)")
print("最大値: \\(result.max)")

// 分解して受け取る
let (lo, hi) = minMax(array: numbers)
print("範囲: \\(lo) ~ \\(hi)")`}
          expectedOutput={`最小値: 1
最大値: 9
範囲: 1 ~ 9`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="tuples" />
      </div>
      <LessonNav lessons={lessons} currentId="tuples" basePath="/learn/basics" />
    </div>
  );
}
