import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function WhileLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">whileループ</h1>
        <p className="text-gray-400">条件が真の間繰り返すwhileループの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">while ループとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">while</code> ループは、
          条件が <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">true</code> の間、
          ブロック内の処理を繰り返します。
          <strong className="text-white">繰り返す回数があらかじめわからない</strong>場合に適しています。
        </p>
        <p className="text-gray-300 leading-relaxed">
          条件チェックはループの先頭で行われるため、最初から条件が
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">false</code> の場合は一度も実行されません。
          無限ループを防ぐため、ループ内で条件を変化させることが重要です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なwhileループ</h2>
        <p className="text-gray-400 mb-4">条件を更新しながら繰り返す例です。</p>
        <CSharpEditor
          defaultCode={`// 基本的なwhileループ
int count = 0;
while (count < 5)
{
    Console.WriteLine($"カウント: {count}");
    count++; // これがないと無限ループ！
}

// 2の累乗を100未満まで表示
int power = 1;
while (power < 100)
{
    Console.Write($"{power} ");
    power *= 2;
}
Console.WriteLine();

// 最初から条件がfalseの場合
int n = 10;
while (n < 5)
{
    Console.WriteLine("これは表示されません");
}
Console.WriteLine("whileブロックはスキップされました");`}
          expectedOutput={`カウント: 0
カウント: 1
カウント: 2
カウント: 3
カウント: 4
1 2 4 8 16 32 64
whileブロックはスキップされました`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">while vs for の使い分け</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-gray-900 rounded-lg">
            <p className="text-blue-400 font-semibold mb-2">for を使う場面</p>
            <ul className="text-gray-300 space-y-1">
              <li>繰り返し回数が決まっている</li>
              <li>インデックスが必要な配列操作</li>
              <li>カウンタが単純にインクリメント</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <p className="text-blue-400 font-semibold mb-2">while を使う場面</p>
            <ul className="text-gray-300 space-y-1">
              <li>繰り返し回数が事前にわからない</li>
              <li>ユーザー入力を待つループ</li>
              <li>条件が複雑で外部から変化する</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的なwhileの例</h2>
        <p className="text-gray-400 mb-4">コレッツ予想（3n+1問題）をwhileで実装します。</p>
        <CSharpEditor
          defaultCode={`// コレッツ予想：任意の正整数から始めて、
// 偶数なら2で割り、奇数なら3倍+1を繰り返すと最終的に1になる
int n = 27;
int steps = 0;

Console.Write($"{n}");
while (n != 1)
{
    if (n % 2 == 0)
        n /= 2;
    else
        n = 3 * n + 1;

    Console.Write($" -> {n}");
    steps++;

    if (steps == 10)
    {
        Console.Write(" ...(省略)");
        break;
    }
}
Console.WriteLine($"\n{steps}ステップ以上かかりました");`}
          expectedOutput={`27 -> 82 -> 41 -> 124 -> 62 -> 31 -> 94 -> 47 -> 142 -> 71 -> 214 ...(省略)
10ステップ以上かかりました`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="while-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="while-loop" basePath="/learn/control" />
    </div>
  );
}
