import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function SwitchPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">switchパターン</h1>
        <p className="text-gray-400">C#のパターンマッチングを使ったswitch式を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switch式（C# 8.0以降）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C# 8.0で導入された<strong className="text-white">switch式</strong>は、従来のswitch文より簡潔に書けます。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">break</code> が不要で、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">=&gt;</code> で値を返します。
          fall-through（意図しない処理の継続）も起きません。
        </p>
        <p className="text-gray-300 leading-relaxed">
          デフォルトケースは <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">_</code>（ディスカード）で表します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">switch式の基本</h2>
        <p className="text-gray-400 mb-4">従来のswitch文とswitch式を比較しましょう。</p>
        <CSharpEditor
          defaultCode={`// 従来のswitch文
int day = 3;
string dayName1;
switch (day)
{
    case 1: dayName1 = "月曜"; break;
    case 2: dayName1 = "火曜"; break;
    case 3: dayName1 = "水曜"; break;
    default: dayName1 = "その他"; break;
}
Console.WriteLine(dayName1);

// switch式（C# 8.0以降）- より簡潔
string dayName2 = day switch
{
    1 => "月曜",
    2 => "火曜",
    3 => "水曜",
    4 => "木曜",
    5 => "金曜",
    _ => "週末"
};
Console.WriteLine(dayName2);`}
          expectedOutput={`水曜
水曜`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パターンマッチングの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C#のパターンマッチングには様々な種類があります。
        </p>
        <div className="space-y-2 text-sm">
          {[
            { pattern: "定数パターン", example: "case 1:", desc: "特定の値と一致するか" },
            { pattern: "型パターン", example: "case int n:", desc: "特定の型かどうか" },
            { pattern: "関係パターン", example: ">= 90", desc: "不等号による比較（C# 9.0）" },
            { pattern: "論理パターン", example: ">= 60 and < 90", desc: "and/or/not（C# 9.0）" },
            { pattern: "ディスカード", example: "_", desc: "何にでも一致するデフォルト" },
          ].map(({ pattern, example, desc }) => (
            <div key={pattern} className="p-3 bg-gray-900 rounded-lg flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-blue-400 font-medium w-36">{pattern}</span>
              <code className="text-purple-400 bg-gray-800 px-2 py-0.5 rounded text-xs w-32">{example}</code>
              <span className="text-gray-400">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関係・論理パターン（C# 9.0以降）</h2>
        <p className="text-gray-400 mb-4">スコアによる成績判定を関係パターンで書きます。</p>
        <CSharpEditor
          defaultCode={`// 関係パターン（C# 9.0以降）
int score = 75;

string grade = score switch
{
    >= 90 => "A（優秀）",
    >= 80 => "B（良好）",
    >= 70 => "C（普通）",
    >= 60 => "D（要努力）",
    _     => "F（不合格）"
};
Console.WriteLine($"{score}点 -> {grade}");

// 論理パターン（and/or/not）
string category = score switch
{
    >= 90 and <= 100 => "最高評価",
    >= 70 and < 90   => "中程度",
    < 70             => "要改善",
    _                => "範囲外"
};
Console.WriteLine($"カテゴリ: {category}");

// 型パターン
object[] values = { 42, "hello", 3.14, true };
foreach (var v in values)
{
    string desc = v switch
    {
        int i    => $"整数: {i}",
        string s => $"文字列: \"{s}\"",
        double d => $"小数: {d}",
        bool b   => $"真偽値: {b}",
        _        => "不明"
    };
    Console.WriteLine(desc);
}`}
          expectedOutput={`75点 -> C（普通）
カテゴリ: 中程度
整数: 42
文字列: "hello"
小数: 3.14
真偽値: True`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="switch-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="switch-patterns" basePath="/learn/control" />
    </div>
  );
}
