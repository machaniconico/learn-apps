import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function ProfilingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">プロファイリング</h1>
        <p className="text-gray-400">パフォーマンス計測と最適化のための基本テクニックを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">プロファイリングとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          プロファイリングはコードの実行時間やメモリ使用量を計測して、ボトルネックを特定する作業です。
          最適化する前に必ず計測することが重要です。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-orange-300">Stopwatch</code> クラスで経過時間を計測</li>
          <li>• <code className="text-orange-300">DateTime.now()</code> でタイムスタンプ記録</li>
          <li>• ホットパスを特定してから最適化する</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Stopwatchによる計測</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">Stopwatch</code>クラスを使ったコードの実行時間計測です。
        </p>
        <DartEditor
          defaultCode={`// 処理時間を計測するユーティリティ
T measure<T>(String label, T Function() fn) {
  final sw = Stopwatch()..start();
  final result = fn();
  sw.stop();
  print('\$label: \${sw.elapsedMicroseconds}μs');
  return result;
}

// バブルソートとDartの標準ソートを比較
List<int> bubbleSort(List<int> input) {
  final list = List<int>.from(input);
  for (int i = 0; i < list.length; i++) {
    for (int j = 0; j < list.length - i - 1; j++) {
      if (list[j] > list[j + 1]) {
        final tmp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = tmp;
      }
    }
  }
  return list;
}

void main() {
  final data = List.generate(1000, (i) => 1000 - i);

  final r1 = measure('バブルソート(1000件)', () => bubbleSort(data));
  final r2 = measure('標準sort(1000件)', () => (List<int>.from(data)..sort()));

  print('バブルソート結果先頭5: \${r1.take(5).toList()}');
  print('標準sort結果先頭5: \${r2.take(5).toList()}');
}`}
          expectedOutput={`バブルソート(1000件): 15234μs\n標準sort(1000件): 432μs\nバブルソート結果先頭5: [1, 2, 3, 4, 5]\n標準sort結果先頭5: [1, 2, 3, 4, 5]`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">キャッシュによる最適化</h2>
        <p className="text-gray-400 mb-4">
          メモ化（Memoization）パターンで計算コストを削減します。
        </p>
        <DartEditor
          defaultCode={`// メモ化でフィボナッチ数列を最適化
class Fibonacci {
  final Map<int, BigInt> _cache = {};

  BigInt compute(int n) {
    if (n <= 1) return BigInt.from(n);
    return _cache.putIfAbsent(n, () => compute(n - 1) + compute(n - 2));
  }
}

// キャッシュなし（再帰）
int fibSlow(int n) {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

void main() {
  final fib = Fibonacci();

  // キャッシュあり
  final sw1 = Stopwatch()..start();
  final r1 = fib.compute(40);
  sw1.stop();
  print('メモ化 fib(40) = \$r1 (\${sw1.elapsedMicroseconds}μs)');

  // キャッシュなし
  final sw2 = Stopwatch()..start();
  final r2 = fibSlow(35);
  sw2.stop();
  print('通常   fib(35) = \$r2 (\${sw2.elapsedMicroseconds}μs)');

  // 大きな値もキャッシュで高速
  final sw3 = Stopwatch()..start();
  final r3 = fib.compute(100);
  sw3.stop();
  print('メモ化 fib(100) = \$r3 (\${sw3.elapsedMicroseconds}μs)');
}`}
          expectedOutput={`メモ化 fib(40) = 102334155 (45μs)\n通常   fib(35) = 9227465 (38521μs)\nメモ化 fib(100) = 354224848179261915075 (12μs)`}
        />
      </section>
      <LessonCompleteButton lessonId="profiling" categoryId="debug" />
      <LessonNav lessons={lessons} currentId="profiling" basePath="/learn/debug" />
    </div>
  );
}
