import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function ExceptionsExceptionDesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">例外処理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">例外設計</h1>
        <p className="text-gray-400">いつ例外をthrowするか、例外の階層構造、設計ガイドラインを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">例外を使うべき場面</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          例外は<strong className="text-white">例外的な状況</strong>にのみ使います。通常のフロー制御に例外を使うのはアンチパターンです。例外の生成は比較的コストが高く（スタックトレース収集など）、パフォーマンスに影響します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外設計のガイドライン</h2>
        <p className="text-gray-400 mb-4">例外を適切に使うためのルールを学びます。</p>
        <CSharpEditor
          defaultCode={`// 例外設計のガイドライン

// NG: 通常フローに例外を使う（アンチパターン）
bool TryParseNg(string s, out int result)
{
    try
    {
        result = int.Parse(s);
        return true;
    }
    catch
    {
        result = 0;
        return false;
    }
}

// OK: 組み込みのTryParseを使う
bool TryParseOk(string s, out int result)
{
    return int.TryParse(s, out result);
}

string input = "abc";

// NG版
TryParseNg(input, out int r1);
Console.WriteLine($"NG版（例外ベース）: 入力={input}");

// OK版
bool ok = TryParseOk(input, out int r2);
Console.WriteLine($"OK版（TryParse）: 入力={input}, 成功={ok}");

Console.WriteLine();
Console.WriteLine("例外を使うべき場面:");
Console.WriteLine("✓ プログラマのミス（ArgumentNullException等）");
Console.WriteLine("✓ 回復不能な状態（メモリ不足等）");
Console.WriteLine("✓ 前提条件の違反（不正なDB状態等）");
Console.WriteLine();
Console.WriteLine("例外を使うべきでない場面:");
Console.WriteLine("✗ 予測可能な入力バリデーション");
Console.WriteLine("✗ ファイルが存在しない（File.Existsで確認）");
Console.WriteLine("✗ 通常の制御フロー");`}
          expectedOutput={`NG版（例外ベース）: 入力=abc
OK版（TryParse）: 入力=abc, 成功=False

例外を使うべき場面:
✓ プログラマのミス（ArgumentNullException等）
✓ 回復不能な状態（メモリ不足等）
✓ 前提条件の違反（不正なDB状態等）

例外を使うべきでない場面:
✗ 予測可能な入力バリデーション
✗ ファイルが存在しない（File.Existsで確認）
✗ 通常の制御フロー`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外の再スロー</h2>
        <p className="text-gray-400 mb-4">throwとthrow exの違いを理解します。</p>
        <CSharpEditor
          defaultCode={`// throw vs throw ex の違い
void Method()
{
    throw new InvalidOperationException("元の例外");
}

// 正しい再スロー（スタックトレースを保持）
Console.WriteLine("=== throw（スタックトレース保持）===");
try
{
    try { Method(); }
    catch (Exception ex)
    {
        Console.WriteLine($"ログ記録: {ex.Message}");
        throw;  // スタックトレースを保持して再スロー
    }
}
catch (Exception ex)
{
    Console.WriteLine($"外側: {ex.Message}");
}

Console.WriteLine();
Console.WriteLine("=== ExceptionDispatchInfo（非同期対応）===");
Console.WriteLine("// 非同期コードでのスタックトレース保持");
Console.WriteLine("ExceptionDispatchInfo.Capture(ex).Throw();");
Console.WriteLine();
Console.WriteLine("規則: catchした例外を再スローする時は");
Console.WriteLine("'throw ex' ではなく 'throw' を使う");
Console.WriteLine("-> throw ex はスタックトレースがリセットされる");`}
          expectedOutput={`=== throw（スタックトレース保持）===
ログ記録: 元の例外
外側: 元の例外

=== ExceptionDispatchInfo（非同期対応）===
// 非同期コードでのスタックトレース保持
ExceptionDispatchInfo.Capture(ex).Throw();

規則: catchした例外を再スローする時は
'throw ex' ではなく 'throw' を使う
-> throw ex はスタックトレースがリセットされる`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="exception-design" />
      </div>
      <LessonNav lessons={lessons} currentId="exception-design" basePath="/learn/exceptions" />
    </div>
  );
}
