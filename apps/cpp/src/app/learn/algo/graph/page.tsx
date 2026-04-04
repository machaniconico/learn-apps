import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function GraphPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">アルゴリズム レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">グラフ</h1>
        <p className="text-gray-400">グラフの表現と基本的な探索アルゴリズムを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">グラフの基本</h2>
        <p className="text-gray-300 leading-relaxed">
          グラフは頂点（ノード）と辺（エッジ）の集合です。
          <strong>隣接リスト</strong>と<strong>隣接行列</strong>で表現でき、
          BFS（幅優先探索）やDFS（深さ優先探索）で走査します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BFS（幅優先探索）</h2>
        <p className="text-gray-400 mb-4">キューを使って近い頂点から順に探索します。最短経路に適しています。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(const vector<vector<int>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    queue<int> q;

    visited[start] = true;
    q.push(start);

    cout << "BFS: ";
    while (!q.empty()) {
        int v = q.front(); q.pop();
        cout << v << " ";

        for (int neighbor : graph[v]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    cout << endl;
}

int main() {
    // 隣接リストでグラフを表現
    //   0 --- 1 --- 3
    //   |     |
    //   2 --- 4
    vector<vector<int>> graph = {
        {1, 2},    // 0 の隣接頂点
        {0, 3, 4}, // 1 の隣接頂点
        {0, 4},    // 2 の隣接頂点
        {1},       // 3 の隣接頂点
        {1, 2},    // 4 の隣接頂点
    };

    bfs(graph, 0);
    return 0;
}`}
          expectedOutput={`BFS: 0 1 2 3 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DFS（深さ優先探索）</h2>
        <p className="text-gray-400 mb-4">再帰またはスタックで深い頂点まで探索します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

void dfs(const vector<vector<int>>& graph, int v, vector<bool>& visited) {
    visited[v] = true;
    cout << v << " ";

    for (int neighbor : graph[v]) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited);
        }
    }
}

// 連結成分の数を求める
int countComponents(const vector<vector<int>>& graph) {
    int n = graph.size();
    vector<bool> visited(n, false);
    int count = 0;

    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            count++;
            cout << "成分" << count << ": ";
            dfs(graph, i, visited);
            cout << endl;
        }
    }
    return count;
}

int main() {
    // 2つの連結成分を持つグラフ
    // 成分1: 0-1-2, 成分2: 3-4
    vector<vector<int>> graph = {
        {1, 2},  // 0
        {0, 2},  // 1
        {0, 1},  // 2
        {4},     // 3
        {3},     // 4
    };

    int comp = countComponents(graph);
    cout << "連結成分数: " << comp << endl;
    return 0;
}`}
          expectedOutput={`成分1: 0 1 2
成分2: 3 4
連結成分数: 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="graph" />
      </div>
      <LessonNav lessons={lessons} currentId="graph" basePath="/learn/algo" />
    </div>
  );
}
