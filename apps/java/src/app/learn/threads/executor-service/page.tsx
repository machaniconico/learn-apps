import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

export default function ExecutorServicePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">マルチスレッド レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ExecutorService</h1>
        <p className="text-gray-400">Executors.newFixedThreadPool、submit、shutdownの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ExecutorServiceとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スレッドを直接管理する代わりに、<code className="text-orange-300">ExecutorService</code> で
          スレッドプールを使ってタスクを実行します。スレッドの再利用による効率化と、
          タスクの管理が容易になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Executors.newFixedThreadPool(n)</code> - 固定サイズのスレッドプール</li>
          <li><code>Executors.newSingleThreadExecutor()</code> - 単一スレッド</li>
          <li><code>Executors.newCachedThreadPool()</code> - 必要に応じてスレッドを増減</li>
          <li><code>submit(Runnable)</code> でタスクを投入</li>
          <li><code>shutdown()</code> で新しいタスクの受付を停止</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">FixedThreadPoolの基本</h2>
        <p className="text-gray-400 mb-4">
          固定数のスレッドでタスクを並行実行します。
          プール内のスレッドは再利用されるため効率的です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        // 2スレッドのプールを作成
        ExecutorService executor = Executors.newFixedThreadPool(2);

        // 5つのタスクを投入
        for (int i = 1; i <= 5; i++) {
            final int taskId = i;
            executor.submit(() -> {
                String thread = Thread.currentThread().getName();
                System.out.println("タスク" + taskId + " 開始 (" + thread + ")");
                try { Thread.sleep(50); } catch (InterruptedException e) {}
                System.out.println("タスク" + taskId + " 完了 (" + thread + ")");
            });
        }

        // 新しいタスクの受付を停止
        executor.shutdown();

        // 全タスクの完了を待つ（最大5秒）
        executor.awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("全タスク完了");
    }
}`}
          expectedOutput={`タスク1 開始 (pool-1-thread-1)
タスク2 開始 (pool-1-thread-2)
タスク1 完了 (pool-1-thread-1)
タスク3 開始 (pool-1-thread-1)
タスク2 完了 (pool-1-thread-2)
タスク4 開始 (pool-1-thread-2)
タスク3 完了 (pool-1-thread-1)
タスク5 開始 (pool-1-thread-1)
タスク4 完了 (pool-1-thread-2)
タスク5 完了 (pool-1-thread-1)
全タスク完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SingleThreadExecutor</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">newSingleThreadExecutor</code> は
          タスクを順番に1つずつ実行します。順序を保証したい場合に使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        System.out.println("--- 順番に実行される ---");
        for (int i = 1; i <= 4; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("タスク" + taskId + " 実行中");
                try { Thread.sleep(30); } catch (InterruptedException e) {}
            });
        }

        executor.shutdown();
        executor.awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("全タスク完了（順序保証）");
    }
}`}
          expectedOutput={`--- 順番に実行される ---
タスク1 実行中
タスク2 実行中
タスク3 実行中
タスク4 実行中
全タスク完了（順序保証）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">invokeAllで複数タスクの一括実行</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">invokeAll()</code> で複数のCallableを一括で投入し、
          すべての結果を取得できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // 複数のCallableを作成
        List<Callable<String>> tasks = Arrays.asList(
            () -> { Thread.sleep(100); return "タスクA完了"; },
            () -> { Thread.sleep(50); return "タスクB完了"; },
            () -> { Thread.sleep(75); return "タスクC完了"; }
        );

        System.out.println("invokeAllで一括実行...");
        List<Future<String>> futures = executor.invokeAll(tasks);

        // 全ての結果を取得
        for (int i = 0; i < futures.size(); i++) {
            System.out.println("結果[" + i + "]: " + futures.get(i).get());
        }

        executor.shutdown();
        System.out.println("完了");
    }
}`}
          expectedOutput={`invokeAllで一括実行...
結果[0]: タスクA完了
結果[1]: タスクB完了
結果[2]: タスクC完了
完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="threads" lessonId="executor-service" />
      </div>
      <LessonNav lessons={lessons} currentId="executor-service" basePath="/learn/threads" />
    </div>
  );
}
