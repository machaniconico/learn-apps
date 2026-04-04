import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function InoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">inout引数</h1>
        <p className="text-gray-400">inoutキーワードで参照渡しを実現し、関数内から呼び出し元の値を変更する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">inout引数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常、Swiftの引数は値のコピーが渡されます（値渡し）。
          <code className="text-teal-300">inout</code> キーワードを付けると参照渡しとなり、
          関数内での変更が呼び出し元の変数に反映されます。
          呼び出し時は変数の前に <code className="text-teal-300">&amp;</code> を付けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>定数（let）にはinout引数として渡せない</li>
          <li>呼び出し時に <code className="text-teal-300">&amp;変数名</code> と書く</li>
          <li>可変長引数はinoutにできない</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 値の入れ替え</h2>
        <SwiftEditor
          defaultCode={`// inoutで値を入れ替える
func swapValues(_ a: inout Int, _ b: inout Int) {
    let temp = a
    a = b
    b = temp
}

var x = 10
var y = 20
print("入れ替え前: x=\\(x), y=\\(y)")
swapValues(&x, &y)
print("入れ替え後: x=\\(x), y=\\(y)")

// 値を変更する
func doubleValue(_ n: inout Int) {
    n *= 2
}

var count = 5
doubleValue(&count)
print("2倍: \\(count)")`}
          expectedOutput={`入れ替え前: x=10, y=20
入れ替え後: x=20, y=10
2倍: 10`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実用的なinout</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          inout引数は配列の変更や複数の値を効率よく更新する場合に役立ちます。
          ただし、多用するとコードが追いにくくなるため、戻り値で代替できる場合はそちらを優先しましょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 配列のinout操作</h2>
        <SwiftEditor
          defaultCode={`func appendSquares(to array: inout [Int], count: Int) {
    for i in 1...count {
        array.append(i * i)
    }
}

var numbers: [Int] = []
appendSquares(to: &numbers, count: 5)
print(numbers)

func normalize(_ array: inout [Double]) {
    guard let max = array.max(), max != 0 else { return }
    array = array.map { $0 / max }
}

var scores = [60.0, 80.0, 100.0, 40.0]
normalize(&scores)
print(scores)`}
          expectedOutput={`[1, 4, 9, 16, 25]
[0.6, 0.8, 1.0, 0.4]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="inout" />
      </div>
      <LessonNav lessons={lessons} currentId="inout" basePath="/learn/functions" />
    </div>
  );
}
