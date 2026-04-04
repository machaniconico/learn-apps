import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("xunit");

export default function XunitMockingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">xUnit レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モック</h1>
        <p className="text-gray-400">Moqライブラリを使ったMock&lt;T&gt;.Setup、.Returns、.Verifyを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">モックとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          モックはテスト時に依存オブジェクトを偽物に差し替える技術です。データベースや外部APIに依存しないテストを書けます。
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">Moq</code>は.NETで最も人気のあるモッキングライブラリです。
        </p>
        <p className="text-gray-300 leading-relaxed">
          インターフェースに対してモックを作成するため、テスト対象クラスは依存関係をインターフェースとして受け取る設計にします（依存性注入パターン）。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Moqの基本的な使い方</h2>
        <p className="text-gray-400 mb-4">Setup・Returns・Verifyの基本パターンを学びます。</p>
        <CSharpEditor
          defaultCode={`using Moq;
using Xunit;

// テスト対象のインターフェースとクラス
public interface IProductRepository
{
    Product? GetById(int id);
    IEnumerable<Product> GetAll();
    void Add(Product product);
}

public class ProductService
{
    private readonly IProductRepository _repo;

    public ProductService(IProductRepository repo)
    {
        _repo = repo;
    }

    public string GetProductName(int id)
    {
        var product = _repo.GetById(id);
        return product?.Name ?? "不明";
    }
}

// モックを使ったテスト
public class ProductServiceTests
{
    [Fact]
    public void GetProductName_ExistingId_ReturnsProductName()
    {
        // Arrange - モックを作成
        var mockRepo = new Mock<IProductRepository>();

        // Setup: GetById(1) が呼ばれたら Product を返す
        mockRepo.Setup(r => r.GetById(1))
                .Returns(new Product { Id = 1, Name = "テスト商品" });

        var service = new ProductService(mockRepo.Object);

        // Act
        string name = service.GetProductName(1);

        // Assert
        Assert.Equal("テスト商品", name);

        // Verify: GetById(1) が1回呼ばれたことを確認
        mockRepo.Verify(r => r.GetById(1), Times.Once);
    }
}

// デモ実行
Console.WriteLine("Moq モックのデモ:");
Console.WriteLine("Mock<IProductRepository> を作成");
Console.WriteLine("Setup: GetById(1) -> Product { Name = \"テスト商品\" }");
Console.WriteLine("Verify: GetById(1) が Times.Once 呼ばれた");
Console.WriteLine();
Console.WriteLine("テスト通過!");`}
          expectedOutput={`Moq モックのデモ:
Mock<IProductRepository> を作成
Setup: GetById(1) -> Product { Name = "テスト商品" }
Verify: GetById(1) が Times.Once 呼ばれた

テスト通過!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Setup のバリエーション</h2>
        <p className="text-gray-400 mb-4">様々な条件でモックの振る舞いを定義できます。</p>
        <CSharpEditor
          defaultCode={`// Moq Setup のバリエーション
Console.WriteLine("=== Moq Setup パターン ===");
Console.WriteLine();

// 固定値を返す
Console.WriteLine("// 固定値を返す");
Console.WriteLine("mock.Setup(r => r.GetById(1)).Returns(product);");
Console.WriteLine();

// 任意の引数に対して返す
Console.WriteLine("// 任意の引数（It.IsAny）");
Console.WriteLine("mock.Setup(r => r.GetById(It.IsAny<int>())).Returns(product);");
Console.WriteLine();

// 条件付き
Console.WriteLine("// 条件付き（It.Is）");
Console.WriteLine("mock.Setup(r => r.GetById(It.Is<int>(id => id > 0))).Returns(product);");
Console.WriteLine();

// 例外をスロー
Console.WriteLine("// 例外をスロー");
Console.WriteLine("mock.Setup(r => r.GetById(-1)).Throws<ArgumentException>();");
Console.WriteLine();

// 非同期メソッド
Console.WriteLine("// 非同期メソッド");
Console.WriteLine("mock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(product);");
Console.WriteLine();

// Verify のバリエーション
Console.WriteLine("=== Moq Verify パターン ===");
Console.WriteLine("mock.Verify(r => r.Add(It.IsAny<Product>()), Times.Once);");
Console.WriteLine("mock.Verify(r => r.GetAll(), Times.Never);");
Console.WriteLine("mock.Verify(r => r.GetById(It.IsAny<int>()), Times.Exactly(3));");`}
          expectedOutput={`=== Moq Setup パターン ===

// 固定値を返す
mock.Setup(r => r.GetById(1)).Returns(product);

// 任意の引数（It.IsAny）
mock.Setup(r => r.GetById(It.IsAny<int>())).Returns(product);

// 条件付き（It.Is）
mock.Setup(r => r.GetById(It.Is<int>(id => id > 0))).Returns(product);

// 例外をスロー
mock.Setup(r => r.GetById(-1)).Throws<ArgumentException>();

// 非同期メソッド
mock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(product);

=== Moq Verify パターン ===
mock.Verify(r => r.Add(It.IsAny<Product>()), Times.Once);
mock.Verify(r => r.GetAll(), Times.Never);
mock.Verify(r => r.GetById(It.IsAny<int>()), Times.Exactly(3));`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="xunit" lessonId="mocking" />
      </div>
      <LessonNav lessons={lessons} currentId="mocking" basePath="/learn/xunit" />
    </div>
  );
}
