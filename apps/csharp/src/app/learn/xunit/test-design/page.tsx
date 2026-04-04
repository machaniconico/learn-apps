import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("xunit");

export default function XunitTestDesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">xUnit レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テスト設計</h1>
        <p className="text-gray-400">AAAパターン、テスト命名規則、テストフィクスチャ、IClassFixtureを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">AAAパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テストは<strong className="text-white">Arrange（準備）→ Act（実行）→ Assert（検証）</strong>の3ステップで構成します。このAAAパターンに従うことでテストが読みやすく一貫した構造になります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テスト命名規則</h2>
        <p className="text-gray-400 mb-4">テスト名から何をテストしているかが一目でわかるように命名します。</p>
        <CSharpEditor
          defaultCode={`// テスト命名規則
// パターン: メソッド名_条件_期待する結果
Console.WriteLine("=== テスト命名規則 ===");
Console.WriteLine();
Console.WriteLine("// 良い命名例:");
Console.WriteLine("[Fact]");
Console.WriteLine("public void Add_TwoPositiveIntegers_ReturnsSum()");
Console.WriteLine();
Console.WriteLine("[Fact]");
Console.WriteLine("public void GetById_NonExistentId_ReturnsNull()");
Console.WriteLine();
Console.WriteLine("[Fact]");
Console.WriteLine("public void Register_DuplicateEmail_ThrowsInvalidOperationException()");
Console.WriteLine();
Console.WriteLine("[Fact]");
Console.WriteLine("public void ProcessOrder_InsufficientStock_CancelsOrder()");
Console.WriteLine();
Console.WriteLine("// 悪い命名例:");
Console.WriteLine("[Fact]");
Console.WriteLine("public void Test1()  // 何をテストしているか不明");
Console.WriteLine();
Console.WriteLine("[Fact]");
Console.WriteLine("public void AddTest()  // 条件と期待値がない");`}
          expectedOutput={`=== テスト命名規則 ===

// 良い命名例:
[Fact]
public void Add_TwoPositiveIntegers_ReturnsSum()

[Fact]
public void GetById_NonExistentId_ReturnsNull()

[Fact]
public void Register_DuplicateEmail_ThrowsInvalidOperationException()

[Fact]
public void ProcessOrder_InsufficientStock_CancelsOrder()

// 悪い命名例:
[Fact]
public void Test1()  // 何をテストしているか不明

[Fact]
public void AddTest()  // 条件と期待値がない`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">IClassFixture でリソース共有</h2>
        <p className="text-gray-400 mb-4">テストクラス内でリソースを共有するためのパターンです。</p>
        <CSharpEditor
          defaultCode={`using Xunit;

// Fixture クラス（共有リソース）
public class DatabaseFixture : IDisposable
{
    public string ConnectionString { get; }

    public DatabaseFixture()
    {
        // DB接続やサーバーの起動など重いセットアップ
        ConnectionString = "Data Source=:memory:";
        Console.WriteLine("Fixture: データベース初期化（1回だけ実行）");
    }

    public void Dispose()
    {
        Console.WriteLine("Fixture: データベース後片付け");
    }
}

// IClassFixture<T> でテストクラスにFixtureを注入
public class ProductRepositoryTests : IClassFixture<DatabaseFixture>
{
    private readonly DatabaseFixture _fixture;

    public ProductRepositoryTests(DatabaseFixture fixture)
    {
        _fixture = fixture; // コンストラクタで受け取る
    }

    [Fact]
    public void GetAll_ReturnsAllProducts()
    {
        // _fixture.ConnectionString を使ってDBテスト
        Console.WriteLine($"接続: {_fixture.ConnectionString}");
    }
}

Console.WriteLine("IClassFixture の利点:");
Console.WriteLine("- Fixture は1回だけ初期化（全テストで共有）");
Console.WriteLine("- コンストラクタは各テストで実行");
Console.WriteLine("- 重いリソース（DB起動等）のコストを削減");`}
          expectedOutput={`IClassFixture の利点:
- Fixture は1回だけ初期化（全テストで共有）
- コンストラクタは各テストで実行
- 重いリソース（DB起動等）のコストを削減`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="xunit" lessonId="test-design" />
      </div>
      <LessonNav lessons={lessons} currentId="test-design" basePath="/learn/xunit" />
    </div>
  );
}
