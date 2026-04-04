import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ParametersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">引数</h1>
        <p className="text-gray-400">関数に値を渡す方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">引数の渡し方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goの引数は値渡し（コピー）です。同じ型の引数はまとめて型を指定できます。
          ポインタを渡すと参照渡しのように振る舞います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の引数</h2>
        <p className="text-gray-400 mb-4">
          同じ型の引数は最後にまとめて型を書けます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 同じ型はまとめて書ける
func add(a, b int) int {
    return a + b
}

// 異なる型の引数
func formatUser(name string, age int) string {
    return fmt.Sprintf("%s（%d歳）", name, age)
}

func main() {
    fmt.Println("合計:", add(3, 7))
    fmt.Println(formatUser("太郎", 25))
    fmt.Println(formatUser("花子", 30))
}`}
          expectedOutput={`合計: 10
太郎（25歳）
花子（30歳）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値渡しの確認</h2>
        <p className="text-gray-400 mb-4">
          Goの引数は値渡しなので、関数内で引数を変更しても呼び出し元には影響しません。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func tryChange(n int) {
    n = 100 // コピーを変更しているだけ
    fmt.Println("関数内:", n)
}

func changeWithPointer(n *int) {
    *n = 100 // ポインタ経由で変更
}

func main() {
    x := 42
    tryChange(x)
    fmt.Println("呼び出し元:", x) // 変わらない

    changeWithPointer(&x)
    fmt.Println("ポインタ経由:", x) // 変わる
}`}
          expectedOutput={`関数内: 100
呼び出し元: 42
ポインタ経由: 100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="parameters" />
      </div>
      <LessonNav lessons={lessons} currentId="parameters" basePath="/learn/functions" />
    </div>
  );
}
