import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LabelsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ラベル</h1>
        <p className="text-gray-400">ネストしたループの制御を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ラベルによるループ制御</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ネストしたループで外側のループを <code className="text-cyan-300">break</code> したい場合、
          ラベルを使います。ラベルは <code className="text-cyan-300">ラベル名:</code> の形式で書きます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラベル付きbreak</h2>
        <p className="text-gray-400 mb-4">
          外側のループにラベルを付けて、内側から外側のループごと脱出できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
outer:
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if i == 1 && j == 1 {
                fmt.Println("i=1, j=1 でループ全体を終了")
                break outer
            }
            fmt.Printf("i=%d, j=%d\\n", i, j)
        }
    }
    fmt.Println("完了")
}`}
          expectedOutput={`i=0, j=0
i=0, j=1
i=0, j=2
i=1, j=0
i=1, j=1 でループ全体を終了
完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラベル付きcontinue</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">continue ラベル</code> で外側のループの次のイテレーションに進めます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
outer:
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if j == 1 {
                continue outer // 外側ループの次へ
            }
            fmt.Printf("i=%d, j=%d\\n", i, j)
        }
    }
}`}
          expectedOutput={`i=0, j=0
i=1, j=0
i=2, j=0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="labels" />
      </div>
      <LessonNav lessons={lessons} currentId="labels" basePath="/learn/control" />
    </div>
  );
}
