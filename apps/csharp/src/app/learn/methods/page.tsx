import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C#でメソッドの戻り値がない場合、戻り値の型には何を指定しますか？",
    options: ["null", "void", "none", "empty"],
    answer: 1,
    explanation: "戻り値がないメソッドには void を指定します。",
  },
  {
    question: "メソッドオーバーロードとは何ですか？",
    options: [
      "メソッドを上書きすること",
      "同じ名前で異なる引数リストを持つ複数のメソッドを定義すること",
      "メソッドを削除すること",
      "メソッドを非同期にすること",
    ],
    answer: 1,
    explanation: "オーバーロードは同じメソッド名で引数の型・数が異なる複数の定義を持つことです。",
  },
  {
    question: "式本体メソッド（expression-bodied method）に使う演算子はどれですか？",
    options: ["->", "=>", "::", "??"],
    answer: 1,
    explanation: "=> （ラムダ矢印）を使って単一式のメソッドを簡潔に記述できます。",
  },
  {
    question: "再帰メソッドで必ず必要なものは何ですか？",
    options: ["static キーワード", "out パラメータ", "基底ケース（終了条件）", "戻り値の型 void"],
    answer: 2,
    explanation: "再帰メソッドには無限ループを防ぐ基底ケース（ベースケース）が必須です。",
  },
];

export default function MethodsIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-teal-500/15 text-teal-400 border border-teal-500/30">
            メソッド
          </span>
          <DifficultyBadge difficulty="beginner" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-3">メソッド</h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
          C# のメソッドは処理をまとめて再利用可能にする基本単位です。引数・戻り値・オーバーロード・再帰など、
          メソッドに関わるすべての概念を体系的に学びます。
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 p-5 rounded-xl bg-gray-900 border border-gray-800">
        <ProgressBar categoryId="methods" totalLessons={lessons.length} color="teal" />
      </div>

      {/* Overview */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドは一連の処理をまとめた「名前付きコードブロック」です。同じ処理を何度も書く代わりに、
          メソッドとして定義して呼び出すことで、コードの重複を避け可読性を高めます。
          C# のメソッドには<strong className="text-white">アクセス修飾子</strong>・
          <strong className="text-white">戻り値の型</strong>・
          <strong className="text-white">メソッド名</strong>・
          <strong className="text-white">引数リスト</strong>の4要素があります。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { label: "引数なし / 戻り値なし", ex: "void Print()" },
            { label: "引数あり", ex: "void Add(int a, int b)" },
            { label: "戻り値あり", ex: "int Square(int x)" },
            { label: "式本体", ex: "int Double(int x) => x * 2" },
          ].map((item) => (
            <div key={item.label} className="bg-gray-800 rounded-lg p-3">
              <p className="text-xs text-teal-400 font-semibold mb-1">{item.label}</p>
              <code className="text-xs text-gray-300 font-mono">{item.ex}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Code example */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なメソッドの例</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // 引数あり・戻り値あり
    static int Add(int a, int b)
    {
        return a + b;
    }

    // 式本体メソッド
    static int Square(int x) => x * x;

    // void メソッド
    static void Greet(string name)
    {
        Console.WriteLine($"こんにちは、{name}さん！");
    }

    static void Main()
    {
        int sum = Add(3, 5);
        Console.WriteLine($"3 + 5 = {sum}");

        int sq = Square(7);
        Console.WriteLine($"7の2乗 = {sq}");

        Greet("太郎");
    }
}`}
          expectedOutput={`3 + 5 = 8
7の2乗 = 49
こんにちは、太郎さん！`}
        />
      </section>

      {/* Lesson list */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">レッスン一覧</h2>
        <LessonList
          lessons={lessons}
          basePath="/learn/methods"
          color="teal"
          categoryId="methods"
        />
      </section>

      {/* Quiz */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">確認クイズ</h2>
        <Quiz questions={quizQuestions} color="teal" />
      </section>
    </div>
  );
}
