import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function ReturnValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">戻り値</h1>
        <p className="text-gray-400">-{">"} 構文による戻り値の指定と、タプルを使った複数値の返し方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">戻り値の型指定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数の戻り値は <code className="text-teal-300">-{">"}</code> の後に型を指定します。
          Swiftではタプルを使って複数の値を一度に返せます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">func f() -{">"} Int</code> — Int型を返す</li>
          <li><code className="text-teal-300">func f() -{">"} (Int, String)</code> — タプルで複数返す</li>
          <li><code className="text-teal-300">func f() -{">"} (min: Int, max: Int)</code> — 名前付きタプル</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 単一・複数の戻り値</h2>
        <SwiftEditor
          defaultCode={`// 単一の戻り値
func celsius(from fahrenheit: Double) -> Double {
    return (fahrenheit - 32) * 5 / 9
}
print(String(format: "%.1f°C", celsius(from: 98.6)))

// タプルで複数の値を返す
func minMax(of array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array {
        if value < currentMin { currentMin = value }
        if value > currentMax { currentMax = value }
    }
    return (currentMin, currentMax)
}

let numbers = [3, 1, 7, 2, 9, 4]
let result = minMax(of: numbers)
print("最小: \\(result.min), 最大: \\(result.max)")`}
          expectedOutput={`37.0°C
最小: 1, 最大: 9`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Optionalな戻り値</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          失敗する可能性がある操作では、<code className="text-teal-300">Optional</code> 型を返すのが一般的です。
          成功した場合は値を、失敗した場合は <code className="text-teal-300">nil</code> を返します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Optionalな戻り値</h2>
        <SwiftEditor
          defaultCode={`func divide(_ a: Double, by b: Double) -> Double? {
    guard b != 0 else { return nil }
    return a / b
}

if let result = divide(10, by: 2) {
    print("10 ÷ 2 = \\(result)")
}

if let result = divide(10, by: 0) {
    print("結果: \\(result)")
} else {
    print("ゼロ除算エラー")
}

// 複数の戻り値とOptional
func parseCoordinate(_ str: String) -> (lat: Double, lon: Double)? {
    let parts = str.split(separator: ",")
    guard parts.count == 2,
          let lat = Double(parts[0]),
          let lon = Double(parts[1]) else { return nil }
    return (lat, lon)
}

if let coord = parseCoordinate("35.6762,139.6503") {
    print("緯度: \\(coord.lat), 経度: \\(coord.lon)")
}`}
          expectedOutput={`10 ÷ 2 = 5.0
ゼロ除算エラー
緯度: 35.6762, 経度: 139.6503`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="return-values" />
      </div>
      <LessonNav lessons={lessons} currentId="return-values" basePath="/learn/functions" />
    </div>
  );
}
