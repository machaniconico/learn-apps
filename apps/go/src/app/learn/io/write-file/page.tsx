import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("io");

export default function WriteFilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ファイルI/O レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイル書き込み</h1>
        <p className="text-gray-400">os.WriteFileとos.Create + Writeによるファイル書き込み方法を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">os.WriteFileで一括書き込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">os.WriteFile</code> はバイトスライスをファイルに一括書き込みします。
          ファイルが存在しなければ作成、存在すれば上書きします。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "os"
)

func main() {
    content := "Hello, ファイル書き込み！\\nGoで書いています。"

    err := os.WriteFile("output.txt", []byte(content), 0644)
    if err != nil {
        fmt.Println("書き込みエラー:", err)
        return
    }
    fmt.Println("ファイル書き込み成功")

    // 確認のために読み込み
    data, _ := os.ReadFile("output.txt")
    fmt.Println("内容:", string(data))

    os.Remove("output.txt")
}`}
          expectedOutput={`ファイル書き込み成功
内容: Hello, ファイル書き込み！
Goで書いています。`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">os.Createで細かい制御</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">os.Create</code> でファイルを作成し、
          <code className="text-cyan-300">Write</code> や
          <code className="text-cyan-300">WriteString</code> で書き込みます。
          <code className="text-cyan-300">defer file.Close()</code> を忘れずに。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "os"
)

func main() {
    file, err := os.Create("manual.txt")
    if err != nil {
        fmt.Println("作成エラー:", err)
        return
    }
    defer file.Close()

    // WriteString で文字列を書き込み
    file.WriteString("1行目\\n")
    file.WriteString("2行目\\n")

    // Write でバイトスライスを書き込み
    file.Write([]byte("3行目\\n"))

    // Fprintf でフォーマット付き書き込み
    fmt.Fprintf(file, "合計: %d行\\n", 3)

    fmt.Println("書き込み完了")

    // 確認
    data, _ := os.ReadFile("manual.txt")
    fmt.Print(string(data))
    os.Remove("manual.txt")
}`}
          expectedOutput={`書き込み完了
1行目
2行目
3行目
合計: 3行`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">追記モード</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">os.OpenFile</code> を使うと、
          追記モードやパーミッション指定が可能です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "os"
)

func main() {
    // 初期ファイル作成
    os.WriteFile("log.txt", []byte("ログ開始\\n"), 0644)

    // 追記モードで開く
    file, err := os.OpenFile("log.txt",
        os.O_APPEND|os.O_WRONLY, 0644)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    defer file.Close()

    // 追記
    file.WriteString("ログ1: 処理開始\\n")
    file.WriteString("ログ2: 処理完了\\n")

    // 確認
    data, _ := os.ReadFile("log.txt")
    fmt.Print(string(data))
    os.Remove("log.txt")
}`}
          expectedOutput={`ログ開始
ログ1: 処理開始
ログ2: 処理完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="io" lessonId="write-file" />
      </div>
      <LessonNav lessons={lessons} currentId="write-file" basePath="/learn/io" />
    </div>
  );
}
