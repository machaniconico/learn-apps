import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("io");

export default function JsonFilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ファイルI/O レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JSONファイル</h1>
        <p className="text-gray-400">構造体とJSONファイルの読み書きを学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSONファイルの書き出し</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">json.MarshalIndent</code> で構造体を整形済みJSONに変換し、
          <code className="text-cyan-300">os.WriteFile</code> でファイルに保存します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type Task struct {
    ID        int    \`json:"id"\`
    Title     string \`json:"title"\`
    Completed bool   \`json:"completed"\`
}

func main() {
    tasks := []Task{
        {ID: 1, Title: "Goを学ぶ", Completed: true},
        {ID: 2, Title: "チャネルを理解する", Completed: false},
        {ID: 3, Title: "テストを書く", Completed: false},
    }

    // JSONに変換
    data, err := json.MarshalIndent(tasks, "", "  ")
    if err != nil {
        fmt.Println("JSON変換エラー:", err)
        return
    }

    // ファイルに書き出し
    os.WriteFile("tasks.json", data, 0644)
    defer os.Remove("tasks.json")

    fmt.Println("=== 保存したJSON ===")
    fmt.Println(string(data))
}`}
          expectedOutput={`=== 保存したJSON ===
[
  {
    "id": 1,
    "title": "Goを学ぶ",
    "completed": true
  },
  {
    "id": 2,
    "title": "チャネルを理解する",
    "completed": false
  },
  {
    "id": 3,
    "title": "テストを書く",
    "completed": false
  }
]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSONファイルの読み込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">os.ReadFile</code> でファイルを読み込み、
          <code className="text-cyan-300">json.Unmarshal</code> で構造体に変換します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type Config struct {
    AppName  string   \`json:"app_name"\`
    Port     int      \`json:"port"\`
    Debug    bool     \`json:"debug"\`
    AllowedHosts []string \`json:"allowed_hosts"\`
}

func main() {
    // テスト用JSONファイル作成
    jsonData := \`{
  "app_name": "MyGoApp",
  "port": 8080,
  "debug": true,
  "allowed_hosts": ["localhost", "example.com"]
}\`
    os.WriteFile("config.json", []byte(jsonData), 0644)
    defer os.Remove("config.json")

    // ファイルを読み込み
    data, err := os.ReadFile("config.json")
    if err != nil {
        fmt.Println("読み込みエラー:", err)
        return
    }

    // JSONを構造体にパース
    var config Config
    if err := json.Unmarshal(data, &config); err != nil {
        fmt.Println("JSONパースエラー:", err)
        return
    }

    fmt.Printf("アプリ名: %s\\n", config.AppName)
    fmt.Printf("ポート: %d\\n", config.Port)
    fmt.Printf("デバッグ: %t\\n", config.Debug)
    fmt.Printf("許可ホスト: %v\\n", config.AllowedHosts)
}`}
          expectedOutput={`アプリ名: MyGoApp
ポート: 8080
デバッグ: true
許可ホスト: [localhost example.com]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">json.Encoder / json.Decoder</h2>
        <p className="text-gray-400 mb-4">
          大きなファイルやストリーミング処理には
          <code className="text-cyan-300">json.NewEncoder</code> /
          <code className="text-cyan-300">json.NewDecoder</code> が効率的です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type Product struct {
    Name  string  \`json:"name"\`
    Price float64 \`json:"price"\`
}

func main() {
    // Encoder でファイルに直接書き込み
    file, _ := os.Create("products.json")
    encoder := json.NewEncoder(file)
    encoder.SetIndent("", "  ")

    products := []Product{
        {Name: "りんご", Price: 150},
        {Name: "バナナ", Price: 100},
    }
    encoder.Encode(products)
    file.Close()

    // Decoder でファイルから直接読み込み
    file2, _ := os.Open("products.json")
    defer file2.Close()

    var loaded []Product
    decoder := json.NewDecoder(file2)
    decoder.Decode(&loaded)

    fmt.Println("=== 読み込んだ商品 ===")
    for _, p := range loaded {
        fmt.Printf("%s: ¥%.0f\\n", p.Name, p.Price)
    }
    os.Remove("products.json")
}`}
          expectedOutput={`=== 読み込んだ商品 ===
りんご: ¥150
バナナ: ¥100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="io" lessonId="json-file" />
      </div>
      <LessonNav lessons={lessons} currentId="json-file" basePath="/learn/io" />
    </div>
  );
}
