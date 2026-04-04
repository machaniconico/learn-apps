import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function ExceptionsCustomExceptionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">例外処理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カスタム例外</h1>
        <p className="text-gray-400">Exceptionクラスの継承、カスタムプロパティの追加、ベストプラクティスを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタム例外を作る理由</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カスタム例外はドメイン固有のエラー情報を型として表現するために作ります。呼び出し側が例外の種類を正確に識別できるようになり、追加の情報（エラーコード・操作対象IDなど）を例外に含められます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム例外の実装</h2>
        <p className="text-gray-400 mb-4">Exceptionクラスを継承してカスタム例外を定義します。</p>
        <CSharpEditor
          defaultCode={`// カスタム例外クラスの定義
public class InsufficientStockException : Exception
{
    public int ProductId { get; }
    public int RequestedQuantity { get; }
    public int AvailableStock { get; }

    public InsufficientStockException(
        int productId,
        int requestedQuantity,
        int availableStock)
        : base($"商品ID {productId}: 在庫不足（要求: {requestedQuantity}, 在庫: {availableStock}）")
    {
        ProductId = productId;
        RequestedQuantity = requestedQuantity;
        AvailableStock = availableStock;
    }

    // InnerException を持つコンストラクタ
    public InsufficientStockException(
        int productId, int requestedQuantity, int availableStock,
        Exception innerException)
        : base($"商品ID {productId}: 在庫不足", innerException)
    {
        ProductId = productId;
        RequestedQuantity = requestedQuantity;
        AvailableStock = availableStock;
    }
}

// 使用例
void PurchaseProduct(int productId, int quantity)
{
    int stock = 3;
    if (quantity > stock)
    {
        throw new InsufficientStockException(productId, quantity, stock);
    }
    Console.WriteLine($"購入成功: 商品{productId} x{quantity}");
}

try
{
    PurchaseProduct(101, 5);
}
catch (InsufficientStockException ex)
{
    Console.WriteLine($"在庫不足エラー:");
    Console.WriteLine($"  商品ID: {ex.ProductId}");
    Console.WriteLine($"  要求数量: {ex.RequestedQuantity}");
    Console.WriteLine($"  在庫数: {ex.AvailableStock}");
    Console.WriteLine($"  メッセージ: {ex.Message}");
}`}
          expectedOutput={`在庫不足エラー:
  商品ID: 101
  要求数量: 5
  在庫数: 3
  メッセージ: 商品ID 101: 在庫不足（要求: 5, 在庫: 3）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外クラスの命名規則</h2>
        <p className="text-gray-400 mb-4">カスタム例外のベストプラクティスを確認します。</p>
        <CSharpEditor
          defaultCode={`// カスタム例外のベストプラクティス
Console.WriteLine("カスタム例外のベストプラクティス:");
Console.WriteLine();
Console.WriteLine("1. 名前は「Exception」で終わる");
Console.WriteLine("   ✓ InsufficientStockException");
Console.WriteLine("   ✗ InsufficientStock, StockError");
Console.WriteLine();
Console.WriteLine("2. 3つのコンストラクタを実装する（規約）");
Console.WriteLine("   public MyException() : base() {}");
Console.WriteLine("   public MyException(string msg) : base(msg) {}");
Console.WriteLine("   public MyException(string msg, Exception inner) : base(msg, inner) {}");
Console.WriteLine();
Console.WriteLine("3. Exceptionを直接継承するのではなく適切な基底クラスを選ぶ");
Console.WriteLine("   ArgumentException   : 引数が不正");
Console.WriteLine("   InvalidOperationException : 現在の状態で無効な操作");
Console.WriteLine("   ApplicationException : アプリケーション固有のエラー");
Console.WriteLine();
Console.WriteLine("4. 例外クラスに[Serializable]を付けるのが伝統的だが");
Console.WriteLine("   .NET Core以降は必須ではない");`}
          expectedOutput={`カスタム例外のベストプラクティス:

1. 名前は「Exception」で終わる
   ✓ InsufficientStockException
   ✗ InsufficientStock, StockError

2. 3つのコンストラクタを実装する（規約）
   public MyException() : base() {}
   public MyException(string msg) : base(msg) {}
   public MyException(string msg, Exception inner) : base(msg, inner) {}

3. Exceptionを直接継承するのではなく適切な基底クラスを選ぶ
   ArgumentException   : 引数が不正
   InvalidOperationException : 現在の状態で無効な操作
   ApplicationException : アプリケーション固有のエラー

4. 例外クラスに[Serializable]を付けるのが伝統的だが
   .NET Core以降は必須ではない`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="custom-exceptions" />
      </div>
      <LessonNav lessons={lessons} currentId="custom-exceptions" basePath="/learn/exceptions" />
    </div>
  );
}
