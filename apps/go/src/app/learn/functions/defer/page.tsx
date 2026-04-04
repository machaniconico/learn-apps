import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function DeferPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">defer</h1>
        <p className="text-gray-400">関数終了時の処理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">deferとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">defer</code> で登録した関数呼び出しは、現在の関数が終了する直前に実行されます。
          複数のdeferはLIFO（後入れ先出し）の順序で実行されます。
          リソースの解放やクリーンアップに使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">deferの基本</h2>
        <p className="text-gray-400 mb-4">
          deferは登録した順の逆順（LIFO）で実行されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("開始")

    defer fmt.Println("defer 1")
    defer fmt.Println("defer 2")
    defer fmt.Println("defer 3")

    fmt.Println("終了")
}`}
          expectedOutput={`開始
終了
defer 3
defer 2
defer 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リソース管理</h2>
        <p className="text-gray-400 mb-4">
          ファイルのクローズやロックの解放など、確実に実行したい処理に使います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func processData() {
    fmt.Println("データベース接続")
    defer fmt.Println("データベース切断") // 必ず実行される

    fmt.Println("ファイルオープン")
    defer fmt.Println("ファイルクローズ") // 必ず実行される

    fmt.Println("処理実行中...")
    fmt.Println("処理完了")
}

func main() {
    processData()
    fmt.Println("---")
    fmt.Println("プログラム終了")
}`}
          expectedOutput={`データベース接続
ファイルオープン
処理実行中...
処理完了
ファイルクローズ
データベース切断
---
プログラム終了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="defer" />
      </div>
      <LessonNav lessons={lessons} currentId="defer" basePath="/learn/functions" />
    </div>
  );
}
