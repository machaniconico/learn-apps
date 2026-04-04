import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function RecordsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">クラス基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">レコード型</h1>
        <p className="text-gray-400">record class・record struct の宣言、with 式による非破壊的更新、値ベースの等値比較</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">record とは</h2>
        <p className="text-gray-400 mb-3">
          <code className="text-green-400">record</code> は C# 9 で導入されたデータ中心の型です。
          通常のクラスと異なり、<strong className="text-white">値ベースの等値比較</strong>が自動実装されます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>プロパティの値が同じ → 等しいと判断</li>
          <li><code className="text-green-400">with</code> 式で一部のプロパティを変更した新しいインスタンスを生成</li>
          <li>自動生成: ToString()・Equals()・GetHashCode()・分解</li>
          <li><code className="text-green-400">record class</code> は参照型、<code className="text-green-400">record struct</code> は値型</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">record の基本宣言</h2>
        <p className="text-gray-400 mb-4">
          位置引数構文（Positional Records）を使うと簡潔に record を定義できます。
          コンパイラが自動的に init-only プロパティとコンストラクタ、分解メソッドを生成します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// 位置引数構文（最も簡潔な記法）
record Person(string Name, int Age, string City);

class Program
{
    static void Main()
    {
        var p1 = new Person("田中", 28, "東京");
        var p2 = new Person("田中", 28, "東京");
        var p3 = new Person("鈴木", 30, "大阪");

        // 値ベースの等値比較
        Console.WriteLine($"p1 == p2: {p1 == p2}"); // True
        Console.WriteLine($"p1 == p3: {p1 == p3}"); // False

        // 自動生成された ToString
        Console.WriteLine(p1);

        // 分解
        var (name, age, city) = p1;
        Console.WriteLine($"{name}、{age}歳、{city}在住");
    }
}`}
          expectedOutput={`p1 == p2: True
p1 == p3: False
Person { Name = 田中, Age = 28, City = 東京 }
田中、28歳、東京在住`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">with 式による非破壊的更新</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400">with</code> 式を使うと、既存の record インスタンスをベースに
          指定したプロパティだけを変更した新しいインスタンスを生成できます。
          元のインスタンスは変更されません（イミュータブル）。
        </p>
        <CSharpEditor
          defaultCode={`using System;

record Product(string Name, decimal Price, int Stock)
{
    // メソッドも追加可能
    public bool InStock => Stock > 0;
}

class Program
{
    static void Main()
    {
        var original = new Product("C#本", 2800m, 10);
        Console.WriteLine($"元: {original}");

        // with式で価格だけ変更
        var discounted = original with { Price = 2240m };
        Console.WriteLine($"割引後: {discounted}");

        // 在庫を更新
        var updated = original with { Stock = 0 };
        Console.WriteLine($"在庫あり: {original.InStock}");
        Console.WriteLine($"在庫あり(更新後): {updated.InStock}");

        // 元は変わらない
        Console.WriteLine($"元の価格: {original.Price}");
    }
}`}
          expectedOutput={`元: Product { Name = C#本, Price = 2800, Stock = 10 }
割引後: Product { Name = C#本, Price = 2240, Stock = 10 }
在庫あり: True
在庫あり(更新後): False
元の価格: 2800`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="records" />
      </div>
      <LessonNav lessons={lessons} currentId="records" basePath="/learn/classes" />
    </div>
  );
}
