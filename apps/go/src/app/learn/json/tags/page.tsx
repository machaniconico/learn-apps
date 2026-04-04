import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("json");

export default function TagsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">JSON処理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JSONタグ</h1>
        <p className="text-gray-400">構造体タグでJSONフィールド名を制御する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">構造体タグの構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体フィールドにバッククォートで<code className="text-cyan-300">{`\`json:"name"\``}</code>のようにタグを付けることで、
          JSONのフィールド名やシリアライズ動作を制御できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">{`json:"field_name"`}</code> — フィールド名を指定</li>
          <li><code className="text-cyan-300">{`json:"name,omitempty"`}</code> — ゼロ値の場合は省略</li>
          <li><code className="text-cyan-300">{`json:"-"`}</code> — JSONから除外</li>
          <li><code className="text-cyan-300">{`json:",string"`}</code> — 数値を文字列として出力</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フィールド名の指定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">{`json:"name"`}</code> でJSONのキー名をカスタマイズします。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    FirstName string \`json:"first_name"\`
    LastName  string \`json:"last_name"\`
    Email     string \`json:"email"\`
    Age       int    \`json:"age"\`
}

func main() {
    user := User{
        FirstName: "太郎",
        LastName:  "田中",
        Email:     "tanaka@example.com",
        Age:       28,
    }

    data, _ := json.MarshalIndent(user, "", "  ")
    fmt.Println(string(data))
}`}
          expectedOutput={`{
  "first_name": "太郎",
  "last_name": "田中",
  "email": "tanaka@example.com",
  "age": 28
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">omitempty オプション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">omitempty</code> を指定すると、ゼロ値のフィールドはJSONから省略されます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type Config struct {
    Host     string \`json:"host"\`
    Port     int    \`json:"port,omitempty"\`
    Debug    bool   \`json:"debug,omitempty"\`
    LogPath  string \`json:"log_path,omitempty"\`
}

func main() {
    // 一部フィールドがゼロ値
    config := Config{
        Host: "localhost",
        Port: 8080,
        // Debug: false (ゼロ値 → 省略)
        // LogPath: "" (ゼロ値 → 省略)
    }

    data, _ := json.MarshalIndent(config, "", "  ")
    fmt.Println(string(data))
    fmt.Println()
    fmt.Println("※ Debug(false)とLogPath(\"\")はomitemptyにより省略")
}`}
          expectedOutput={`{
  "host": "localhost",
  "port": 8080
}

※ Debug(false)とLogPath("")はomitemptyにより省略`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フィールドの除外</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">{`json:"-"`}</code> で特定のフィールドをJSON変換から完全に除外できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type Account struct {
    Username string \`json:"username"\`
    Email    string \`json:"email"\`
    Password string \`json:"-"\`         // JSONから除外
    Token    string \`json:"-"\`         // JSONから除外
}

func main() {
    account := Account{
        Username: "gopher",
        Email:    "gopher@example.com",
        Password: "secret123",
        Token:    "abc-def-ghi",
    }

    data, _ := json.MarshalIndent(account, "", "  ")
    fmt.Println(string(data))
    fmt.Println()
    fmt.Println("※ Password と Token は json:\"-\" により除外されています")
}`}
          expectedOutput={`{
  "username": "gopher",
  "email": "gopher@example.com"
}

※ Password と Token は json:"-" により除外されています`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="json" lessonId="tags" />
      </div>
      <LessonNav lessons={lessons} currentId="tags" basePath="/learn/json" />
    </div>
  );
}
