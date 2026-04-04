import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function FunctionTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数型</h1>
        <p className="text-gray-400">関数を変数に代入したり引数・戻り値として使う高階関数の概念を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数型とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftでは関数も型の一種です。関数を変数に代入したり、他の関数の引数・戻り値として使えます。
          関数型は <code className="text-teal-300">(引数の型) -{">"} 戻り値の型</code> の形式で表します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">(Int, Int) -{">"} Int</code> — 2つのIntを受け取りIntを返す関数型</li>
          <li><code className="text-teal-300">() -{">"} Void</code> — 引数・戻り値なしの関数型</li>
          <li>クロージャも関数型として扱われる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 関数を変数に代入</h2>
        <SwiftEditor
          defaultCode={`func add(_ a: Int, _ b: Int) -> Int { a + b }
func multiply(_ a: Int, _ b: Int) -> Int { a * b }

// 関数を変数に代入
var operation: (Int, Int) -> Int = add
print(operation(3, 4))  // 7

operation = multiply    // 同じ型の別の関数を代入
print(operation(3, 4))  // 12

// 高階関数: 関数を引数として受け取る
func applyTwice(_ f: (Int) -> Int, to value: Int) -> Int {
    return f(f(value))
}

func triple(_ n: Int) -> Int { n * 3 }
print(applyTwice(triple, to: 2))`}
          expectedOutput={`7
12
18`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数を返す関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数を戻り値として返す関数も作れます。これによって動的に関数を生成できます。
          クロージャと組み合わせると非常に強力になります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 関数を返す関数</h2>
        <SwiftEditor
          defaultCode={`// 関数を返す関数
func makeAdder(_ n: Int) -> (Int) -> Int {
    return { x in x + n }
}

let addFive = makeAdder(5)
let addTen = makeAdder(10)

print(addFive(3))   // 8
print(addTen(3))    // 13

// 関数の配列
func square(_ n: Int) -> Int { n * n }
func cube(_ n: Int) -> Int { n * n * n }
func negate(_ n: Int) -> Int { -n }

let transforms: [(Int) -> Int] = [square, cube, negate]
let value = 3
for transform in transforms {
    print(transform(value))
}`}
          expectedOutput={`8
13
9
27
-3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="function-types" />
      </div>
      <LessonNav lessons={lessons} currentId="function-types" basePath="/learn/functions" />
    </div>
  );
}
