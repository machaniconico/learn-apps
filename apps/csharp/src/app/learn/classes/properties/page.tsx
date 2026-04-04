import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function PropertiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">クラス基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロパティ</h1>
        <p className="text-gray-400">get/set アクセサー、自動プロパティ、init-only プロパティによるカプセル化</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロパティとカプセル化</h2>
        <p className="text-gray-400 mb-3">
          プロパティはフィールドへのアクセスを制御するための C# の機能です。
          外部からは変数のように見えますが、内部では get/set の処理を実行できます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><strong className="text-white">自動プロパティ</strong>: <code className="text-green-400">{"{ get; set; }"}</code> — バッキングフィールドを自動生成</li>
          <li><strong className="text-white">計算プロパティ</strong>: get のみで値を計算して返す</li>
          <li><strong className="text-white">init-only</strong>: <code className="text-green-400">{"{ get; init; }"}</code> — 初期化後は変更不可</li>
          <li><strong className="text-white">検証付き</strong>: set 内でバリデーションを実行</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">自動プロパティと検証</h2>
        <p className="text-gray-400 mb-4">
          get/set アクセサーに処理を書くことでデータの整合性を保てます。
          不正な値を拒否したり、自動的に変換する処理を実装できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Temperature
{
    private double _celsius;

    // 検証付きプロパティ
    public double Celsius
    {
        get => _celsius;
        set
        {
            if (value < -273.15)
                throw new ArgumentException("絶対零度以下は無効です");
            _celsius = value;
        }
    }

    // 計算プロパティ（読み取り専用）
    public double Fahrenheit => _celsius * 9 / 5 + 32;
    public double Kelvin => _celsius + 273.15;
}

class Program
{
    static void Main()
    {
        var temp = new Temperature();
        temp.Celsius = 100;

        Console.WriteLine($"摂氏: {temp.Celsius}°C");
        Console.WriteLine($"華氏: {temp.Fahrenheit}°F");
        Console.WriteLine($"ケルビン: {temp.Kelvin}K");
    }
}`}
          expectedOutput={`摂氏: 100°C
華氏: 212°F
ケルビン: 373.15K`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">init-only プロパティ</h2>
        <p className="text-gray-400 mb-4">
          C# 9 で導入された <code className="text-green-400">init</code> アクセサーを使うと、
          オブジェクト初期化子での設定のみ許可し、その後の変更を禁止できます。
          record 型と組み合わせてイミュータブルな設計が可能です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class ImmutablePoint
{
    // init-only: 初期化後は変更不可
    public double X { get; init; }
    public double Y { get; init; }

    // 自動プロパティ（読み書き可能）
    public string Label { get; set; } = "点";

    public double Distance =>
        Math.Sqrt(X * X + Y * Y);
}

class Program
{
    static void Main()
    {
        // オブジェクト初期化子でのみ設定可能
        var point = new ImmutablePoint
        {
            X = 3.0,
            Y = 4.0,
            Label = "原点からの点"
        };

        Console.WriteLine($"{point.Label}: ({point.X}, {point.Y})");
        Console.WriteLine($"原点からの距離: {point.Distance}");

        // Label は変更可能
        point.Label = "更新済み";
        Console.WriteLine($"ラベル変更後: {point.Label}");
    }
}`}
          expectedOutput={`原点からの点: (3, 4)
原点からの距離: 5
ラベル変更後: 更新済み`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="properties" />
      </div>
      <LessonNav lessons={lessons} currentId="properties" basePath="/learn/classes" />
    </div>
  );
}
