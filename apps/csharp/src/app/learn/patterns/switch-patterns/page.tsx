import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function PatternsSwitchPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">パターンマッチング レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">switchパターン</h1>
        <p className="text-gray-400">switch式、discard（_）、whenガードを使ったパターンマッチングを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switch式とswitch文の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C# 8.0で導入された<strong className="text-white">switch式</strong>は値を返す式として使えます。従来のswitch文より簡潔に書けます。パターンマッチングと組み合わせることで非常に表現力が高くなります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">switch式の基本</h2>
        <p className="text-gray-400 mb-4">switch文からswitch式への書き換えを比較します。</p>
        <CSharpEditor
          defaultCode={`// switch文（旧来の書き方）
string GetDayType_Old(DayOfWeek day)
{
    switch (day)
    {
        case DayOfWeek.Saturday:
        case DayOfWeek.Sunday:
            return "休日";
        default:
            return "平日";
    }
}

// switch式（C# 8.0以降、簡潔）
string GetDayType(DayOfWeek day) => day switch
{
    DayOfWeek.Saturday or DayOfWeek.Sunday => "休日",
    _ => "平日"  // _ はデフォルト（discard）
};

// 型パターンとwhenガードを使った例
string Classify(object obj) => obj switch
{
    int n when n < 0    => $"負の整数: {n}",
    int n when n == 0   => "ゼロ",
    int n               => $"正の整数: {n}",
    string s when s.Length == 0 => "空文字列",
    string s            => $"文字列: \"{s}\"",
    null                => "null",
    _                   => $"その他: {obj.GetType().Name}"
};

// テスト
var testValues = new object?[] { -5, 0, 42, "", "Hello", null, 3.14 };
foreach (var val in testValues)
{
    Console.WriteLine(Classify(val!));
}

Console.WriteLine();
Console.WriteLine($"土曜日: {GetDayType(DayOfWeek.Saturday)}");
Console.WriteLine($"月曜日: {GetDayType(DayOfWeek.Monday)}");`}
          expectedOutput={`負の整数: -5
ゼロ
正の整数: 42
空文字列
文字列: "Hello"
null
その他: Double

土曜日: 休日
月曜日: 平日`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関係パターン（C# 9.0）</h2>
        <p className="text-gray-400 mb-4">&lt;、&gt;、&lt;=、&gt;=を使った比較パターンです。</p>
        <CSharpEditor
          defaultCode={`// 関係パターン（Relational Pattern）C# 9.0以降
string GetGrade(int score) => score switch
{
    >= 90 => "A",
    >= 80 => "B",
    >= 70 => "C",
    >= 60 => "D",
    _     => "F"
};

// 論理パターン（and, or, not）
string ClassifyBMI(double bmi) => bmi switch
{
    < 18.5              => "低体重",
    >= 18.5 and < 25.0  => "普通体重",
    >= 25.0 and < 30.0  => "過体重",
    >= 30.0             => "肥満",
    _                   => "不正な値"
};

// not パターン
bool IsNotNull(object? obj) => obj is not null;

// テスト
int[] scores = { 95, 82, 71, 65, 55 };
foreach (int score in scores)
{
    Console.WriteLine($"{score}点 -> {GetGrade(score)}");
}

Console.WriteLine();
double[] bmis = { 17.0, 22.5, 27.0, 31.0 };
foreach (double bmi in bmis)
{
    Console.WriteLine($"BMI {bmi} -> {ClassifyBMI(bmi)}");
}`}
          expectedOutput={`95点 -> A
82点 -> B
71点 -> C
65点 -> D
55点 -> F

BMI 17 -> 低体重
BMI 22.5 -> 普通体重
BMI 27 -> 過体重
BMI 31 -> 肥満`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="switch-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="switch-patterns" basePath="/learn/patterns" />
    </div>
  );
}
