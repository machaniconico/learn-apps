import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("xunit");

export default function XunitBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">xUnit レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">xUnitの基本</h1>
        <p className="text-gray-400">テストプロジェクトのセットアップ、[Fact]属性、テストの実行方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">xUnitとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          xUnitは.NET向けのオープンソーステストフレームワークです。NUnit・MSTestと並ぶ3大フレームワークの一つで、ASP.NET Coreチームも使用しています。シンプルで拡張性が高く、現在最も人気があります。
        </p>
        <p className="text-gray-300 leading-relaxed">
          テストプロジェクトはプロダクションコードとは別のプロジェクトとして作成します。
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">dotnet new xunit</code>でテストプロジェクトを生成できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テストプロジェクトのセットアップ</h2>
        <p className="text-gray-400 mb-4">コマンドラインでテストプロジェクトを作成します。</p>
        <CSharpEditor
          defaultCode={`// テストプロジェクトの作成（ターミナルで実行）
Console.WriteLine("=== xUnit テストプロジェクトの作成 ===");
Console.WriteLine();
Console.WriteLine("# テストプロジェクトを作成");
Console.WriteLine("dotnet new xunit -n MyApp.Tests");
Console.WriteLine();
Console.WriteLine("# テストプロジェクトにプロダクションコードを参照追加");
Console.WriteLine("cd MyApp.Tests");
Console.WriteLine("dotnet add reference ../MyApp/MyApp.csproj");
Console.WriteLine();
Console.WriteLine("# テストを実行");
Console.WriteLine("dotnet test");
Console.WriteLine();
Console.WriteLine("# .csproj の内容（自動生成）");
Console.WriteLine("<PackageReference Include=\"xunit\" Version=\"2.x\" />");
Console.WriteLine("<PackageReference Include=\"xunit.runner.visualstudio\" Version=\"2.x\" />");
Console.WriteLine("<PackageReference Include=\"Microsoft.NET.Test.Sdk\" Version=\"17.x\" />");`}
          expectedOutput={`=== xUnit テストプロジェクトの作成 ===

# テストプロジェクトを作成
dotnet new xunit -n MyApp.Tests

# テストプロジェクトにプロダクションコードを参照追加
cd MyApp.Tests
dotnet add reference ../MyApp/MyApp.csproj

# テストを実行
dotnet test

# .csproj の内容（自動生成）
<PackageReference Include="xunit" Version="2.x" />
<PackageReference Include="xunit.runner.visualstudio" Version="2.x" />
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.x" />`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のテストを書く</h2>
        <p className="text-gray-400 mb-4">[Fact]属性を使った最もシンプルなテストを作成します。</p>
        <CSharpEditor
          defaultCode={`using Xunit;

// テスト対象クラス（プロダクションコード）
public class Calculator
{
    public int Add(int a, int b) => a + b;
    public int Subtract(int a, int b) => a - b;
    public double Divide(double a, double b)
    {
        if (b == 0) throw new DivideByZeroException("0で割ることはできません");
        return a / b;
    }
}

// テストクラス（xUnitプロジェクト内）
public class CalculatorTests
{
    [Fact]
    public void Add_TwoPositiveNumbers_ReturnsCorrectSum()
    {
        // Arrange（準備）
        var calculator = new Calculator();

        // Act（実行）
        int result = calculator.Add(3, 5);

        // Assert（検証）
        Assert.Equal(8, result);
    }
}

// テスト実行のデモ（概念）
var calc = new Calculator();
Console.WriteLine($"3 + 5 = {calc.Add(3, 5)}");
Console.WriteLine($"10 - 4 = {calc.Subtract(10, 4)}");
Console.WriteLine($"テスト: Add(3, 5) == 8 -> {calc.Add(3, 5) == 8}");`}
          expectedOutput={`3 + 5 = 8
10 - 4 = 6
テスト: Add(3, 5) == 8 -> True`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="xunit" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/xunit" />
    </div>
  );
}
