import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ElseIfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">else if</h1>
        <p className="text-gray-400">複数条件チェックを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">else ifチェーン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数の条件を順番にチェックするには <code className="text-cyan-300">else if</code> を使います。
          最初に <code className="text-cyan-300">true</code> になった条件のブロックだけが実行されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">成績判定の例</h2>
        <p className="text-gray-400 mb-4">
          複数の条件を上から順番にチェックします。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    score := 75

    if score >= 90 {
        fmt.Println("評価: A")
    } else if score >= 80 {
        fmt.Println("評価: B")
    } else if score >= 70 {
        fmt.Println("評価: C")
    } else if score >= 60 {
        fmt.Println("評価: D")
    } else {
        fmt.Println("評価: F")
    }
}`}
          expectedOutput={`評価: C`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複合条件</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">&&</code> や <code className="text-cyan-300">||</code> で複数の条件を組み合わせられます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    age := 25
    hasLicense := true

    if age >= 18 && hasLicense {
        fmt.Println("運転できます")
    } else if age >= 18 && !hasLicense {
        fmt.Println("免許を取りましょう")
    } else {
        fmt.Println("まだ運転できません")
    }

    // 季節判定
    month := 8
    if month >= 3 && month <= 5 {
        fmt.Println("春です")
    } else if month >= 6 && month <= 8 {
        fmt.Println("夏です")
    } else if month >= 9 && month <= 11 {
        fmt.Println("秋です")
    } else {
        fmt.Println("冬です")
    }
}`}
          expectedOutput={`運転できます
夏です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="else-if" />
      </div>
      <LessonNav lessons={lessons} currentId="else-if" basePath="/learn/control" />
    </div>
  );
}
