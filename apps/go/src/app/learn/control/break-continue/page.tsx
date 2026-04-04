import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function BreakContinuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">break・continue</h1>
        <p className="text-gray-400">ループ制御を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">breakとcontinue</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">break</code> はループを完全に抜けます。
          <code className="text-cyan-300">continue</code> は現在のイテレーションをスキップして次に進みます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">breakの使い方</h2>
        <p className="text-gray-400 mb-4">
          条件が満たされたらループを終了します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // breakでループ脱出
    for i := 1; i <= 10; i++ {
        if i == 6 {
            fmt.Println("6で停止！")
            break
        }
        fmt.Println(i)
    }
}`}
          expectedOutput={`1
2
3
4
5
6で停止！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">continueの使い方</h2>
        <p className="text-gray-400 mb-4">
          特定の条件のときだけスキップして、残りの処理を実行しません。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 偶数だけ出力（奇数をスキップ）
    for i := 1; i <= 10; i++ {
        if i%2 != 0 {
            continue
        }
        fmt.Println(i)
    }
}`}
          expectedOutput={`2
4
6
8
10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="break-continue" />
      </div>
      <LessonNav lessons={lessons} currentId="break-continue" basePath="/learn/control" />
    </div>
  );
}
