import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

const quizQuestions: QuizQuestion[] = [
  {
    question: "構造体を定義するキーワードの組み合わせは？",
    options: ["class", "type ... struct", "struct ... type", "object"],
    answer: 1,
    explanation: "type 構造体名 struct { フィールド } の形式で定義します。",
  },
  {
    question: "ポインタレシーバを使う主な理由は？",
    options: ["速度が速いから", "構造体を変更したいから", "必須だから", "メモリを使わないから"],
    answer: 1,
    explanation: "ポインタレシーバを使うと、メソッド内で構造体の値を変更できます。",
  },
  {
    question: "構造体の埋め込みの効果は？",
    options: ["継承", "埋め込まれた型のフィールドとメソッドに直接アクセスできる", "カプセル化", "多重継承"],
    answer: 1,
    explanation: "埋め込みにより、親構造体のフィールドを直接名前でアクセスできます。",
  },
  {
    question: "構造体タグの主な用途は？",
    options: ["コメント", "JSONフィールド名の指定など", "型チェック", "デバッグ"],
    answer: 1,
    explanation: "構造体タグはJSONのフィールド名指定やバリデーションなどに使われます。",
  },
];

export default function StructsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">構造体</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goの構造体を学びます。フィールドの定義、メソッド、ポインタレシーバ、
          埋め込み、タグ、コンストラクタパターンまで、構造体の全てをカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="structs" totalLessons={8} color="indigo" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/structs" color="indigo" categoryId="structs" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体とメソッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">type</code> と <code className="text-cyan-300">struct</code> で
          独自のデータ型を定義し、メソッドを追加できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func (u User) Greet() string {
    return fmt.Sprintf("こんにちは、%sです（%d歳）", u.Name, u.Age)
}

func main() {
    user := User{Name: "太郎", Age: 25}
    fmt.Println(user.Greet())

    user2 := User{"花子", 30}
    fmt.Println(user2.Greet())
}`}
          expectedOutput={`こんにちは、太郎です（25歳）
こんにちは、花子です（30歳）`}
        />
      </section>
      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
