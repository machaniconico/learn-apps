import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C#で文字列の前後の空白を取り除くメソッドはどれですか？",
    options: ["Trim()", "Strip()", "Remove()", "Clean()"],
    answer: 0,
    explanation: "Trim() は文字列の先頭と末尾の空白文字を取り除きます。TrimStart() と TrimEnd() で片方だけ削除することもできます。",
  },
  {
    question: "StringBuilder を使う主な理由はどれですか？",
    options: [
      "文字列を不変にするため",
      "ループで大量の文字列連結をする際にメモリ効率を上げるため",
      "正規表現を使いやすくするため",
      "Unicode文字を扱うため",
    ],
    answer: 1,
    explanation: "string は不変(immutable)なので、+ 演算子での連結は毎回新しいオブジェクトを生成します。StringBuilder はバッファを使い回すため、大量連結に高効率です。",
  },
  {
    question: "文字列補間 $\"\" の利点として正しいものはどれですか？",
    options: [
      "実行時に型変換が不要になる",
      "コンパイル時に型チェックされ、読みやすいコードが書ける",
      "Formatより高速になる保証がある",
      "null値を自動的に空文字に変換する",
    ],
    answer: 1,
    explanation: "$\"\" 補間文字列はコンパイル時にstring.Formatに変換されます。式がコンパイル時に型チェックされるため安全で、コードの可読性も高まります。",
  },
  {
    question: "大文字・小文字を区別しない文字列比較に使うべき方法はどれですか？",
    options: [
      "str1.ToLower() == str2.ToLower()",
      "str1.Equals(str2, StringComparison.OrdinalIgnoreCase)",
      "str1 == str2.ToUpper()",
      "String.Compare(str1, str2) == 0",
    ],
    answer: 1,
    explanation: "StringComparison.OrdinalIgnoreCase を指定した Equals() が推奨です。ToLower()/ToUpper() を使う方法は一時オブジェクトを生成し、トルコ語などの文化圏依存の問題が生じる可能性があります。",
  },
];

export default function StringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">文字列操作</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C#の文字列操作を深く学びましょう。メソッド・StringBuilder・補間・正規表現・Span&lt;char&gt;・比較まで、実務で必須の文字列テクニックを網羅します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="strings" totalLessons={6} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/strings" color="cyan" categoryId="strings" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基礎</h2>
        <p className="text-gray-400 mb-4">
          C#の string 型は不変(immutable)なオブジェクトです。一度作成された文字列は変更できず、変更に見えるすべての操作は新しい文字列を生成します。
          この特性を理解することが、効率的な文字列操作の出発点です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        string text = "  Hello, C# World!  ";

        // 基本的な文字列操作
        Console.WriteLine(text.Trim());           // 前後の空白削除
        Console.WriteLine(text.Trim().ToUpper()); // 大文字変換
        Console.WriteLine(text.Trim().ToLower()); // 小文字変換
        Console.WriteLine(text.Trim().Length);    // 文字数
        Console.WriteLine(text.Trim().Contains("C#")); // 含む判定
    }
}`}
          expectedOutput={`Hello, C# World!
HELLO, C# WORLD!
hello, c# world!
16
True`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列補間と書式指定</h2>
        <p className="text-gray-400 mb-4">
          C# 6以降で使える $&quot;&quot; 補間文字列は、コードの可読性を大幅に向上させます。書式指定子を組み合わせることで数値や日付の表示を細かく制御できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        string name = "田中";
        int age = 28;
        double score = 98.567;
        DateTime today = new DateTime(2025, 4, 1);

        // 基本補間
        Console.WriteLine($"名前: {name}, 年齢: {age}歳");

        // 書式指定子
        Console.WriteLine($"スコア: {score:F2}");       // 小数点2桁
        Console.WriteLine($"パーセント: {0.85:P0}");   // パーセント表示
        Console.WriteLine($"日付: {today:yyyy/MM/dd}"); // 日付書式
        Console.WriteLine($"16進: {255:X}");            // 16進数
    }
}`}
          expectedOutput={`名前: 田中, 年齢: 28歳
スコア: 98.57
パーセント: 85%
日付: 2025/04/01
16進: FF`}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
