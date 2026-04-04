import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goで関数を定義するキーワードは？",
    options: ["function", "def", "func", "fn"],
    answer: 2,
    explanation: "Goではfuncキーワードで関数を定義します。",
  },
  {
    question: "Goの関数で複数の戻り値を返せますか？",
    options: ["返せない", "最大2つまで", "返せる", "タプルを使う必要がある"],
    answer: 2,
    explanation: "Goの関数は複数の戻り値を返すことができ、エラー処理で広く使われます。",
  },
  {
    question: "deferの実行タイミングは？",
    options: ["すぐに実行される", "関数の最後に実行される", "プログラム終了時", "次のループで"],
    answer: 1,
    explanation: "deferで登録された処理は、関数が終了する直前にLIFO順で実行されます。",
  },
  {
    question: "可変長引数の書き方は？",
    options: ["func f(args []int)", "func f(args ...int)", "func f(*args int)", "func f(args int...)"],
    answer: 1,
    explanation: "...を型名の前に付けて func f(args ...int) と書きます。",
  },
];

export default function FunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">関数</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goの関数を学びます。基本的な関数定義から引数、戻り値、複数戻り値、
          可変長引数、クロージャ、deferまで、関数に関する知識を網羅します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="functions" totalLessons={8} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/functions" color="teal" categoryId="functions" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">func</code> キーワードで関数を定義します。
          Goでは複数の戻り値が返せるのが大きな特徴です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func add(a, b int) int {
    return a + b
}

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("0で割れません")
    }
    return a / b, nil
}

func main() {
    fmt.Println("3 + 5 =", add(3, 5))

    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("エラー:", err)
    } else {
        fmt.Printf("10 / 3 = %.2f\\n", result)
    }
}`}
          expectedOutput={`3 + 5 = 8
10 / 3 = 3.33`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
