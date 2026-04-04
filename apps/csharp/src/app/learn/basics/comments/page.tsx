import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function CommentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コメント</h1>
        <p className="text-gray-400">単一行・複数行・XMLドキュメントコメントの書き方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コメントの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コメントはコンパイラに無視されるテキストで、コードの説明を書くために使います。
          C#には3種類のコメントがあります。
        </p>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-gray-900 rounded-lg">
            <code className="text-purple-400">{"// コメント"}</code>
            <span className="text-gray-300 ml-3">— 単一行コメント。行末まで有効。</span>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <code className="text-purple-400">{"/* コメント */"}</code>
            <span className="text-gray-300 ml-3">— 複数行コメント。開始と終了を明示。</span>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <code className="text-purple-400">{"/// XMLコメント"}</code>
            <span className="text-gray-300 ml-3">— XMLドキュメントコメント。IDEのヒントやAPIドキュメント生成に使用。</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">単一行・複数行コメント</h2>
        <p className="text-gray-400 mb-4">基本的なコメントの書き方を確認しましょう。</p>
        <CSharpEditor
          defaultCode={`// これは単一行コメントです
// コードの意図や注意事項を書きます
int maxAge = 150; // インライン（行末）コメントも可能

/* これは複数行コメントです
   長い説明を書くときに使います
   複数行にまたがることができます */
string message = "Hello";

/*
 * ブロックスタイルのコメント
 * アスタリスクで各行を揃えると読みやすい
 */
double pi = 3.14159;

Console.WriteLine(message);
Console.WriteLine($"円周率: {pi}");
Console.WriteLine($"最大年齢: {maxAge}");`}
          expectedOutput={`Hello
円周率: 3.14159
最大年齢: 150`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">XMLドキュメントコメント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">{"///"}</code> で始まるコメントはXMLドキュメントコメントです。
          メソッドやクラスの前に書くと、IDEのインテリセンス（補完機能）にドキュメントが表示されます。
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">dotnet doc</code> ツールでAPIドキュメントも生成できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">XMLコメントの書き方</h2>
        <p className="text-gray-400 mb-4">よく使うXMLタグを確認しましょう。</p>
        <CSharpEditor
          defaultCode={`/// <summary>
/// 2つの整数を加算して結果を返します。
/// </summary>
/// <param name="a">1つ目の整数</param>
/// <param name="b">2つ目の整数</param>
/// <returns>aとbの合計値</returns>
static int Add(int a, int b)
{
    return a + b;
}

/// <summary>
/// 指定されたメッセージをコンソールに表示します。
/// </summary>
/// <param name="message">表示するメッセージ</param>
/// <exception cref="ArgumentNullException">messageがnullの場合</exception>
static void Print(string message)
{
    Console.WriteLine(message);
}

// 使用例
int result = Add(3, 7);
Print($"3 + 7 = {result}");
Print("XMLコメントはIDEのヒントに表示されます");`}
          expectedOutput={`3 + 7 = 10
XMLコメントはIDEのヒントに表示されます`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="comments" />
      </div>
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}
