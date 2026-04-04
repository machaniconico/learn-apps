import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function IfElsePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">if-else文</h1>
        <p className="text-gray-400">基本的なif、if-else、ネストしたif文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">if</code> 文は最も基本的な条件分岐です。
          条件式が <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">true</code> のときだけ、
          ブロック内のコードを実行します。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else</code> を追加すると、
          条件が <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">false</code> のときの処理も書けます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          1文だけの場合は波括弧 <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{}"}</code> を省略できますが、
          可読性のためブレースを使うことが推奨されています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なif-else</h2>
        <p className="text-gray-400 mb-4">条件に応じて異なるメッセージを表示する例です。</p>
        <CSharpEditor
          defaultCode={`int temperature = 25;

// 基本的なif
if (temperature > 30)
{
    Console.WriteLine("暑いです！");
}

// if-else
if (temperature >= 20)
{
    Console.WriteLine("気持ちの良い天気です");
}
else
{
    Console.WriteLine("肌寒いです");
}

// ブレースなし（1文のみの場合）
bool isWeekend = true;
if (isWeekend)
    Console.WriteLine("今日は休日です");
else
    Console.WriteLine("今日は平日です");`}
          expectedOutput={`気持ちの良い天気です
今日は休日です`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたif文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          if文の中にさらにif文を書くことができます（ネスト）。ただし、深くネストするとコードが読みにくくなります。
          後述する <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else if</code> や早期リターンを使うとスッキリします。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたifの例</h2>
        <p className="text-gray-400 mb-4">複数の条件を組み合わせる例です。</p>
        <CSharpEditor
          defaultCode={`int age = 20;
bool hasID = true;

// ネストしたif
if (age >= 18)
{
    Console.WriteLine("年齢確認: OK");
    if (hasID)
    {
        Console.WriteLine("ID確認: OK");
        Console.WriteLine("入場できます！");
    }
    else
    {
        Console.WriteLine("IDが必要です");
    }
}
else
{
    Console.WriteLine("18歳未満は入場できません");
}

// 複合条件（&&）でシンプルに書ける場合
if (age >= 18 && hasID)
{
    Console.WriteLine("入場OK（複合条件版）");
}`}
          expectedOutput={`年齢確認: OK
ID確認: OK
入場できます！
入場OK（複合条件版）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="if-else" />
      </div>
      <LessonNav lessons={lessons} currentId="if-else" basePath="/learn/control" />
    </div>
  );
}
