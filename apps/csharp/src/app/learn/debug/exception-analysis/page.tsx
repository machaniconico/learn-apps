import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebugExceptionAnalysisPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">デバッグ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">例外解析</h1>
        <p className="text-gray-400">スタックトレースの読み方、InnerException、例外ウィンドウの活用を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スタックトレースの読み方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スタックトレースは例外が発生した時点のメソッド呼び出し履歴です。下から上に向かって読むと、プログラムの実行フローが分かります。最上行が例外発生箇所です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックトレースの解析</h2>
        <p className="text-gray-400 mb-4">例外情報とスタックトレースの取得方法を学びます。</p>
        <CSharpEditor
          defaultCode={`// スタックトレースの解析デモ
void MethodC()
{
    throw new InvalidOperationException("MethodCで問題発生");
}

void MethodB()
{
    MethodC();
}

void MethodA()
{
    MethodB();
}

try
{
    MethodA();
}
catch (Exception ex)
{
    Console.WriteLine("=== 例外情報 ===");
    Console.WriteLine($"種類   : {ex.GetType().Name}");
    Console.WriteLine($"メッセージ: {ex.Message}");
    Console.WriteLine();
    Console.WriteLine("=== スタックトレース ===");
    Console.WriteLine(ex.StackTrace);
}

// スタックトレースの読み方:
// at MethodC() in Program.cs:line 5  <- 例外発生箇所
// at MethodB() in Program.cs:line 10 <- 呼び出し元
// at MethodA() in Program.cs:line 15 <- さらに呼び出し元`}
          expectedOutput={`=== 例外情報 ===
種類   : InvalidOperationException
メッセージ: MethodCで問題発生

=== スタックトレース ===
   at MethodC() in Program.cs:line 5
   at MethodB() in Program.cs:line 10
   at MethodA() in Program.cs:line 15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">InnerException の解析</h2>
        <p className="text-gray-400 mb-4">例外を別の例外でラップする場合のInnerExceptionを確認します。</p>
        <CSharpEditor
          defaultCode={`// InnerException のデモ
void LoadDatabase()
{
    // 内部で発生した例外
    throw new InvalidOperationException("DB接続失敗");
}

void InitializeApp()
{
    try
    {
        LoadDatabase();
    }
    catch (Exception ex)
    {
        // 元の例外を InnerException としてラップ
        throw new ApplicationException("アプリ初期化失敗", ex);
    }
}

try
{
    InitializeApp();
}
catch (Exception ex)
{
    // 例外チェーンを展開して表示
    int depth = 0;
    Exception? current = ex;
    while (current != null)
    {
        string indent = new string(' ', depth * 2);
        Console.WriteLine($"{indent}[{current.GetType().Name}]");
        Console.WriteLine($"{indent}  Message: {current.Message}");
        current = current.InnerException;
        depth++;
    }
}`}
          expectedOutput={`[ApplicationException]
  Message: アプリ初期化失敗
  [InvalidOperationException]
    Message: DB接続失敗`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="exception-analysis" />
      </div>
      <LessonNav lessons={lessons} currentId="exception-analysis" basePath="/learn/debug" />
    </div>
  );
}
