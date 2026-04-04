import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function SwitchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">switch文</h1>
        <p className="text-gray-400">case・break・defaultを使った従来のswitch構文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switch文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">switch</code> 文は、
          1つの変数や式の値によって複数の処理に分岐する構文です。
          多くの <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else if</code> チェーンよりも読みやすくなります。
        </p>
        <p className="text-gray-300 leading-relaxed">
          各 <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">case</code> の最後には必ず
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">break</code> が必要です（fall-throughはC#では基本的に不可）。
          どのcaseにも一致しない場合は <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">default</code> が実行されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なswitch文</h2>
        <p className="text-gray-400 mb-4">曜日に応じてメッセージを変える例です。</p>
        <CSharpEditor
          defaultCode={`int dayOfWeek = 3; // 1=月, 2=火, 3=水...

switch (dayOfWeek)
{
    case 1:
        Console.WriteLine("月曜日 - 週の始まり！");
        break;
    case 2:
        Console.WriteLine("火曜日");
        break;
    case 3:
        Console.WriteLine("水曜日 - 週の真ん中！");
        break;
    case 4:
        Console.WriteLine("木曜日");
        break;
    case 5:
        Console.WriteLine("金曜日 - もうすぐ週末！");
        break;
    case 6:
    case 7:
        // 複数のcaseを同じ処理に
        Console.WriteLine("週末！休日を楽しもう！");
        break;
    default:
        Console.WriteLine("無効な値です");
        break;
}`}
          expectedOutput={`水曜日 - 週の真ん中！`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">switchで使える型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          従来のswitch文では以下の型が使えます。
        </p>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          {["int, long, short, byte（整数型）", "char（文字型）", "string（文字列）", "bool（真偽値）", "enum（列挙型）"].map((t) => (
            <div key={t} className="flex items-center gap-2 p-2 bg-gray-900 rounded">
              <span className="text-blue-400">•</span>
              <span className="text-gray-300">{t}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列を使ったswitch</h2>
        <p className="text-gray-400 mb-4">文字列のswitchはコマンドの処理などでよく使います。</p>
        <CSharpEditor
          defaultCode={`string command = "help";

switch (command.ToLower())
{
    case "start":
        Console.WriteLine("プログラムを開始します");
        break;
    case "stop":
    case "quit":
    case "exit":
        Console.WriteLine("プログラムを終了します");
        break;
    case "help":
        Console.WriteLine("使い方: start, stop, quit, exit");
        break;
    default:
        Console.WriteLine($"不明なコマンド: {command}");
        break;
}

// 別のコマンドでテスト
string[] commands = { "START", "EXIT", "unknown" };
foreach (string cmd in commands)
{
    Console.Write($"{cmd} -> ");
    switch (cmd.ToLower())
    {
        case "start": Console.WriteLine("開始"); break;
        case "exit": Console.WriteLine("終了"); break;
        default: Console.WriteLine("不明"); break;
    }
}`}
          expectedOutput={`使い方: start, stop, quit, exit
START -> 開始
EXIT -> 終了
unknown -> 不明`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="switch" />
      </div>
      <LessonNav lessons={lessons} currentId="switch" basePath="/learn/control" />
    </div>
  );
}
