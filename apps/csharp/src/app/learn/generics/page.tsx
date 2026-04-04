import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ジェネリクスを使う主な理由はどれですか？",
    options: [
      "実行時のパフォーマンスを下げるため",
      "型安全性を保ちながら再利用可能なコードを書くため",
      "クラスの継承を不要にするため",
      "インターフェースの代わりに使うため",
    ],
    answer: 1,
    explanation: "ジェネリクスを使うと、型を型パラメータとして抽象化でき、異なる型に対して同じロジックを型安全に再利用できます。ボックス化も起きません。",
  },
  {
    question: "ジェネリック型制約 where T : new() の意味はどれですか？",
    options: [
      "T が new キーワードで生成できない型",
      "T が引数なしのパブリックコンストラクタを持つ型",
      "T が static クラスである",
      "T が abstract クラスである",
    ],
    answer: 1,
    explanation: "where T : new() は「T が引数なしのパブリックコンストラクタを持つ」という制約です。これにより new T() でインスタンスを生成できます。",
  },
  {
    question: "IEnumerable<out T> の out キーワードの意味はどれですか？",
    options: [
      "T 型を出力のみに使う（共変）",
      "T 型を入力のみに使う（反変）",
      "T 型を out パラメータとして渡す",
      "T 型が nullable であることを示す",
    ],
    answer: 0,
    explanation: "out は共変性を表します。IEnumerable<out T> は IEnumerable<Derived> を IEnumerable<Base> として扱えます。T を返すことだけが許可され、入力には使えません。",
  },
  {
    question: "where T : class の制約の意味はどれですか？",
    options: [
      "T が具体的なクラス名に等しい",
      "T が参照型でなければならない",
      "T が値型でなければならない",
      "T が抽象クラスでなければならない",
    ],
    answer: 1,
    explanation: "where T : class は T が参照型（クラス・インターフェース・デリゲート等）でなければならないという制約です。where T : struct は値型の制約です。",
  },
];

export default function GenericsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">ジェネリクス</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          型パラメータを使って再利用可能なコードを書くジェネリクスを学びましょう。
          型制約・ジェネリックメソッド・共変性・反変性・実用パターンまで、
          C# の型システムを最大限に活用する方法を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="generics" totalLessons={6} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/generics" color="violet" categoryId="generics" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクスの概要</h2>
        <p className="text-gray-400 mb-4">
          ジェネリクスは型をパラメータ化する仕組みです。
          <code className="text-violet-400">List&lt;T&gt;</code>・<code className="text-violet-400">Dictionary&lt;TKey, TValue&gt;</code> などの
          .NET 標準ライブラリも全てジェネリクスで実装されています。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// ジェネリッククラス
class Box<T>
{
    public T Value { get; set; }

    public Box(T value)
    {
        Value = value;
    }

    public void Display()
    {
        Console.WriteLine($"Box<{typeof(T).Name}>: {Value}");
    }
}

class Program
{
    static void Main()
    {
        var intBox = new Box<int>(42);
        var strBox = new Box<string>("Hello");
        var dblBox = new Box<double>(3.14);

        intBox.Display();
        strBox.Display();
        dblBox.Display();
    }
}`}
          expectedOutput={`Box<Int32>: 42
Box<String>: Hello
Box<Double>: 3.14`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリックメソッドと型推論</h2>
        <p className="text-gray-400 mb-4">
          メソッドレベルでも型パラメータを定義できます。
          多くの場合、コンパイラが引数の型から自動的に型パラメータを推論するため、明示的な指定が不要です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Swapper
{
    // ジェネリックメソッド
    public static void Swap<T>(ref T a, ref T b)
    {
        T temp = a;
        a = b;
        b = temp;
    }
}

class Program
{
    static void Main()
    {
        int x = 10, y = 20;
        Swapper.Swap(ref x, ref y); // 型推論: T = int
        Console.WriteLine($"x={x}, y={y}");

        string s1 = "Hello", s2 = "World";
        Swapper.Swap(ref s1, ref s2); // 型推論: T = string
        Console.WriteLine($"s1={s1}, s2={s2}");
    }
}`}
          expectedOutput={`x=20, y=10
s1=World, s2=Hello`}
        />
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
