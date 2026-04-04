import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">文字列操作 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列比較</h1>
        <p className="text-gray-400">StringComparison を使った正確な文字列比較。序数比較・カルチャ依存比較・等価性の違い</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列比較の重要性</h2>
        <p className="text-gray-400 mb-3">
          C# では文字列比較に複数の方法があり、目的によって使い分けが必要です。
          特に大文字小文字の扱いと言語・文化圏(カルチャ)の違いに注意が必要です。
        </p>
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="p-3 rounded bg-gray-800">
            <code className="text-cyan-400">StringComparison.Ordinal</code>
            <p className="text-gray-400 mt-1">バイト値での比較。最も高速。大文字小文字を区別。内部識別子の比較に最適。</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-cyan-400">StringComparison.OrdinalIgnoreCase</code>
            <p className="text-gray-400 mt-1">バイト値での比較、大文字小文字無視。URLやファイルパスの比較に最適。</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-cyan-400">StringComparison.CurrentCulture</code>
            <p className="text-gray-400 mt-1">現在のカルチャに基づく比較。ユーザー向け表示の比較・ソートに使用。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Equals と StringComparison</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-400">==</code> 演算子は参照等値ではなく値の等値比較を行いますが、
          大文字小文字を区別します。<code className="text-cyan-400">Equals(StringComparison)</code> を明示的に指定するのがベストプラクティスです。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        string a = "Hello";
        string b = "hello";

        // == は大文字小文字を区別する
        Console.WriteLine($"== : {a == b}");

        // OrdinalIgnoreCase で大文字小文字無視
        Console.WriteLine($"OrdinalIgnoreCase: {a.Equals(b, StringComparison.OrdinalIgnoreCase)}");

        // Ordinal は大文字小文字区別
        Console.WriteLine($"Ordinal: {a.Equals(b, StringComparison.Ordinal)}");

        // string.Compare は順序比較（0=等値、負=aが小さい、正=aが大きい）
        int result = string.Compare("apple", "banana", StringComparison.Ordinal);
        Console.WriteLine($"Compare apple/banana: {result}");
    }
}`}
          expectedOutput={`== : False
OrdinalIgnoreCase: True
Ordinal: False
Compare apple/banana: -1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">実用的な比較パターン</h2>
        <p className="text-gray-400 mb-4">
          ファイル拡張子・URLパス・HTTP ヘッダーなどはカルチャに依存しないため Ordinal/OrdinalIgnoreCase を使います。
          ユーザーの入力を表示順にソートする場合は CurrentCulture を使います。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main()
    {
        // ファイル拡張子の比較（カルチャ非依存）
        string fileName = "Report.TXT";
        bool isTxt = fileName.EndsWith(".txt", StringComparison.OrdinalIgnoreCase);
        Console.WriteLine($"TXTファイル: {isTxt}");

        // Dictionary のキー検索（デフォルトは Ordinal）
        string key1 = "userId";
        string key2 = "UserId";
        Console.WriteLine($"キーが等しい: {string.Equals(key1, key2, StringComparison.Ordinal)}");
        Console.WriteLine($"キーが等しい(無視): {string.Equals(key1, key2, StringComparison.OrdinalIgnoreCase)}");

        // 空文字・null の安全な比較
        string? maybeNull = null;
        Console.WriteLine($"null と空: {string.IsNullOrEmpty(maybeNull)}");
        Console.WriteLine($"空白のみ: {string.IsNullOrWhiteSpace("   ")}");
    }
}`}
          expectedOutput={`TXTファイル: True
キーが等しい: False
キーが等しい(無視): True
null と空: True
空白のみ: True`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="comparison" basePath="/learn/strings" />
    </div>
  );
}
