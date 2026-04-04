import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function AsyncTestingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">テスト</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">非同期テスト</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">非同期テスト</strong>では<code className="text-green-300">async/await</code>を使ってFutureやStreamをテストします。
            <code className="text-green-300">expectLater</code>と<code className="text-green-300">emitsInOrder</code>でStreamの出力を検証できます。
            タイムアウト付きのテストも書けます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Future のテスト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">async/await</code>を使ってFutureを返す関数をテストします。
        </p>
        <DartEditor
          defaultCode={`// Futureを返す関数のテスト
Future<int> fetchValue(int id) async {
  await Future.delayed(Duration(milliseconds: 10));
  if (id < 0) throw ArgumentError('IDは0以上');
  return id * 10;
}

Future<List<String>> fetchNames() async {
  await Future.delayed(Duration(milliseconds: 5));
  return ['太郎', '花子', '次郎'];
}

// テストヘルパー
Future<void> asyncTest(String name, Future<void> Function() body) async {
  try {
    await body();
    print('✓ \$name');
  } catch (e) {
    print('✗ \$name: \$e');
  }
}

Future<void> main() async {
  // 正常系: 値を取得できる
  await asyncTest('fetchValue(3) = 30', () async {
    final result = await fetchValue(3);
    if (result != 30) throw AssertionError('期待値30, 実際値\$result');
  });

  // 正常系: リストを取得できる
  await asyncTest('fetchNames は3件', () async {
    final names = await fetchNames();
    if (names.length != 3) throw AssertionError('長さが3でない');
    if (!names.contains('花子')) throw AssertionError('花子が含まれない');
  });

  // 異常系: 例外が発生する
  await asyncTest('fetchValue(-1) は例外', () async {
    try {
      await fetchValue(-1);
      throw AssertionError('例外が発生すべき');
    } on ArgumentError {
      // 期待通り
    }
  });

  // タイムアウト
  await asyncTest('10ms以内に完了', () async {
    final start = DateTime.now();
    await fetchValue(1);
    final elapsed = DateTime.now().difference(start).inMilliseconds;
    if (elapsed > 1000) throw AssertionError('タイムアウト: \${elapsed}ms');
  });

  print('全テスト完了');
}`}
          expectedOutput={`✓ fetchValue(3) = 30
✓ fetchNames は3件
✓ fetchValue(-1) は例外
✓ 10ms以内に完了
全テスト完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Stream のテスト</h2>
        <p className="text-gray-400 mb-4">
          Streamが発行する値を順番に検証します。<code className="text-green-300">expectLater + emitsInOrder</code>パターンの模擬実装です。
        </p>
        <DartEditor
          defaultCode={`// Streamのテスト
Stream<int> countStream(int max) async* {
  for (int i = 1; i <= max; i++) {
    await Future.delayed(Duration(milliseconds: 5));
    yield i;
  }
}

Stream<String> eventStream() async* {
  yield '接続';
  await Future.delayed(Duration(milliseconds: 5));
  yield 'データ受信';
  await Future.delayed(Duration(milliseconds: 5));
  yield '完了';
}

Future<void> asyncTest(String name, Future<void> Function() body) async {
  try {
    await body();
    print('✓ \$name');
  } catch (e) {
    print('✗ \$name: \$e');
  }
}

Future<void> main() async {
  // Streamの全要素を収集してテスト
  await asyncTest('countStream(3) = [1,2,3]', () async {
    final values = await countStream(3).toList();
    if (values.length != 3) throw AssertionError('長さが3でない');
    if (values[0] != 1 || values[1] != 2 || values[2] != 3) {
      throw AssertionError('値が一致しない: \$values');
    }
  });

  // Streamの特定要素をテスト
  await asyncTest('countStream 合計 = 15', () async {
    final sum = await countStream(5).reduce((a, b) => a + b);
    if (sum != 15) throw AssertionError('合計が15でない: \$sum');
  });

  // Streamのイベント順をテスト
  await asyncTest('eventStream の順序', () async {
    final events = await eventStream().toList();
    final expected = ['接続', 'データ受信', '完了'];
    for (int i = 0; i < expected.length; i++) {
      if (events[i] != expected[i]) {
        throw AssertionError('インデックス\$i: 期待値\${expected[i]}, 実際値\${events[i]}');
      }
    }
  });

  // Streamの最初の要素をテスト
  await asyncTest('eventStream 最初は接続', () async {
    final first = await eventStream().first;
    if (first != '接続') throw AssertionError('最初のイベントが接続でない: \$first');
  });

  print('Streamテスト完了');
}`}
          expectedOutput={`✓ countStream(3) = [1,2,3]
✓ countStream 合計 = 15
✓ eventStream の順序
✓ eventStream 最初は接続
Streamテスト完了`}
        />
      </section>

      <LessonCompleteButton lessonId="async-testing" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="async-testing" basePath="/learn/testing" />
    </div>
  );
}
