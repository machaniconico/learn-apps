import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function GraphPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">グラフ</h1>
        <p className="text-gray-400">隣接リスト表現・BFS・DFSによるグラフアルゴリズムを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">グラフとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">グラフ（Graph）</code>はノード（頂点）とエッジ（辺）で構成されるデータ構造です。
          SNSの友人関係、地図の経路、依存関係など幅広い問題をグラフで表現できます。
          Swiftでは<code className="text-indigo-300">隣接リスト（Dictionary）</code>が最もよく使われる表現方法です。
          探索には<code className="text-indigo-300">BFS（幅優先探索）</code>と<code className="text-indigo-300">DFS（深さ優先探索）</code>があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">隣接リスト</code> — Dictionary&lt;Node, [Node]&gt; で表現、疎グラフに適切</li>
          <li><code className="text-blue-300">BFS（幅優先探索）</code> — キューを使用、最短経路の発見に適切</li>
          <li><code className="text-blue-300">DFS（深さ優先探索）</code> — スタックまたは再帰、経路探索・トポロジカルソートに適切</li>
          <li><code className="text-blue-300">有向グラフ vs 無向グラフ</code> — エッジの方向性の有無</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: 隣接リストによるグラフ実装とBFS</h2>
        <SwiftEditor
          defaultCode={`// グラフの隣接リスト実装

class Graph {
    private var adjacencyList: [Int: [Int]] = [:]

    func addVertex(_ vertex: Int) {
        if adjacencyList[vertex] == nil {
            adjacencyList[vertex] = []
        }
    }

    func addEdge(from: Int, to: Int, bidirectional: Bool = true) {
        adjacencyList[from, default: []].append(to)
        if bidirectional {
            adjacencyList[to, default: []].append(from)
        }
    }

    func neighbors(of vertex: Int) -> [Int] {
        return adjacencyList[vertex] ?? []
    }

    // BFS: 幅優先探索
    func bfs(from start: Int) -> [Int] {
        var visited: Set<Int> = []
        var queue: [Int] = [start]
        var result: [Int] = []

        visited.insert(start)

        while !queue.isEmpty {
            let vertex = queue.removeFirst()
            result.append(vertex)

            for neighbor in neighbors(of: vertex).sorted() {
                if !visited.contains(neighbor) {
                    visited.insert(neighbor)
                    queue.append(neighbor)
                }
            }
        }
        return result
    }

    // 最短経路（BFS）
    func shortestPath(from start: Int, to end: Int) -> [Int]? {
        var visited: Set<Int> = [start]
        var queue: [[Int]] = [[start]]  // 経路を保持

        while !queue.isEmpty {
            let path = queue.removeFirst()
            let vertex = path.last!

            if vertex == end { return path }

            for neighbor in neighbors(of: vertex).sorted() {
                if !visited.contains(neighbor) {
                    visited.insert(neighbor)
                    queue.append(path + [neighbor])
                }
            }
        }
        return nil
    }
}

// グラフを構築:
// 0 - 1 - 3
// |   |   |
// 2 - 4 - 5
let g = Graph()
[(0,1),(0,2),(1,3),(1,4),(2,4),(3,5),(4,5)].forEach {
    g.addEdge(from: $0.0, to: $0.1)
}

print("BFS (0から):", g.bfs(from: 0))
print("最短経路 0→5:", g.shortestPath(from: 0, to: 5) ?? [])`}
          expectedOutput={`BFS (0から): [0, 1, 2, 3, 4, 5]
最短経路 0→5: [0, 1, 3, 5]`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">DFS（深さ優先探索）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">DFS（Depth-First Search）</code>はスタックまたは再帰を使って一方向に深く探索します。
          迷路の解探索、閉路検出、トポロジカルソートなどに利用されます。
          再帰版は直感的ですが、グラフが深い場合はスタックオーバーフローの可能性があるため、
          反復版（スタックを使う）が安全です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: DFSと閉路検出</h2>
        <SwiftEditor
          defaultCode={`class DirectedGraph {
    private var adjacencyList: [String: [String]] = [:]

    func addEdge(from: String, to: String) {
        adjacencyList[from, default: []].append(to)
        if adjacencyList[to] == nil {
            adjacencyList[to] = []
        }
    }

    // DFS（再帰版）
    func dfs(from start: String) -> [String] {
        var visited: Set<String> = []
        var result: [String] = []

        func explore(_ vertex: String) {
            visited.insert(vertex)
            result.append(vertex)
            for neighbor in (adjacencyList[vertex] ?? []).sorted() {
                if !visited.contains(neighbor) {
                    explore(neighbor)
                }
            }
        }

        explore(start)
        return result
    }

    // DFS（反復版: スタックを使用）
    func dfsIterative(from start: String) -> [String] {
        var visited: Set<String> = []
        var stack: [String] = [start]
        var result: [String] = []

        while !stack.isEmpty {
            let vertex = stack.removeLast()
            if visited.contains(vertex) { continue }
            visited.insert(vertex)
            result.append(vertex)
            for neighbor in (adjacencyList[vertex] ?? []).sorted().reversed() {
                if !visited.contains(neighbor) {
                    stack.append(neighbor)
                }
            }
        }
        return result
    }

    // 閉路検出（有向グラフ）
    func hasCycle() -> Bool {
        var visited: Set<String> = []
        var inStack: Set<String> = []

        func dfsCheck(_ vertex: String) -> Bool {
            visited.insert(vertex)
            inStack.insert(vertex)
            for neighbor in adjacencyList[vertex] ?? [] {
                if !visited.contains(neighbor) {
                    if dfsCheck(neighbor) { return true }
                } else if inStack.contains(neighbor) {
                    return true  // 閉路発見
                }
            }
            inStack.remove(vertex)
            return false
        }

        for vertex in adjacencyList.keys {
            if !visited.contains(vertex) {
                if dfsCheck(vertex) { return true }
            }
        }
        return false
    }
}

// 有向グラフ: A→B→D→E, A→C→D
let dag = DirectedGraph()
[("A","B"),("A","C"),("B","D"),("C","D"),("D","E")].forEach {
    dag.addEdge(from: $0.0, to: $0.1)
}

print("DFS (A から):", dag.dfs(from: "A"))
print("DFS 反復版:", dag.dfsIterative(from: "A"))
print("閉路あり?:", dag.hasCycle())

// 閉路あり: A→B→C→A
let cyclic = DirectedGraph()
[("A","B"),("B","C"),("C","A")].forEach {
    cyclic.addEdge(from: $0.0, to: $0.1)
}
print("閉路あり（サイクル）?:", cyclic.hasCycle())`}
          expectedOutput={`DFS (A から): [A, B, D, E, C]
DFS 反復版: [A, B, D, E, C]
閉路あり?: false
閉路あり（サイクル）?: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: 重み付きグラフとダイクストラ法</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// 重み付きグラフとダイクストラ法
struct WeightedGraph {
    var edges: [Int: [(to: Int, weight: Int)]] = [:]

    mutating func addEdge(from: Int, to: Int, weight: Int, bidirectional: Bool = true) {
        edges[from, default: []].append((to: to, weight: weight))
        if bidirectional {
            edges[to, default: []].append((to: from, weight: weight))
        }
    }

    // ダイクストラ法: 最短コスト経路
    func dijkstra(from start: Int) -> [Int: Int] {
        var distances: [Int: Int] = [start: 0]
        var unvisited: Set<Int> = Set(edges.keys)
        unvisited.insert(start)

        while !unvisited.isEmpty {
            // 未訪問ノードの中で最小距離のノードを選択
            guard let current = unvisited.min(by: {
                (distances[$0] ?? Int.max) < (distances[$1] ?? Int.max)
            }), let currentDist = distances[current] else { break }

            unvisited.remove(current)

            for edge in edges[current] ?? [] {
                let newDist = currentDist + edge.weight
                if newDist < (distances[edge.to] ?? Int.max) {
                    distances[edge.to] = newDist
                }
            }
        }
        return distances
    }
}

var g = WeightedGraph()
g.addEdge(from: 0, to: 1, weight: 4)
g.addEdge(from: 0, to: 2, weight: 1)
g.addEdge(from: 2, to: 1, weight: 2)
g.addEdge(from: 1, to: 3, weight: 1)
g.addEdge(from: 2, to: 3, weight: 5)

let distances = g.dijkstra(from: 0)
print("ノード0からの最短距離:")
for node in distances.keys.sorted() {
    print("  ノード\\(node): \\(distances[node]!)")`}
          expectedOutput={`ノード0からの最短距離:
  ノード0: 0
  ノード1: 3
  ノード2: 1
  ノード3: 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="graph" />
      </div>
      <LessonNav lessons={lessons} currentId="graph" basePath="/learn/algorithms" />
    </div>
  );
}
