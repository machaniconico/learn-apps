import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("json");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Go構造体をJSON文字列に変換する関数は？",
    options: ["json.Encode", "json.Marshal", "json.Stringify", "json.Convert"],
    answer: 1,
    explanation: "json.Marshal は Go の値を JSON のバイト列に変換します。",
  },
  {
    question: "JSON文字列をGo構造体に変換する関数は？",
    options: ["json.Unmarshal", "json.Decode", "json.Parse", "json.Read"],
    answer: 0,
    explanation: "json.Unmarshal は JSON バイト列を Go の値に変換（デコード）します。",
  },
  {
    question: "構造体タグ `json:\"-\"` の意味は？",
    options: ["フィールド名をハイフンにする", "JSONから除外する", "必須フィールドにする", "デフォルト値を設定する"],
    answer: 1,
    explanation: "`json:\"-\"` を指定すると、そのフィールドは JSON の変換対象から除外されます。",
  },
  {
    question: "json.NewEncoder の利点は何ですか？",
    options: [
      "より高速な変換",
      "io.Writer に直接書き込める",
      "バリデーション機能がある",
      "型安全性が高い",
    ],
    answer: 1,
    explanation: "json.NewEncoder は io.Writer に直接 JSON を書き込むため、中間バッファが不要です。",
  },
];

export default function JsonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">JSON処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goの encoding/json パッケージを使ったJSON処理を学びます。マーシャル・アンマーシャル、構造体タグ、
          ストリーミング処理、カスタムJSON変換までをカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="json" totalLessons={5} color="pink" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/json" color="pink" categoryId="json" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体からJSONへ変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">json.Marshal</code> でGoの構造体をJSON文字列に変換できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type Book struct {
    Title  string \`json:"title"\`
    Author string \`json:"author"\`
    Price  int    \`json:"price"\`
}

func main() {
    book := Book{Title: "Go入門", Author: "山田太郎", Price: 2800}
    data, _ := json.MarshalIndent(book, "", "  ")
    fmt.Println(string(data))
}`}
          expectedOutput={`{
  "title": "Go入門",
  "author": "山田太郎",
  "price": 2800
}`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSONから構造体へ変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">json.Unmarshal</code> でJSON文字列をGoの構造体に復元します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

func main() {
    jsonStr := \`{"name": "花子", "age": 25}\`
    var user User
    json.Unmarshal([]byte(jsonStr), &user)
    fmt.Printf("名前: %s, 年齢: %d\\n", user.Name, user.Age)
}`}
          expectedOutput={`名前: 花子, 年齢: 25`}
        />
      </section>
      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
