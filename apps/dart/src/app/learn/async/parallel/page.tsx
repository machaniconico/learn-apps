import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function ParallelPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">非同期処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">並列実行</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            複数の非同期処理を並列に実行するには<code className="text-violet-300">Future.wait()</code>を使います。
            全て完了を待つ場合と、最初の完了を待つ<code className="text-violet-300">Future.any()</code>があります。
            適切な並列化で処理速度を大幅に向上できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Future.wait() による並列実行</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">Future.wait()</code>でFutureのリストを並列実行し、全て完了したら結果リストを返します。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<String> fetchA() async {
  await Future.delayed(Duration(milliseconds: 30));
  return 'データA';
}

Future<String> fetchB() async {
  await Future.delayed(Duration(milliseconds: 20));
  return 'データB';
}

Future<String> fetchC() async {
  await Future.delayed(Duration(milliseconds: 10));
  return 'データC';
}

Future<void> main() async {
  // 並列実行: 全て完了を待つ
  final results = await Future.wait([
    fetchA(),
    fetchB(),
    fetchC(),
  ]);

  print('並列結果: \$results');
  // 順序はFuture.waitに渡した順番通り

  // 型の異なるFutureをwait
  final [name, count, flag] = await Future.wait([
    Future.value('Dart'),
    Future.value(42),
    Future.value(true),
  ]);
  print('名前: \$name, 数: \$count, フラグ: \$flag');
}`}
          expectedOutput={`並列結果: [データA, データB, データC]
名前: Dart, 数: 42, フラグ: true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Future.any() と Future.wait() のエラー処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">Future.any()</code>は最初に完了したFutureの値を返します。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<String> slowServer() async {
  await Future.delayed(Duration(milliseconds: 100));
  return '遅いサーバー';
}

Future<String> fastServer() async {
  await Future.delayed(Duration(milliseconds: 10));
  return '速いサーバー';
}

Future<void> main() async {
  // Future.any: 最初に完了したものを返す
  final fastest = await Future.any([
    slowServer(),
    fastServer(),
  ]);
  print('最初に完了: \$fastest');

  // Future.wait のエラー処理
  try {
    await Future.wait([
      Future.value('成功1'),
      Future.error('失敗'),
      Future.value('成功2'),
    ]);
  } catch (e) {
    print('wait エラー: \$e');
  }

  // eagerError: false で全て実行
  final results = await Future.wait(
    [1, 2, 3].map((n) => Future.value(n * 10)),
  );
  print('全結果: \$results');
}`}
          expectedOutput={`最初に完了: 速いサーバー
wait エラー: 失敗
全結果: [10, 20, 30]`}
        />
      </section>

      <LessonCompleteButton lessonId="parallel" categoryId="async" />
      <LessonNav lessons={lessons} currentId="parallel" basePath="/learn/async" />
    </div>
  );
}
