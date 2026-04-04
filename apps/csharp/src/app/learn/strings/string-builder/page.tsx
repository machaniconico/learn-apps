import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringBuilderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">文字列操作 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">StringBuilder</h1>
        <p className="text-gray-400">大量の文字列連結を効率的に行う StringBuilder の使い方と、Append・ToString の活用</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜ StringBuilder が必要か</h2>
        <p className="text-gray-400 mb-3">
          C# の string は不変(immutable)です。<code className="text-cyan-400">str += &quot;追加&quot;</code> のような連結を繰り返すと、
          毎回新しい文字列オブジェクトがヒープに生成され、古いオブジェクトはガベージコレクションの対象になります。
          ループで数百・数千回連結するとパフォーマンスが著しく低下します。
        </p>
        <p className="text-gray-400">
          <code className="text-cyan-400">System.Text.StringBuilder</code> は内部バッファを持ち、文字列を追記する際に新規オブジェクトを生成しません。
          大量の文字列結合には必ず StringBuilder を使いましょう。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">基本的な使い方</h2>
        <p className="text-gray-400 mb-4">
          StringBuilder は <code className="text-cyan-400">Append()</code> で文字列を追記し、最終的に <code className="text-cyan-400">ToString()</code> で string に変換します。
          AppendLine は末尾に改行を追加して追記します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Text;

class Program
{
    static void Main()
    {
        var sb = new StringBuilder();

        sb.Append("C#");
        sb.Append("は");
        sb.AppendLine("素晴らしい言語です。");
        sb.AppendLine("型安全で高性能！");
        sb.Append("バージョン: ");
        sb.Append(13);

        string result = sb.ToString();
        Console.WriteLine(result);
        Console.WriteLine($"文字数: {sb.Length}");
    }
}`}
          expectedOutput={`C#は素晴らしい言語です。
型安全で高性能！
バージョン: 13
文字数: 31`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Insert・Remove・Replace</h2>
        <p className="text-gray-400 mb-4">
          StringBuilder は文字列の途中への挿入・削除・置換もサポートしています。
          これらの操作も内部バッファで効率的に実行されます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Text;

class Program
{
    static void Main()
    {
        var sb = new StringBuilder("Hello, World!");

        // Insert: 指定位置に挿入
        sb.Insert(7, "Beautiful ");
        Console.WriteLine(sb.ToString());

        // Replace: 置換
        sb.Replace("Beautiful ", "");
        Console.WriteLine(sb.ToString());

        // Remove: 指定位置から指定文字数を削除
        sb.Remove(5, 7); // インデックス5から7文字削除
        Console.WriteLine(sb.ToString());
    }
}`}
          expectedOutput={`Hello, Beautiful World!
Hello, World!
Hello!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">ループでの活用例</h2>
        <p className="text-gray-400 mb-4">
          StringBuilder が最も効果を発揮するのはループ内での文字列構築です。
          string の + 演算子と比べてメモリ使用量と処理時間が大幅に削減されます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Text;

class Program
{
    static void Main()
    {
        // StringBuilder でHTMLリストを生成
        var sb = new StringBuilder();
        string[] items = { "りんご", "バナナ", "みかん", "ぶどう" };

        sb.AppendLine("<ul>");
        foreach (string item in items)
        {
            sb.Append("  <li>");
            sb.Append(item);
            sb.AppendLine("</li>");
        }
        sb.Append("</ul>");

        Console.WriteLine(sb.ToString());
    }
}`}
          expectedOutput={`<ul>
  <li>りんご</li>
  <li>バナナ</li>
  <li>みかん</li>
  <li>ぶどう</li>
</ul>`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-builder" />
      </div>
      <LessonNav lessons={lessons} currentId="string-builder" basePath="/learn/strings" />
    </div>
  );
}
