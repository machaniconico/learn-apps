import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("xunit");

export default function XunitFactTheoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">xUnit レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Fact・Theory</h1>
        <p className="text-gray-400">[Fact]による単一テスト、[Theory]+[InlineData]によるパラメータ化テストを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">FactとTheoryの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">[Fact]</code>は常に真であるべき単一のテストを定義します。
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">[Theory]</code>は複数のデータセットで繰り返すパラメータ化テストを定義します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">[Fact]の使い方</h2>
        <p className="text-gray-400 mb-4">固定の入力・出力を検証する単一テストです。</p>
        <CSharpEditor
          defaultCode={`using Xunit;

public class StringHelperTests
{
    [Fact]
    public void Reverse_HelloString_ReturnsOlleh()
    {
        // Arrange
        string input = "Hello";

        // Act
        string result = new string(input.Reverse().ToArray());

        // Assert
        Assert.Equal("olleH", result);
    }

    [Fact]
    public void IsEmpty_EmptyString_ReturnsTrue()
    {
        Assert.True(string.IsNullOrEmpty(""));
        Assert.True(string.IsNullOrEmpty(null));
        Assert.False(string.IsNullOrEmpty("text"));
    }
}

// テスト結果のシミュレーション
string hello = "Hello";
string reversed = new string(hello.Reverse().ToArray());
Console.WriteLine($"Reverse(\"Hello\") = \"{reversed}\"");
Console.WriteLine($"テスト通過: {reversed == "olleH"}");
Console.WriteLine();
Console.WriteLine($"IsNullOrEmpty(\"\")     = {string.IsNullOrEmpty("")}");
Console.WriteLine($"IsNullOrEmpty(null)  = {string.IsNullOrEmpty(null)}");
Console.WriteLine($"IsNullOrEmpty(\"text\") = {string.IsNullOrEmpty("text")}");`}
          expectedOutput={`Reverse("Hello") = "olleH"
テスト通過: True

IsNullOrEmpty("")     = True
IsNullOrEmpty(null)  = True
IsNullOrEmpty("text") = False`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">[Theory] + [InlineData]</h2>
        <p className="text-gray-400 mb-4">同じロジックを複数のデータで繰り返しテストします。</p>
        <CSharpEditor
          defaultCode={`using Xunit;

public class MathTests
{
    // [Theory] + [InlineData] でパラメータ化テスト
    [Theory]
    [InlineData(2, 3, 5)]    // 2 + 3 = 5
    [InlineData(0, 0, 0)]    // 0 + 0 = 0
    [InlineData(-1, 1, 0)]   // -1 + 1 = 0
    [InlineData(100, 200, 300)]
    public void Add_ReturnsExpectedResult(int a, int b, int expected)
    {
        var calc = new Calculator();
        Assert.Equal(expected, calc.Add(a, b));
    }
}

// パラメータ化テストのシミュレーション
var testCases = new (int A, int B, int Expected)[]
{
    (2, 3, 5),
    (0, 0, 0),
    (-1, 1, 0),
    (100, 200, 300),
};

Console.WriteLine("[Theory] テスト実行:");
int passed = 0;
foreach (var (a, b, expected) in testCases)
{
    int result = a + b;
    bool ok = result == expected;
    if (ok) passed++;
    Console.WriteLine($"  Add({a,4}, {b,4}) = {result,4} (期待値: {expected,4}) -> {(ok ? "PASS" : "FAIL")}");
}
Console.WriteLine($"結果: {passed}/{testCases.Length} テスト通過");`}
          expectedOutput={`[Theory] テスト実行:
  Add(   2,    3) =    5 (期待値:    5) -> PASS
  Add(   0,    0) =    0 (期待値:    0) -> PASS
  Add(  -1,    1) =    0 (期待値:    0) -> PASS
  Add( 100,  200) =  300 (期待値:  300) -> PASS
結果: 4/4 テスト通過`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="xunit" lessonId="fact-theory" />
      </div>
      <LessonNav lessons={lessons} currentId="fact-theory" basePath="/learn/xunit" />
    </div>
  );
}
