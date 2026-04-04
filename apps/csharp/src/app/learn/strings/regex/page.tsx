import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function RegexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">文字列操作 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">正規表現</h1>
        <p className="text-gray-400">Regex クラスを使ったパターンマッチング。IsMatch・Match・Replace の活用とパターン記法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">正規表現とは</h2>
        <p className="text-gray-400 mb-3">
          正規表現(Regular Expression)は、文字列のパターンを記述するための表記法です。
          C# では <code className="text-cyan-400">System.Text.RegularExpressions.Regex</code> クラスを使います。
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white font-semibold mb-2">主なパターン記号</p>
            <ul className="text-gray-400 space-y-1">
              <li><code className="text-cyan-400">\d</code> — 数字 [0-9]</li>
              <li><code className="text-cyan-400">\w</code> — 単語文字 [a-zA-Z0-9_]</li>
              <li><code className="text-cyan-400">\s</code> — 空白文字</li>
              <li><code className="text-cyan-400">.</code> — 任意の1文字</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">量指定子</p>
            <ul className="text-gray-400 space-y-1">
              <li><code className="text-cyan-400">*</code> — 0回以上</li>
              <li><code className="text-cyan-400">+</code> — 1回以上</li>
              <li><code className="text-cyan-400">?</code> — 0回か1回</li>
              <li><code className="text-cyan-400">{"{n}"}</code> — ちょうどn回</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">IsMatch と Match</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-400">IsMatch()</code> はパターンに一致するかどうかを bool で返します。
          <code className="text-cyan-400">Match()</code> は最初の一致を返し、<code className="text-cyan-400">Matches()</code> はすべての一致を返します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        // メールアドレスの検証
        string emailPattern = @"^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$";
        string[] emails = { "user@example.com", "invalid-email", "test@co.jp" };

        foreach (string email in emails)
        {
            bool valid = Regex.IsMatch(email, emailPattern);
            Console.WriteLine($"{email}: {(valid ? "有効" : "無効")}");
        }

        // 数字の抽出
        string text = "商品A: 1500円、商品B: 2800円";
        var matches = Regex.Matches(text, @"\d+");
        Console.Write("価格: ");
        foreach (Match m in matches)
            Console.Write(m.Value + " ");
        Console.WriteLine();
    }
}`}
          expectedOutput={`user@example.com: 有効
invalid-email: 無効
test@co.jp: 有効
価格: 1500 2800 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Replace と Groups</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-400">Regex.Replace()</code> はパターンに一致した部分を置換します。
          グループ <code className="text-cyan-400">()</code> を使うと一致した部分を <code className="text-cyan-400">$1</code> などで参照できます。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        // 電話番号の正規化
        string phone = "090-1234-5678";
        string normalized = Regex.Replace(phone, @"-", "");
        Console.WriteLine($"正規化: {normalized}");

        // グループを使った置換（日付形式変換）
        string date = "2025/04/01";
        string converted = Regex.Replace(date,
            @"(\d{4})/(\d{2})/(\d{2})",
            "$1年$2月$3日");
        Console.WriteLine($"日付: {converted}");

        // 連続する空白を1つにまとめる
        string messy = "C#   は   素晴らしい   言語";
        string clean = Regex.Replace(messy, @"\s+", " ");
        Console.WriteLine(clean);
    }
}`}
          expectedOutput={`正規化: 09012345678
日付: 2025年04月01日
C# は 素晴らしい 言語`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="regex" />
      </div>
      <LessonNav lessons={lessons} currentId="regex" basePath="/learn/strings" />
    </div>
  );
}
