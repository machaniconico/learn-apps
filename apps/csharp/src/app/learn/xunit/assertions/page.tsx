import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("xunit");

export default function XunitAssertionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">xUnit レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アサーション</h1>
        <p className="text-gray-400">Assert.Equal、Assert.True、Assert.Throws、Assert.Containsなど主要な検証メソッドを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Assertクラスとは</h2>
        <p className="text-gray-300 leading-relaxed">
          xUnitの<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">Assert</code>クラスはテストの検証に使う静的メソッドを提供します。条件が満たされない場合は<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">XunitException</code>をスローしてテストを失敗させます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">主要なAssertメソッド</h2>
        <p className="text-gray-400 mb-4">よく使うアサーションメソッドを一覧で確認します。</p>
        <CSharpEditor
          defaultCode={`using Xunit;

// Assert メソッドのデモ（テスト外で実際に動かす例）
int expected = 42;
int actual = 42;

// Equal / NotEqual
Console.WriteLine($"Equal({expected}, {actual}): {expected == actual}");
Console.WriteLine($"NotEqual(1, 2): {1 != 2}");

// True / False
bool condition = 5 > 3;
Console.WriteLine($"True(5 > 3): {condition}");
Console.WriteLine($"False(5 < 3): {!(5 < 3)}");

// Null / NotNull
string? nullStr = null;
string notNullStr = "hello";
Console.WriteLine($"Null(nullStr): {nullStr == null}");
Console.WriteLine($"NotNull(notNullStr): {notNullStr != null}");

// Contains / DoesNotContain
var list = new[] { 1, 2, 3, 4, 5 };
Console.WriteLine($"Contains(3, list): {list.Contains(3)}");
Console.WriteLine($"Contains(\"ell\", \"hello\"): {"hello".Contains("ell")}");

// InRange
int value = 7;
Console.WriteLine($"InRange(7, low:1, high:10): {value >= 1 && value <= 10}");

// Empty / NotEmpty
var emptyList = new int[0];
Console.WriteLine($"Empty([]): {emptyList.Length == 0}");`}
          expectedOutput={`Equal(42, 42): True
NotEqual(1, 2): True
True(5 > 3): True
False(5 < 3): True
Null(nullStr): True
NotNull(notNullStr): True
Contains(3, list): True
Contains("ell", "hello"): True
InRange(7, low:1, high:10): True
Empty([]): True`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Assert.Throws で例外テスト</h2>
        <p className="text-gray-400 mb-4">例外が正しく発生することを検証します。</p>
        <CSharpEditor
          defaultCode={`using Xunit;

// 例外テストの例
public class Calculator
{
    public double Divide(double a, double b)
    {
        if (b == 0) throw new DivideByZeroException("0で割ることはできません");
        return a / b;
    }
}

// Assert.Throws のデモ
var calc = new Calculator();

// 正常ケース
double result = calc.Divide(10, 2);
Console.WriteLine($"10 / 2 = {result}");

// 例外発生ケース
try
{
    calc.Divide(10, 0);
    Console.WriteLine("例外が発生しなかった（テスト失敗）");
}
catch (DivideByZeroException ex)
{
    Console.WriteLine($"DivideByZeroException を捕捉: {ex.Message}");
    Console.WriteLine("Assert.Throws テスト通過!");
}

// xUnit での書き方（テストプロジェクト内）
Console.WriteLine();
Console.WriteLine("// xUnit でのコード:");
Console.WriteLine("[Fact]");
Console.WriteLine("public void Divide_ByZero_ThrowsDivideByZeroException()");
Console.WriteLine("{");
Console.WriteLine("    var ex = Assert.Throws<DivideByZeroException>(");
Console.WriteLine("        () => calc.Divide(10, 0));");
Console.WriteLine("    Assert.Equal(\"0で割ることはできません\", ex.Message);");
Console.WriteLine("}");`}
          expectedOutput={`10 / 2 = 5
DivideByZeroException を捕捉: 0で割ることはできません
Assert.Throws テスト通過!

// xUnit でのコード:
[Fact]
public void Divide_ByZero_ThrowsDivideByZeroException()
{
    var ex = Assert.Throws<DivideByZeroException>(
        () => calc.Divide(10, 0));
    Assert.Equal("0で割ることはできません", ex.Message);
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="xunit" lessonId="assertions" />
      </div>
      <LessonNav lessons={lessons} currentId="assertions" basePath="/learn/xunit" />
    </div>
  );
}
