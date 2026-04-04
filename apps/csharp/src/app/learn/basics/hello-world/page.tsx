import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function HelloWorldPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">最初のC#プログラム</h1>
        <p className="text-gray-400">Console.WriteLineとMainメソッドを使って、初めてのC#プログラムを作成しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Hello Worldとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プログラミング学習の最初の一歩は「Hello, World!」を表示するプログラムを書くことです。
          C#では <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Console.WriteLine()</code> メソッドを使ってコンソールに文字列を出力します。
        </p>
        <p className="text-gray-300 leading-relaxed">
          C#プログラムのエントリーポイントは <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Main</code> メソッドです。
          プログラムが起動すると、まずこのメソッドが実行されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスとMainメソッドを使った書き方</h2>
        <p className="text-gray-400 mb-4">C# の伝統的な書き方では、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">class</code> と <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">static void Main</code> が必要です。</p>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
        Console.WriteLine("C#へようこそ！");
    }
}`}
          expectedOutput={`Hello, World!
C#へようこそ！`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">トップレベルステートメント（C# 9.0以降）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C# 9.0から<strong className="text-white">トップレベルステートメント</strong>が使えるようになりました。
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">class Program</code> や
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">static void Main</code> を省略して、
          直接コードを書くことができます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          1つのプロジェクト内でトップレベルステートメントを使えるファイルは1つだけです。
          コンパイラが自動的に <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Main</code> メソッドを生成してくれます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">トップレベルステートメントの例</h2>
        <p className="text-gray-400 mb-4">シンプルで読みやすいコードが書けます。小規模なプログラムやスクリプトに最適です。</p>
        <CSharpEditor
          defaultCode={`// トップレベルステートメント（C# 9.0以降）
// using System; は省略可能（グローバルusingが有効な場合）
Console.WriteLine("Hello, World!");

// 変数も直接使える
string name = "プログラマー";
Console.WriteLine($"こんにちは、{name}さん！");

// メソッドも定義できる
void SayGoodbye(string who)
{
    Console.WriteLine($"さようなら、{who}さん！");
}

SayGoodbye(name);`}
          expectedOutput={`Hello, World!
こんにちは、プログラマーさん！
さようなら、プログラマーさん！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Console.Write と Console.WriteLine の違い</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Console.Write()</code> は改行なし、
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Console.WriteLine()</code> は出力後に改行します。
        </p>
        <CSharpEditor
          defaultCode={`Console.Write("A");
Console.Write("B");
Console.Write("C");
Console.WriteLine(); // 改行だけ
Console.WriteLine("次の行");
Console.WriteLine("Hello, " + "World!");`}
          expectedOutput={`ABC
次の行
Hello, World!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="hello-world" />
      </div>
      <LessonNav lessons={lessons} currentId="hello-world" basePath="/learn/basics" />
    </div>
  );
}
