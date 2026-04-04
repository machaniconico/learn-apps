import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ポインタを宣言するために使う記号はどれですか？",
    options: ["&", "*", "#", "@"],
    answer: 1,
    explanation: "*T はT型へのポインタ型を表します。例: var p *int",
  },
  {
    question: "変数のアドレスを取得する演算子はどれですか？",
    options: ["*", "&", "->", "::"],
    answer: 1,
    explanation: "&x は変数xのメモリアドレスを返します。",
  },
  {
    question: "nilポインタをデリファレンスするとどうなりますか？",
    options: ["0が返る", "コンパイルエラー", "ランタイムパニック", "空文字が返る"],
    answer: 2,
    explanation: "nilポインタのデリファレンスはランタイムパニックを引き起こします。",
  },
  {
    question: "new(int) は何を返しますか？",
    options: ["int型の値0", "*int型のポインタ", "int型のスライス", "エラー"],
    answer: 1,
    explanation: "new(T)はT型のゼロ値を指す*T型のポインタを返します。",
  },
];

export default function PointersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">ポインタ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          ポインタはGoの強力な機能の一つで、変数のメモリアドレスを直接操作できます。
          ポインタを使えば、関数に値を渡す際にコピーを避けたり、データ構造を効率的に操作したりできます。
          このカテゴリでは、ポインタの基本から安全な使い方まで学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="pointers" totalLessons={6} color="pink" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/pointers" color="pink" categoryId="pointers" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタの基本例</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    x := 42
    p := &x  // xのアドレスを取得

    fmt.Println("xの値:", x)
    fmt.Println("pの値（アドレス）:", p)
    fmt.Println("*pの値（デリファレンス）:", *p)

    *p = 100  // ポインタ経由で値を変更
    fmt.Println("変更後のx:", x)
}`}
          expectedOutput={`xの値: 42
pの値（アドレス）: 0xc0000b6010
*pの値（デリファレンス）: 42
変更後のx: 100`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数でポインタを使う例</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func double(n *int) {
    *n = *n * 2
}

func main() {
    value := 10
    fmt.Println("変更前:", value)

    double(&value)
    fmt.Println("変更後:", value)
}`}
          expectedOutput={`変更前: 10
変更後: 20`}
        />
      </section>
      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
