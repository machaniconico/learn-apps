import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goプログラムのエントリーポイントとなるパッケージ名は？",
    options: ["main", "app", "go", "start"],
    answer: 0,
    explanation: "Goでは package main の main() 関数がプログラムのエントリーポイントです。",
  },
  {
    question: ":= 演算子の役割は？",
    options: ["比較演算", "短縮変数宣言", "定数宣言", "型変換"],
    answer: 1,
    explanation: ":= は var を省略して変数の宣言と初期化を同時に行う短縮宣言です。",
  },
  {
    question: "int型のゼロ値は何ですか？",
    options: ["nil", "null", "0", "undefined"],
    answer: 2,
    explanation: "Goの数値型のゼロ値は 0 です。string は \"\"、bool は false がゼロ値です。",
  },
  {
    question: "fmt.Printfで文字列を出力するフォーマット動詞は？",
    options: ["%d", "%f", "%s", "%b"],
    answer: 2,
    explanation: "%s は文字列、%d は整数、%f は浮動小数点数のフォーマット動詞です。",
  },
];

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">Go基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">12レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goプログラミングの基礎を学びます。Hello Worldから変数宣言、データ型、定数、演算子、fmtパッケージまで、
          Goの基本的な構文と概念をカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="basics" totalLessons={12} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全12レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/basics" color="blue" categoryId="basics" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のGoプログラム</h2>
        <p className="text-gray-400 mb-4">
          Goの基本的な構造を確認しましょう。<code className="text-cyan-300">package main</code> と
          <code className="text-cyan-300">func main()</code> がエントリーポイントです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
    name := "Go言語"
    fmt.Printf("%s は楽しい！\\n", name)
}`}
          expectedOutput={`Hello, Go!
Go言語 は楽しい！`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数と型</h2>
        <p className="text-gray-400 mb-4">
          Goは静的型付け言語です。<code className="text-cyan-300">var</code> と
          <code className="text-cyan-300">:=</code> で変数を宣言します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    var age int = 25
    name := "Gopher"
    isActive := true

    fmt.Printf("名前: %s\\n", name)
    fmt.Printf("年齢: %d\\n", age)
    fmt.Printf("有効: %t\\n", isActive)
}`}
          expectedOutput={`名前: Gopher
年齢: 25
有効: true`}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
