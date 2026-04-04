import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">文字列操作 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列メソッド</h1>
        <p className="text-gray-400">Trim・Split・Replace・Contains・StartsWith・EndsWith・ToUpper/ToLower など主要メソッドの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列メソッドとは</h2>
        <p className="text-gray-400 mb-3">
          C# の string 型には、文字列を操作・検索・変換するためのメソッドが豊富に用意されています。
          これらのメソッドはすべて元の文字列を変更せず、新しい文字列を返します（immutable な性質）。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><span className="text-cyan-400 font-mono">Trim() / TrimStart() / TrimEnd()</span> — 空白除去</li>
          <li><span className="text-cyan-400 font-mono">ToUpper() / ToLower()</span> — 大文字・小文字変換</li>
          <li><span className="text-cyan-400 font-mono">Contains() / StartsWith() / EndsWith()</span> — 文字列検索</li>
          <li><span className="text-cyan-400 font-mono">Replace()</span> — 文字列置換</li>
          <li><span className="text-cyan-400 font-mono">Split()</span> — 文字列分割</li>
          <li><span className="text-cyan-400 font-mono">Substring() / IndexOf()</span> — 部分取得・位置検索</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">検索・判定メソッド</h2>
        <p className="text-gray-400 mb-4">
          Contains・StartsWith・EndsWith は文字列の存在確認に使います。IndexOf は見つかった位置（0始まり）を返し、見つからない場合は -1 を返します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        string email = "user@example.com";

        Console.WriteLine(email.Contains("@"));         // @ を含むか
        Console.WriteLine(email.StartsWith("user"));    // user で始まるか
        Console.WriteLine(email.EndsWith(".com"));       // .com で終わるか
        Console.WriteLine(email.IndexOf("@"));           // @ の位置
        Console.WriteLine(email.IndexOf("xyz"));         // 見つからない場合

        // 大文字小文字を無視して検索
        string text = "Hello World";
        Console.WriteLine(text.Contains("hello",
            StringComparison.OrdinalIgnoreCase));
    }
}`}
          expectedOutput={`True
True
True
4
-1
True`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">変換・加工メソッド</h2>
        <p className="text-gray-400 mb-4">
          Replace は指定した文字列を別の文字列に置換し、Split は区切り文字で分割して配列を返します。
          Trim 系は空白や指定文字を取り除きます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        // Replace: 文字列置換
        string sentence = "C++はC++がベースです";
        string replaced = sentence.Replace("C++", "C#");
        Console.WriteLine(replaced);

        // Split: 文字列分割
        string csv = "田中,鈴木,佐藤,山田";
        string[] names = csv.Split(',');
        foreach (string name in names)
            Console.WriteLine(name);

        // Trim: 空白除去
        string padded = "   スペースあり   ";
        Console.WriteLine($"[{padded.Trim()}]");

        // Substring: 部分文字列
        string url = "https://example.com";
        Console.WriteLine(url.Substring(8)); // 8文字目以降
    }
}`}
          expectedOutput={`C#はC#がベースです
田中
鈴木
佐藤
山田
[スペースあり]
example.com`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">文字列の結合と変換</h2>
        <p className="text-gray-400 mb-4">
          string.Join は配列や列挙型の要素を区切り文字で結合します。ToUpper/ToLower は文字の大文字小文字を変換します。
          PadLeft/PadRight は文字列を指定幅に合わせて埋めます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        // Join: 配列を文字列に結合
        string[] fruits = { "りんご", "バナナ", "みかん" };
        string joined = string.Join("・", fruits);
        Console.WriteLine(joined);

        // PadLeft/PadRight: 桁合わせ
        for (int i = 1; i <= 3; i++)
        {
            string numStr = i.ToString().PadLeft(3, '0');
            Console.WriteLine($"番号: {numStr}");
        }

        // ToUpper/ToLower
        string mixed = "Hello World";
        Console.WriteLine(mixed.ToUpper());
        Console.WriteLine(mixed.ToLower());
    }
}`}
          expectedOutput={`りんご・バナナ・みかん
番号: 001
番号: 002
番号: 003
HELLO WORLD
hello world`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="methods" />
      </div>
      <LessonNav lessons={lessons} currentId="methods" basePath="/learn/strings" />
    </div>
  );
}
