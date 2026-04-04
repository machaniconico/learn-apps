import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function IterablePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">コレクション</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">イテラブル</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-cyan-300">Iterable</strong>は繰り返し処理できる要素のシーケンスを表す抽象インターフェースです。
            <code className="text-cyan-300">List</code>・<code className="text-cyan-300">Set</code>・<code className="text-cyan-300">Map.keys</code>などはすべてIterableです。
            遅延評価により、必要になるまで要素を計算しないため効率的な処理が可能です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Iterable の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">for-in</code>ループや<code className="text-cyan-300">forEach</code>でイテレートし、<code className="text-cyan-300">toList()</code>・<code className="text-cyan-300">toSet()</code>で変換できます。
        </p>
        <DartEditor
          defaultCode={`Iterable<int> countUp(int start, int end) sync* {
  for (int i = start; i <= end; i++) {
    yield i;
  }
}

Iterable<int> fibonacci() sync* {
  int a = 0, b = 1;
  while (true) {
    yield a;
    final next = a + b;
    a = b;
    b = next;
  }
}

void main() {
  // カスタム Iterable
  final nums = countUp(1, 5);
  print('型: \${nums.runtimeType}');

  for (final n in nums) {
    print(n);
  }

  // toList で変換
  print(countUp(1, 10).toList());

  // 遅延評価: 最初の8個のフィボナッチ数
  final fibs = fibonacci().take(8).toList();
  print('フィボナッチ: \$fibs');

  // Iterable のメソッド
  final it = countUp(1, 10);
  print('first: \${it.first}');
  print('last: \${it.last}');
  print('length: \${it.length}');
  print('isEmpty: \${it.isEmpty}');
}`}
          expectedOutput={`型: _SyncStarIterable<int>
1
2
3
4
5
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
フィボナッチ: [0, 1, 1, 2, 3, 5, 8, 13]
first: 1
last: 10
length: 10
isEmpty: false`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Iterable のメソッドチェーン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">where</code>・<code className="text-cyan-300">map</code>・<code className="text-cyan-300">take</code>・<code className="text-cyan-300">skip</code>などを組み合わせて遅延処理できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final numbers = Iterable.generate(20, (i) => i + 1);

  // take と skip
  print('最初の5個: \${numbers.take(5).toList()}');
  print('5個スキップ: \${numbers.skip(15).toList()}');

  // takeWhile と skipWhile
  print('10以下: \${numbers.takeWhile((n) => n <= 5).toList()}');
  print('偶数スキップ: \${numbers.skipWhile((n) => n % 2 == 0).take(5).toList()}');

  // メソッドチェーン（遅延評価）
  final result = numbers
      .where((n) => n % 3 == 0)   // 3の倍数
      .map((n) => n * n)           // 二乗
      .take(4)                     // 最初の4個
      .toList();
  print('3の倍数の二乗(最初4個): \$result');

  // expand: 各要素を複数要素に展開
  final expanded = [1, 2, 3]
      .expand((n) => [n, n * 10])
      .toList();
  print('expand: \$expanded');

  // followedBy: Iterableを連結
  final a = [1, 2, 3];
  final b = [4, 5, 6];
  print('連結: \${a.followedBy(b).toList()}');
}`}
          expectedOutput={`最初の5個: [1, 2, 3, 4, 5]
5個スキップ: [16, 17, 18, 19, 20]
10以下: [1, 2, 3, 4, 5]
偶数スキップ: [1, 2, 3, 4, 5]
3の倍数の二乗(最初4個): [9, 36, 81, 144]
expand: [1, 10, 2, 20, 3, 30]
連結: [1, 2, 3, 4, 5, 6]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カスタム Iterable クラス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">Iterable</code>を継承して独自のイテラブルを作成できます。
        </p>
        <DartEditor
          defaultCode={`class Range extends Iterable<int> {
  final int start;
  final int end;
  final int step;

  const Range(this.start, this.end, {this.step = 1});

  @override
  Iterator<int> get iterator => _RangeIterator(start, end, step);
}

class _RangeIterator implements Iterator<int> {
  final int end;
  final int step;
  int _current;
  bool _started = false;

  _RangeIterator(int start, this.end, this.step)
      : _current = start - step;

  @override
  int get current => _current;

  @override
  bool moveNext() {
    _current += step;
    return _current <= end;
  }
}

void main() {
  final r1 = Range(1, 10);
  print(r1.toList());

  final r2 = Range(0, 20, step: 3);
  print(r2.toList());

  // Iterable のメソッドが使える
  print(r1.where((n) => n % 2 == 0).toList());
  print(r1.reduce((a, b) => a + b));
  print(r2.length);
}`}
          expectedOutput={`[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[0, 3, 6, 9, 12, 15, 18]
[2, 4, 6, 8, 10]
55
7`}
        />
      </section>

      <LessonCompleteButton lessonId="iterable" categoryId="collections" />
      <LessonNav lessons={lessons} currentId="iterable" basePath="/learn/collections" />
    </div>
  );
}
