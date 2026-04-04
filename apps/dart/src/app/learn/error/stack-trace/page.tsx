import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function StackTracePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">スタックトレース</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-red-300">StackTrace</strong>は例外が発生したときの呼び出しスタックの情報を持ちます。
            catchブロックで<code className="text-red-300">catch (e, s)</code>のように第2引数でスタックトレースを受け取り、デバッグやログ記録に使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">スタックトレースの取得</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">catch (e, stackTrace)</code>でスタックトレースを受け取れます。
        </p>
        <DartEditor
          defaultCode={`void level3() {
  throw Exception('深いところで発生した例外');
}

void level2() {
  level3();
}

void level1() {
  level2();
}

void main() {
  try {
    level1();
  } catch (e, s) {
    print('例外: \$e');
    print('');
    // スタックトレースの最初の3行だけ表示
    final lines = s.toString().split('\\n');
    print('スタックトレース（先頭部分）:');
    for (final line in lines.take(3)) {
      if (line.isNotEmpty) print('  \$line');
    }
  }

  // StackTrace.current で現在位置を取得
  final current = StackTrace.current;
  print('\\n現在のスタックトレース取得: 成功');
  print('型: \${current.runtimeType}');
}`}
          expectedOutput={`例外: Exception: 深いところで発生した例外

スタックトレース（先頭部分）:
  #0      level3 (file:///main.dart:3:3)
  #1      level2 (file:///main.dart:7:3)
  #2      level1 (file:///main.dart:11:3)

現在のスタックトレース取得: 成功
型: _StackTrace`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">エラーのログ記録</h2>
        <p className="text-gray-400 mb-4">
          スタックトレースをログに記録して、後でデバッグできるようにします。
        </p>
        <DartEditor
          defaultCode={`class ErrorLogger {
  final List<String> _logs = [];

  void log(Object error, StackTrace stackTrace) {
    final timestamp = DateTime.now().toIso8601String();
    final entry = '[\$timestamp] \${error.runtimeType}: \$error';
    _logs.add(entry);
    print('ログ記録: \$entry');
  }

  void printLogs() {
    print('\\n=== エラーログ (\${_logs.length}件) ===');
    for (final log in _logs) {
      print('  \$log');
    }
  }
}

final logger = ErrorLogger();

T safeRun<T>(T Function() fn, T defaultValue) {
  try {
    return fn();
  } catch (e, s) {
    logger.log(e, s);
    return defaultValue;
  }
}

void main() {
  final results = [
    safeRun(() => int.parse('42'), 0),
    safeRun(() => int.parse('abc'), 0),
    safeRun(() => 10 ~/ 2, -1),
    safeRun(() => throw StateError('状態異常'), -1),
  ];

  print('結果: \$results');
  logger.printLogs();
}`}
          expectedOutput={`ログ記録: [2024-01-01T00:00:00.000] FormatException: FormatException: Invalid radix-10 number (at character 1)
ログ記録: [2024-01-01T00:00:00.000] StateError: Bad state: 状態異常
結果: [42, 0, 5, -1]

=== エラーログ (2件) ===
  [2024-01-01T00:00:00.000] FormatException: FormatException: Invalid radix-10 number (at character 1)
  [2024-01-01T00:00:00.000] StateError: Bad state: 状態異常`}
        />
      </section>

      <LessonCompleteButton lessonId="stack-trace" categoryId="error" />
      <LessonNav lessons={lessons} currentId="stack-trace" basePath="/learn/error" />
    </div>
  );
}
