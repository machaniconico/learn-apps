import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function AsyncAwaitPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">非同期処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">async/await</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">async/await</strong>構文を使うと、非同期コードを同期的なスタイルで書けます。
            <code className="text-violet-300">async</code>キーワードで非同期関数を宣言し、
            <code className="text-violet-300">await</code>でFutureの完了を待ちます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">async/await の基本構文</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">async</code>関数は必ず<code className="text-violet-300">Future</code>を返します。<code className="text-violet-300">await</code>はasync関数内でのみ使用できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<String> fetchUser(int id) async {
  await Future.delayed(Duration(milliseconds: 50));
  return '{"id": \$id, "name": "ユーザー\$id"}';
}

Future<List<String>> fetchPosts(int userId) async {
  await Future.delayed(Duration(milliseconds: 30));
  return ['投稿1 by \$userId', '投稿2 by \$userId'];
}

Future<void> main() async {
  print('データ取得開始');

  // awaitで順次実行
  final userJson = await fetchUser(1);
  print('ユーザー取得: \$userJson');

  final posts = await fetchPosts(1);
  print('投稿数: \${posts.length}件');
  for (final post in posts) {
    print('  - \$post');
  }

  print('処理完了');
}`}
          expectedOutput={`データ取得開始
ユーザー取得: {"id": 1, "name": "ユーザー1"}
投稿数: 2件
  - 投稿1 by 1
  - 投稿2 by 1
処理完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">async/await のエラーハンドリング</h2>
        <p className="text-gray-400 mb-4">
          async/awaitでは通常の<code className="text-violet-300">try-catch</code>でエラーを処理できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<String> riskyOperation(bool shouldFail) async {
  await Future.delayed(Duration(milliseconds: 10));
  if (shouldFail) throw Exception('操作に失敗しました');
  return '操作成功';
}

Future<void> main() async {
  // try-catchでエラー処理
  for (final shouldFail in [false, true]) {
    try {
      final result = await riskyOperation(shouldFail);
      print('結果: \$result');
    } catch (e) {
      print('エラーキャッチ: \$e');
    } finally {
      print('finally実行');
    }
    print('---');
  }
}`}
          expectedOutput={`結果: 操作成功
finally実行
---
エラーキャッチ: Exception: 操作に失敗しました
finally実行
---`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">非同期ループと条件処理</h2>
        <p className="text-gray-400 mb-4">
          ループ内でも<code className="text-violet-300">await</code>を使えますが、並列実行できる場合は<code className="text-violet-300">Future.wait</code>を使った方が効率的です。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<int> processItem(int item) async {
  await Future.delayed(Duration(milliseconds: 10));
  return item * 2;
}

Future<void> main() async {
  final items = [1, 2, 3, 4, 5];

  // 順次実行（await in loop）
  print('順次処理:');
  final sequential = <int>[];
  for (final item in items) {
    final result = await processItem(item);
    sequential.add(result);
  }
  print(sequential);

  // 並列実行（Future.wait）
  print('並列処理:');
  final parallel = await Future.wait(
    items.map((item) => processItem(item)),
  );
  print(parallel);
}`}
          expectedOutput={`順次処理:
[2, 4, 6, 8, 10]
並列処理:
[2, 4, 6, 8, 10]`}
        />
      </section>

      <LessonCompleteButton lessonId="async-await" categoryId="async" />
      <LessonNav lessons={lessons} currentId="async-await" basePath="/learn/async" />
    </div>
  );
}
