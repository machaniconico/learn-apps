import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function NamedReturnsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">名前付き戻り値</h1>
        <p className="text-gray-400">戻り値に名前を付ける方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">名前付き戻り値</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          戻り値に名前を付けると、関数内でローカル変数のように使えます。
          <code className="text-cyan-300">return</code> だけで名前付き戻り値が返されます（naked return）。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">名前付き戻り値の使い方</h2>
        <p className="text-gray-400 mb-4">
          戻り値の型宣言で変数名を指定できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func divide(a, b float64) (result float64, err error) {
    if b == 0 {
        err = fmt.Errorf("ゼロ除算")
        return // result=0, err=エラー が返る
    }
    result = a / b
    return // result=計算結果, err=nil が返る
}

func main() {
    r, err := divide(10, 3)
    if err != nil {
        fmt.Println("エラー:", err)
    } else {
        fmt.Printf("結果: %.2f\\n", r)
    }

    r2, err2 := divide(10, 0)
    if err2 != nil {
        fmt.Println("エラー:", err2)
    } else {
        fmt.Printf("結果: %.2f\\n", r2)
    }
}`}
          expectedOutput={`結果: 3.33
エラー: ゼロ除算`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ドキュメント効果</h2>
        <p className="text-gray-400 mb-4">
          名前付き戻り値は、何を返すかのドキュメントとしても役立ちます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func stats(numbers []int) (count int, sum int, avg float64) {
    count = len(numbers)
    for _, n := range numbers {
        sum += n
    }
    if count > 0 {
        avg = float64(sum) / float64(count)
    }
    return
}

func main() {
    data := []int{10, 20, 30, 40, 50}
    count, sum, avg := stats(data)
    fmt.Printf("個数: %d, 合計: %d, 平均: %.1f\\n", count, sum, avg)
}`}
          expectedOutput={`個数: 5, 合計: 150, 平均: 30.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="named-returns" />
      </div>
      <LessonNav lessons={lessons} currentId="named-returns" basePath="/learn/functions" />
    </div>
  );
}
