import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function PatternsTuplePatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">パターンマッチング レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">タプルパターン</h1>
        <p className="text-gray-400">(a, b)パターン、位置デコンストラクションによる複数値のマッチングを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">タプルパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          タプルパターンは複数の値を組み合わせてパターンマッチングを行います。switch式と組み合わせることで、複数の変数の組み合わせによる分岐を簡潔に書けます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">タプルパターンの基本</h2>
        <p className="text-gray-400 mb-4">2つの変数の組み合わせで処理を分岐します。</p>
        <CSharpEditor
          defaultCode={`// タプルパターン: 複数変数の組み合わせ
// じゃんけんの勝敗判定
string RockPaperScissors(string player1, string player2)
    => (player1, player2) switch
    {
        ("グー",  "チョキ") => "プレイヤー1の勝ち",
        ("チョキ","パー"  ) => "プレイヤー1の勝ち",
        ("パー",  "グー"  ) => "プレイヤー1の勝ち",
        (var p1, var p2) when p1 == p2 => "引き分け",
        _                               => "プレイヤー2の勝ち"
    };

var games = new (string P1, string P2)[]
{
    ("グー",   "チョキ"),
    ("パー",   "グー"),
    ("チョキ", "チョキ"),
    ("グー",   "パー"),
};

Console.WriteLine("じゃんけん結果:");
foreach (var (p1, p2) in games)
{
    string result = RockPaperScissors(p1, p2);
    Console.WriteLine($"  {p1,-4} vs {p2,-4} -> {result}");
}`}
          expectedOutput={`じゃんけん結果:
  グー  vs チョキ -> プレイヤー1の勝ち
  パー  vs グー  -> プレイヤー1の勝ち
  チョキ vs チョキ -> 引き分け
  グー  vs パー  -> プレイヤー2の勝ち`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">位置パターン（Positional Pattern）</h2>
        <p className="text-gray-400 mb-4">Deconstructメソッドを実装したクラスで使えます。</p>
        <CSharpEditor
          defaultCode={`// 位置パターン: Deconstructを実装したクラス
public class Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y) => (X, Y) = (x, y);

    // Deconstructメソッドが必要
    public void Deconstruct(out int x, out int y)
        => (x, y) = (X, Y);

    public override string ToString() => $"({X}, {Y})";
}

string ClassifyPoint(Point p) => p switch
{
    (0, 0)               => "原点",
    (0, _)               => "Y軸上",
    (_, 0)               => "X軸上",
    (var x, var y) when x > 0 && y > 0 => "第1象限",
    (var x, var y) when x < 0 && y > 0 => "第2象限",
    (var x, var y) when x < 0 && y < 0 => "第3象限",
    _                    => "第4象限"
};

var points = new[]
{
    new Point(0, 0),
    new Point(3, 5),
    new Point(-2, 4),
    new Point(0, -3),
    new Point(4, -2),
};

Console.WriteLine("点の分類:");
foreach (var point in points)
{
    Console.WriteLine($"  {point} -> {ClassifyPoint(point)}");
}`}
          expectedOutput={`点の分類:
  (0, 0) -> 原点
  (3, 5) -> 第1象限
  (-2, 4) -> 第2象限
  (0, -3) -> Y軸上
  (4, -2) -> 第4象限`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="tuple-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="tuple-patterns" basePath="/learn/patterns" />
    </div>
  );
}
