import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function SwitchNoConditionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">条件なしswitch</h1>
        <p className="text-gray-400">ifチェーンの代替としてのswitchを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">条件なしswitch</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">switch</code> に値を指定しないと、各caseの条件式が評価されます。
          長い <code className="text-cyan-300">if-else if</code> チェーンの代替として使えます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件式によるswitch</h2>
        <p className="text-gray-400 mb-4">
          各caseに条件式を書いて、最初にtrueになったcaseが実行されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    score := 82

    switch {
    case score >= 90:
        fmt.Println("素晴らしい！A評価")
    case score >= 80:
        fmt.Println("よくできました！B評価")
    case score >= 70:
        fmt.Println("まずまず！C評価")
    default:
        fmt.Println("もう少し頑張りましょう")
    }
}`}
          expectedOutput={`よくできました！B評価`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">時間帯による挨拶</h2>
        <p className="text-gray-400 mb-4">
          条件なしswitchの実用的な例です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func greet(hour int) string {
    switch {
    case hour < 6:
        return "おやすみなさい"
    case hour < 12:
        return "おはようございます"
    case hour < 18:
        return "こんにちは"
    default:
        return "こんばんは"
    }
}

func main() {
    fmt.Println(greet(8))
    fmt.Println(greet(14))
    fmt.Println(greet(20))
}`}
          expectedOutput={`おはようございます
こんにちは
こんばんは`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="switch-no-condition" />
      </div>
      <LessonNav lessons={lessons} currentId="switch-no-condition" basePath="/learn/control" />
    </div>
  );
}
