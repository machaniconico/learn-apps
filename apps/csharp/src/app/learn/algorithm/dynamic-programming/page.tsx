import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmDynamicProgrammingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">アルゴリズム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">動的計画法</h1>
        <p className="text-gray-400">メモ化、表（テーブル）方式、フィボナッチ、ナップサック問題を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">動的計画法とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          動的計画法（DP: Dynamic Programming）は問題を小さな部分問題に分割し、その結果を再利用することで効率的に解くアルゴリズム設計手法です。重複する計算を省くことで指数時間の問題を多項式時間で解けます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メモ化（トップダウンDP）</h2>
        <p className="text-gray-400 mb-4">再帰 + キャッシュでDPを実装します。</p>
        <CSharpEditor
          defaultCode={`// フィボナッチで学ぶメモ化
// 素朴な再帰: O(2^n) - 同じ計算を何度も繰り返す
int callCount = 0;

int FibNaive(int n)
{
    callCount++;
    if (n <= 1) return n;
    return FibNaive(n - 1) + FibNaive(n - 2);
}

// メモ化（トップダウンDP）: O(n) - 結果をキャッシュ
var memo = new Dictionary<int, long>();

long FibMemo(int n)
{
    if (n <= 1) return n;
    if (memo.ContainsKey(n)) return memo[n]; // キャッシュヒット
    memo[n] = FibMemo(n - 1) + FibMemo(n - 2);
    return memo[n];
}

// テーブル方式（ボトムアップDP）: O(n)
long FibTable(int n)
{
    if (n <= 1) return n;
    long[] dp = new long[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// 比較
callCount = 0;
FibNaive(20);
Console.WriteLine($"素朴な再帰 Fib(20): {callCount} 回の呼び出し");

memo.Clear();
Console.WriteLine($"メモ化     Fib(20): {FibMemo(20)} ({memo.Count} キャッシュエントリ)");
Console.WriteLine($"テーブル   Fib(50): {FibTable(50)}");`}
          expectedOutput={`素朴な再帰 Fib(20): 21891 回の呼び出し
メモ化     Fib(20): 6765 (19 キャッシュエントリ)
テーブル   Fib(50): 12586269025`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">0/1ナップサック問題</h2>
        <p className="text-gray-400 mb-4">DPの古典的な問題です。重さの制限内で価値を最大化します。</p>
        <CSharpEditor
          defaultCode={`// 0/1ナップサック問題
// n個のアイテムから重量W以下で価値を最大化する

int Knapsack(int[] weights, int[] values, int capacity)
{
    int n = weights.Length;
    // dp[i][w] = i番目までのアイテムで容量wの時の最大価値
    int[,] dp = new int[n + 1, capacity + 1];

    for (int i = 1; i <= n; i++)
    {
        for (int w = 0; w <= capacity; w++)
        {
            // アイテムiを入れない場合
            dp[i, w] = dp[i - 1, w];

            // アイテムiを入れる場合（容量が足りる場合）
            if (weights[i-1] <= w)
            {
                int withItem = dp[i - 1, w - weights[i-1]] + values[i-1];
                dp[i, w] = Math.Max(dp[i, w], withItem);
            }
        }
    }
    return dp[n, capacity];
}

// アイテム定義
string[] names   = { "ノートPC", "カメラ", "本", "食料", "水" };
int[]    weights = {     3,      2,    1,    2,    3 };
int[]    values  = {   300,    200,   80,   90,  100 };
int      capacity = 5;  // ナップサックの容量

int maxValue = Knapsack(weights, values, capacity);

Console.WriteLine("ナップサック問題:");
Console.WriteLine($"容量: {capacity}kg");
Console.WriteLine();
Console.WriteLine("アイテム一覧:");
for (int i = 0; i < names.Length; i++)
    Console.WriteLine($"  {names[i],-8}: 重さ{weights[i]}kg 価値{values[i]}");
Console.WriteLine();
Console.WriteLine($"最大価値: {maxValue}");`}
          expectedOutput={`ナップサック問題:
容量: 5kg

アイテム一覧:
  ノートPC  : 重さ3kg 価値300
  カメラ    : 重さ2kg 価値200
  本        : 重さ1kg 価値80
  食料      : 重さ2kg 価値90
  水        : 重さ3kg 価値100

最大価値: 500`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithm" lessonId="dynamic-programming" />
      </div>
      <LessonNav lessons={lessons} currentId="dynamic-programming" basePath="/learn/algorithm" />
    </div>
  );
}
