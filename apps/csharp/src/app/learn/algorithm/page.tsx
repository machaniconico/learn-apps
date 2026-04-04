import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">アルゴリズム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C#でアルゴリズムを実装して学びましょう。ソート・探索・スタック・キュー・再帰・動的計画法・グラフと、コーディング面接でも問われる重要なアルゴリズムを網羅します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="algorithm" totalLessons={6} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/algorithm" color="cyan" categoryId="algorithm" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">アルゴリズムとデータ構造</h2>
        <p className="text-gray-400 mb-4">
          アルゴリズムは問題を解くための手順です。適切なアルゴリズムとデータ構造を選ぶことで、プログラムの性能が大きく変わります。
        </p>
        <CSharpEditor
          defaultCode={`// アルゴリズムの計算量（Big-O記法）
Console.WriteLine("主なアルゴリズムの計算量");
Console.WriteLine();

var algorithms = new (string Name, string Time, string Space)[]
{
    ("線形探索",     "O(n)",        "O(1)"),
    ("二分探索",     "O(log n)",    "O(1)"),
    ("バブルソート", "O(n²)",       "O(1)"),
    ("マージソート", "O(n log n)",  "O(n)"),
    ("クイックソート","O(n log n)", "O(log n)"),
    ("BFS/DFS",     "O(V + E)",    "O(V)"),
};

Console.WriteLine($"{"アルゴリズム",-15} {"時間計算量",-15} {"空間計算量"}");
Console.WriteLine(new string('-', 45));
foreach (var (name, time, space) in algorithms)
{
    Console.WriteLine($"{name,-15} {time,-15} {space}");
}`}
          expectedOutput={`主なアルゴリズムの計算量

アルゴリズム    時間計算量      空間計算量
---------------------------------------------
線形探索        O(n)            O(1)
二分探索        O(log n)        O(1)
バブルソート    O(n²)           O(1)
マージソート    O(n log n)      O(n)
クイックソート  O(n log n)      O(log n)
BFS/DFS        O(V + E)        O(V)`}
        />
      </section>
    </div>
  );
}
