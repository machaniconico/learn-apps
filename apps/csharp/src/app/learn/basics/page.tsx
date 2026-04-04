import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C#でコンソールに文字列を出力するメソッドはどれですか？",
    options: [
      "Console.Print()",
      "Console.WriteLine()",
      "Console.Output()",
      "System.Write()",
    ],
    answer: 1,
    explanation: "Console.WriteLine() はコンソールに文字列を出力し、改行します。Console.Write() は改行なしで出力します。",
  },
  {
    question: "C#でnullを許容する整数型の正しい宣言はどれですか？",
    options: [
      "int? number = null;",
      "null int number;",
      "int number = null;",
      "nullable<int> number;",
    ],
    answer: 0,
    explanation: "int? は Nullable<int> の省略記法です。型名の後に ? を付けることでnull許容型になります。",
  },
  {
    question: "定数の宣言に使うキーワードはどれですか？",
    options: ["static", "fixed", "const", "final"],
    answer: 2,
    explanation: "const キーワードでコンパイル時定数を宣言します。readonly は実行時定数で、コンストラクタで初期化できます。",
  },
  {
    question: "var キーワードについて正しい説明はどれですか？",
    options: [
      "型が動的に変わるため、実行時まで型が確定しない",
      "コンパイラが初期化式から型を推論するため、型安全性は保たれる",
      "JavaScript の var と同じで型がない変数を宣言する",
      "object 型の別名である",
    ],
    answer: 1,
    explanation: "var はコンパイル時に型推論が行われます。一度型が確定すると変更できず、型安全性は完全に保たれます。",
  },
];

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">C#基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">12レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C#プログラミングの基礎を学びましょう。変数・データ型・演算子・コメントなど、すべてのC#プログラムの土台となる概念を丁寧に解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="basics" totalLessons={12} color="purple" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全12レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/basics" color="purple" categoryId="basics" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C#の概要</h2>
        <p className="text-gray-400 mb-4">
          C#（シーシャープ）はMicrosoftが開発したモダンなオブジェクト指向言語です。.NETプラットフォーム上で動作し、
          Webアプリ・ゲーム開発（Unity）・デスクトップアプリなど幅広い用途で使われています。
        </p>
        <CSharpEditor
          defaultCode={`// C#の基本構造
using System;

class Program
{
    static void Main(string[] args)
    {
        // 変数の宣言と初期化
        string name = "C#";
        int version = 12;
        bool isAwesome = true;

        // 文字列補間で出力
        Console.WriteLine($"言語: {name}");
        Console.WriteLine($"バージョン: {version}");
        Console.WriteLine($"素晴らしい: {isAwesome}");
    }
}`}
          expectedOutput={`言語: C#
バージョン: 12
素晴らしい: True`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型安全性とNull安全</h2>
        <p className="text-gray-400 mb-4">
          C#は静的型付け言語で、コンパイル時に型エラーを検出できます。また、Nullable参照型を使うとnull安全なコードを書けます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        // null合体演算子
        string? maybeName = null;
        string displayName = maybeName ?? "名無し";
        Console.WriteLine(displayName);

        // null条件演算子
        string? text = null;
        int? length = text?.Length;
        Console.WriteLine(length.HasValue ? $"長さ: {length}" : "nullです");

        // var による型推論
        var number = 42;        // int と推論
        var pi = 3.14;          // double と推論
        Console.WriteLine($"{number}, {pi}");
    }
}`}
          expectedOutput={`名無し
nullです
42, 3.14`}
        />
      </section>

      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
