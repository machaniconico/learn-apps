import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { ALGORITHM_LESSONS } from "@/lib/lessons-data";

export default function AlgorithmExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 mb-4">アルゴリズム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アルゴリズム総合演習</h1>
        <p className="text-gray-400">実践的な問題を解いてアルゴリズム力を鍛えよう</p>
      </div>

      {/* 問題1: 二つの数の合計 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">問題1: Two Sum（二数の和）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          整数の配列と目標値が与えられたとき、合計が目標値になる2つの要素のインデックスを返してください。
          技術面接で最も有名な問題の1つです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// 方法1: ブルートフォース O(n^2)
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

// 方法2: ハッシュマップ O(n)
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          <strong className="text-yellow-400">ポイント:</strong> ハッシュマップを使うことで O(n^2) を O(n) に改善できます。
          「補数を記録しておく」という発想がカギです。
        </p>
      </section>

      {/* 問題2: 回文判定 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">問題2: 回文判定（Palindrome）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          文字列が回文（前から読んでも後ろから読んでも同じ）かどうかを判定してください。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// 方法1: 反転して比較
function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

// 方法2: 二つのポインタ O(n) 時間 / O(1) 空間
function isPalindromeTwoPointer(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("hello")); // false`}</code>
        </pre>
      </section>

      {/* 問題3: フィボナッチ数列 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">問題3: フィボナッチ数列</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          n番目のフィボナッチ数を求めてください。再帰、メモ化、ループの3つの方法を比較します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// 方法1: 単純な再帰 O(2^n) - とても遅い！
function fibRecursive(n) {
  if (n <= 1) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 方法2: メモ化再帰 O(n) - 計算結果をキャッシュ
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// 方法3: ループ O(n) 時間 / O(1) 空間 - 最も効率的
function fibLoop(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

console.log(fibLoop(10)); // 55
console.log(fibLoop(40)); // 102334155`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          <strong className="text-yellow-400">ポイント:</strong> 単純再帰は同じ計算を何度も繰り返すため非常に遅いです。
          メモ化やループで劇的に改善できます。
        </p>
      </section>

      {/* 問題4: 配列の重複を除去 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">問題4: 頻出要素の取得</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          整数の配列から、出現回数が多い順に k 個の要素を返してください。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`function topKFrequent(nums, k) {
  // 1. 出現回数をカウント
  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  // 2. バケットソート（インデックス = 出現回数）
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  // 3. 出現回数が多い順に k 個取得
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKFrequent([4, 4, 4, 6, 6, 1], 1)); // [4]`}</code>
        </pre>
      </section>

      {/* チャレンジ問題 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">チャレンジ: 最短経路（BFS応用）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          グリッド上でスタートからゴールまでの最短距離を求めてください。
          BFS を使って実装します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`function shortestPath(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [[...start, 0]]; // [row, col, distance]
  const visited = new Set();
  visited.add(start.toString());

  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  while (queue.length > 0) {
    const [r, c, dist] = queue.shift();

    if (r === end[0] && c === end[1]) return dist;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      const key = [nr, nc].toString();

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
          && grid[nr][nc] === 0 && !visited.has(key)) {
        visited.add(key);
        queue.push([nr, nc, dist + 1]);
      }
    }
  }

  return -1; // 到達不可能
}

// 0 = 通路, 1 = 壁
const grid = [
  [0, 0, 0, 0],
  [1, 1, 0, 1],
  [0, 0, 0, 0],
  [0, 1, 1, 0],
];

console.log(shortestPath(grid, [0, 0], [3, 3])); // 7`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>ハッシュマップを使うとブルートフォースを O(n) に改善できることが多い</li>
          <li>二つのポインタは配列・文字列の問題で頻出のテクニック</li>
          <li>再帰はメモ化やループに置き換えることで劇的に高速化できる</li>
          <li>BFS は最短経路問題に、DFS は全探索問題に使う</li>
          <li>まずブルートフォースで解き、そこから最適化する思考プロセスが大切</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="algorithm" lessonId="algorithm-exercise" color="yellow" />
      <LessonNav lessons={ALGORITHM_LESSONS} currentId="algorithm-exercise" basePath="/learn/algorithm" color="yellow" />
    </div>
  );
}
