import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { ALGORITHM_LESSONS } from "@/lib/lessons-data";

export default function SortAlgorithmLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 mb-4">アルゴリズム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソートアルゴリズム</h1>
        <p className="text-gray-400">バブル、選択、マージ、クイックソートを理解しよう</p>
      </div>

      {/* バブルソート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">バブルソート（Bubble Sort）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          隣り合う要素を比較し、大きい方を右にずらしていく最もシンプルなソートです。
          計算量は <strong className="text-yellow-400">O(n^2)</strong> で、大量データには不向きですが理解しやすいアルゴリズムです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 隣同士を入れ替え
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));
// [11, 12, 22, 25, 34, 64, 90]`}</code>
        </pre>
      </section>

      {/* 選択ソート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">選択ソート（Selection Sort）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          未ソート部分から最小値を見つけて先頭に配置する操作を繰り返します。
          計算量は <strong className="text-yellow-400">O(n^2)</strong> ですが、交換回数がバブルソートより少ないのが特徴です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // 最小値を先頭に移動
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

console.log(selectionSort([29, 10, 14, 37, 13]));
// [10, 13, 14, 29, 37]`}</code>
        </pre>
      </section>

      {/* マージソート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">マージソート（Merge Sort）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列を半分に分割し続け、それぞれをソートしてからマージ（統合）する
          <strong className="text-yellow-400">分割統治法</strong>の代表的なアルゴリズムです。
          計算量は <strong className="text-yellow-400">O(n log n)</strong> で安定しており、大量データに強いです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// [3, 9, 10, 27, 38, 43, 82]`}</code>
        </pre>
      </section>

      {/* クイックソート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">クイックソート（Quick Sort）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ピボット（基準値）を選び、それより小さい要素と大きい要素に分割して再帰的にソートします。
          平均計算量は <strong className="text-yellow-400">O(n log n)</strong> で、実用上最も高速なソートの1つです。
          ただし最悪ケースでは O(n^2) になることがあります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([10, 7, 8, 9, 1, 5]));
// [1, 5, 7, 8, 9, 10]`}</code>
        </pre>
      </section>

      {/* ソートアルゴリズムの比較 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ソートアルゴリズムの比較</h2>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-1">バブルソート</h3>
            <p className="text-sm text-gray-400">時間: O(n^2) / 空間: O(1) / 安定ソート / 教育用途向き</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-1">選択ソート</h3>
            <p className="text-sm text-gray-400">時間: O(n^2) / 空間: O(1) / 不安定ソート / 交換回数が少ない</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-1">マージソート</h3>
            <p className="text-sm text-gray-400">時間: O(n log n) / 空間: O(n) / 安定ソート / 大量データ向き</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-1">クイックソート</h3>
            <p className="text-sm text-gray-400">時間: 平均O(n log n) / 空間: O(log n) / 不安定ソート / 実用上最速</p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          JavaScriptの <code className="text-yellow-400">Array.prototype.sort()</code> は、
          多くのエンジンでTimSort（マージソートと挿入ソートのハイブリッド）を採用しています。
        </p>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>バブルソート・選択ソートは O(n^2) で理解しやすいが大量データには不向き</li>
          <li>マージソートは O(n log n) で安定だが追加メモリが必要</li>
          <li>クイックソートは平均 O(n log n) で実用上最も高速</li>
          <li>用途やデータの特性に応じてソートアルゴリズムを使い分ける</li>
          <li>JavaScriptの組み込み sort() はTimSortを使用</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="algorithm" lessonId="sort" color="yellow" />
      <LessonNav lessons={ALGORITHM_LESSONS} currentId="sort" basePath="/learn/algorithm" color="yellow" />
    </div>
  );
}
