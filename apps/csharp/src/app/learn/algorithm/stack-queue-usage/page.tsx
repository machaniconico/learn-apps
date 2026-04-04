import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmStackQueueUsagePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">アルゴリズム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スタック・キュー活用</h1>
        <p className="text-gray-400">括弧マッチング（スタック）、BFSでのキュー活用を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スタックとキューの使いどころ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">スタック</strong>（LIFO: 後入れ先出し）は括弧マッチング・DFS・アンドゥ機能などに使います。
          <strong className="text-white">キュー</strong>（FIFO: 先入れ先出し）はBFS・タスクキュー・プリンタースプールなどに使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックで括弧マッチング</h2>
        <p className="text-gray-400 mb-4">コードエディタの括弧チェック機能の基本実装です。</p>
        <CSharpEditor
          defaultCode={`// スタックを使った括弧マッチング
bool IsValidBrackets(string s)
{
    var stack = new Stack<char>();
    var pairs = new Dictionary<char, char>
    {
        { ')', '(' },
        { ']', '[' },
        { '}', '{' },
    };

    foreach (char c in s)
    {
        if (c == '(' || c == '[' || c == '{')
        {
            stack.Push(c);  // 開き括弧をプッシュ
        }
        else if (pairs.ContainsKey(c))
        {
            // 対応する開き括弧がスタックトップにあるか
            if (stack.Count == 0 || stack.Peek() != pairs[c])
                return false;
            stack.Pop();
        }
    }
    return stack.Count == 0;  // スタックが空なら全てマッチ
}

// テストケース
string[] tests =
{
    "()",
    "()[]{} ",
    "([{}])",
    "(]",
    "([)]",
    "{[]}",
    "(((",
};

Console.WriteLine("括弧マッチング検証:");
foreach (var test in tests)
{
    bool valid = IsValidBrackets(test);
    Console.WriteLine($"  \"{test,-12}\" -> {(valid ? "有効" : "無効")}");
}`}
          expectedOutput={`括弧マッチング検証:
  "()"          -> 有効
  "()[]{} "     -> 有効
  "([{}])"      -> 有効
  "(]"          -> 無効
  "([)]"        -> 無効
  "{[]}"        -> 有効
  "((("         -> 無効`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">キューでBFS（幅優先探索）</h2>
        <p className="text-gray-400 mb-4">最短経路問題でよく使われるBFSの実装です。</p>
        <CSharpEditor
          defaultCode={`// キューを使ったBFS（幅優先探索）
// 迷路の最短経路を求める
int BfsShortestPath(int[,] maze, (int r, int c) start, (int r, int c) goal)
{
    int rows = maze.GetLength(0);
    int cols = maze.GetLength(1);
    var visited = new bool[rows, cols];
    var queue = new Queue<((int r, int c) pos, int dist)>();

    queue.Enqueue((start, 0));
    visited[start.r, start.c] = true;

    int[][] dirs = { new[]{0,1}, new[]{0,-1}, new[]{1,0}, new[]{-1,0} };

    while (queue.Count > 0)
    {
        var ((r, c), dist) = queue.Dequeue();
        if ((r, c) == goal) return dist;

        foreach (var d in dirs)
        {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && maze[nr, nc] == 0 && !visited[nr, nc])
            {
                visited[nr, nc] = true;
                queue.Enqueue(((nr, nc), dist + 1));
            }
        }
    }
    return -1; // 到達不可
}

// 迷路: 0=通路, 1=壁
int[,] maze =
{
    { 0, 0, 1, 0 },
    { 1, 0, 1, 0 },
    { 0, 0, 0, 0 },
    { 0, 1, 1, 0 },
};

int dist = BfsShortestPath(maze, (0, 0), (3, 3));
Console.WriteLine($"(0,0) から (3,3) の最短距離: {dist}ステップ");
Console.WriteLine();
Console.WriteLine("BFS の特徴:");
Console.WriteLine("- キューを使って層ごとに探索");
Console.WriteLine("- 最初に見つかったパスが必ず最短");
Console.WriteLine("- 時間計算量: O(V + E)");`}
          expectedOutput={`(0,0) から (3,3) の最短距離: 6ステップ

BFS の特徴:
- キューを使って層ごとに探索
- 最初に見つかったパスが必ず最短
- 時間計算量: O(V + E)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithm" lessonId="stack-queue-usage" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-queue-usage" basePath="/learn/algorithm" />
    </div>
  );
}
