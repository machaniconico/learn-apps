import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

const quizQuestions: QuizQuestion[] = [
  {
    question: "スレッドを作成する方法として正しいものはどれですか？",
    options: [
      "Threadクラスを継承するか、Runnableインターフェースを実装する",
      "Processクラスを使用する",
      "mainメソッド内でのみ作成できる",
      "staticメソッドとして定義する",
    ],
    answer: 0,
    explanation: "Javaでスレッドを作成するには、Threadクラスを継承する方法とRunnableインターフェースを実装する方法があります。Runnableの方が柔軟で推奨されます。",
  },
  {
    question: "synchronizedキーワードの役割として正しいものはどれですか？",
    options: [
      "複数スレッドからの同時アクセスを防ぎ、排他制御を実現する",
      "スレッドの実行速度を同期させる",
      "スレッドの優先度を設定する",
      "スレッドを並列実行させる",
    ],
    answer: 0,
    explanation: "synchronizedは排他制御（ミューテックス）を実現するキーワードです。メソッドまたはブロックに付けることで、同時に1つのスレッドのみがそのコードを実行できます。",
  },
  {
    question: "ExecutorServiceについて正しいものはどれですか？",
    options: [
      "スレッドプールを管理し、タスクの実行と結果の取得を効率的に行うフレームワーク",
      "単一スレッドでのみ動作する",
      "GUIアプリケーション専用のクラス",
      "ファイルI/O専用のスレッド管理クラス",
    ],
    answer: 0,
    explanation: "ExecutorServiceはjava.util.concurrentパッケージのスレッドプール管理フレームワークです。Executors.newFixedThreadPool()などでプールを作成し、submit()でタスクを投入します。",
  },
  {
    question: "CompletableFutureの特徴として正しいものはどれですか？",
    options: [
      "非同期処理の結果を連鎖的に処理でき、thenApply/thenAcceptなどでパイプラインを構築できる",
      "同期処理専用のクラスである",
      "Java 7で導入された",
      "例外処理ができない",
    ],
    answer: 0,
    explanation: "CompletableFuture（Java 8）は非同期プログラミングのための強力なクラスです。thenApply、thenCompose、thenAcceptなどで処理を連鎖させ、exceptionallyで例外を処理できます。",
  },
];

export default function ThreadsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">マルチスレッド</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Javaのマルチスレッドプログラミングを学びましょう。Thread/Runnableによるスレッド作成、
          synchronizedによる排他制御、ExecutorServiceによるスレッドプール管理、そしてCompletableFutureによる非同期処理を理解します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="threads" totalLessons={6} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/threads" color="violet" categoryId="threads" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Runnableによるスレッド作成</h2>
        <p className="text-gray-400 mb-4">
          Runnableインターフェースを使ったスレッド作成の基本を確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        System.out.println("=== スレッドの基本 ===");
        System.out.println("メインスレッド: " + Thread.currentThread().getName());

        // Runnableでスレッド作成
        Runnable task1 = () -> {
            String name = Thread.currentThread().getName();
            for (int i = 1; i <= 3; i++) {
                System.out.println(name + ": カウント " + i);
            }
        };

        Runnable task2 = () -> {
            String name = Thread.currentThread().getName();
            for (int i = 1; i <= 3; i++) {
                System.out.println(name + ": 処理 " + i);
            }
        };

        // スレッドの実行（シミュレーション：順次実行）
        System.out.println();
        System.out.println("=== タスク1の実行 ===");
        Thread t1 = new Thread(task1, "Worker-1");
        t1.run(); // デモ用にrunで順次実行

        System.out.println();
        System.out.println("=== タスク2の実行 ===");
        Thread t2 = new Thread(task2, "Worker-2");
        t2.run();

        System.out.println();
        System.out.println("=== スレッドの状態 ===");
        System.out.println("ラムダ式で簡潔にタスクを定義できます");
        System.out.println("start()で別スレッドとして非同期実行されます");
        System.out.println("join()で完了を待機できます");
    }
}`}
          expectedOutput={`=== スレッドの基本 ===
メインスレッド: main

=== タスク1の実行 ===
Worker-1: カウント 1
Worker-1: カウント 2
Worker-1: カウント 3

=== タスク2の実行 ===
Worker-2: 処理 1
Worker-2: 処理 2
Worker-2: 処理 3

=== スレッドの状態 ===
ラムダ式で簡潔にタスクを定義できます
start()で別スレッドとして非同期実行されます
join()で完了を待機できます`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ExecutorServiceとスレッドプール</h2>
        <p className="text-gray-400 mb-4">
          ExecutorServiceを使ったスレッドプール管理のパターンを学びましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.concurrent.*;

public class Main {
    // タスクの結果を返すCallable
    static Callable<String> createTask(String name, int duration) {
        return () -> {
            // 処理をシミュレーション
            return name + "の結果 (" + duration + "ms)";
        };
    }

    public static void main(String[] args) throws Exception {
        System.out.println("=== ExecutorService の概要 ===");
        System.out.println("スレッドプールでタスクを効率的に管理します");
        System.out.println();

        // タスクリストの作成
        List<Callable<String>> tasks = List.of(
            createTask("データ取得", 200),
            createTask("画像処理", 500),
            createTask("メール送信", 300),
            createTask("ログ保存", 100)
        );

        System.out.println("=== タスク実行結果 ===");
        // シミュレーション: 各タスクの結果を取得
        for (Callable<String> task : tasks) {
            String result = task.call();
            System.out.println("完了: " + result);
        }

        System.out.println();
        System.out.println("=== ExecutorService API ===");
        System.out.println("Executors.newFixedThreadPool(n)  - 固定サイズプール");
        System.out.println("Executors.newCachedThreadPool()  - 可変サイズプール");
        System.out.println("executor.submit(task)            - タスク投入");
        System.out.println("executor.invokeAll(tasks)        - 全タスク実行");
        System.out.println("future.get()                     - 結果取得（ブロック）");
        System.out.println("executor.shutdown()              - シャットダウン");
    }
}`}
          expectedOutput={`=== ExecutorService の概要 ===
スレッドプールでタスクを効率的に管理します

=== タスク実行結果 ===
完了: データ取得の結果 (200ms)
完了: 画像処理の結果 (500ms)
完了: メール送信の結果 (300ms)
完了: ログ保存の結果 (100ms)

=== ExecutorService API ===
Executors.newFixedThreadPool(n)  - 固定サイズプール
Executors.newCachedThreadPool()  - 可変サイズプール
executor.submit(task)            - タスク投入
executor.invokeAll(tasks)        - 全タスク実行
future.get()                     - 結果取得（ブロック）
executor.shutdown()              - シャットダウン`}
        />
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
