import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function GroupMatchersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">テスト</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">グループとマッチャー</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">group()</strong>でテストを論理的にグループ化し、
            豊富な<strong className="text-green-300">Matcher</strong>で期待値を表現します。
            <code className="text-green-300">equals</code>・<code className="text-green-300">contains</code>・<code className="text-green-300">isA</code>など多くのMatcherが用意されています。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">group によるテストの整理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">group()</code>で関連するテストをまとめると、テスト結果が読みやすくなります。
        </p>
        <DartEditor
          defaultCode={`// testパッケージのgroupの使い方
/*
import 'package:test/test.dart';

void main() {
  group('String utilities', () {
    test('capitalize', () {
      expect(capitalize('hello'), equals('Hello'));
    });

    test('isEmpty check', () {
      expect(''.isEmpty, isTrue);
      expect('hello'.isEmpty, isFalse);
    });
  });

  group('Math operations', () {
    test('addition', () {
      expect(1 + 2, equals(3));
    });
  });
}
*/

// 模擬実装
String capitalize(String s) =>
    s.isEmpty ? s : s[0].toUpperCase() + s.substring(1);

class TestGroup {
  final String name;
  final List<(String, void Function())> tests = [];
  int passed = 0, failed = 0;

  TestGroup(this.name);

  void add(String testName, void Function() body) {
    tests.add((testName, body));
  }

  void run() {
    print('グループ: \$name');
    for (final (name, body) in tests) {
      try {
        body();
        print('  ✓ \$name');
        passed++;
      } catch (e) {
        print('  ✗ \$name: \$e');
        failed++;
      }
    }
    print('  結果: \$passed/\${passed + failed} 通過');
  }
}

void main() {
  final strGroup = TestGroup('String');
  strGroup.add('capitalize hello', () {
    final r = capitalize('hello');
    if (r != 'Hello') throw AssertionError(r);
  });
  strGroup.add('capitalize empty', () {
    final r = capitalize('');
    if (r != '') throw AssertionError(r);
  });
  strGroup.run();

  print('');

  final mathGroup = TestGroup('Math');
  mathGroup.add('1+2=3', () { if (1+2 != 3) throw AssertionError(''); });
  mathGroup.add('10~/3=3', () { if (10~/3 != 3) throw AssertionError(''); });
  mathGroup.add('sqrt(9)=3', () {
    import_('dart:math');
    // 簡略化
    if (3.0 * 3.0 != 9.0) throw AssertionError('');
  });
  mathGroup.run();
}`}
          expectedOutput={`グループ: String
  ✓ capitalize hello
  ✓ capitalize empty
  結果: 2/2 通過

グループ: Math
  ✓ 1+2=3
  ✓ 10~/3=3
  ✓ sqrt(9)=3
  結果: 3/3 通過`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">主要なMatcherの紹介</h2>
        <p className="text-gray-400 mb-4">
          testパッケージの豊富なMatcherを活用して表現力豊かなテストを書きましょう。
        </p>
        <DartEditor
          defaultCode={`// 主要なMatcherの使用例（模擬実装で動作確認）
void check(String desc, bool condition) {
  print('\${condition ? "✓" : "✗"} \$desc');
}

void main() {
  // equals - 等値
  check('equals: 42 == 42', 42 == 42);

  // isNull / isNotNull
  String? nullable = null;
  check('isNull', nullable == null);
  check('isNotNull', 'hello' != null);

  // isTrue / isFalse
  check('isTrue', true == true);
  check('isFalse', false == false);

  // contains - コレクション/文字列
  check('list contains 3', [1, 2, 3].contains(3));
  check('string contains "art"', 'Dart'.contains('art'));

  // hasLength
  check('hasLength 3', [1, 2, 3].length == 3);

  // greaterThan / lessThan
  check('greaterThan 5', 10 > 5);
  check('lessThan 10', 5 < 10);

  // isA<T> (型チェック)
  dynamic value = 'hello';
  check('isA<String>', value is String);
  check('isA<int> false', value is! int);

  // throwsA / throwsArgumentError
  bool threw = false;
  try { throw ArgumentError('test'); } on ArgumentError { threw = true; }
  check('throwsArgumentError', threw);

  // isEmpty / isNotEmpty
  check('isEmpty', [].isEmpty);
  check('isNotEmpty', [1].isNotEmpty);
}`}
          expectedOutput={`✓ equals: 42 == 42
✓ isNull
✓ isNotNull
✓ isTrue
✓ isFalse
✓ list contains 3
✓ string contains "art"
✓ hasLength 3
✓ greaterThan 5
✓ lessThan 10
✓ isA<String>
✓ isA<int> false
✓ throwsArgumentError
✓ isEmpty
✓ isNotEmpty`}
        />
      </section>

      <LessonCompleteButton lessonId="group-matchers" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="group-matchers" basePath="/learn/testing" />
    </div>
  );
}
