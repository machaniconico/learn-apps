import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function SpanCharPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">文字列操作 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ReadOnlySpan&lt;char&gt;</h1>
        <p className="text-gray-400">メモリ効率の良い文字列スライス。AsSpan() による新規アロケーションなしの部分文字列参照</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ReadOnlySpan&lt;char&gt; とは</h2>
        <p className="text-gray-400 mb-3">
          C# 7.2 で導入された <code className="text-cyan-400">ReadOnlySpan&lt;char&gt;</code> は、
          文字列の一部を新しいメモリを確保せずに参照できる構造体です。
        </p>
        <p className="text-gray-400 mb-3">
          通常の <code className="text-cyan-400">Substring()</code> は新しい string オブジェクトをヒープに確保しますが、
          <code className="text-cyan-400">AsSpan()</code> はスタック上で元の文字列の一部をスライスするだけです。
          パフォーマンスが重要なコードでの利用が推奨されます。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>ヒープアロケーションなし → GC 負荷を下げる</li>
          <li>スタック上に確保 → 高速なアクセス</li>
          <li>読み取り専用 → 安全な部分参照</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">AsSpan() の基本使用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-400">string.AsSpan(start, length)</code> で部分参照を作成します。
          Span&lt;char&gt; は文字列と同様に Length プロパティや foreach ループが使えます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        string text = "Hello, C# World!";

        // AsSpan でスライス（アロケーションなし）
        ReadOnlySpan<char> span = text.AsSpan(7, 2); // "C#"
        Console.WriteLine(span.ToString());

        // 範囲演算子との組み合わせ
        ReadOnlySpan<char> world = text.AsSpan()[10..15];
        Console.WriteLine(world.ToString());

        // 長さの確認
        ReadOnlySpan<char> full = text.AsSpan();
        Console.WriteLine($"長さ: {full.Length}");

        // 文字アクセス
        Console.WriteLine($"先頭: {full[0]}");
    }
}`}
          expectedOutput={`C#
World
長さ: 16
先頭: H`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Span での文字列解析</h2>
        <p className="text-gray-400 mb-4">
          CSV や固定長フォーマットの解析で Span を使うと、大量の一時文字列オブジェクトの生成を避けられます。
          <code className="text-cyan-400">IndexOf</code> や <code className="text-cyan-400">Slice</code> を組み合わせて効率的なパースが可能です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        // CSVの手動パース（アロケーションを最小化）
        string csv = "田中,28,東京";
        ReadOnlySpan<char> span = csv.AsSpan();

        int firstComma = span.IndexOf(',');
        string name = span[..firstComma].ToString();

        span = span[(firstComma + 1)..];
        int secondComma = span.IndexOf(',');
        string age = span[..secondComma].ToString();
        string city = span[(secondComma + 1)..].ToString();

        Console.WriteLine($"名前: {name}");
        Console.WriteLine($"年齢: {age}");
        Console.WriteLine($"都市: {city}");

        // StartsWith・EndsWith（Span版）
        ReadOnlySpan<char> word = "C#プログラミング".AsSpan();
        Console.WriteLine(word.StartsWith("C#".AsSpan()));
        Console.WriteLine(word.EndsWith("グ".AsSpan()));
    }
}`}
          expectedOutput={`名前: 田中
年齢: 28
都市: 東京
True
True`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="span-char" />
      </div>
      <LessonNav lessons={lessons} currentId="span-char" basePath="/learn/strings" />
    </div>
  );
}
