import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function WidgetTestOverviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">テスト</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ウィジェットテスト概要</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">ウィジェットテスト</strong>はFlutterのUIコンポーネントを検証するテストです。
            <code className="text-green-300">flutter_test</code>パッケージの<code className="text-green-300">WidgetTester</code>でウィジェットを操作し、
            <code className="text-green-300">find</code>でウィジェットを検索して期待値を検証します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ウィジェットテストの基本構造</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">testWidgets</code>でウィジェットをレンダリングし、<code className="text-green-300">find</code>で要素を検索します。
        </p>
        <DartEditor
          defaultCode={`// ウィジェットテストの構造（コメントで説明）
/*
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Counter increments smoke test', (WidgetTester tester) async {
    // ウィジェットをレンダリング
    await tester.pumpWidget(MyApp());

    // 初期状態を確認
    expect(find.text('0'), findsOneWidget);
    expect(find.text('1'), findsNothing);

    // ボタンをタップ
    await tester.tap(find.byIcon(Icons.add));
    await tester.pump(); // 再レンダリング

    // 状態変化を確認
    expect(find.text('0'), findsNothing);
    expect(find.text('1'), findsOneWidget);
  });
}
*/

// テストの種類
void explainTestTypes() {
  final types = [
    ('ユニットテスト', 'dart test', '単一の関数・クラスをテスト'),
    ('ウィジェットテスト', 'flutter test', 'UIコンポーネントをテスト'),
    ('統合テスト', 'flutter test integration_test', 'アプリ全体をE2Eテスト'),
  ];

  print('=== Dartテストの種類 ===\\n');
  for (final (name, cmd, desc) in types) {
    print('■ \$name');
    print('  コマンド: \$cmd');
    print('  用途: \$desc');
    print('');
  }
}

// find の種類
void explainFinders() {
  print('=== find の種類 ===\\n');
  final finders = [
    ('find.text("テキスト")', 'テキストウィジェットを検索'),
    ('find.byType(Button)', '型でウィジェットを検索'),
    ('find.byKey(Key("id"))', 'キーでウィジェットを検索'),
    ('find.byIcon(Icons.add)', 'アイコンで検索'),
    ('find.byWidget(widget)', 'インスタンスで検索'),
  ];

  for (final (finder, desc) in finders) {
    print('\$finder');
    print('  → \$desc');
  }
}

void main() {
  explainTestTypes();
  explainFinders();
}`}
          expectedOutput={`=== Dartテストの種類 ===

■ ユニットテスト
  コマンド: dart test
  用途: 単一の関数・クラスをテスト

■ ウィジェットテスト
  コマンド: flutter test
  用途: UIコンポーネントをテスト

■ 統合テスト
  コマンド: flutter test integration_test
  用途: アプリ全体をE2Eテスト

=== find の種類 ===

find.text("テキスト")
  → テキストウィジェットを検索
find.byType(Button)
  → 型でウィジェットを検索
find.byKey(Key("id"))
  → キーでウィジェットを検索
find.byIcon(Icons.add)
  → アイコンで検索
find.byWidget(widget)
  → インスタンスで検索`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ウィジェットテストのパターン</h2>
        <p className="text-gray-400 mb-4">
          実際のウィジェットテストでよく使うパターンを確認しましょう。
        </p>
        <DartEditor
          defaultCode={`// ウィジェットテストのパターン集
/*
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

// テスト対象ウィジェット
class GreetingWidget extends StatelessWidget {
  final String name;
  const GreetingWidget({required this.name, super.key});

  @override
  Widget build(BuildContext context) {
    return Text('こんにちは、\$name！');
  }
}

void main() {
  // パターン1: テキスト表示を確認
  testWidgets('GreetingWidget shows name', (tester) async {
    await tester.pumpWidget(
      MaterialApp(home: GreetingWidget(name: '太郎')),
    );
    expect(find.text('こんにちは、太郎！'), findsOneWidget);
  });

  // パターン2: ボタンタップ
  testWidgets('Button tap changes state', (tester) async {
    await tester.pumpWidget(MaterialApp(home: MyCounter()));
    await tester.tap(find.byType(ElevatedButton));
    await tester.pump();
    expect(find.text('1'), findsOneWidget);
  });

  // パターン3: スクロール
  testWidgets('List scrolls', (tester) async {
    await tester.pumpWidget(MaterialApp(home: MyList()));
    await tester.drag(find.byType(ListView), Offset(0, -300));
    await tester.pump();
  });

  // パターン4: テキスト入力
  testWidgets('TextField input', (tester) async {
    await tester.pumpWidget(MaterialApp(home: MyForm()));
    await tester.enterText(find.byType(TextField), 'テスト入力');
    expect(find.text('テスト入力'), findsOneWidget);
  });
}
*/

// Matcher の組み合わせ
void showMatchers() {
  print('=== ウィジェット検証Matcher ===\\n');
  final matchers = [
    ('findsOneWidget', 'ちょうど1個見つかる'),
    ('findsNothing', '1個も見つからない'),
    ('findsWidgets', '1個以上見つかる'),
    ('findsNWidgets(n)', 'ちょうどn個見つかる'),
    ('matchesGoldenFile', 'スクリーンショットと一致'),
  ];

  for (final (matcher, desc) in matchers) {
    print('expect(find.xxx, \$matcher)');
    print('  → \$desc\\n');
  }
}

void main() {
  showMatchers();
  print('ウィジェットテストはFlutterプロジェクトで');
  print('flutter test コマンドで実行してください');
}`}
          expectedOutput={`=== ウィジェット検証Matcher ===

expect(find.xxx, findsOneWidget)
  → ちょうど1個見つかる

expect(find.xxx, findsNothing)
  → 1個も見つからない

expect(find.xxx, findsWidgets)
  → 1個以上見つかる

expect(find.xxx, findsNWidgets(n))
  → ちょうどn個見つかる

expect(find.xxx, matchesGoldenFile)
  → スクリーンショットと一致

ウィジェットテストはFlutterプロジェクトで
flutter test コマンドで実行してください`}
        />
      </section>

      <LessonCompleteButton lessonId="widget-test-overview" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="widget-test-overview" basePath="/learn/testing" />
    </div>
  );
}
