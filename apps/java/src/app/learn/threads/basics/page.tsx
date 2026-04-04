import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

export default function ThreadBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">マルチスレッド レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スレッドの基本</h1>
        <p className="text-gray-400">new Thread(Runnable)、start()、join()、Thread.sleepの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スレッドとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スレッドはプログラム内で独立して実行される処理の単位です。
          複数のスレッドを使うことで、重い処理を並行して実行できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>new Thread(Runnable)</code> でスレッドを作成</li>
          <li><code>start()</code> でスレッドを開始（<code>run()</code>を直接呼ばない）</li>
          <li><code>join()</code> でスレッドの完了を待つ</li>
          <li><code>Thread.sleep(ms)</code> でスレッドを一時停止</li>
          <li><code>Thread.currentThread().getName()</code> で現在のスレッド名を取得</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スレッドの作成と開始</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Runnable</code> を実装して
          <code className="text-orange-300">Thread</code> に渡し、
          <code className="text-orange-300">start()</code> でスレッドを開始します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) throws InterruptedException {
        // Runnableインターフェースで処理を定義
        Runnable task = () -> {
            String name = Thread.currentThread().getName();
            for (int i = 1; i <= 3; i++) {
                System.out.println(name + ": カウント " + i);
            }
        };

        // スレッドの作成と開始
        Thread thread1 = new Thread(task, "スレッドA");
        Thread thread2 = new Thread(task, "スレッドB");

        System.out.println("メインスレッド: 開始");
        thread1.start();  // start()で非同期実行
        thread2.start();

        // join()で完了を待つ
        thread1.join();
        thread2.join();

        System.out.println("メインスレッド: 全スレッド完了");
    }
}`}
          expectedOutput={`メインスレッド: 開始
スレッドA: カウント 1
スレッドA: カウント 2
スレッドA: カウント 3
スレッドB: カウント 1
スレッドB: カウント 2
スレッドB: カウント 3
メインスレッド: 全スレッド完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Thread.sleepによる一時停止</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Thread.sleep()</code> で指定ミリ秒間スレッドを一時停止できます。
          重い処理のシミュレーションや定期実行に使います。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("ダウンロードシミュレーション開始");

        Thread download = new Thread(() -> {
            String[] files = {"data.csv", "image.png", "config.json"};
            for (String file : files) {
                try {
                    System.out.println("ダウンロード中: " + file);
                    Thread.sleep(100);  // 100ms待機
                    System.out.println("完了: " + file);
                } catch (InterruptedException e) {
                    System.out.println("中断されました");
                    return;
                }
            }
        });

        download.start();
        download.join();

        System.out.println("全ファイルのダウンロード完了");
    }
}`}
          expectedOutput={`ダウンロードシミュレーション開始
ダウンロード中: data.csv
完了: data.csv
ダウンロード中: image.png
完了: image.png
ダウンロード中: config.json
完了: config.json
全ファイルのダウンロード完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スレッドの状態とライフサイクル</h2>
        <p className="text-gray-400 mb-4">
          スレッドには <code className="text-orange-300">NEW</code>、<code className="text-orange-300">RUNNABLE</code>、
          <code className="text-orange-300">TERMINATED</code> などの状態があります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            System.out.println("スレッド内: 処理実行中");
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "MyThread");

        // NEW状態
        System.out.println("作成後: " + thread.getState());

        // start -> RUNNABLE
        thread.start();
        System.out.println("start後: " + thread.getState());

        // join -> TERMINATED
        thread.join();
        System.out.println("join後: " + thread.getState());

        // スレッド情報
        System.out.println("--- スレッド情報 ---");
        Thread current = Thread.currentThread();
        System.out.println("現在のスレッド: " + current.getName());
        System.out.println("スレッドID: " + current.getId());
        System.out.println("isAlive: " + thread.isAlive());
    }
}`}
          expectedOutput={`作成後: NEW
start後: RUNNABLE
スレッド内: 処理実行中
join後: TERMINATED
--- スレッド情報 ---
現在のスレッド: main
スレッドID: 1
isAlive: false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="threads" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/threads" />
    </div>
  );
}
