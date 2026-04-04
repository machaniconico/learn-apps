import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function GeneratorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ジェネレータ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartのジェネレータ関数は<strong className="text-purple-300">sync*</strong>と<strong className="text-purple-300">yield</strong>で同期ジェネレータ、
            <strong className="text-purple-300">async*</strong>と<strong className="text-purple-300">yield</strong>で非同期ジェネレータを作れます。
            遅延評価で大量のデータを効率的に扱えます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">同期ジェネレータ（sync*）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">sync*</code>と<code className="text-purple-300">yield</code>で<code className="text-purple-300">Iterable</code>を返すジェネレータを作ります。
        </p>
        <DartEditor
          defaultCode={`// 同期ジェネレータ
Iterable<int> range(int start, int end, [int step = 1]) sync* {
  for (int i = start; i < end; i += step) {
    yield i;
  }
}

// フィボナッチ数列ジェネレータ
Iterable<int> fibonacci() sync* {
  int a = 0, b = 1;
  while (true) {
    yield a;
    int temp = a + b;
    a = b;
    b = temp;
  }
}

void main() {
  // range ジェネレータ
  print('0〜9: \${range(0, 10).toList()}');
  print('偶数: \${range(0, 20, 2).toList()}');

  // フィボナッチ（最初の10個）
  List<int> fibs = fibonacci().take(10).toList();
  print('フィボナッチ: \$fibs');

  // 遅延評価（必要なときだけ計算）
  int sum = fibonacci().take(20).reduce((a, b) => a + b);
  print('最初の20項の合計: \$sum');
}`}
          expectedOutput={`0〜9: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
偶数: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
フィボナッチ: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
最初の20項の合計: 6764`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">yield* でイテラブルを委譲</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">yield*</code>を使うと、別のイテラブルの全要素をまとめてyieldできます。
        </p>
        <DartEditor
          defaultCode={`Iterable<int> naturals(int n) sync* {
  for (int i = 1; i <= n; i++) yield i;
}

// yield* で別のジェネレータに委譲
Iterable<int> concat(List<Iterable<int>> iterables) sync* {
  for (var it in iterables) {
    yield* it; // イテラブルの全要素をyield
  }
}

// ツリー構造をフラット化
Iterable<dynamic> flatten(List<dynamic> list) sync* {
  for (var item in list) {
    if (item is List) {
      yield* flatten(item); // 再帰的に委譲
    } else {
      yield item;
    }
  }
}

void main() {
  var combined = concat([naturals(3), naturals(5)]);
  print('結合: \${combined.toList()}');

  var nested = [1, [2, 3], [4, [5, 6]], 7];
  print('フラット化: \${flatten(nested).toList()}');
}`}
          expectedOutput={`結合: [1, 2, 3, 1, 2, 3, 4, 5]
フラット化: [1, 2, 3, 4, 5, 6, 7]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">非同期ジェネレータ（async*）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">async*</code>と<code className="text-purple-300">yield</code>で<code className="text-purple-300">Stream</code>を返す非同期ジェネレータを作ります。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

// 非同期ジェネレータ
Stream<int> countDown(int from) async* {
  for (int i = from; i >= 0; i--) {
    await Future.delayed(Duration(milliseconds: 10));
    yield i;
  }
}

Stream<String> fetchItems(List<String> items) async* {
  for (var item in items) {
    await Future.delayed(Duration(milliseconds: 20));
    yield '取得: \$item';
  }
}

Future<void> main() async {
  // カウントダウン
  await for (int n in countDown(5)) {
    print(n > 0 ? '\$n...' : '完了！');
  }

  // アイテム取得のシミュレーション
  List<String> items = ['データA', 'データB', 'データC'];
  await for (String msg in fetchItems(items)) {
    print(msg);
  }
}`}
          expectedOutput={`5...
4...
3...
2...
1...
完了！
取得: データA
取得: データB
取得: データC`}
        />
      </section>

      <LessonCompleteButton lessonId="generators" categoryId="functions" />
      <LessonNav lessons={lessons} currentId="generators" basePath="/learn/functions" />
    </div>
  );
}
