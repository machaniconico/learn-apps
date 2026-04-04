import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("xunit");

export default function XunitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">xUnit</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          xUnitを使った自動テストの書き方を学びましょう。Fact・Theory・Moq・CI統合まで、品質の高いC#コードを支えるテスト技術を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="xunit" totalLessons={6} color="yellow" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/xunit" color="yellow" categoryId="xunit" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">なぜテストを書くのか</h2>
        <p className="text-gray-400 mb-4">
          自動テストはコードの品質を保証し、リファクタリングや機能追加を安全に行えるようにします。xUnitはC#で最も広く使われているテストフレームワークの一つです。
        </p>
        <CSharpEditor
          defaultCode={`// xUnitテストの基本構造（概念）
// [Fact] 属性でテストメソッドを定義
// [Theory] + [InlineData] でパラメータ化テスト

// 実際のテストコード例（xUnitプロジェクト内で動作）
Console.WriteLine("xUnitのテスト構造");
Console.WriteLine();
Console.WriteLine("// [Fact] - 単一テスト");
Console.WriteLine("public void Add_TwoNumbers_ReturnsSum()");
Console.WriteLine("{");
Console.WriteLine("    // Arrange");
Console.WriteLine("    var calc = new Calculator();");
Console.WriteLine("    // Act");
Console.WriteLine("    var result = calc.Add(2, 3);");
Console.WriteLine("    // Assert");
Console.WriteLine("    Assert.Equal(5, result);");
Console.WriteLine("}");`}
          expectedOutput={`xUnitのテスト構造

// [Fact] - 単一テスト
public void Add_TwoNumbers_ReturnsSum()
{
    // Arrange
    var calc = new Calculator();
    // Act
    var result = calc.Add(2, 3);
    // Assert
    Assert.Equal(5, result);
}`}
        />
      </section>
    </div>
  );
}
