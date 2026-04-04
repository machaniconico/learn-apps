import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function StreamControllerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">非同期処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">StreamController</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">StreamController</strong>を使うと、任意のタイミングでイベントを発行するカスタムStreamを作成できます。
            <code className="text-violet-300">sink</code>プロパティでデータを追加し、<code className="text-violet-300">stream</code>プロパティで購読します。
            使い終わったら必ず<code className="text-violet-300">close()</code>を呼んでください。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">StreamController の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">StreamController&lt;T&gt;</code>でカスタムストリームを作成します。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<void> main() async {
  final controller = StreamController<String>();

  // streamを購読（listen）
  final subscription = controller.stream.listen(
    (data) => print('受信: \$data'),
    onError: (e) => print('エラー: \$e'),
    onDone: () => print('ストリーム完了'),
  );

  // sinkにデータを追加
  controller.sink.add('メッセージ1');
  controller.sink.add('メッセージ2');
  controller.sink.add('メッセージ3');

  // 非同期でデータを追加
  await Future.delayed(Duration(milliseconds: 10));
  controller.sink.add('遅延メッセージ');

  // ストリームを閉じる
  await controller.close();
  await subscription.cancel();
}`}
          expectedOutput={`受信: メッセージ1
受信: メッセージ2
受信: メッセージ3
受信: 遅延メッセージ
ストリーム完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">broadcast Stream</h2>
        <p className="text-gray-400 mb-4">
          デフォルトのStreamは1つのリスナーしか持てません。複数のリスナーには<code className="text-violet-300">broadcast</code>ストリームを使います。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<void> main() async {
  // broadcastコントローラ（複数リスナー可）
  final controller = StreamController<int>.broadcast();

  // 複数のリスナーを登録
  controller.stream.listen((n) => print('リスナー1: \$n'));
  controller.stream.listen((n) => print('リスナー2: \${n * 2}'));

  for (int i = 1; i <= 3; i++) {
    controller.add(i);
  }

  await Future.delayed(Duration(milliseconds: 10));

  // StreamController.broadcast() を使わず
  // asBroadcastStream() で変換する方法
  final original = Stream.fromIterable([10, 20, 30]);
  final broadcast = original.asBroadcastStream();

  final sub1 = broadcast.listen((n) => print('A: \$n'));
  final sub2 = broadcast.listen((n) => print('B: \$n'));

  await Future.delayed(Duration(milliseconds: 10));
  await sub1.cancel();
  await sub2.cancel();
  await controller.close();
}`}
          expectedOutput={`リスナー1: 1
リスナー2: 2
リスナー1: 2
リスナー2: 4
リスナー1: 3
リスナー2: 6
A: 10
B: 10
A: 20
B: 20
A: 30
B: 30`}
        />
      </section>

      <LessonCompleteButton lessonId="stream-controller" categoryId="async" />
      <LessonNav lessons={lessons} currentId="stream-controller" basePath="/learn/async" />
    </div>
  );
}
