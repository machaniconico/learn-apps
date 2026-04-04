import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function GraphPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">アルゴリズム レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">グラフ</h1>
        <p className="text-gray-400">隣接リスト、BFS、DFS</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">グラフとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          グラフはノード（頂点）とエッジ（辺）の集合です。
          ソーシャルネットワーク、地図のルート検索、依存関係の管理など、
          多くの実世界の問題をモデル化できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>隣接リスト - メモリ効率が良い（疎なグラフに最適）</li>
          <li>隣接行列 - アクセスが高速（密なグラフに最適）</li>
          <li>BFS（幅優先探索） - キューを使用、最短経路に最適</li>
          <li>DFS（深さ優先探索） - スタック/再帰を使用、全探索に最適</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">隣接リストでグラフを表現</h2>
        <p className="text-gray-400 mb-4">
          Javaでは <code className="text-orange-300">Map&lt;String, List&lt;String&gt;&gt;</code> で
          隣接リストを表現するのが一般的です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    public static void main(String[] args) {
        // 隣接リストでグラフを構築
        Map<String, List<String>> graph = new HashMap<>();
        graph.put("東京", List.of("横浜", "千葉", "埼玉"));
        graph.put("横浜", List.of("東京", "千葉"));
        graph.put("千葉", List.of("東京", "横浜"));
        graph.put("埼玉", List.of("東京", "群馬"));
        graph.put("群馬", List.of("埼玉"));

        System.out.println("=== グラフの隣接リスト表現 ===");
        for (var entry : graph.entrySet()) {
            System.out.println(entry.getKey() + " → " + entry.getValue());
        }
        System.out.println();

        // ノードの情報
        System.out.println("ノード数: " + graph.size());
        int edges = graph.values().stream().mapToInt(List::size).sum() / 2;
        System.out.println("エッジ数: " + edges + "（無向グラフ）");
    }
}`}
          expectedOutput={`=== グラフの隣接リスト表現 ===
東京 → [横浜, 千葉, 埼玉]
横浜 → [東京, 千葉]
千葉 → [東京, 横浜]
埼玉 → [東京, 群馬]
群馬 → [埼玉]

ノード数: 5
エッジ数: 5（無向グラフ）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BFS（幅優先探索）</h2>
        <p className="text-gray-400 mb-4">
          BFSはスタート地点から近い順にノードを探索します。
          最短経路（エッジ数最小の経路）を見つけるのに最適です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    static List<String> bfsShortestPath(
            Map<String, List<String>> graph,
            String start, String goal) {
        Queue<List<String>> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();

        queue.offer(List.of(start));
        visited.add(start);

        while (!queue.isEmpty()) {
            List<String> path = queue.poll();
            String current = path.get(path.size() - 1);

            if (current.equals(goal)) {
                return path;
            }

            for (String neighbor : graph.getOrDefault(current, List.of())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    List<String> newPath = new ArrayList<>(path);
                    newPath.add(neighbor);
                    queue.offer(newPath);
                }
            }
        }
        return List.of();  // 経路なし
    }

    public static void main(String[] args) {
        Map<String, List<String>> graph = new HashMap<>();
        graph.put("A", List.of("B", "C"));
        graph.put("B", List.of("A", "D", "E"));
        graph.put("C", List.of("A", "F"));
        graph.put("D", List.of("B"));
        graph.put("E", List.of("B", "F"));
        graph.put("F", List.of("C", "E", "G"));
        graph.put("G", List.of("F"));

        System.out.println("=== BFS最短経路 ===");
        List<String> path = bfsShortestPath(graph, "A", "G");
        System.out.println("A → G: " + String.join(" → ", path));
        System.out.println("距離: " + (path.size() - 1) + "ステップ");
    }
}`}
          expectedOutput={`=== BFS最短経路 ===
A → G: A → C → F → G
距離: 3ステップ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DFS（深さ優先探索）</h2>
        <p className="text-gray-400 mb-4">
          DFSは一方向に深く進み、行き止まりになったらバックトラックする探索方法です。
          全経路の探索やサイクル検出に使われます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    static void dfs(Map<String, List<String>> graph,
                    String node, Set<String> visited) {
        visited.add(node);
        System.out.print(node + " ");

        for (String neighbor : graph.getOrDefault(node, List.of())) {
            if (!visited.contains(neighbor)) {
                dfs(graph, neighbor, visited);
            }
        }
    }

    // サイクル検出（有向グラフ）
    static boolean hasCycle(Map<String, List<String>> graph) {
        Set<String> visited = new HashSet<>();
        Set<String> inStack = new HashSet<>();

        for (String node : graph.keySet()) {
            if (dfsCycle(graph, node, visited, inStack)) {
                return true;
            }
        }
        return false;
    }

    static boolean dfsCycle(Map<String, List<String>> graph,
            String node, Set<String> visited, Set<String> inStack) {
        if (inStack.contains(node)) return true;
        if (visited.contains(node)) return false;

        visited.add(node);
        inStack.add(node);
        for (String neighbor : graph.getOrDefault(node, List.of())) {
            if (dfsCycle(graph, neighbor, visited, inStack)) return true;
        }
        inStack.remove(node);
        return false;
    }

    public static void main(String[] args) {
        Map<String, List<String>> graph = new LinkedHashMap<>();
        graph.put("1", List.of("2", "3"));
        graph.put("2", List.of("4"));
        graph.put("3", List.of("5"));
        graph.put("4", List.of("5", "6"));
        graph.put("5", List.of());
        graph.put("6", List.of());

        System.out.print("DFS走査順: ");
        dfs(graph, "1", new HashSet<>());
        System.out.println();
        System.out.println("サイクル: " + (hasCycle(graph) ? "あり" : "なし"));
        System.out.println();

        // サイクルのあるグラフ
        Map<String, List<String>> cyclic = new HashMap<>();
        cyclic.put("A", List.of("B"));
        cyclic.put("B", List.of("C"));
        cyclic.put("C", List.of("A"));

        System.out.println("A→B→C→A のサイクル: " +
            (hasCycle(cyclic) ? "あり" : "なし"));
    }
}`}
          expectedOutput={`DFS走査順: 1 2 4 5 6 3
サイクル: なし

A→B→C→A のサイクル: あり`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="graph" />
      </div>
      <LessonNav lessons={lessons} currentId="graph" basePath="/learn/algo" />
    </div>
  );
}
