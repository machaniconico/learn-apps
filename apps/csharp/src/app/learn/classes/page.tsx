import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C# で自動プロパティを正しく宣言しているのはどれですか？",
    options: [
      "public int Age { get; set; }",
      "public int Age = { get; set; }",
      "int Age { public get; public set; }",
      "public property int Age;",
    ],
    answer: 0,
    explanation: "自動プロパティは get/set アクセサーを持ち、コンパイラが自動的にバッキングフィールドを生成します。",
  },
  {
    question: "record 型の主な特徴はどれですか？",
    options: [
      "参照型でミュータブルなデータを扱う",
      "値ベースの等値比較とイミュータブルなデータ表現",
      "static メンバーしか持てない",
      "インターフェースを実装できない",
    ],
    answer: 1,
    explanation: "record は値ベースの等値比較（プロパティの値が同じなら等しい）とwith式による非破壊的更新をサポートします。",
  },
  {
    question: "static クラスについて正しいものはどれですか？",
    options: [
      "インスタンスを作成できる",
      "継承して拡張できる",
      "インスタンス化できず、すべてのメンバーが static",
      "インターフェースを実装できる",
    ],
    answer: 2,
    explanation: "static クラスはインスタンス化できず、インスタンスメンバーも持てません。ユーティリティメソッドのグループ化に適しています。",
  },
  {
    question: "struct（構造体）と class の大きな違いはどれですか？",
    options: [
      "struct はメソッドを持てない",
      "struct は値型でスタックに確保され、class は参照型でヒープに確保される",
      "struct は public メンバーを持てない",
      "struct は複数のインターフェースを実装できない",
    ],
    answer: 1,
    explanation: "struct は値型のため代入時にコピーが作成されます。class は参照型のため、代入は参照のコピーになります。小さく不変のデータ型に struct が適しています。",
  },
];

export default function ClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">クラス基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C#のオブジェクト指向プログラミングの核となるクラスを学びましょう。
          プロパティ・コンストラクタ・静的メンバー・record・struct・enum・アクセス修飾子まで、クラス設計の基礎を網羅します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="classes" totalLessons={8} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/classes" color="green" categoryId="classes" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスとオブジェクト</h2>
        <p className="text-gray-400 mb-4">
          クラスはオブジェクトの設計図です。フィールド（データ）とメソッド（動作）を持ち、
          <code className="text-green-400"> new</code> キーワードでインスタンスを生成します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Person
{
    // 自動プロパティ
    public string Name { get; set; }
    public int Age { get; set; }

    // コンストラクタ
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    // メソッド
    public string Greet() => $"こんにちは、{Name}（{Age}歳）です！";
}

class Program
{
    static void Main()
    {
        var person = new Person("田中", 28);
        Console.WriteLine(person.Greet());
        Console.WriteLine($"名前: {person.Name}");
    }
}`}
          expectedOutput={`こんにちは、田中（28歳）です！
名前: 田中`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">record と値の等値比較</h2>
        <p className="text-gray-400 mb-4">
          record は C# 9 で導入されたイミュータブルなデータ型です。
          プロパティの値が同じであれば等しいと見なされる値ベースの等値比較をサポートします。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// record: イミュータブルなデータ型
record Point(double X, double Y);

class Program
{
    static void Main()
    {
        var p1 = new Point(1.0, 2.0);
        var p2 = new Point(1.0, 2.0);
        var p3 = new Point(3.0, 4.0);

        // 値ベースの等値比較
        Console.WriteLine($"p1 == p2: {p1 == p2}"); // True
        Console.WriteLine($"p1 == p3: {p1 == p3}"); // False

        // with式: 一部だけ変更した新しいインスタンス
        var p4 = p1 with { X = 10.0 };
        Console.WriteLine($"p4: ({p4.X}, {p4.Y})");
    }
}`}
          expectedOutput={`p1 == p2: True
p1 == p3: False
p4: (10, 2)`}
        />
      </section>

      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
