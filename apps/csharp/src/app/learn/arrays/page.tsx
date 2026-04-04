import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C# で int 型の要素5個の配列を宣言する正しい方法はどれですか？",
    options: [
      "int arr = new int(5);",
      "int[] arr = new int[5];",
      "int arr[5];",
      "array<int> arr = new array<int>(5);",
    ],
    answer: 1,
    explanation: "C# の配列は int[] arr = new int[5]; のように宣言します。",
  },
  {
    question: "List<T> と通常の配列の最大の違いは何ですか？",
    options: [
      "List<T> は型安全でない",
      "List<T> は動的にサイズを変更できる",
      "通常の配列の方が常に高速",
      "List<T> は int 型を格納できない",
    ],
    answer: 1,
    explanation: "List<T> は動的にサイズを変更できますが、配列は固定サイズです。",
  },
  {
    question: "Stack<T> のデータ取り出し方式は何ですか？",
    options: ["FIFO（先入れ先出し）", "ランダムアクセス", "LIFO（後入れ先出し）", "優先度順"],
    answer: 2,
    explanation: "Stack は LIFO（Last In First Out）方式です。Push で追加し Pop で取り出します。",
  },
  {
    question: "Span<T> の主な利点は何ですか？",
    options: [
      "要素を追加・削除できる",
      "ヒープに確保されるため永続的",
      "コピーなしにメモリの一部を参照できメモリ効率が高い",
      "複数スレッドから安全にアクセスできる",
    ],
    answer: 2,
    explanation: "Span<T> はコピーを作らずに既存のメモリ（配列、スタック等）を効率的に参照します。",
  },
];

export default function ArraysIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
            配列・リスト
          </span>
          <DifficultyBadge difficulty="beginner" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-3">配列・リスト</h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
          C# の配列・コレクションの基礎から応用まで学びます。
          固定サイズの配列から動的な List、効率的な Span、スタック・キューまで幅広くカバーします。
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 p-5 rounded-xl bg-gray-900 border border-gray-800">
        <ProgressBar categoryId="arrays" totalLessons={lessons.length} color="orange" />
      </div>

      {/* Overview */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列とコレクションの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C# にはデータをまとめて扱うための様々な型があります。
          用途に応じて適切な型を選ぶことがパフォーマンスと可読性の向上につながります。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "固定サイズ", ex: "int[]" },
            { label: "動的サイズ", ex: "List<T>" },
            { label: "後入れ先出し", ex: "Stack<T>" },
            { label: "先入れ先出し", ex: "Queue<T>" },
          ].map((item) => (
            <div key={item.label} className="bg-gray-800 rounded-lg p-3">
              <p className="text-xs text-orange-400 font-semibold mb-1">{item.label}</p>
              <code className="text-xs text-gray-300 font-mono">{item.ex}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Code example */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の基本操作</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        // 配列の宣言と初期化
        int[] scores = { 85, 72, 91, 68, 95 };

        Console.WriteLine($"要素数: {scores.Length}");
        Console.WriteLine($"最初の要素: {scores[0]}");
        Console.WriteLine($"最後の要素: {scores[scores.Length - 1]}");

        // foreach で全要素を表示
        Console.Write("スコア: ");
        foreach (int s in scores)
            Console.Write($"{s} ");
        Console.WriteLine();

        // Array.Sort で昇順ソート
        Array.Sort(scores);
        Console.Write("ソート後: ");
        foreach (int s in scores)
            Console.Write($"{s} ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`要素数: 5
最初の要素: 85
最後の要素: 95
スコア: 85 72 91 68 95
ソート後: 68 72 85 91 95 `}
        />
      </section>

      {/* Lesson list */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">レッスン一覧</h2>
        <LessonList
          lessons={lessons}
          basePath="/learn/arrays"
          color="orange"
          categoryId="arrays"
        />
      </section>

      {/* Quiz */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">確認クイズ</h2>
        <Quiz questions={quizQuestions} color="orange" />
      </section>
    </div>
  );
}
