import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function TestBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">テスト</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">テストの基本</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartのテストには<strong className="text-green-300">test</strong>パッケージを使います。
            <code className="text-green-300">test()</code>関数でテストケースを定義し、<code className="text-green-300">expect()</code>で結果を検証します。
            テストファイルは<code className="text-green-300">test/</code>ディレクトリに配置し、<code className="text-green-300">dart test</code>コマンドで実行します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">最初のテスト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">test()</code>と<code className="text-green-300">expect()</code>を使って関数の動作を検証します。
        </p>
        <DartEditor
          defaultCode={`// test/calculator_test.dart の例
// import 'package:test/test.dart';

// テスト対象の関数
int add(int a, int b) => a + b;
int subtract(int a, int b) => a - b;
double divide(int a, int b) {
  if (b == 0) throw ArgumentError('ゼロ除算');
  return a / b;
}
String repeat(String s, int n) => s * n;

// テストの模擬実装（ブラウザ動作確認用）
void runTest(String name, void Function() body) {
  try {
    body();
    print('✓ \$name');
  } catch (e) {
    print('✗ \$name\\n  エラー: \$e');
  }
}

void assertEqual<T>(T actual, T expected) {
  if (actual != expected) {
    throw AssertionError('期待値: \$expected, 実際値: \$actual');
  }
}

void main() {
  runTest('add(2, 3) = 5', () => assertEqual(add(2, 3), 5));
  runTest('add(-1, 1) = 0', () => assertEqual(add(-1, 1), 0));
  runTest('subtract(10, 3) = 7', () => assertEqual(subtract(10, 3), 7));
  runTest('divide(10, 2) = 5.0', () => assertEqual(divide(10, 2), 5.0));
  runTest('divide by zero throws', () {
    try {
      divide(1, 0);
      throw AssertionError('例外が発生すべき');
    } on ArgumentError catch (_) {
      // 期待通り
    }
  });
  runTest('repeat("ab", 3) = "ababab"', () => assertEqual(repeat('ab', 3), 'ababab'));
}`}
          expectedOutput={`✓ add(2, 3) = 5
✓ add(-1, 1) = 0
✓ subtract(10, 3) = 7
✓ divide(10, 2) = 5.0
✓ divide by zero throws
✓ repeat("ab", 3) = "ababab"`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">setUp と tearDown</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">setUp()</code>は各テスト前、<code className="text-green-300">tearDown()</code>は各テスト後に実行されます。
        </p>
        <DartEditor
          defaultCode={`// testパッケージでの setUp/tearDown の使い方
/*
import 'package:test/test.dart';

void main() {
  late List<int> list;

  setUp(() {
    list = [1, 2, 3]; // 各テスト前にリセット
  });

  tearDown(() {
    list.clear(); // 各テスト後にクリーンアップ
  });

  test('list has 3 elements', () {
    expect(list.length, equals(3));
  });

  test('list contains 2', () {
    expect(list, contains(2));
  });
}
*/

// 模擬実装でsetUp/tearDownのパターンを示す
class TestFixture {
  late List<int> list;
  int setupCount = 0;
  int teardownCount = 0;

  void setUp() {
    list = [1, 2, 3];
    setupCount++;
  }

  void tearDown() {
    list.clear();
    teardownCount++;
  }
}

void runWithFixture(String name, TestFixture f, void Function() body) {
  f.setUp();
  try {
    body();
    print('✓ \$name');
  } catch (e) {
    print('✗ \$name: \$e');
  } finally {
    f.tearDown();
  }
}

void main() {
  final f = TestFixture();

  runWithFixture('リストに3要素', f, () {
    if (f.list.length != 3) throw AssertionError('長さが3でない');
  });

  runWithFixture('2を含む', f, () {
    if (!f.list.contains(2)) throw AssertionError('2が含まれない');
  });

  runWithFixture('合計は6', f, () {
    final sum = f.list.reduce((a, b) => a + b);
    if (sum != 6) throw AssertionError('合計が6でない');
  });

  print('setUp実行回数: \${f.setupCount}');
  print('tearDown実行回数: \${f.teardownCount}');
}`}
          expectedOutput={`✓ リストに3要素
✓ 2を含む
✓ 合計は6
setUp実行回数: 3
tearDown実行回数: 3`}
        />
      </section>

      <LessonCompleteButton lessonId="test-basics" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="test-basics" basePath="/learn/testing" />
    </div>
  );
}
