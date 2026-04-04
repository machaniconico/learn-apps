import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function ErrorHandlingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">非同期処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">エラーハンドリング</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            非同期処理でのエラーハンドリングは重要です。<code className="text-violet-300">async/await</code>では<code className="text-violet-300">try-catch</code>を使い、
            <code className="text-violet-300">then/catchError</code>チェーンやStreamの<code className="text-violet-300">onError</code>コールバックでも処理できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">async/await でのエラー処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">await</code>式をtry-catchで囲むことで非同期エラーを処理できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

class NetworkException implements Exception {
  final int statusCode;
  final String message;
  NetworkException(this.statusCode, this.message);

  @override
  String toString() => 'NetworkException(\$statusCode): \$message';
}

Future<String> fetchData(String url) async {
  await Future.delayed(Duration(milliseconds: 10));
  if (url.contains('error')) {
    throw NetworkException(404, 'Not Found: \$url');
  }
  return 'データ: \$url';
}

Future<void> main() async {
  final urls = ['https://api.example.com/data', 'https://api.example.com/error'];

  for (final url in urls) {
    try {
      final data = await fetchData(url);
      print('成功: \$data');
    } on NetworkException catch (e) {
      print('ネットワークエラー: \$e');
    } catch (e) {
      print('予期しないエラー: \$e');
    }
  }
}`}
          expectedOutput={`成功: データ: https://api.example.com/data
ネットワークエラー: NetworkException(404): Not Found: https://api.example.com/error`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">catchError と onError</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">.catchError()</code>でFutureのエラーをチェーンで処理できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<int> divide(int a, int b) async {
  if (b == 0) throw ArgumentError('ゼロ除算');
  return a ~/ b;
}

Future<void> main() async {
  // catchError チェーン
  await divide(10, 2)
      .then((result) => print('結果: \$result'))
      .catchError((e) => print('エラー: \$e'));

  await divide(10, 0)
      .then((result) => print('結果: \$result'))
      .catchError(
        (e) => print('ArgumentError処理: \${e.message}'),
        test: (e) => e is ArgumentError,
      );

  // Stream のエラーハンドリング
  final stream = Stream.fromIterable([1, 2, 3])
      .map((n) {
        if (n == 2) throw Exception('2はエラー');
        return n * 10;
      })
      .handleError((e) => print('StreamError: \$e'));

  await for (final v in stream) {
    print('値: \$v');
  }
}`}
          expectedOutput={`結果: 5
ArgumentError処理: ゼロ除算
値: 10
StreamError: Exception: 2はエラー
値: 30`}
        />
      </section>

      <LessonCompleteButton lessonId="error-handling" categoryId="async" />
      <LessonNav lessons={lessons} currentId="error-handling" basePath="/learn/async" />
    </div>
  );
}
