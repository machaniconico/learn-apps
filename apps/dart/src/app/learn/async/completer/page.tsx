import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function CompleterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">非同期処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Completer</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">Completer</strong>はFutureを手動で完了させるためのクラスです。
            コールバックベースのAPIをFutureに変換したい場合や、外部から完了タイミングを制御したい場合に使います。
            <code className="text-violet-300">completer.future</code>を渡し、<code className="text-violet-300">completer.complete()</code>で完了させます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Completer の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">Completer&lt;T&gt;</code>でFutureを手動制御できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

// コールバックベースのAPIをFutureに変換する例
Future<String> loadDataWithCallback() {
  final completer = Completer<String>();

  // コールバックスタイルのAPIを模擬
  Timer(Duration(milliseconds: 50), () {
    completer.complete('コールバックから取得したデータ');
  });

  return completer.future;
}

Future<void> main() async {
  final data = await loadDataWithCallback();
  print(data);

  // エラーケース
  Future<int> riskyLoad() {
    final completer = Completer<int>();
    Timer(Duration(milliseconds: 10), () {
      // エラーで完了
      completer.completeError(Exception('読み込み失敗'));
    });
    return completer.future;
  }

  try {
    await riskyLoad();
  } catch (e) {
    print('エラーキャッチ: \$e');
  }

  print('処理完了');
}`}
          expectedOutput={`コールバックから取得したデータ
エラーキャッチ: Exception: 読み込み失敗
処理完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Completer の実践例</h2>
        <p className="text-gray-400 mb-4">
          タイムアウト付きの処理など、実践的なCompleterの使用例を見てみましょう。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<T> withTimeout<T>(Future<T> operation, Duration timeout) {
  final completer = Completer<T>();

  operation.then((value) {
    if (!completer.isCompleted) {
      completer.complete(value);
    }
  }).catchError((e) {
    if (!completer.isCompleted) {
      completer.completeError(e);
    }
  });

  Timer(timeout, () {
    if (!completer.isCompleted) {
      completer.completeError(TimeoutException('タイムアウト', timeout));
    }
  });

  return completer.future;
}

Future<void> main() async {
  // 速い処理（タイムアウトなし）
  try {
    final result = await withTimeout(
      Future.delayed(Duration(milliseconds: 10), () => '高速処理完了'),
      Duration(milliseconds: 100),
    );
    print(result);
  } on TimeoutException catch (e) {
    print('タイムアウト: \$e');
  }

  // 遅い処理（タイムアウトあり）
  try {
    await withTimeout(
      Future.delayed(Duration(milliseconds: 200), () => '遅い処理'),
      Duration(milliseconds: 50),
    );
  } on TimeoutException {
    print('タイムアウトしました');
  }
}`}
          expectedOutput={`高速処理完了
タイムアウトしました`}
        />
      </section>

      <LessonCompleteButton lessonId="completer" categoryId="async" />
      <LessonNav lessons={lessons} currentId="completer" basePath="/learn/async" />
    </div>
  );
}
