import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { ALGORITHM_LESSONS } from "@/lib/lessons-data";

export default function SearchAlgorithmLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 mb-4">アルゴリズム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">探索アルゴリズム</h1>
        <p className="text-gray-400">線形探索、二分探索、BFS、DFSを理解しよう</p>
      </div>

      {/* 線形探索 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">線形探索（Linear Search）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列の先頭から順番に1つずつ確認していく最もシンプルな探索方法です。
          計算量は <strong className="text-yellow-400">O(n)</strong> で、ソートされていないデータにも使えます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // 見つかったインデックスを返す
    }
  }
  return -1; // 見つからなかった
}

const data = [4, 2, 7, 1, 9, 3];
console.log(linearSearch(data, 7)); // 2
console.log(linearSearch(data, 5)); // -1`}</code>
        </pre>
      </section>

      {/* 二分探索 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">二分探索（Binary Search）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-yellow-400">ソート済み</strong>の配列に対して、
          中央の要素と比較して探索範囲を半分に絞り込んでいく方法です。
          計算量は <strong className="text-yellow-400">O(log n)</strong> で、線形探索よりはるかに高速です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // 見つかった
    } else if (arr[mid] < target) {
      left = mid + 1; // 右半分を探索
    } else {
      right = mid - 1; // 左半分を探索
    }
  }

  return -1; // 見つからなかった
}

// ソート済みの配列が必要
const sorted = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(sorted, 7));  // 3
console.log(binarySearch(sorted, 6));  // -1`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          100万件のデータでも最大約20回の比較で見つかります（2^20 &gt; 1,000,000）。
        </p>
      </section>

      {/* 幅優先探索 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">幅優先探索（BFS: Breadth-First Search）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          グラフや木構造を探索するアルゴリズムで、
          <strong className="text-yellow-400">スタート地点に近いノードから順番に</strong>探索します。
          キューを使って実装し、最短経路を見つけるのに適しています。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift(); // 先頭を取り出す
    result.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}

// グラフの隣接リスト表現
const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

console.log(bfs(graph, "A"));
// ["A", "B", "C", "D", "E", "F"]`}</code>
        </pre>
      </section>

      {/* 深さ優先探索 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">深さ優先探索（DFS: Depth-First Search）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          1つの経路を<strong className="text-yellow-400">できるだけ深く</strong>進み、
          行き止まりになったら戻って別の経路を探索します。
          スタックまたは再帰を使って実装し、全経路の探索やサイクル検出に適しています。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 再帰版DFS
function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  const result = [node];

  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      result.push(...dfs(graph, neighbor, visited));
    }
  }

  return result;
}

// スタック版DFS
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop(); // 末尾を取り出す
    if (visited.has(node)) continue;

    visited.add(node);
    result.push(node);

    // 隣接ノードをスタックに追加
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}

const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

console.log(dfs(graph, "A"));
// ["A", "B", "D", "E", "F", "C"]`}</code>
        </pre>
      </section>

      {/* BFS vs DFS の比較 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">BFS vs DFS の比較</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-2">BFS（幅優先）</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>近いノードから探索</li>
              <li>キューを使用</li>
              <li>最短経路を保証</li>
              <li>メモリ使用量が多い（幅に比例）</li>
              <li>用途: 最短経路、レベル順走査</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-2">DFS（深さ優先）</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>深いノードから探索</li>
              <li>スタック or 再帰を使用</li>
              <li>最短経路は保証しない</li>
              <li>メモリ使用量が少ない（深さに比例）</li>
              <li>用途: 全探索、サイクル検出、迷路</li>
            </ul>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>線形探索は O(n) で、ソートされていないデータに使える</li>
          <li>二分探索は O(log n) で、ソート済みデータに対して非常に高速</li>
          <li>BFS はキューを使い、最短経路を見つけるのに最適</li>
          <li>DFS はスタック/再帰を使い、全経路の探索に向いている</li>
          <li>問題の性質に応じて適切な探索アルゴリズムを選択する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="algorithm" lessonId="search" color="yellow" />
      <LessonNav lessons={ALGORITHM_LESSONS} currentId="search" basePath="/learn/algorithm" color="yellow" />
    </div>
  );
}
