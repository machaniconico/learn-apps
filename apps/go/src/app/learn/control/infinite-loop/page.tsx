import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function InfiniteLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">無限ループ</h1>
        <p className="text-gray-400">breakで制御する無限ループを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">無限ループの構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">for {`{}`}</code> と書くと無限ループになります。
          <code className="text-cyan-300">break</code> で脱出するか、<code className="text-cyan-300">return</code> で関数を終了します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">breakによる脱出</h2>
        <p className="text-gray-400 mb-4">
          条件が満たされたら <code className="text-cyan-300">break</code> でループを抜けます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    count := 0
    for {
        count++
        if count > 5 {
            break
        }
        fmt.Println("カウント:", count)
    }
    fmt.Println("ループ終了")
}`}
          expectedOutput={`カウント: 1
カウント: 2
カウント: 3
カウント: 4
カウント: 5
ループ終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件付き処理</h2>
        <p className="text-gray-400 mb-4">
          無限ループ内で複雑な条件分岐を行う例です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    n := 1
    for {
        if n > 20 {
            break
        }
        if n%3 == 0 && n%5 == 0 {
            fmt.Printf("%d: FizzBuzz\\n", n)
        } else if n%3 == 0 {
            fmt.Printf("%d: Fizz\\n", n)
        } else if n%5 == 0 {
            fmt.Printf("%d: Buzz\\n", n)
        }
        n++
    }
}`}
          expectedOutput={`3: Fizz
5: Buzz
6: Fizz
9: Fizz
10: Buzz
12: Fizz
15: FizzBuzz
18: Fizz
20: Buzz`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="infinite-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="infinite-loop" basePath="/learn/control" />
    </div>
  );
}
