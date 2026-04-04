import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function PolymorphismPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポリモーフィズム</h1>
        <p className="text-gray-400">基底型参照で派生クラスを扱う多態性、ランタイムディスパッチ、is キーワードによる型チェック</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ポリモーフィズムとは</h2>
        <p className="text-gray-400 mb-3">
          ポリモーフィズム（多態性）は「同じインターフェースを通じて異なる実装を扱える」仕組みです。
          親クラス・インターフェース型の変数に子クラスのインスタンスを入れ、メソッド呼び出し時に実際の型の実装が実行されます。
        </p>
        <p className="text-gray-400">
          これにより「どのクラスかを意識せずに統一した操作ができる」コードが書けます。
          新しい子クラスを追加しても既存コードを変更せずに対応できます（開放・閉鎖の原則）。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">基底型参照とランタイムディスパッチ</h2>
        <p className="text-gray-400 mb-4">
          親クラス型の配列・リストに複数の子クラスインスタンスを格納し、
          ループで処理する典型的なポリモーフィズムパターンを見てみましょう。
        </p>
        <CSharpEditor
          defaultCode={`using System;

abstract class Shape
{
    public abstract double Area { get; }
    public abstract string Name { get; }
}

class Circle : Shape
{
    private double _radius;
    public Circle(double r) { _radius = r; }
    public override double Area => Math.PI * _radius * _radius;
    public override string Name => "円";
}

class Rectangle : Shape
{
    private double _w, _h;
    public Rectangle(double w, double h) { _w = w; _h = h; }
    public override double Area => _w * _h;
    public override string Name => "矩形";
}

class Triangle : Shape
{
    private double _b, _h;
    public Triangle(double b, double h) { _b = b; _h = h; }
    public override double Area => _b * _h / 2;
    public override string Name => "三角形";
}

class Program
{
    static void Main()
    {
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Triangle(3, 8)
        };

        double totalArea = 0;
        foreach (Shape s in shapes)
        {
            Console.WriteLine($"{s.Name}: 面積 {s.Area:F2}");
            totalArea += s.Area;
        }
        Console.WriteLine($"合計面積: {totalArea:F2}");
    }
}`}
          expectedOutput={`円: 面積 78.54
矩形: 面積 24.00
三角形: 面積 12.00
合計面積: 114.54`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">is・as による型チェック</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-400">is</code> で型を確認し、<code className="text-indigo-400">as</code> でキャストします（失敗時は null）。
          C# 7 以降のパターンマッチング <code className="text-indigo-400">is Type variable</code> でキャストと変数宣言を同時に行えます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Animal { public string Name { get; set; } = ""; }
class Dog : Animal { public void Fetch() => Console.WriteLine($"{Name}がボールを取った！"); }
class Cat : Animal { public void Purr() => Console.WriteLine($"{Name}がゴロゴロ言った！"); }

class Program
{
    static void Interact(Animal animal)
    {
        // C# 7 以降のパターンマッチング
        if (animal is Dog dog)
        {
            dog.Fetch();
        }
        else if (animal is Cat cat)
        {
            cat.Purr();
        }
        else
        {
            Console.WriteLine($"{animal.Name}は何もしなかった");
        }
    }

    static void Main()
    {
        Animal[] animals = {
            new Dog { Name = "ポチ" },
            new Cat { Name = "タマ" },
            new Dog { Name = "ハナ" }
        };

        foreach (var a in animals)
            Interact(a);
    }
}`}
          expectedOutput={`ポチがボールを取った！
タマがゴロゴロ言った！
ハナがボールを取った！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="polymorphism" />
      </div>
      <LessonNav lessons={lessons} currentId="polymorphism" basePath="/learn/inheritance" />
    </div>
  );
}
