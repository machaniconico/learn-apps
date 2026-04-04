import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignStrategyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">デザインパターン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Strategyパターン</h1>
        <p className="text-gray-400">インターフェースベースの戦略定義、依存性注入との組み合わせを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Strategyパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Strategyパターンはアルゴリズム（戦略）をインターフェースとして定義し、実行時に切り替え可能にします。if/switchによる分岐をなくし、Open/Closed原則（拡張に対してオープン、修正に対してクローズ）に従います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ソートアルゴリズムの切り替え例</h2>
        <p className="text-gray-400 mb-4">IComparer&lt;T&gt;を使ったStrategyパターンの実例です。</p>
        <CSharpEditor
          defaultCode={`// Strategyパターン: ソート戦略を切り替える
public interface ISortStrategy<T>
{
    IEnumerable<T> Sort(IEnumerable<T> items);
}

// 戦略1: 昇順ソート
public class AscendingSort<T> : ISortStrategy<T> where T : IComparable<T>
{
    public IEnumerable<T> Sort(IEnumerable<T> items)
        => items.OrderBy(x => x);
}

// 戦略2: 降順ソート
public class DescendingSort<T> : ISortStrategy<T> where T : IComparable<T>
{
    public IEnumerable<T> Sort(IEnumerable<T> items)
        => items.OrderByDescending(x => x);
}

// Context: 戦略を使うクラス
public class DataProcessor<T> where T : IComparable<T>
{
    private ISortStrategy<T> _sortStrategy;

    public DataProcessor(ISortStrategy<T> strategy)
    {
        _sortStrategy = strategy;
    }

    // 実行時に戦略を切り替え可能
    public void SetStrategy(ISortStrategy<T> strategy)
        => _sortStrategy = strategy;

    public IEnumerable<T> Process(IEnumerable<T> data)
        => _sortStrategy.Sort(data);
}

int[] numbers = { 5, 2, 8, 1, 9, 3, 7, 4, 6 };

var processor = new DataProcessor<int>(new AscendingSort<int>());
Console.WriteLine($"昇順: {string.Join(", ", processor.Process(numbers))}");

processor.SetStrategy(new DescendingSort<int>());
Console.WriteLine($"降順: {string.Join(", ", processor.Process(numbers))}");`}
          expectedOutput={`昇順: 1, 2, 3, 4, 5, 6, 7, 8, 9
降順: 9, 8, 7, 6, 5, 4, 3, 2, 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">割引戦略パターンの実例</h2>
        <p className="text-gray-400 mb-4">ビジネスロジックの切り替えにStrategyを使います。</p>
        <CSharpEditor
          defaultCode={`// 割引戦略パターン
public interface IDiscountStrategy
{
    decimal Apply(decimal price);
    string Description { get; }
}

public class NoDiscount : IDiscountStrategy
{
    public string Description => "割引なし";
    public decimal Apply(decimal price) => price;
}

public class PercentageDiscount : IDiscountStrategy
{
    private readonly decimal _percent;
    public PercentageDiscount(decimal percent) => _percent = percent;
    public string Description => $"{_percent}%割引";
    public decimal Apply(decimal price)
        => price * (1 - _percent / 100);
}

public class FixedDiscount : IDiscountStrategy
{
    private readonly decimal _amount;
    public FixedDiscount(decimal amount) => _amount = amount;
    public string Description => $"¥{_amount}引き";
    public decimal Apply(decimal price)
        => Math.Max(0, price - _amount);
}

// 注文に戦略を適用
decimal basePrice = 5000;
IDiscountStrategy[] strategies =
{
    new NoDiscount(),
    new PercentageDiscount(10),
    new PercentageDiscount(20),
    new FixedDiscount(500),
};

Console.WriteLine($"元の価格: ¥{basePrice}");
foreach (var strategy in strategies)
{
    decimal discounted = strategy.Apply(basePrice);
    Console.WriteLine($"  {strategy.Description,-12}: ¥{discounted}");
}`}
          expectedOutput={`元の価格: ¥5000
  割引なし       : ¥5000
  10%割引        : ¥4500
  20%割引        : ¥4000
  ¥500引き       : ¥4500`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="strategy" />
      </div>
      <LessonNav lessons={lessons} currentId="strategy" basePath="/learn/design" />
    </div>
  );
}
