import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("json");

export default function UnmarshalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">JSON処理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アンマーシャル</h1>
        <p className="text-gray-400">json.Unmarshalで JSON から構造体へ変換する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">json.Unmarshal</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">json.Unmarshal</code> はJSONバイト列をGoの値に変換（デコード）します。
          構造体のフィールド名とJSONのキーを照合してマッピングします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">json.Unmarshal(data, &amp;v)</code> — ポインタに変換</li>
          <li>大文字小文字を区別しないマッチング</li>
          <li>未知のフィールドは無視される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体へのアンマーシャル</h2>
        <p className="text-gray-400 mb-4">
          JSON文字列を構造体に変換します。<code className="text-cyan-300">&amp;</code>（ポインタ）で渡す必要があります。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type Product struct {
    Name  string \`json:"name"\`
    Price int    \`json:"price"\`
    Stock int    \`json:"stock"\`
}

func main() {
    jsonStr := \`{"name": "Go入門書", "price": 2800, "stock": 50}\`

    var product Product
    err := json.Unmarshal([]byte(jsonStr), &product)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }

    fmt.Printf("商品名: %s\\n", product.Name)
    fmt.Printf("価格: ¥%d\\n", product.Price)
    fmt.Printf("在庫: %d個\\n", product.Stock)
}`}
          expectedOutput={`商品名: Go入門書
価格: ¥2800
在庫: 50個`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列のアンマーシャル</h2>
        <p className="text-gray-400 mb-4">
          JSON配列はGoのスライスにアンマーシャルできます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type Task struct {
    ID     int    \`json:"id"\`
    Title  string \`json:"title"\`
    Done   bool   \`json:"done"\`
}

func main() {
    jsonStr := \`[
        {"id": 1, "title": "買い物", "done": true},
        {"id": 2, "title": "掃除", "done": false},
        {"id": 3, "title": "料理", "done": false}
    ]\`

    var tasks []Task
    json.Unmarshal([]byte(jsonStr), &tasks)

    for _, t := range tasks {
        status := "未完了"
        if t.Done {
            status = "完了"
        }
        fmt.Printf("#%d %s [%s]\\n", t.ID, t.Title, status)
    }
}`}
          expectedOutput={`#1 買い物 [完了]
#2 掃除 [未完了]
#3 料理 [未完了]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">map[string]interface{} へのアンマーシャル</h2>
        <p className="text-gray-400 mb-4">
          構造体を定義せずに、<code className="text-cyan-300">map[string]interface{'{}'}</code> で柔軟にJSONをパースできます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

func main() {
    jsonStr := \`{"name": "太郎", "age": 30, "active": true}\`

    var data map[string]interface{}
    json.Unmarshal([]byte(jsonStr), &data)

    fmt.Println("キーと値:")
    for key, value := range data {
        fmt.Printf("  %s: %v (%T)\\n", key, value, value)
    }

    // 型アサーションで取り出し
    if name, ok := data["name"].(string); ok {
        fmt.Printf("\\n名前（string）: %s\\n", name)
    }

    // 数値はfloat64になる点に注意
    if age, ok := data["age"].(float64); ok {
        fmt.Printf("年齢（float64）: %.0f\\n", age)
    }
}`}
          expectedOutput={`キーと値:
  name: 太郎 (string)
  age: 30 (float64)
  active: true (bool)

名前（string）: 太郎
年齢（float64）: 30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="json" lessonId="unmarshal" />
      </div>
      <LessonNav lessons={lessons} currentId="unmarshal" basePath="/learn/json" />
    </div>
  );
}
