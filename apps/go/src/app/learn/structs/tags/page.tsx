import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function TagsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">構造体 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">タグ</h1>
        <p className="text-gray-400">構造体タグの活用を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">構造体タグ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体タグはバッククォートで囲んだメタデータです。
          <code className="text-cyan-300">json</code> タグはJSONフィールド名の制御に最もよく使われます。
          <code className="text-cyan-300">reflect</code> パッケージでタグを読み取れます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSONタグ</h2>
        <p className="text-gray-400 mb-4">
          JSONのフィールド名やシリアライズ時の振る舞いを制御します。
        </p>
        <GoEditor
          defaultCode={"package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\ntype User struct {\n    Name     string `json:\"name\"`\n    Email    string `json:\"email\"`\n    Age      int    `json:\"age\"`\n    Password string `json:\"-\"`       // JSONに含めない\n}\n\nfunc main() {\n    user := User{\n        Name:     \"太郎\",\n        Email:    \"taro@example.com\",\n        Age:      25,\n        Password: \"secret123\",\n    }\n\n    data, _ := json.MarshalIndent(user, \"\", \"  \")\n    fmt.Println(string(data))\n}"}
          expectedOutput={`{
  "name": "太郎",
  "email": "taro@example.com",
  "age": 25
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">omitemptyとカスタムタグ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">omitempty</code> でゼロ値のフィールドをJSON出力から除外できます。
        </p>
        <GoEditor
          defaultCode={"package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\ntype Config struct {\n    Host    string `json:\"host\"`\n    Port    int    `json:\"port,omitempty\"`\n    Debug   bool   `json:\"debug,omitempty\"`\n    Timeout int    `json:\"timeout,omitempty\"`\n}\n\nfunc main() {\n    // 一部のフィールドだけ設定\n    cfg := Config{\n        Host: \"localhost\",\n        Port: 8080,\n    }\n\n    data, _ := json.MarshalIndent(cfg, \"\", \"  \")\n    fmt.Println(string(data))\n}"}
          expectedOutput={`{
  "host": "localhost",
  "port": 8080
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="tags" />
      </div>
      <LessonNav lessons={lessons} currentId="tags" basePath="/learn/structs" />
    </div>
  );
}
