import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

export default function FutureCallablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">マルチスレッド レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Future・Callable</h1>
        <p className="text-gray-400">Callable&lt;T&gt;、Future.get()、isDone()の使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CallableとFuture</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">Runnable</code> は戻り値を返せませんが、
          <code className="text-orange-300">Callable&lt;T&gt;</code> は結果を返すことができます。
          <code className="text-orange-300">Future</code> で非同期タスクの結果を受け取ります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Callable&lt;T&gt;</code> - 値を返し、例外も投げられるタスク</li>
          <li><code>Future&lt;T&gt;</code> - 非同期計算の結果を表す</li>
          <li><code>future.get()</code> - 結果を取得（完了まで待機）</li>
          <li><code>future.get(timeout, unit)</code> - タイムアウト付き取得</li>
          <li><code>future.isDone()</code> - 完了したかチェック</li>
          <li><code>future.cancel()</code> - タスクのキャンセル</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Callableの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Callable</code> をsubmitすると
          <code className="text-orange-300">Future</code> が返され、後から結果を取得できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        // Callable: 値を返すタスク
        Callable<Integer> calcTask = () -> {
            System.out.println("計算中...");
            Thread.sleep(100);
            return 42;
        };

        Callable<String> greetTask = () -> {
            System.out.println("挨拶準備中...");
            Thread.sleep(50);
            return "Hello, Future!";
        };

        // submitでFutureを取得
        Future<Integer> numFuture = executor.submit(calcTask);
        Future<String> strFuture = executor.submit(greetTask);

        // isDoneで完了チェック
        System.out.println("数値タスク完了? " + numFuture.isDone());

        // get()で結果を取得（完了まで待機）
        Integer number = numFuture.get();
        String greeting = strFuture.get();

        System.out.println("数値結果: " + number);
        System.out.println("文字列結果: " + greeting);
        System.out.println("数値タスク完了? " + numFuture.isDone());

        executor.shutdown();
    }
}`}
          expectedOutput={`計算中...
挨拶準備中...
数値タスク完了? false
数値結果: 42
文字列結果: Hello, Future!
数値タスク完了? true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">タイムアウトとキャンセル</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">get(timeout, unit)</code> でタイムアウトを設定し、
          <code className="text-orange-300">cancel()</code> でタスクをキャンセルできます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        // 長い処理
        Future<String> future = executor.submit(() -> {
            Thread.sleep(3000);  // 3秒かかる
            return "完了";
        });

        try {
            // 500msでタイムアウト
            String result = future.get(500, TimeUnit.MILLISECONDS);
            System.out.println("結果: " + result);
        } catch (TimeoutException e) {
            System.out.println("タイムアウト！処理が遅すぎます");
            // タスクをキャンセル
            boolean cancelled = future.cancel(true);
            System.out.println("キャンセル成功: " + cancelled);
            System.out.println("キャンセル済み? " + future.isCancelled());
        } catch (Exception e) {
            System.out.println("エラー: " + e.getMessage());
        }

        executor.shutdown();
    }
}`}
          expectedOutput={`タイムアウト！処理が遅すぎます
キャンセル成功: true
キャンセル済み? true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のFutureの結果を集約</h2>
        <p className="text-gray-400 mb-4">
          複数の非同期タスクの結果を集めて処理するパターンです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.concurrent.*;

public class Main {
    // 価格を非同期で取得するシミュレーション
    static Callable<Integer> fetchPrice(String store, int price, int delay) {
        return () -> {
            Thread.sleep(delay);
            System.out.println(store + ": " + price + "円");
            return price;
        };
    }

    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // 複数店舗の価格を並行取得
        List<Future<Integer>> futures = new ArrayList<>();
        futures.add(executor.submit(fetchPrice("店舗A", 1200, 100)));
        futures.add(executor.submit(fetchPrice("店舗B", 980, 50)));
        futures.add(executor.submit(fetchPrice("店舗C", 1100, 75)));

        // 全結果を取得して最安値を計算
        int minPrice = Integer.MAX_VALUE;
        for (Future<Integer> f : futures) {
            int price = f.get();
            minPrice = Math.min(minPrice, price);
        }

        System.out.println("最安値: " + minPrice + "円");

        executor.shutdown();
    }
}`}
          expectedOutput={`店舗B: 980円
店舗C: 1100円
店舗A: 1200円
最安値: 980円`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="threads" lessonId="future-callable" />
      </div>
      <LessonNav lessons={lessons} currentId="future-callable" basePath="/learn/threads" />
    </div>
  );
}
