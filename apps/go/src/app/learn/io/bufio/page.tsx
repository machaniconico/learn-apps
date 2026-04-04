import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("io");

export default function BufioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ファイルI/O レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">bufio</h1>
        <p className="text-gray-400">bufio.Scannerとbufio.Writerによるバッファ付きI/Oの効率的な使い方を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">bufio.Scannerの活用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">bufio.Scanner</code> はデフォルトで行単位にスキャンしますが、
          <code className="text-cyan-300">Split</code> 関数で区切り方を変更できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "bufio"
    "fmt"
    "strings"
)

func main() {
    // 文字列からScannerを作成
    input := "Go言語\\nは楽しい\\nプログラミング\\n言語です"
    scanner := bufio.NewScanner(strings.NewReader(input))

    fmt.Println("=== 行単位のスキャン ===")
    lineNum := 1
    for scanner.Scan() {
        fmt.Printf("%d: %s\\n", lineNum, scanner.Text())
        lineNum++
    }

    // ワード単位のスキャン
    input2 := "Hello Go World"
    scanner2 := bufio.NewScanner(strings.NewReader(input2))
    scanner2.Split(bufio.ScanWords) // ワード単位に変更

    fmt.Println("\\n=== ワード単位のスキャン ===")
    for scanner2.Scan() {
        fmt.Printf("[%s] ", scanner2.Text())
    }
    fmt.Println()
}`}
          expectedOutput={`=== 行単位のスキャン ===
1: Go言語
2: は楽しい
3: プログラミング
4: 言語です

=== ワード単位のスキャン ===
[Hello] [Go] [World] `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">bufio.Writer</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">bufio.Writer</code> はバッファリングにより
          書き込み回数を減らし、パフォーマンスを向上させます。
          最後に必ず <code className="text-cyan-300">Flush()</code> を呼びます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    file, _ := os.Create("buffered.txt")
    defer file.Close()

    // バッファ付きライター
    writer := bufio.NewWriter(file)

    for i := 1; i <= 5; i++ {
        fmt.Fprintf(writer, "行 %d: データ\\n", i)
    }

    // Flush() でバッファの内容をファイルに書き出す
    writer.Flush()
    fmt.Println("バッファ付き書き込み完了")

    // 確認
    data, _ := os.ReadFile("buffered.txt")
    fmt.Print(string(data))
    os.Remove("buffered.txt")
}`}
          expectedOutput={`バッファ付き書き込み完了
行 1: データ
行 2: データ
行 3: データ
行 4: データ
行 5: データ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">bufio.Reader</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">bufio.Reader</code> は
          <code className="text-cyan-300">ReadString</code> や
          <code className="text-cyan-300">ReadBytes</code> でデリミタ指定の読み取りが可能です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "bufio"
    "fmt"
    "strings"
)

func main() {
    input := "name=太郎;age=30;city=東京"
    reader := bufio.NewReader(strings.NewReader(input))

    fmt.Println("=== デリミタ ';' で分割読み取り ===")
    for {
        // ';' まで読み取り
        str, err := reader.ReadString(';')
        // デリミタを除去して表示
        str = strings.TrimSuffix(str, ";")
        if str != "" {
            fmt.Println(str)
        }
        if err != nil {
            break
        }
    }
}`}
          expectedOutput={`=== デリミタ ';' で分割読み取り ===
name=太郎
age=30
city=東京`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="io" lessonId="bufio" />
      </div>
      <LessonNav lessons={lessons} currentId="bufio" basePath="/learn/io" />
    </div>
  );
}
