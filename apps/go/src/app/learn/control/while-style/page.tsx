import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function WhileStylePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">whileスタイル</h1>
        <p className="text-gray-400">forでwhileを表現する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">条件のみのfor</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goにはwhileキーワードがありません。<code className="text-cyan-300">for</code> の初期化と後処理を省略すると、
          whileスタイルのループになります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">whileスタイルのfor</h2>
        <p className="text-gray-400 mb-4">
          条件式だけを指定して、条件がfalseになるまで繰り返します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // whileスタイル
    n := 1
    for n <= 5 {
        fmt.Println(n)
        n++
    }

    // 2の累乗
    fmt.Println("---")
    power := 1
    for power < 100 {
        fmt.Println(power)
        power *= 2
    }
}`}
          expectedOutput={`1
2
3
4
5
---
1
2
4
8
16
32
64`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カウントダウンの例</h2>
        <p className="text-gray-400 mb-4">
          デクリメントによるカウントダウンの例です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    countdown := 5
    for countdown > 0 {
        fmt.Printf("%d...\n", countdown)
        countdown--
    }
    fmt.Println("発射！")
}`}
          expectedOutput={`5...
4...
3...
2...
1...
発射！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="while-style" />
      </div>
      <LessonNav lessons={lessons} currentId="while-style" basePath="/learn/control" />
    </div>
  );
}
