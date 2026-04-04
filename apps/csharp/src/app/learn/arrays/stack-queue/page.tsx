import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraysStackQueuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Stack・Queue</h1>
        <p className="text-gray-400">Stack{"<T>"} の Push/Pop（LIFO）と Queue{"<T>"} の Enqueue/Dequeue（FIFO）を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スタックとキューの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スタックとキューは要素の取り出し方が異なる2つの基本的なデータ構造です。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs font-bold">LIFO</span>
              <span className="text-white font-semibold">Stack{"<T>"}</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              後入れ先出し（Last In First Out）。最後に追加した要素を最初に取り出します。
              本の積み上げ、ブラウザの戻るボタンなどに使われます。
            </p>
            <div className="space-y-1 text-xs font-mono">
              <p><span className="text-orange-400">Push(x)</span> <span className="text-gray-400">— 追加</span></p>
              <p><span className="text-orange-400">Pop()</span> <span className="text-gray-400">— 取り出し（削除）</span></p>
              <p><span className="text-orange-400">Peek()</span> <span className="text-gray-400">— 先頭確認（削除しない）</span></p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-bold">FIFO</span>
              <span className="text-white font-semibold">Queue{"<T>"}</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              先入れ先出し（First In First Out）。最初に追加した要素を最初に取り出します。
              印刷キュー、タスク処理などに使われます。
            </p>
            <div className="space-y-1 text-xs font-mono">
              <p><span className="text-blue-400">Enqueue(x)</span> <span className="text-gray-400">— 追加</span></p>
              <p><span className="text-blue-400">Dequeue()</span> <span className="text-gray-400">— 取り出し（削除）</span></p>
              <p><span className="text-blue-400">Peek()</span> <span className="text-gray-400">— 先頭確認（削除しない）</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Stack{"<T>"} の使用例</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    // スタックを使って文字列を逆順にする
    static string Reverse(string s)
    {
        var stack = new Stack<char>();
        foreach (char c in s) stack.Push(c);

        string result = "";
        while (stack.Count > 0)
            result += stack.Pop();
        return result;
    }

    static void Main()
    {
        var stack = new Stack<int>();

        stack.Push(1);
        stack.Push(2);
        stack.Push(3);

        Console.WriteLine($"Count: {stack.Count}");
        Console.WriteLine($"Peek (確認のみ): {stack.Peek()}");
        Console.WriteLine($"Pop: {stack.Pop()}");
        Console.WriteLine($"Pop: {stack.Pop()}");
        Console.WriteLine($"Count 後: {stack.Count}");

        Console.WriteLine($"\"C#入門\" を逆順: {Reverse("C#入門")}");
    }
}`}
          expectedOutput={`Count: 3
Peek (確認のみ): 3
Pop: 3
Pop: 2
Count 後: 1
"C#入門" を逆順: 門入#C`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Queue{"<T>"} の使用例</h2>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // プリントキューのシミュレーション
        var printQueue = new Queue<string>();

        printQueue.Enqueue("ドキュメント1.pdf");
        printQueue.Enqueue("レポート.docx");
        printQueue.Enqueue("画像.png");

        Console.WriteLine($"印刷待ち: {printQueue.Count} 件");
        Console.WriteLine($"次の印刷: {printQueue.Peek()}");

        // 順番に印刷処理
        while (printQueue.Count > 0)
        {
            string doc = printQueue.Dequeue();
            Console.WriteLine($"印刷中: {doc}");
        }

        Console.WriteLine($"印刷待ち: {printQueue.Count} 件");

        // TryPeek / TryDequeue（安全な取り出し）
        if (!printQueue.TryDequeue(out string? result))
            Console.WriteLine("キューは空です");
    }
}`}
          expectedOutput={`印刷待ち: 3 件
次の印刷: ドキュメント1.pdf
印刷中: ドキュメント1.pdf
印刷中: レポート.docx
印刷中: 画像.png
印刷待ち: 0 件
キューは空です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="stack-queue" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-queue" basePath="/learn/arrays" />
    </div>
  );
}
