import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartでの非同期処理の基本単位は何ですか？",
    options: ["Promise", "Future", "Task", "Async"],
    answer: 1,
    explanation: "DartではFutureが非同期処理の基本単位です。Futureは将来完了する値を表し、JavaScriptのPromiseに相当します。",
  },
  {
    question: "async関数内でFutureの完了を待つキーワードは何ですか？",
    options: ["wait", "then", "await", "resolve"],
    answer: 2,
    explanation: "awaitキーワードを使うとFutureの完了を待ちます。awaitはasync関数内でのみ使用できます。",
  },
  {
    question: "複数のFutureを並列に実行して全て完了を待つメソッドは？",
    options: ["Future.all()", "Future.wait()", "Future.parallel()", "Future.join()"],
    answer: 1,
    explanation: "Future.wait()はFutureのリストを受け取り、全てが完了するまで待ちます。並列実行なので順次実行より効率的です。",
  },
  {
    question: "Streamとは何ですか？",
    options: [
      "単一の非同期値",
      "非同期で連続するデータの流れ",
      "同期的なデータ処理",
      "エラーハンドリング機構",
    ],
    answer: 1,
    explanation: "Streamは非同期で連続するデータイベントの流れです。ファイル読み込み、ユーザー入力、WebSocketなどで使われます。",
  },
];

export default function AsyncPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">非同期処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          DartのFuture・async/await・Streamを使った非同期プログラミングを学びましょう。ネットワーク通信、ファイル操作、ユーザーインタラクションなど、現実的なアプリ開発に不可欠な非同期処理のパターンをマスターします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="async" totalLessons={8} color="violet" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/async" color="violet" categoryId="async" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Future と async/await</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">async</code>関数は<code className="text-violet-300">Future</code>を返し、<code className="text-violet-300">await</code>で完了を待ちます。同期的なコードのように書けます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Future<String> fetchUserName(int id) async {
  // 実際はHTTP通信などの非同期処理
  await Future.delayed(Duration(milliseconds: 100));
  return 'ユーザー\$id';
}

Future<int> fetchUserScore(String name) async {
  await Future.delayed(Duration(milliseconds: 50));
  return name.length * 10;
}

Future<void> main() async {
  print('データ取得開始');

  final name = await fetchUserName(42);
  print('名前: \$name');

  final score = await fetchUserScore(name);
  print('スコア: \$score');

  print('完了');
}`}
          expectedOutput={`データ取得開始
名前: ユーザー42
スコア: 80
完了`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Stream の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">Stream</code>は連続するイベントを非同期で処理します。<code className="text-violet-300">async*</code>と<code className="text-violet-300">yield</code>でストリームを生成できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:async';

Stream<int> countDown(int from) async* {
  for (int i = from; i >= 0; i--) {
    await Future.delayed(Duration(milliseconds: 10));
    yield i;
  }
}

Future<void> main() async {
  print('カウントダウン開始');

  await for (final count in countDown(5)) {
    if (count == 0) {
      print('発射！');
    } else {
      print('\$count...');
    }
  }

  // Streamをリストに変換
  final numbers = await Stream.fromIterable([1, 2, 3, 4, 5])
      .map((n) => n * n)
      .toList();
  print('二乗: \$numbers');
}`}
          expectedOutput={`カウントダウン開始
5...
4...
3...
2...
1...
発射！
二乗: [1, 4, 9, 16, 25]`}
        />
      </section>
      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
