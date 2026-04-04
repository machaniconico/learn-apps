import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ForLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">forループ</h1>
        <p className="text-gray-400">カウンタベースのループ、初期化・条件・インクリメントを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">for ループの構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">for</code> ループは
          <strong className="text-white">カウンタ</strong>を使って繰り返す回数が決まっている処理に最適です。
          3つのセクションで構成されます。
        </p>
        <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm">
          <span className="text-blue-400">for</span>
          <span className="text-gray-300"> (</span>
          <span className="text-yellow-400">初期化</span>
          <span className="text-gray-300">; </span>
          <span className="text-green-400">条件</span>
          <span className="text-gray-300">; </span>
          <span className="text-orange-400">後処理</span>
          <span className="text-gray-300">)</span>
          <div className="mt-1 text-gray-300">{"{"}</div>
          <div className="ml-4 text-gray-400">{"// 繰り返す処理"}</div>
          <div className="text-gray-300">{"}"}</div>
        </div>
        <p className="text-gray-400 text-sm mt-3">
          3つのセクションはすべて省略可能です（無限ループ：<code className="text-blue-400 bg-gray-800 px-1 rounded">for (;;)</code>）
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なforループ</h2>
        <p className="text-gray-400 mb-4">1から10まで数えたり、配列を処理したりする例です。</p>
        <CSharpEditor
          defaultCode={`// 1から5まで表示
for (int i = 1; i <= 5; i++)
{
    Console.Write($"{i} ");
}
Console.WriteLine();

// 逆順（デクリメント）
for (int i = 5; i >= 1; i--)
{
    Console.Write($"{i} ");
}
Console.WriteLine();

// 2ずつ増加
for (int i = 0; i <= 10; i += 2)
{
    Console.Write($"{i} ");
}
Console.WriteLine();

// 配列をインデックスでアクセス
string[] fruits = { "りんご", "バナナ", "みかん", "ぶどう" };
for (int i = 0; i < fruits.Length; i++)
{
    Console.WriteLine($"[{i}] {fruits[i]}");
}`}
          expectedOutput={`1 2 3 4 5
5 4 3 2 1
0 2 4 6 8 10
[0] りんご
[1] バナナ
[2] みかん
[3] ぶどう`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたforループ（九九の表）</h2>
        <p className="text-gray-400 mb-4">forループをネストすると2次元のデータを処理できます。</p>
        <CSharpEditor
          defaultCode={`// 九九の表（3x3）
Console.WriteLine("   1  2  3");
for (int i = 1; i <= 3; i++)
{
    Console.Write($"{i}:");
    for (int j = 1; j <= 3; j++)
    {
        Console.Write($" {i * j,2}");
    }
    Console.WriteLine();
}

// 合計の計算
int sum = 0;
for (int i = 1; i <= 10; i++)
{
    sum += i;
}
Console.WriteLine($"\n1〜10の合計: {sum}");`}
          expectedOutput={`   1  2  3
1:  1  2  3
2:  2  4  6
3:  3  6  9

1〜10の合計: 55`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="for-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="for-loop" basePath="/learn/control" />
    </div>
  );
}
