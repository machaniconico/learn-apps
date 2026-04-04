import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ClosuresPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クロージャ</h1>
        <p className="text-gray-400">関数内関数と変数キャプチャを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クロージャとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クロージャは外側のスコープの変数をキャプチャ（参照を保持）する関数です。
          Goでは関数はファーストクラスの値なので、変数に代入したり引数に渡したりできます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カウンタの例</h2>
        <p className="text-gray-400 mb-4">
          クロージャで状態を保持するカウンタを作ります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func makeCounter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

func main() {
    counter := makeCounter()
    fmt.Println(counter())
    fmt.Println(counter())
    fmt.Println(counter())

    // 別のカウンタは独立
    counter2 := makeCounter()
    fmt.Println("counter2:", counter2())
}`}
          expectedOutput={`1
2
3
counter2: 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">即時実行関数</h2>
        <p className="text-gray-400 mb-4">
          無名関数をその場で定義して即実行することもできます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 無名関数を変数に代入
    double := func(n int) int {
        return n * 2
    }
    fmt.Println("倍:", double(5))

    // 即時実行関数
    result := func(a, b int) int {
        return a + b
    }(3, 4)
    fmt.Println("合計:", result)

    // 高階関数
    apply := func(f func(int) int, val int) int {
        return f(val)
    }
    fmt.Println("適用:", apply(double, 10))
}`}
          expectedOutput={`倍: 10
合計: 7
適用: 20`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="closures" />
      </div>
      <LessonNav lessons={lessons} currentId="closures" basePath="/learn/functions" />
    </div>
  );
}
