import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function RepeatWhilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">repeat-while</h1>
        <p className="text-gray-400">少なくとも1回は実行される後判定ループrepeat-whileを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">repeat-whileとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">repeat-while</code> はループの本体を先に実行し、その後に条件を評価します。
          これにより少なくとも1回は必ずループが実行されます。
          他の言語の <code className="text-cyan-300">do-while</code> に相当します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ループ本体が最低1回実行される</li>
          <li>条件評価はループ末尾</li>
          <li>入力の検証やメニュー表示などに適している</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: repeat-whileの基本</h2>
        <SwiftEditor
          defaultCode={`// 基本的なrepeat-while
var attempts = 0
repeat {
    attempts += 1
    print("試行 \\(attempts)回目")
} while attempts < 3

print("完了")

// whileとの違い
var x = 10
// 条件が最初からfalseでも1回実行される
repeat {
    print("repeat-while: xは\\(x)")
} while x < 5

// whileは条件が最初からfalseなので実行されない
while x < 5 {
    print("while: これは表示されない")
}
print("whileは実行されませんでした")`}
          expectedOutput={`試行 1回目
試行 2回目
試行 3回目
完了
repeat-while: xは10
whileは実行されませんでした`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実用的な使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          repeat-whileはゲームのメインループや入力の再試行など、
          最低1回は処理を行うシナリオでよく使われます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 数値当てゲームのロジック</h2>
        <SwiftEditor
          defaultCode={`// ゲームループのシミュレーション
var score = 0
var round = 0
let maxRounds = 3

repeat {
    round += 1
    // ゲームの処理をシミュレート
    let points = round * 10
    score += points
    print("ラウンド \\(round): +\\(points)点 (合計: \\(score)点)")
} while round < maxRounds

print("ゲーム終了！最終スコア: \\(score)点")`}
          expectedOutput={`ラウンド 1: +10点 (合計: 10点)
ラウンド 2: +20点 (合計: 30点)
ラウンド 3: +30点 (合計: 60点)
ゲーム終了！最終スコア: 60点`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="repeat-while" />
      </div>
      <LessonNav lessons={lessons} currentId="repeat-while" basePath="/learn/control" />
    </div>
  );
}
