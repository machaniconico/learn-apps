import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function VirtualOverridePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">virtual・override</h1>
        <p className="text-gray-400">仮想メソッドの宣言と派生クラスでのオーバーライド。ランタイムディスパッチの仕組み</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">virtual と override</h2>
        <p className="text-gray-400 mb-3">
          親クラスのメソッドに <code className="text-indigo-400">virtual</code> を付けると、
          子クラスで <code className="text-indigo-400">override</code> して実装を差し替えられます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><code className="text-indigo-400">virtual</code> — 派生クラスでオーバーライド可能なメソッド</li>
          <li><code className="text-indigo-400">override</code> — 親の virtual メソッドを上書きする</li>
          <li><code className="text-indigo-400">new</code> — 親のメソッドを隠す（override ではない）</li>
          <li>override しない場合、派生クラスは親の実装を使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">virtual と override の基本</h2>
        <p className="text-gray-400 mb-4">
          親クラスの参照型で子クラスのインスタンスを保持しても、override されたメソッドが呼ばれます。
          これを「ランタイムディスパッチ（動的ディスパッチ）」と呼びます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Shape
{
    public string Color { get; set; } = "白";

    // virtual: 派生クラスでオーバーライド可能
    public virtual double GetArea()
    {
        return 0;
    }

    public virtual string Describe()
    {
        return $"{Color}の図形、面積: {GetArea():F2}";
    }
}

class Circle : Shape
{
    public double Radius { get; }

    public Circle(double radius)
    {
        Radius = radius;
    }

    public override double GetArea()
        => Math.PI * Radius * Radius;
}

class Rectangle : Shape
{
    public double Width { get; }
    public double Height { get; }

    public Rectangle(double w, double h)
    {
        Width = w;
        Height = h;
    }

    public override double GetArea()
        => Width * Height;
}

class Program
{
    static void Main()
    {
        Shape[] shapes = {
            new Circle(5) { Color = "赤" },
            new Rectangle(4, 6) { Color = "青" }
        };

        foreach (var s in shapes)
            Console.WriteLine(s.Describe());
    }
}`}
          expectedOutput={`赤の図形、面積: 78.54
青の図形、面積: 24.00`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">new によるメソッドの隠蔽</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-400">new</code> キーワードは親のメソッドを隠蔽しますが、override とは異なります。
          親クラスの参照からアクセスした場合は親の実装が呼ばれます（ポリモーフィズムが効かない）。
          通常は override を使うべきです。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Base
{
    public virtual void Method() =>
        Console.WriteLine("Base.Method (virtual)");

    public void RegularMethod() =>
        Console.WriteLine("Base.RegularMethod");
}

class Derived : Base
{
    // override: ポリモーフィズムが効く
    public override void Method() =>
        Console.WriteLine("Derived.Method (override)");

    // new: 隠蔽（ポリモーフィズムが効かない）
    public new void RegularMethod() =>
        Console.WriteLine("Derived.RegularMethod (new)");
}

class Program
{
    static void Main()
    {
        Derived d = new Derived();
        d.Method();          // Derived版が呼ばれる
        d.RegularMethod();   // Derived版が呼ばれる

        Base b = new Derived(); // 親参照で子インスタンス
        b.Method();          // override: Derived版が呼ばれる
        b.RegularMethod();   // new: Base版が呼ばれる！
    }
}`}
          expectedOutput={`Derived.Method (override)
Derived.RegularMethod (new)
Derived.Method (override)
Base.RegularMethod`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="virtual-override" />
      </div>
      <LessonNav lessons={lessons} currentId="virtual-override" basePath="/learn/inheritance" />
    </div>
  );
}
