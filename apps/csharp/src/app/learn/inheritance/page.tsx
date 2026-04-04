import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C# でクラスの継承を宣言する正しい構文はどれですか？",
    options: [
      "class Child extends Parent { }",
      "class Child : Parent { }",
      "class Child implements Parent { }",
      "class Child inherits Parent { }",
    ],
    answer: 1,
    explanation: "C# の継承構文はコロン(:)を使います。class 子クラス : 親クラス という形式です。Java の extends に相当します。",
  },
  {
    question: "抽象クラスについて正しいものはどれですか？",
    options: [
      "インスタンスを直接生成できる",
      "すべてのメソッドを abstract にしなければならない",
      "abstract キーワードで定義し、直接インスタンス化できない",
      "インターフェースと同じで実装を持てない",
    ],
    answer: 2,
    explanation: "抽象クラスは abstract キーワードで宣言し、new でインスタンスを直接生成できません。abstract メソッドと通常メソッドを混在させられます。",
  },
  {
    question: "インターフェースと抽象クラスの違いとして正しいものはどれですか？",
    options: [
      "インターフェースはフィールドを持てるが抽象クラスは持てない",
      "クラスは複数のインターフェースを実装できるが、継承できる基底クラスは1つだけ",
      "抽象クラスはインスタンス化できるがインターフェースはできない",
      "インターフェースのメソッドには必ず実装が必要",
    ],
    answer: 1,
    explanation: "C# は単一継承のみサポートします（基底クラスは1つ）。しかし複数のインターフェースを実装することは可能です。",
  },
  {
    question: "sealed クラスの特徴はどれですか？",
    options: [
      "インスタンス化できない",
      "他のクラスから継承できない",
      "フィールドを変更できない",
      "static メンバーのみ持てる",
    ],
    answer: 1,
    explanation: "sealed クラスはそれ以上継承できません。string クラスは sealed の典型例です。パフォーマンスの最適化にも役立ちます。",
  },
];

export default function InheritancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">継承・インターフェース</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C# のオブジェクト指向設計の核心、継承とインターフェースを学びましょう。
          virtual/override・抽象クラス・ポリモーフィズム・sealed・複数インターフェースまで、
          柔軟な設計の基礎を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="inheritance" totalLessons={8} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/inheritance" color="indigo" categoryId="inheritance" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">継承の基本</h2>
        <p className="text-gray-400 mb-4">
          継承を使うと、既存クラス（親クラス）の機能を引き継いだ新しいクラス（子クラス）を作れます。
          コードの再利用と階層的な設計が可能になります。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Animal
{
    public string Name { get; }

    public Animal(string name)
    {
        Name = name;
    }

    public virtual void Speak()
    {
        Console.WriteLine($"{Name}: ...");
    }
}

class Dog : Animal
{
    public Dog(string name) : base(name) { }

    public override void Speak()
    {
        Console.WriteLine($"{Name}: ワン！");
    }
}

class Cat : Animal
{
    public Cat(string name) : base(name) { }

    public override void Speak()
    {
        Console.WriteLine($"{Name}: ニャー！");
    }
}

class Program
{
    static void Main()
    {
        Animal[] animals = { new Dog("ポチ"), new Cat("タマ"), new Dog("ハナ") };
        foreach (var animal in animals)
            animal.Speak(); // ポリモーフィズム
    }
}`}
          expectedOutput={`ポチ: ワン！
タマ: ニャー！
ハナ: ワン！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースの実装</h2>
        <p className="text-gray-400 mb-4">
          インターフェースは契約（コントラクト）を定義します。クラスはインターフェースを実装することで、
          特定の機能を持つことを保証します。複数のインターフェースを実装できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

interface IArea
{
    double GetArea();
}

interface IPerimeter
{
    double GetPerimeter();
}

class Circle : IArea, IPerimeter
{
    public double Radius { get; }

    public Circle(double radius)
    {
        Radius = radius;
    }

    public double GetArea() => Math.PI * Radius * Radius;
    public double GetPerimeter() => 2 * Math.PI * Radius;
}

class Program
{
    static void Main()
    {
        var circle = new Circle(5);
        Console.WriteLine($"面積: {circle.GetArea():F2}");
        Console.WriteLine($"周囲: {circle.GetPerimeter():F2}");
    }
}`}
          expectedOutput={`面積: 78.54
周囲: 31.42`}
        />
      </section>

      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
