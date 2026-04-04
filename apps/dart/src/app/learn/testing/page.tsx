import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartのテストフレームワークで使う基本的なパッケージは？",
    options: ["dart:test", "test", "unittest", "jasmine"],
    answer: 1,
    explanation: "Dartのテストにはtestパッケージを使います。pubspec.yamlのdev_dependenciesにtest: ^1.24.0を追加して使用します。",
  },
  {
    question: "テストケースを定義する関数は何ですか？",
    options: ["it()", "spec()", "test()", "case()"],
    answer: 2,
    explanation: "test()関数でテストケースを定義します。第1引数にテスト名、第2引数にテストの実装関数を渡します。",
  },
  {
    question: "expect(actual, matcher)でactualが42であることを確認するマッチャーは？",
    options: ["isEqual(42)", "equals(42)", "toBe(42)", "same(42)"],
    answer: 1,
    explanation: "equals()マッチャーで等値を確認します。expect(result, equals(42))のように使います。isNullやisTrue等の便利なマッチャーも用意されています。",
  },
  {
    question: "TDD（テスト駆動開発）の基本サイクルは？",
    options: [
      "コード→テスト→リファクタ",
      "Red→Green→Refactor",
      "設計→実装→テスト",
      "テスト→設計→実装",
    ],
    answer: 1,
    explanation: "TDDはRed（失敗するテストを書く）→Green（テストを通す最小限のコードを書く）→Refactor（コードを改善する）のサイクルを繰り返します。",
  },
];

export default function TestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">テスト</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartのテスト手法を学びましょう。testパッケージを使ったユニットテスト、グループとマッチャー、非同期テスト、TDDサイクルなど、高品質なコードを維持するためのテスト技術を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="testing" totalLessons={6} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/testing" color="green" categoryId="testing" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テストの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">test()</code>関数と<code className="text-green-300">expect()</code>を使って、関数の動作を検証します。
        </p>
        <DartEditor
          defaultCode={`// test/calculator_test.dart の例
// import 'package:test/test.dart';

// テスト対象のクラス
class Calculator {
  int add(int a, int b) => a + b;
  int subtract(int a, int b) => a - b;
  double divide(int a, int b) {
    if (b == 0) throw ArgumentError('ゼロ除算');
    return a / b;
  }
}

// テストの模擬実装（ブラウザで動作確認用）
void runTest(String name, void Function() body) {
  try {
    body();
    print('✓ \$name');
  } catch (e) {
    print('✗ \$name: \$e');
  }
}

void assertEqual(dynamic actual, dynamic expected) {
  if (actual != expected) throw AssertionError('\$actual != \$expected');
}

void main() {
  final calc = Calculator();

  runTest('add(2, 3) は 5', () => assertEqual(calc.add(2, 3), 5));
  runTest('subtract(10, 4) は 6', () => assertEqual(calc.subtract(10, 4), 6));
  runTest('divide(10, 2) は 5.0', () => assertEqual(calc.divide(10, 2), 5.0));
  runTest('divide(10, 0) は例外', () {
    try {
      calc.divide(10, 0);
      throw AssertionError('例外が発生すべき');
    } on ArgumentError {
      // 期待通り
    }
  });
}`}
          expectedOutput={`✓ add(2, 3) は 5
✓ subtract(10, 4) は 6
✓ divide(10, 2) は 5.0
✓ divide(10, 0) は例外`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">グループとマッチャー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">group()</code>でテストを整理し、豊富なマッチャーで検証します。
        </p>
        <DartEditor
          defaultCode={`// testパッケージのgroup/matcherの使い方例
// 実際のテストファイルでは:
// import 'package:test/test.dart';
// group('Calculator', () {
//   test('add', () { expect(calc.add(2, 3), equals(5)); });
//   test('throws on divide by zero', () {
//     expect(() => calc.divide(1, 0), throwsArgumentError);
//   });
// });

// マッチャーの例（模擬実装）
void demonstrate() {
  final list = [1, 2, 3, 4, 5];

  // equals - 等値
  print('equals: \${list[0] == 1}');

  // contains
  print('contains 3: \${list.contains(3)}');

  // hasLength
  print('length is 5: \${list.length == 5}');

  // isNull / isNotNull
  String? nullable;
  print('isNull: \${nullable == null}');
  nullable = 'value';
  print('isNotNull: \${nullable != null}');

  // isA<T> 型チェック
  dynamic value = 'hello';
  print('isString: \${value is String}');
  print('isInt: \${value is int}');
}

void main() => demonstrate();`}
          expectedOutput={`equals: true
contains 3: true
length is 5: true
isNull: true
isNotNull: true
isString: true
isInt: false`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
