import { GoEditor } from "@/components/go-editor";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* プロジェクト1: CLIタスクマネージャ */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト1: CLIタスクマネージャ</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-900 text-green-300">初級</span>
        </div>
        <p className="text-gray-400 mb-4">構造体とスライスを使ってタスクを管理するプログラムを作成しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>Task 構造体を定義する（ID・タイトル・完了フラグ）</li>
          <li>タスクの追加・完了済みマーク・一覧表示を実装する</li>
          <li>未完了タスクのみをフィルタリングして表示する</li>
          <li>タスク数の集計を出力する</li>
        </ul>
        <GoEditor
          defaultCode={`package main

import "fmt"

// TODO: Task 構造体を定義する
// フィールド: ID int, Title string, Done bool

// TODO: タスクを追加する関数を実装する
// func addTask(tasks []Task, title string) []Task

// TODO: タスクを完了済みにする関数を実装する
// func completeTask(tasks []Task, id int) []Task

// TODO: 未完了タスクを返す関数を実装する
// func pendingTasks(tasks []Task) []Task

func main() {
    // TODO: タスクを追加・完了・一覧表示する
    var tasks []Task

    tasks = addTask(tasks, "Go の基礎を学ぶ")
    tasks = addTask(tasks, "構造体を理解する")
    tasks = addTask(tasks, "スライスを活用する")

    tasks = completeTask(tasks, 1)

    fmt.Println("=== 全タスク ===")
    for _, t := range tasks {
        // TODO: 完了・未完了を表示する
        _ = t
    }

    fmt.Printf("\\n未完了: %d件\\n", len(pendingTasks(tasks)))
}`}
          expectedOutput={`=== 全タスク ===
[完了] Go の基礎を学ぶ
[未完] 構造体を理解する
[未完] スライスを活用する

未完了: 2件`}
        />
      </div>

      {/* プロジェクト2: 単語頻度カウンター */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト2: 単語頻度カウンター</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-400 mb-4">map と文字列操作を使ってテキスト内の単語出現回数を集計しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>テキストを単語に分割して map[string]int で集計する</li>
          <li>出現回数が多い順にソートして上位5件を表示する</li>
          <li>大文字・小文字を区別しないよう正規化する</li>
          <li>句読点を除去してから集計する</li>
        </ul>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sort"
    "strings"
)

// TODO: 単語の頻度を集計する関数を実装する
// func wordFrequency(text string) map[string]int

// TODO: 上位N件の単語を返す関数を実装する（出現回数降順）
// func topN(freq map[string]int, n int) []string

func main() {
    text := "go is great go is fast go is simple and simple is great"

    // TODO: 単語頻度を集計して上位5件を表示する
    freq := wordFrequency(text)
    top := topN(freq, 5)

    fmt.Println("=== 単語頻度 Top5 ===")
    for _, word := range top {
        fmt.Printf("%-10s: %d回\\n", word, freq[word])
    }
}`}
          expectedOutput={`=== 単語頻度 Top5 ===
go        : 3回
is        : 3回
great     : 2回
simple    : 2回
fast      : 1回`}
        />
      </div>

      {/* プロジェクト3: 並行ダウンローダ */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト3: 並行ダウンローダ</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-900 text-red-300">上級</span>
        </div>
        <p className="text-gray-400 mb-4">goroutine と channel を使って複数のタスクを並行処理するシミュレーターを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>Result 構造体を定義する（URL・サイズ・エラー）</li>
          <li>各ダウンロードを goroutine で並行実行する</li>
          <li>channel で結果を収集してすべての完了を待つ</li>
          <li>成功・失敗の件数と合計サイズを集計して表示する</li>
        </ul>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "math/rand"
)

// TODO: Result 構造体を定義する
// フィールド: URL string, Size int, Err error

// TODO: ダウンロードをシミュレートする関数を実装する
// func download(url string, ch chan<- Result)

func main() {
    urls := []string{
        "https://example.com/file1.zip",
        "https://example.com/file2.zip",
        "https://example.com/file3.zip",
        "https://example.com/file4.zip",
    }

    // TODO: channel を作成して各 URL を goroutine でダウンロードする
    ch := make(chan Result, len(urls))

    for _, url := range urls {
        // TODO: goroutine を起動する
        _ = url
    }

    // TODO: すべての結果を受け取り集計する
    var total int
    for range urls {
        r := <-ch
        if r.Err == nil {
            total += r.Size
            fmt.Printf("完了: %s (%d KB)\\n", r.URL, r.Size)
        }
    }
    fmt.Printf("合計: %d KB\\n", total)
    _ = rand.Int()
}`}
          expectedOutput={`完了: https://example.com/file1.zip (512 KB)
完了: https://example.com/file2.zip (256 KB)
完了: https://example.com/file3.zip (1024 KB)
完了: https://example.com/file4.zip (128 KB)
合計: 1920 KB`}
        />
      </div>

      {/* プロジェクト4: JSON設定パーサー */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト4: JSON設定パーサー</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-400 mb-4">構造体と encoding/json を使ってアプリの設定ファイルを読み書きしましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>Config 構造体を json タグ付きで定義する</li>
          <li>JSON 文字列をデコードして構造体に変換する</li>
          <li>構造体を JSON にエンコードして出力する</li>
          <li>デフォルト値を設定する関数を実装する</li>
        </ul>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

// TODO: Config 構造体を json タグ付きで定義する
// フィールド: Host string, Port int, Debug bool, MaxConn int

// TODO: デフォルト設定を返す関数を実装する
// func defaultConfig() Config

func main() {
    jsonStr := \`{
        "host": "localhost",
        "port": 8080,
        "debug": true
    }\`

    // TODO: JSON をデコードして Config 構造体に変換する
    var cfg Config
    if err := json.Unmarshal([]byte(jsonStr), &cfg); err != nil {
        fmt.Println("エラー:", err)
        return
    }

    // TODO: max_conn がゼロの場合はデフォルト値を適用する

    fmt.Printf("Host: %s\\n", cfg.Host)
    fmt.Printf("Port: %d\\n", cfg.Port)
    fmt.Printf("Debug: %v\\n", cfg.Debug)
    fmt.Printf("MaxConn: %d\\n", cfg.MaxConn)

    // TODO: 設定を JSON に再エンコードして整形出力する
}`}
          expectedOutput={`Host: localhost
Port: 8080
Debug: true
MaxConn: 100
{
  "host": "localhost",
  "port": 8080,
  "debug": true,
  "max_conn": 100
}`}
        />
      </div>
    </div>
  );
}
