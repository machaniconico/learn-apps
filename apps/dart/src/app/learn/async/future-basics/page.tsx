import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function FutureBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">非同期処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Futureの基本</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">Future</strong>はDartの非同期処理の基本単位で、将来完了する値を表します。
            JavaScriptの<code className="text-violet-300">Promise</code>に相当します。
            Futureは3つの状態（未完了・完了・エラー）を持ちます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Future の基本的な使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">Future.delayed()</code>で遅延処理を作成し、<code className="text-violet-300">.then()</code>で完了時の処理を定義します。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<String> fetchMessage() {
  return Future.delayed(
    Duration(milliseconds: 100),
    () => 'Futureから届いたメッセージ',
  );
}

Future<int> calculateAsync(int n) {
  return Future.value(n * n); // 即座に完了するFuture
}

Future<void> main() async {
  print('処理開始');

  // then() チェーン
  fetchMessage().then((msg) {
    print('受信: \$msg');
  });

  // 即座に完了するFuture
  final result = await calculateAsync(7);
  print('計算結果: \$result');

  // Future.value と Future.error
  final success = Future.value('成功');
  final failure = Future<String>.error('エラー発生');

  await success.then(print).catchError((e) => print('エラー: \$e'));
  await failure.then(print).catchError((e) => print('エラー: \$e'));
}`}
          expectedOutput={`処理開始
計算結果: 49
受信: Futureから届いたメッセージ
成功
エラー: エラー発生`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Future のチェーン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">.then()</code>をチェーンして連続した非同期処理を記述できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<String> step1() => Future.delayed(
  Duration(milliseconds: 10), () => 'ステップ1完了');

Future<String> step2(String prev) => Future.delayed(
  Duration(milliseconds: 10), () => '\$prev -> ステップ2完了');

Future<String> step3(String prev) => Future.delayed(
  Duration(milliseconds: 10), () => '\$prev -> ステップ3完了');

Future<void> main() async {
  // thenチェーン
  final result = await step1()
      .then(step2)
      .then(step3);

  print(result);

  // whenComplete: 成功・失敗どちらでも実行
  await Future.value('データ')
      .then((v) => print('値: \$v'))
      .whenComplete(() => print('完了（成功時）'));
}`}
          expectedOutput={`ステップ1完了 -> ステップ2完了 -> ステップ3完了
値: データ
完了（成功時）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Future の型とジェネリクス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">Future&lt;T&gt;</code>は型パラメータを持ちます。<code className="text-violet-300">Future&lt;void&gt;</code>は値を返さない非同期処理に使います。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<int> fetchCount() async => 42;
Future<String> fetchName() async => 'Dart';
Future<bool> checkStatus() async => true;
Future<void> doWork() async {
  print('作業中...');
}

Future<void> main() async {
  final count = await fetchCount();
  final name = await fetchName();
  final status = await checkStatus();

  print('カウント: \$count (型: \${count.runtimeType})');
  print('名前: \$name (型: \${name.runtimeType})');
  print('状態: \$status (型: \${status.runtimeType})');

  await doWork();
  print('全処理完了');
}`}
          expectedOutput={`カウント: 42 (型: int)
名前: Dart (型: String)
状態: true (型: bool)
作業中...
全処理完了`}
        />
      </section>

      <LessonCompleteButton lessonId="future-basics" categoryId="async" />
      <LessonNav lessons={lessons} currentId="future-basics" basePath="/learn/async" />
    </div>
  );
}
