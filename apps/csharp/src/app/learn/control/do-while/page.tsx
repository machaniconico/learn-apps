import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function DoWhilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">do-whileループ</h1>
        <p className="text-gray-400">最低1回は必ず実行されるdo-while構文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">do-while とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">do-while</code> ループは、
          <strong className="text-white">先にブロックを実行してから条件をチェック</strong>します。
          条件が最初から <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">false</code> であっても、
          <strong className="text-white">必ず1回は実行</strong>されます。
        </p>
        <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm">
          <span className="text-blue-400">do</span>
          <div className="text-gray-300">{"{"}</div>
          <div className="ml-4 text-gray-400">{"// 最低1回実行される処理"}</div>
          <div className="text-gray-300">{"}"}</div>
          <span className="text-blue-400">while</span>
          <span className="text-gray-300"> (条件);</span>
          <span className="text-gray-500 ml-2">{"// セミコロンが必要！"}</span>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">do-while の基本</h2>
        <p className="text-gray-400 mb-4">while と do-while の動作の違いを確認しましょう。</p>
        <CSharpEditor
          defaultCode={`// while: 最初から条件がfalseなら実行されない
int x = 10;
while (x < 5)
{
    Console.WriteLine($"while: {x}");
    x++;
}
Console.WriteLine("whileは0回実行");

// do-while: 最初から条件がfalseでも1回は実行
int y = 10;
do
{
    Console.WriteLine($"do-while: {y}");
    y++;
} while (y < 5);
Console.WriteLine("do-whileは1回実行");

// 通常の使い方（複数回実行）
int count = 0;
do
{
    Console.WriteLine($"カウント: {count}");
    count++;
} while (count < 3);`}
          expectedOutput={`whileは0回実行
do-while: 10
do-whileは1回実行
カウント: 0
カウント: 1
カウント: 2`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">do-while の典型的な使用場面</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          do-while は特に以下のような場面で活躍します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex gap-2">
            <span className="text-blue-400 mt-0.5">▶</span>
            <span>メニュー表示と入力待ち（最初に必ずメニューを表示する）</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 mt-0.5">▶</span>
            <span>入力バリデーション（有効な入力が来るまで繰り返す）</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 mt-0.5">▶</span>
            <span>ゲームループ（最初に必ず1回プレイする）</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メニュー処理の例</h2>
        <p className="text-gray-400 mb-4">do-whileを使ったシンプルなメニューループの例です。</p>
        <CSharpEditor
          defaultCode={`// シミュレーション: ユーザーが"3"を選択するまでループ
int[] userInputs = { 1, 2, 3 }; // シミュレートされた入力
int inputIndex = 0;
int choice;

do
{
    // メニュー表示（毎回必ず実行）
    Console.WriteLine("\n=== メニュー ===");
    Console.WriteLine("1. ゲーム開始");
    Console.WriteLine("2. オプション");
    Console.WriteLine("3. 終了");

    // 入力受け取り（シミュレート）
    choice = userInputs[inputIndex++];
    Console.WriteLine($"選択: {choice}");

    switch (choice)
    {
        case 1: Console.WriteLine("ゲームを開始します！"); break;
        case 2: Console.WriteLine("オプション画面を表示"); break;
        case 3: Console.WriteLine("終了します"); break;
    }
} while (choice != 3);`}
          expectedOutput={`
=== メニュー ===
1. ゲーム開始
2. オプション
3. 終了
選択: 1
ゲームを開始します！

=== メニュー ===
1. ゲーム開始
2. オプション
3. 終了
選択: 2
オプション画面を表示

=== メニュー ===
1. ゲーム開始
2. オプション
3. 終了
選択: 3
終了します`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="do-while" />
      </div>
      <LessonNav lessons={lessons} currentId="do-while" basePath="/learn/control" />
    </div>
  );
}
