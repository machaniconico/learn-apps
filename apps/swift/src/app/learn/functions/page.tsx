import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "functions")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Swiftで関数を定義するキーワードは？",
    options: ["function", "func", "def", "fn"],
    answer: 1,
    explanation: "Swiftではfuncキーワードを使って関数を定義します。",
  },
  {
    question: "inout引数の役割は？",
    options: ["引数の値を出力する", "関数内で引数の値を変更して呼び出し元に反映させる", "入力と出力を同時に行う", "デフォルト値を設定する"],
    answer: 1,
    explanation: "inout引数を使うと関数内で引数の値を変更でき、その変更が呼び出し元の変数に反映されます。呼び出し時は&を付けます。",
  },
  {
    question: "Swiftの関数における引数ラベルとは？",
    options: ["関数名の別名", "呼び出し側で使う名前（内部パラメータ名とは別に設定できる）", "戻り値の名前", "関数の説明コメント"],
    answer: 1,
    explanation: "Swiftでは引数ラベル（外部名）とパラメータ名（内部名）を別々に設定できます。_を使うとラベルなしで呼び出せます。",
  },
  {
    question: "可変長引数を表す構文は？",
    options: ["args[]", "*args", "args...", "...args"],
    answer: 2,
    explanation: "Swiftでは型名の後に...を付けることで可変長引数を宣言します。例: func sum(_ numbers: Int...) -> Int",
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
          Swiftの関数を学びます。引数ラベル・戻り値・デフォルト引数・可変長引数・inout引数・関数型・ネスト関数まで、
          Swiftらしい関数の書き方をマスターしましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="functions" totalLessons={8} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/functions" color="teal" categoryId="functions" />
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: 関数の基本</h2>
        <SwiftEditor
          defaultCode={`// 基本的な関数
func greet(name: String) -> String {
    return "こんにちは、\\(name)さん！"
}
print(greet(name: "太郎"))

// 引数ラベルの使用
func add(_ a: Int, to b: Int) -> Int {
    return a + b
}
print(add(3, to: 5))

// デフォルト引数
func power(_ base: Int, exponent: Int = 2) -> Int {
    var result = 1
    for _ in 0..<exponent { result *= base }
    return result
}
print(power(3))
print(power(2, exponent: 8))`}
          expectedOutput={`こんにちは、太郎さん！
8
9
256`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
