import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function PatternsPropertyPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">パターンマッチング レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロパティパターン</h1>
        <p className="text-gray-400">&#123; Property: value &#125;構文、ネストしたプロパティパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロパティパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プロパティパターンはオブジェクトのプロパティ値に基づいてパターンマッチングを行います。
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">&#123; Property: value &#125;</code>の形式で記述し、オブジェクト全体をキャストせずにプロパティを直接検査できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プロパティパターンの基本</h2>
        <p className="text-gray-400 mb-4">オブジェクトのプロパティに対してパターンマッチングを行います。</p>
        <CSharpEditor
          defaultCode={`// プロパティパターンの使い方
public record Address(string City, string Country);
public record Person(string Name, int Age, Address HomeAddress);

var people = new[]
{
    new Person("田中太郎", 35, new Address("東京", "日本")),
    new Person("Smith John", 28, new Address("New York", "USA")),
    new Person("鈴木花子", 17, new Address("大阪", "日本")),
    new Person("Müller Hans", 42, new Address("Berlin", "Germany")),
};

foreach (var person in people)
{
    // プロパティパターン: { Property: pattern }
    string category = person switch
    {
        // ネストしたプロパティパターン
        { HomeAddress: { Country: "日本" }, Age: >= 20 }
            => $"日本の成人: {person.Name}",

        { HomeAddress: { Country: "日本" }, Age: < 20 }
            => $"日本の未成年: {person.Name}",

        { HomeAddress.Country: "USA" }  // C# 10以降の短縮構文
            => $"アメリカ在住: {person.Name}",

        _  => $"その他: {person.Name} ({person.HomeAddress.Country})"
    };

    Console.WriteLine(category);
}`}
          expectedOutput={`日本の成人: 田中太郎
アメリカ在住: Smith John
日本の未成年: 鈴木花子
その他: Müller Hans (Germany)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プロパティパターンの高度な使い方</h2>
        <p className="text-gray-400 mb-4">複数プロパティの組み合わせと型パターンの組み合わせです。</p>
        <CSharpEditor
          defaultCode={`// 送料計算に使うプロパティパターン例
public record Order(
    string Status,
    decimal TotalAmount,
    string ShippingMethod,
    bool IsMember
);

decimal CalcShippingFee(Order order) => order switch
{
    // 会員かつ5000円以上は無料
    { IsMember: true, TotalAmount: >= 5000 }
        => 0,

    // 速達は一律800円
    { ShippingMethod: "express" }
        => 800,

    // 通常便で3000円以上は割引
    { ShippingMethod: "standard", TotalAmount: >= 3000 }
        => 300,

    // デフォルト
    _ => 500
};

var orders = new[]
{
    new Order("pending", 6000, "standard", true),
    new Order("pending", 2000, "express",  false),
    new Order("pending", 3500, "standard", false),
    new Order("pending", 1000, "standard", false),
};

Console.WriteLine("送料計算:");
foreach (var order in orders)
{
    decimal fee = CalcShippingFee(order);
    Console.WriteLine($"  ¥{order.TotalAmount,5} ({order.ShippingMethod,-8}) 会員:{order.IsMember} -> 送料 ¥{fee}");
}`}
          expectedOutput={`送料計算:
  ¥6000 (standard ) 会員:True -> 送料 ¥0
  ¥2000 (express  ) 会員:False -> 送料 ¥800
  ¥3500 (standard ) 会員:False -> 送料 ¥300
  ¥1000 (standard ) 会員:False -> 送料 ¥500`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="property-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="property-patterns" basePath="/learn/patterns" />
    </div>
  );
}
