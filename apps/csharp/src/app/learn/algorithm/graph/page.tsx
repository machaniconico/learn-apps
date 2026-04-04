import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmGraphPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">アルゴリズム レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">グラフ</h1>
        <p className="text-gray-400">隣接リスト、BFS、DFS、最短経路の基礎を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">グラフの表現方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          グラフは頂点（ノード）と辺（エッジ）の集合で表されます。C#での主な表現方法は<strong className="text-white">隣接リスト</strong>（Dictionary&lt;int, List&lt;int&gt;&gt;）と<strong className="text-white">隣接行列</strong>（int[,]）です。
          スパースグラフ（辺が少ない）には隣接リスト、密なグラフには隣接行列が適しています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">グラフのBFSとDFS</h2>
        <p className="text-gray-400 mb-4">隣接リストでグラフを表現して探索します。</p>
        <CSharpEditor
          defaultCode={`// グラフを隣接リストで表現
var graph = new Dictionary<int, List<int>>
{
    { 0, new List<int> { 1, 2 } },
    { 1, new List<int> { 0, 3, 4 } },
    { 2, new List<int> { 0, 5 } },
    { 3, new List<int> { 1 } },
    { 4, new List<int> { 1, 5 } },
    { 5, new List<int> { 2, 4 } },
};

// グラフ:
//   0 --- 1 --- 3
//   |     |
//   2     4
//   |     |
//   5 ----+

// BFS（幅優先探索）: キューを使う
List<int> BFS(int start)
{
    var visited = new HashSet<int>();
    var queue = new Queue<int>();
    var order = new List<int>();

    queue.Enqueue(start);
    visited.Add(start);

    while (queue.Count > 0)
    {
        int node = queue.Dequeue();
        order.Add(node);

        foreach (int neighbor in graph[node])
        {
            if (!visited.Contains(neighbor))
            {
                visited.Add(neighbor);
                queue.Enqueue(neighbor);
            }
        }
    }
    return order;
}

// DFS（深さ優先探索）: スタック（再帰）を使う
void DFS(int node, HashSet<int> visited, List<int> order)
{
    visited.Add(node);
    order.Add(node);

    foreach (int neighbor in graph[node])
    {
        if (!visited.Contains(neighbor))
            DFS(neighbor, visited, order);
    }
}

var bfsOrder = BFS(0);
Console.WriteLine($"BFS (頂点0から): {string.Join(" -> ", bfsOrder)}");

var dfsOrder = new List<int>();
DFS(0, new HashSet<int>(), dfsOrder);
Console.WriteLine($"DFS (頂点0から): {string.Join(" -> ", dfsOrder)}");`}
          expectedOutput={`BFS (頂点0から): 0 -> 1 -> 2 -> 3 -> 4 -> 5
DFS (頂点0から): 0 -> 1 -> 3 -> 4 -> 5 -> 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最短経路（ダイクストラ法）</h2>
        <p className="text-gray-400 mb-4">重み付きグラフの最短経路を求めます。</p>
        <CSharpEditor
          defaultCode={`// ダイクストラ法: 重み付きグラフの最短経路
int[] Dijkstra(int[][] edges, int nodeCount, int start)
{
    const int INF = int.MaxValue / 2;
    int[] dist = Enumerable.Repeat(INF, nodeCount).ToArray();
    dist[start] = 0;

    // 優先キュー（最小ヒープ）の簡易実装
    var pq = new SortedSet<(int d, int v)>();
    pq.Add((0, start));

    while (pq.Count > 0)
    {
        var (d, u) = pq.Min;
        pq.Remove(pq.Min);

        if (d > dist[u]) continue; // 古いエントリ

        foreach (int[] edge in edges)
        {
            if (edge[0] != u) continue;
            int v = edge[1], w = edge[2];
            if (dist[u] + w < dist[v])
            {
                pq.Remove((dist[v], v));
                dist[v] = dist[u] + w;
                pq.Add((dist[v], v));
            }
        }
    }
    return dist;
}

// 重み付きグラフ [from, to, weight]
int[][] edges =
{
    new[] {0, 1, 4}, new[] {0, 2, 1},
    new[] {2, 1, 2}, new[] {1, 3, 1},
    new[] {2, 3, 5}, new[] {3, 4, 3},
};

int[] distances = Dijkstra(edges, 5, 0);
Console.WriteLine("頂点0からの最短距離:");
for (int i = 0; i < distances.Length; i++)
    Console.WriteLine($"  頂点{i}: {distances[i]}");`}
          expectedOutput={`頂点0からの最短距離:
  頂点0: 0
  頂点1: 3
  頂点2: 1
  頂点3: 4
  頂点4: 7`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithm" lessonId="graph" />
      </div>
      <LessonNav lessons={lessons} currentId="graph" basePath="/learn/algorithm" />
    </div>
  );
}
