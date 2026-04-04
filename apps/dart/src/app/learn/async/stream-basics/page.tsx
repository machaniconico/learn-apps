import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function StreamBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">非同期処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Streamの基本</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">Stream</strong>は時間の経過とともに発生する非同期イベントのシーケンスです。
            単一の値を返す<code className="text-violet-300">Future</code>とは異なり、Streamは複数のイベントを連続して発行できます。
            ファイル読み込み、ユーザー入力、センサーデータなどに使われます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Stream の作成と購読</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">async*</code>と<code className="text-violet-300">yield</code>でStreamを生成し、<code className="text-violet-300">await for</code>で購読します。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Stream<int> counting(int max) async* {
  for (int i = 1; i <= max; i++) {
    await Future.delayed(Duration(milliseconds: 10));
    yield i;
  }
}

Stream<String> greetings() async* {
  yield 'こんにちは';
  await Future.delayed(Duration(milliseconds: 10));
  yield 'Hello';
  await Future.delayed(Duration(milliseconds: 10));
  yield 'Bonjour';
}

Future<void> main() async {
  // await for でStream購読
  print('カウント:');
  await for (final n in counting(5)) {
    print('  \$n');
  }

  // Streamのメソッド
  print('挨拶:');
  await greetings().forEach(print);

  // Stream.fromIterable
  final stream = Stream.fromIterable([10, 20, 30]);
  final list = await stream.toList();
  print('リスト化: \$list');
}`}
          expectedOutput={`カウント:
  1
  2
  3
  4
  5
挨拶:
こんにちは
Hello
Bonjour
リスト化: [10, 20, 30]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Stream の変換操作</h2>
        <p className="text-gray-400 mb-4">
          StreamはListと同様に<code className="text-violet-300">map</code>・<code className="text-violet-300">where</code>・<code className="text-violet-300">take</code>等のメソッドで変換できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Stream<int> numbers() => Stream.fromIterable(
    List.generate(10, (i) => i + 1));

Future<void> main() async {
  // map と where
  final evenSquares = numbers()
      .where((n) => n.isEven)
      .map((n) => n * n);

  print('偶数の二乗:');
  await for (final v in evenSquares) {
    print('  \$v');
  }

  // take と skip
  final middle = numbers().skip(2).take(4);
  final middleList = await middle.toList();
  print('中間4要素: \$middleList');

  // first, last, length
  print('最初: \${await numbers().first}');
  print('最後: \${await numbers().last}');
  print('件数: \${await numbers().length}');
}`}
          expectedOutput={`偶数の二乗:
  4
  16
  36
  64
  100
中間4要素: [3, 4, 5, 6]
最初: 1
最後: 10
件数: 10`}
        />
      </section>

      <LessonCompleteButton lessonId="stream-basics" categoryId="async" />
      <LessonNav lessons={lessons} currentId="stream-basics" basePath="/learn/async" />
    </div>
  );
}
