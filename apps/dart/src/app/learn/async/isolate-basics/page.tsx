import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function IsolateBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">非同期処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Isolateの基本</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartはシングルスレッドですが、<strong className="text-violet-300">Isolate</strong>を使って真の並列処理ができます。
            IsolateはOSのスレッドに対応し、メモリを共有せずメッセージパッシングで通信します。
            CPU負荷の高い処理をメインIsolateから分離するのに使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Isolate.run() による並列処理</h2>
        <p className="text-gray-400 mb-4">
          Dart 2.19以降、<code className="text-violet-300">Isolate.run()</code>で簡単に別Isolateで処理を実行できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:isolate';

// CPU負荷の高い計算（フィボナッチ）
int fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

Future<void> main() async {
  print('メインIsolate開始');

  // Isolate.run() で別スレッドで実行
  final result = await Isolate.run(() => fibonacci(35));
  print('fibonacci(35) = \$result');

  // 複数の計算を並列実行
  final results = await Future.wait([
    Isolate.run(() => fibonacci(30)),
    Isolate.run(() => fibonacci(31)),
    Isolate.run(() => fibonacci(32)),
  ]);

  print('fibonacci(30) = \${results[0]}');
  print('fibonacci(31) = \${results[1]}');
  print('fibonacci(32) = \${results[2]}');

  print('全計算完了');
}`}
          expectedOutput={`メインIsolate開始
fibonacci(35) = 9227465
fibonacci(30) = 832040
fibonacci(31) = 1346269
fibonacci(32) = 2178309
全計算完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Isolate とメッセージパッシング</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">ReceivePort</code>と<code className="text-violet-300">SendPort</code>を使ったIsolate間通信の基本を学びます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:isolate';

void workerIsolate(SendPort sendPort) {
  // Workerでの処理
  final results = <int>[];
  for (int i = 1; i <= 5; i++) {
    results.add(i * i);
  }
  sendPort.send(results);
}

Future<void> main() async {
  // ReceivePort を作成
  final receivePort = ReceivePort();

  // Isolate を生成してworkerを実行
  await Isolate.spawn(workerIsolate, receivePort.sendPort);

  // 結果を受信
  final result = await receivePort.first as List<int>;
  print('Isolateからの結果: \$result');

  receivePort.close();

  // Isolateの基本情報
  print('現在のIsolate: \${Isolate.current.debugName}');
}`}
          expectedOutput={`Isolateからの結果: [1, 4, 9, 16, 25]
現在のIsolate: main`}
        />
      </section>

      <LessonCompleteButton lessonId="isolate-basics" categoryId="async" />
      <LessonNav lessons={lessons} currentId="isolate-basics" basePath="/learn/async" />
    </div>
  );
}
