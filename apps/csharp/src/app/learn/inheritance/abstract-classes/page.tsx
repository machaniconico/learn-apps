import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function AbstractClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">抽象クラス</h1>
        <p className="text-gray-400">abstract クラスと abstract メソッドの定義、インスタンス化できない理由と設計上の使いどころ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">抽象クラスとは</h2>
        <p className="text-gray-400 mb-3">
          <code className="text-indigo-400">abstract</code> クラスは直接インスタンス化できないクラスです。
          共通の基底クラスとして、共通実装と抽象メソッド（実装なし）を組み合わせられます。
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded bg-gray-800">
            <p className="text-indigo-400 font-semibold mb-2">abstract クラスの特徴</p>
            <ul className="text-gray-400 space-y-1">
              <li>new でインスタンス化不可</li>
              <li>通常メソッドを持てる</li>
              <li>フィールドを持てる</li>
              <li>コンストラクタを持てる</li>
            </ul>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <p className="text-indigo-400 font-semibold mb-2">abstract メソッドの特徴</p>
            <ul className="text-gray-400 space-y-1">
              <li>本体(実装)を持たない</li>
              <li>派生クラスで必ず override</li>
              <li>virtual を暗黙的に含む</li>
              <li>abstract クラス内のみ宣言可</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">抽象クラスの実装</h2>
        <p className="text-gray-400 mb-4">
          抽象クラスを使うと「このメソッドは必ず実装しなければならない」というルールを強制できます。
          共通処理は基底クラスに実装し、型ごとの違いは abstract メソッドで分離するのが典型パターンです。
        </p>
        <CSharpEditor
          defaultCode={`using System;

abstract class TaxCalculator
{
    // 共通処理（具体的な実装あり）
    public decimal Calculate(decimal price)
    {
        decimal tax = GetTaxRate() * price;
        Console.WriteLine($"税率: {GetTaxRate():P0}、税額: {tax:F0}円");
        return price + tax;
    }

    // 抽象メソッド（派生クラスで必ず実装）
    protected abstract decimal GetTaxRate();
}

class StandardTax : TaxCalculator
{
    protected override decimal GetTaxRate() => 0.10m; // 10%
}

class ReducedTax : TaxCalculator
{
    protected override decimal GetTaxRate() => 0.08m; // 8%（軽減税率）
}

class Program
{
    static void Main()
    {
        TaxCalculator standard = new StandardTax();
        decimal total1 = standard.Calculate(1000m);
        Console.WriteLine($"合計: {total1}円\n");

        TaxCalculator reduced = new ReducedTax();
        decimal total2 = reduced.Calculate(1000m);
        Console.WriteLine($"合計: {total2}円");
    }
}`}
          expectedOutput={`税率: 10%、税額: 100円
合計: 1100円

税率: 8%、税額: 80円
合計: 1080円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">テンプレートメソッドパターン</h2>
        <p className="text-gray-400 mb-4">
          抽象クラスの典型的な設計パターンが「テンプレートメソッドパターン」です。
          アルゴリズムの骨格を基底クラスで定義し、可変部分を abstract メソッドとして派生クラスに委ねます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

abstract class Report
{
    // テンプレートメソッド: 骨格を定義
    public void Generate()
    {
        PrintHeader();
        PrintBody();
        PrintFooter();
    }

    protected abstract void PrintHeader();
    protected abstract void PrintBody();

    // デフォルト実装（オーバーライド可能）
    protected virtual void PrintFooter()
    {
        Console.WriteLine("--- レポート終了 ---");
    }
}

class SalesReport : Report
{
    protected override void PrintHeader()
        => Console.WriteLine("=== 売上レポート ===");

    protected override void PrintBody()
    {
        Console.WriteLine("商品A: 150,000円");
        Console.WriteLine("商品B: 280,000円");
        Console.WriteLine("合計: 430,000円");
    }
}

class Program
{
    static void Main()
    {
        Report report = new SalesReport();
        report.Generate();
    }
}`}
          expectedOutput={`=== 売上レポート ===
商品A: 150,000円
商品B: 280,000円
合計: 430,000円
--- レポート終了 ---`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="abstract-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="abstract-classes" basePath="/learn/inheritance" />
    </div>
  );
}
