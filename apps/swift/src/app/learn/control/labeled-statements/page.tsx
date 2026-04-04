import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function LabeledStatementsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ラベル付き文</h1>
        <p className="text-gray-400">ネストしたループを制御するラベル付き文（labeled statements）の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ラベル付き文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ネストしたループで内側のループの <code className="text-cyan-300">break</code> や <code className="text-cyan-300">continue</code> は、
          内側のループにしか効きません。
          ラベルを付けることで、外側のループを直接制御できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">ラベル名: for ... {"{"}</code> — ループにラベルを付ける</li>
          <li><code className="text-cyan-300">break ラベル名</code> — 指定したラベルのループを終了</li>
          <li><code className="text-cyan-300">continue ラベル名</code> — 指定したラベルのループの次の繰り返しへ</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ラベル付きbreak</h2>
        <SwiftEditor
          defaultCode={`// ラベルなし（内側のループだけ終了）
print("=== ラベルなし ===")
for i in 1...3 {
    for j in 1...3 {
        if j == 2 {
            break  // 内側のみ終了
        }
        print("(\\(i), \\(j))", terminator: " ")
    }
}
print("")

// ラベルあり（外側のループも終了）
print("=== ラベルあり ===")
outer: for i in 1...3 {
    for j in 1...3 {
        if i == 2 && j == 2 {
            break outer  // 外側のループも終了
        }
        print("(\\(i), \\(j))", terminator: " ")
    }
}
print("")`}
          expectedOutput={`=== ラベルなし ===
(1, 1) (2, 1) (3, 1)
=== ラベルあり ===
(1, 1) (1, 2) (1, 3) (2, 1)`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ラベル付きcontinue</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">continue ラベル名</code> を使うと、指定したラベルのループの次のイテレーションにジャンプできます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ラベル付きcontinue</h2>
        <SwiftEditor
          defaultCode={`// ラベル付きcontinue: 外側のループの次のイテレーションへ
print("=== ラベル付きcontinue ===")
outer: for i in 1...4 {
    for j in 1...4 {
        if j == 3 {
            continue outer  // 外側ループの次のiへスキップ
        }
        print("(\\(i), \\(j))", terminator: " ")
    }
    print("← iの終わり")  // continueで飛ばされる
}
print("")
print("完了")`}
          expectedOutput={`=== ラベル付きcontinue ===
(1, 1) (1, 2) (2, 1) (2, 2) (3, 1) (3, 2) (4, 1) (4, 2)
完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="labeled-statements" />
      </div>
      <LessonNav lessons={lessons} currentId="labeled-statements" basePath="/learn/control" />
    </div>
  );
}
