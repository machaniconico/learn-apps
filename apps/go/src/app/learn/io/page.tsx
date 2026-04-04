import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("io");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ファイル全体を一度に読み込む関数は？",
    options: ["os.Open", "os.ReadFile", "bufio.Read", "io.ReadAll"],
    answer: 1,
    explanation: "os.ReadFile はファイルの内容をすべて []byte として読み込みます。",
  },
  {
    question: "bufio.Scannerのデフォルトの分割関数は？",
    options: ["ScanBytes", "ScanWords", "ScanLines", "ScanRunes"],
    answer: 2,
    explanation: "bufio.Scanner はデフォルトで ScanLines を使い、行単位でスキャンします。",
  },
  {
    question: "filepath.Join の役割は？",
    options: ["ファイルを結合する", "パスの要素を OS に合わせて結合する", "ファイルをコピーする", "ディレクトリを作成する"],
    answer: 1,
    explanation: "filepath.Join はパスの要素を適切なセパレータで結合し、OS に依存しないパスを作ります。",
  },
  {
    question: "//go:embed ディレクティブの用途は？",
    options: ["コメントを生成する", "ファイルをバイナリに埋め込む", "テストを実行する", "依存関係を追加する"],
    answer: 1,
    explanation: "//go:embed はコンパイル時にファイルやディレクトリをバイナリに埋め込みます。",
  },
];

export default function IoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">ファイルI/O</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goでのファイル操作を学びます。os.ReadFile / os.WriteFile による簡易的な読み書きから、
          bufio によるバッファ付きI/O、filepath パッケージによるパス操作、
          JSONファイルの読み書き、go:embed によるファイル埋め込みまでカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="io" totalLessons={6} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/io" color="blue" categoryId="io" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルの読み書き</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">os.ReadFile</code> でファイル全体を読み込み、
          <code className="text-cyan-300">os.WriteFile</code> でファイルに書き出します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "os"
)

func main() {
    // ファイルに書き込み
    content := []byte("Hello, ファイルI/O!\\nGoで書きました。")
    err := os.WriteFile("test.txt", content, 0644)
    if err != nil {
        fmt.Println("書き込みエラー:", err)
        return
    }
    fmt.Println("ファイル書き込み完了")

    // ファイルを読み込み
    data, err := os.ReadFile("test.txt")
    if err != nil {
        fmt.Println("読み込みエラー:", err)
        return
    }
    fmt.Println("読み込み内容:")
    fmt.Println(string(data))

    // クリーンアップ
    os.Remove("test.txt")
}`}
          expectedOutput={`ファイル書き込み完了
読み込み内容:
Hello, ファイルI/O!
Goで書きました。`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSONの読み書き</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">encoding/json</code> パッケージで構造体とJSONを相互変換し、ファイルに保存できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name  string \`json:"name"\`
    Age   int    \`json:"age"\`
    Email string \`json:"email"\`
}

func main() {
    user := User{Name: "太郎", Age: 30, Email: "taro@example.com"}

    // 構造体 → JSON
    data, _ := json.MarshalIndent(user, "", "  ")
    fmt.Println("JSON出力:")
    fmt.Println(string(data))

    // JSON → 構造体
    jsonStr := \`{"name":"花子","age":25,"email":"hanako@example.com"}\`
    var user2 User
    json.Unmarshal([]byte(jsonStr), &user2)
    fmt.Printf("\\n復元: %s (%d歳)\\n", user2.Name, user2.Age)
}`}
          expectedOutput={`JSON出力:
{
  "name": "太郎",
  "age": 30,
  "email": "taro@example.com"
}

復元: 花子 (25歳)`}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
