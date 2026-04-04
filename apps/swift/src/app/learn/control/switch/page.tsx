import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function SwitchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">switch文</h1>
        <p className="text-gray-400">Swiftの強力なswitch文とパターンマッチングを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Swiftのswitch文の特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftのswitch文はとても強力です。以下の特徴があります：
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>すべてのケースを網羅する必要がある（<code className="text-cyan-300">default</code> か全パターン）</li>
          <li>自動的にfallthroughしない（明示的に <code className="text-cyan-300">fallthrough</code> が必要）</li>
          <li>複数の値を一つのcaseにまとめられる（カンマ区切り）</li>
          <li>範囲演算子や条件（where句）も使える</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: switch文の基本</h2>
        <SwiftEditor
          defaultCode={`let day = 3

switch day {
case 1:
    print("月曜日")
case 2:
    print("火曜日")
case 3:
    print("水曜日")
case 4:
    print("木曜日")
case 5:
    print("金曜日")
case 6, 7:
    print("週末")
default:
    print("無効な値")
}

// 文字列のswitch
let season = "夏"
switch season {
case "春":
    print("桜が咲く季節")
case "夏":
    print("海水浴の季節")
case "秋":
    print("紅葉の季節")
case "冬":
    print("雪の季節")
default:
    print("不明な季節")
}`}
          expectedOutput={`水曜日
海水浴の季節`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">範囲マッチングとwhere句</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          switchのcaseには範囲演算子や <code className="text-cyan-300">where</code> 句を使った条件も指定できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 範囲マッチング</h2>
        <SwiftEditor
          defaultCode={`let score = 78

switch score {
case 90...100:
    print("優秀")
case 70..<90:
    print("良好")
case 60..<70:
    print("合格")
case 0..<60:
    print("不合格")
default:
    print("無効なスコア")
}

// where句で追加条件
let point = (3, -2)
switch point {
case let (x, y) where x == y:
    print("対角線上: (\\(x), \\(y))")
case let (x, y) where x > 0 && y > 0:
    print("第1象限: (\\(x), \\(y))")
case let (x, y):
    print("その他: (\\(x), \\(y))")
}`}
          expectedOutput={`良好
その他: (3, -2)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="switch" />
      </div>
      <LessonNav lessons={lessons} currentId="switch" basePath="/learn/control" />
    </div>
  );
}
