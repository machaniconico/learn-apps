import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

const quizQuestions: QuizQuestion[] = [
  {
    question: "for ループの構成要素として正しいものはどれですか？",
    options: [
      "初期化、条件、後処理の3つで構成される",
      "条件のみで構成される",
      "コレクションが必要である",
      "初期化と条件の2つで構成される",
    ],
    answer: 0,
    explanation: "forループは「初期化; 条件; 後処理」の3つのセクションで構成されます。それぞれ省略することもできます。",
  },
  {
    question: "do-while ループの特徴として正しいものはどれですか？",
    options: [
      "条件が最初から false でも最低1回は実行される",
      "コレクションの要素を自動的に取り出す",
      "条件が最初から false なら1度も実行されない",
      "無限ループにはならない",
    ],
    answer: 0,
    explanation: "do-while は条件チェックがループ本体の後にあるため、条件が最初からfalseでも必ず1回は実行されます。",
  },
  {
    question: "switch パターンマッチング（C# 8.0以降）について正しいものはどれですか？",
    options: [
      "breakが不要で、式として値を返せる",
      "従来のswitchと全く同じ構文で書く",
      "intとstringにしか使えない",
      "必ずdefaultケースが必要",
    ],
    answer: 0,
    explanation: "switch式（C# 8.0以降）はbreakが不要で、=> を使って値を返す式として書けます。fall-throughも起きません。",
  },
  {
    question: "foreach ループで使えるコレクションの条件は何ですか？",
    options: [
      "IEnumerable<T> を実装している必要がある",
      "配列のみ使用できる",
      "List<T> のみ使用できる",
      "特に条件はなく、任意のオブジェクトに使える",
    ],
    answer: 0,
    explanation: "foreachはIEnumerable<T>（またはIEnumerable）を実装しているコレクションに使えます。配列・List・Dictionaryなど多くの型が対応しています。",
  },
];

export default function ControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">制御構文</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">10レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C#の制御構文を学びましょう。条件分岐（if/switch）・繰り返し（for/while/foreach）・ループ制御（break/continue）など、
          プログラムの流れをコントロールする基本構文を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="control" totalLessons={10} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/control" color="blue" categoryId="control" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件分岐の概要</h2>
        <p className="text-gray-400 mb-4">
          if-else と switch は、条件に応じて異なるコードを実行します。C# 8.0以降のswitch式はより簡潔に書けます。
        </p>
        <CSharpEditor
          defaultCode={`int score = 78;
string grade;

// 従来のif-else
if (score >= 90)
    grade = "A";
else if (score >= 80)
    grade = "B";
else if (score >= 70)
    grade = "C";
else
    grade = "F";

Console.WriteLine($"スコア: {score}, 成績: {grade}");

// switch式（C# 8.0以降）
string level = score switch
{
    >= 90 => "優秀",
    >= 70 => "良好",
    >= 60 => "合格",
    _     => "不合格"
};
Console.WriteLine($"レベル: {level}");`}
          expectedOutput={`スコア: 78, 成績: C
レベル: 良好`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ループの概要</h2>
        <p className="text-gray-400 mb-4">
          C#には4種類のループがあります。用途に応じて使い分けましょう。
        </p>
        <CSharpEditor
          defaultCode={`// for: カウンタが必要な場合
for (int i = 1; i <= 3; i++)
    Console.Write($"for:{i} ");
Console.WriteLine();

// while: 条件のみ
int n = 3;
while (n > 0)
    Console.Write($"while:{n--} ");
Console.WriteLine();

// foreach: コレクションを処理
string[] fruits = { "りんご", "バナナ", "みかん" };
foreach (var fruit in fruits)
    Console.Write($"{fruit} ");
Console.WriteLine();

// do-while: 最低1回実行
int x = 0;
do {
    Console.Write($"do:{x} ");
    x++;
} while (x < 3);
Console.WriteLine();`}
          expectedOutput={`for:1 for:2 for:3
while:3 while:2 while:1
りんご バナナ みかん
do:0 do:1 do:2`}
        />
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
