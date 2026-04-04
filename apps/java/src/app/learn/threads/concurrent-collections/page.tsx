import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("threads");

export default function ConcurrentCollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">マルチスレッド レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">並行コレクション</h1>
        <p className="text-gray-400">ConcurrentHashMap、CopyOnWriteArrayList、BlockingQueueの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">並行コレクションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">java.util.concurrent</code> パッケージには、
          マルチスレッド環境で安全に使えるコレクションが用意されています。
          通常のコレクションをsynchronizedでラップするより高性能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>ConcurrentHashMap</code> - スレッドセーフなHashMap（セグメントロック）</li>
          <li><code>CopyOnWriteArrayList</code> - 読み取り頻度が高い場合に最適</li>
          <li><code>BlockingQueue</code> - プロデューサー・コンシューマーパターン</li>
          <li><code>ConcurrentLinkedQueue</code> - ロックフリーなキュー</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ConcurrentHashMap</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">ConcurrentHashMap</code> は複数スレッドから同時に安全に読み書きできます。
          <code className="text-orange-300">compute</code> や <code className="text-orange-300">merge</code> で
          アトミックな更新が可能です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ConcurrentHashMap<String, Integer> wordCount = new ConcurrentHashMap<>();

        // 複数スレッドで同時にカウント
        String[] words = {"Java", "Python", "Java", "Go", "Java", "Python", "Go", "Java"};

        Thread[] threads = new Thread[words.length];
        for (int i = 0; i < words.length; i++) {
            final String word = words[i];
            threads[i] = new Thread(() -> {
                // merge: アトミックな更新
                wordCount.merge(word, 1, Integer::sum);
            });
            threads[i].start();
        }
        for (Thread t : threads) t.join();

        System.out.println("=== 単語カウント ===");
        wordCount.forEach((k, v) -> System.out.println(k + ": " + v));

        // computeIfAbsent: キーが存在しない場合のみ計算
        wordCount.computeIfAbsent("Rust", k -> 0);
        System.out.println("Rust: " + wordCount.get("Rust"));

        // getOrDefault
        System.out.println("C++: " + wordCount.getOrDefault("C++", 0));
    }
}`}
          expectedOutput={`=== 単語カウント ===
Java: 4
Go: 2
Python: 2
Rust: 0
C++: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CopyOnWriteArrayList</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">CopyOnWriteArrayList</code> は書き込み時に内部配列をコピーします。
          読み取りが多く書き込みが少ない場合に高性能です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.concurrent.CopyOnWriteArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();

        // 複数スレッドで追加
        Thread writer1 = new Thread(() -> {
            list.add("A");
            list.add("B");
            list.add("C");
        });

        Thread writer2 = new Thread(() -> {
            list.add("X");
            list.add("Y");
            list.add("Z");
        });

        writer1.start();
        writer2.start();
        writer1.join();
        writer2.join();

        System.out.println("要素数: " + list.size());
        System.out.println("リスト: " + list);

        // イテレーション中に変更しても安全
        System.out.println("--- イテレーション中の追加 ---");
        for (String item : list) {
            if ("A".equals(item)) {
                list.add("NEW");  // ConcurrentModificationExceptionが起きない
            }
        }
        System.out.println("変更後: " + list);

        // addIfAbsent: 重複しない場合のみ追加
        list.addIfAbsent("A");   // 既に存在するので追加されない
        list.addIfAbsent("Q");   // 新規追加
        System.out.println("addIfAbsent後: " + list);
    }
}`}
          expectedOutput={`要素数: 6
リスト: [A, B, C, X, Y, Z]
--- イテレーション中の追加 ---
変更後: [A, B, C, X, Y, Z, NEW]
addIfAbsent後: [A, B, C, X, Y, Z, NEW, Q]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BlockingQueue - プロデューサー・コンシューマー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">BlockingQueue</code> はキューが空の時に取り出しをブロックし、
          満杯の時に追加をブロックします。スレッド間のデータ受け渡しに最適です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        // 容量3のBlockingQueue
        BlockingQueue<String> queue = new ArrayBlockingQueue<>(3);

        // プロデューサー: データを追加
        Thread producer = new Thread(() -> {
            String[] items = {"タスク1", "タスク2", "タスク3", "タスク4", "完了"};
            for (String item : items) {
                try {
                    queue.put(item);  // 満杯ならブロック
                    System.out.println("[生産] " + item);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        // コンシューマー: データを取り出し
        Thread consumer = new Thread(() -> {
            try {
                while (true) {
                    String item = queue.take();  // 空ならブロック
                    if ("完了".equals(item)) {
                        System.out.println("[消費] 終了シグナル受信");
                        break;
                    }
                    System.out.println("[消費] " + item + " を処理");
                    Thread.sleep(50);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();
        producer.join();
        consumer.join();

        System.out.println("キューサイズ: " + queue.size());
    }
}`}
          expectedOutput={`[生産] タスク1
[生産] タスク2
[生産] タスク3
[消費] タスク1 を処理
[生産] タスク4
[消費] タスク2 を処理
[生産] 完了
[消費] タスク3 を処理
[消費] タスク4 を処理
[消費] 終了シグナル受信
キューサイズ: 0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="threads" lessonId="concurrent-collections" />
      </div>
      <LessonNav lessons={lessons} currentId="concurrent-collections" basePath="/learn/threads" />
    </div>
  );
}
