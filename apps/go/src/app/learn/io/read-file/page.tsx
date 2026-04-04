import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("io");

export default function ReadFilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ファイルI/O レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイル読み込み</h1>
        <p className="text-gray-400">os.ReadFileとos.Open + bufio.Scannerによるファイル読み込み方法を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">os.ReadFileで一括読み込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">os.ReadFile</code> はファイル全体を一度に
          <code className="text-cyan-300">[]byte</code> として読み込みます。
          小〜中サイズのファイルに適しています。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "os"
)

func main() {
    // デモ用のファイルを作成
    content := "1行目: Hello, Go!\\n2行目: ファイルI/O\\n3行目: 簡単！"
    os.WriteFile("sample.txt", []byte(content), 0644)
    defer os.Remove("sample.txt")

    // os.ReadFile で一括読み込み
    data, err := os.ReadFile("sample.txt")
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }

    fmt.Println("=== ファイル内容 ===")
    fmt.Println(string(data))
    fmt.Printf("\\nサイズ: %d バイト\\n", len(data))
}`}
          expectedOutput={`=== ファイル内容 ===
1行目: Hello, Go!
2行目: ファイルI/O
3行目: 簡単！

サイズ: 53 バイト`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">os.Open + bufio.Scanner</h2>
        <p className="text-gray-400 mb-4">
          大きなファイルを行単位で処理する場合は、<code className="text-cyan-300">os.Open</code> と
          <code className="text-cyan-300">bufio.Scanner</code> を組み合わせます。
          メモリ効率が良く、大きなファイルにも対応できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    // デモ用ファイル作成
    content := "apple\\nbanana\\ncherry\\ndate\\nelderberry"
    os.WriteFile("fruits.txt", []byte(content), 0644)
    defer os.Remove("fruits.txt")

    // os.Open でファイルを開く
    file, err := os.Open("fruits.txt")
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    defer file.Close() // 必ず閉じる

    // bufio.Scanner で行単位で読み取り
    scanner := bufio.NewScanner(file)
    lineNum := 1
    for scanner.Scan() {
        fmt.Printf("行%d: %s\\n", lineNum, scanner.Text())
        lineNum++
    }

    if err := scanner.Err(); err != nil {
        fmt.Println("スキャンエラー:", err)
    }
}`}
          expectedOutput={`行1: apple
行2: banana
行3: cherry
行4: date
行5: elderberry`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーハンドリング</h2>
        <p className="text-gray-400 mb-4">
          ファイル操作では必ずエラーチェックを行います。
          <code className="text-cyan-300">os.IsNotExist</code> でファイルの存在確認ができます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "os"
)

func readFileInfo(path string) {
    // ファイルの存在確認
    info, err := os.Stat(path)
    if os.IsNotExist(err) {
        fmt.Printf("%s: ファイルが存在しません\\n", path)
        return
    }
    if err != nil {
        fmt.Printf("%s: エラー - %v\\n", path, err)
        return
    }
    fmt.Printf("%s: サイズ=%d バイト\\n", path, info.Size())
}

func main() {
    // テストファイル作成
    os.WriteFile("exists.txt", []byte("テスト"), 0644)
    defer os.Remove("exists.txt")

    readFileInfo("exists.txt")
    readFileInfo("notfound.txt")
}`}
          expectedOutput={`exists.txt: サイズ=9 バイト
notfound.txt: ファイルが存在しません`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="io" lessonId="read-file" />
      </div>
      <LessonNav lessons={lessons} currentId="read-file" basePath="/learn/io" />
    </div>
  );
}
