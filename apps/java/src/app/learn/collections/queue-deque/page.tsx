import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function QueueDequePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">コレクション レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">{"Queue・Deque"}</h1>
        <p className="text-gray-400">キューと両端キューの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">QueueとDequeとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">Queue</code> は先入れ先出し（FIFO）のデータ構造です。
          <code className="text-orange-300">Deque</code>（ダブルエンドキュー）は両端から追加・削除ができます。
          実装クラスとして <code className="text-orange-300">ArrayDeque</code> が最も推奨されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>offer()</code> で追加、<code>poll()</code> で取り出し（null安全）</li>
          <li><code>add()</code> で追加、<code>remove()</code> で取り出し（例外スロー）</li>
          <li><code>peek()</code> で先頭を確認（削除しない）</li>
          <li>ArrayDeque は null 要素を許可しない</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Queue（FIFO）</h2>
        <p className="text-gray-400 mb-4">
          Queue はタスク管理やイベント処理でよく使われる先入れ先出し構造です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Queue<String> queue = new ArrayDeque<>();

        // 要素を追加（末尾に追加）
        queue.offer("タスクA");
        queue.offer("タスクB");
        queue.offer("タスクC");
        System.out.println("キュー: " + queue);

        // peek: 先頭を確認（削除しない）
        System.out.println("peek: " + queue.peek());
        System.out.println("サイズ: " + queue.size());

        // poll: 先頭を取り出し（削除する）
        System.out.println("処理: " + queue.poll());
        System.out.println("処理: " + queue.poll());
        System.out.println("残り: " + queue);

        // 空のキューからpoll → null
        queue.poll();
        System.out.println("空のpoll: " + queue.poll());
        System.out.println("空のpeek: " + queue.peek());
    }
}`}
          expectedOutput={`キュー: [タスクA, タスクB, タスクC]
peek: タスクA
サイズ: 3
処理: タスクA
処理: タスクB
残り: [タスクC]
空のpoll: null
空のpeek: null`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Deque（両端キュー）</h2>
        <p className="text-gray-400 mb-4">
          Deque は先頭と末尾の両方から操作できます。
          <code className="text-orange-300">offerFirst()</code>・<code className="text-orange-300">offerLast()</code>、
          <code className="text-orange-300">pollFirst()</code>・<code className="text-orange-300">pollLast()</code> を使います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        Deque<String> deque = new ArrayDeque<>();

        // 両端から追加
        deque.offerFirst("B");
        deque.offerFirst("A");  // 先頭に追加
        deque.offerLast("C");   // 末尾に追加
        deque.offerLast("D");
        System.out.println("Deque: " + deque);

        // 先頭と末尾を確認
        System.out.println("先頭: " + deque.peekFirst());
        System.out.println("末尾: " + deque.peekLast());

        // 先頭から取り出し
        System.out.println("pollFirst: " + deque.pollFirst());

        // 末尾から取り出し
        System.out.println("pollLast: " + deque.pollLast());

        System.out.println("残り: " + deque);

        // サイズと空チェック
        System.out.println("サイズ: " + deque.size());
        System.out.println("空? " + deque.isEmpty());
    }
}`}
          expectedOutput={`Deque: [A, B, C, D]
先頭: A
末尾: D
pollFirst: A
pollLast: D
残り: [B, C]
サイズ: 2
空? false`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">PriorityQueue（優先度付きキュー）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">PriorityQueue</code> は要素を優先度順に取り出すキューです。
          デフォルトは自然順序（小さい値が先）です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.PriorityQueue;
import java.util.Comparator;

public class Main {
    public static void main(String[] args) {
        // デフォルト: 小さい順
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(30);
        minHeap.offer(10);
        minHeap.offer(50);
        minHeap.offer(20);

        System.out.print("最小優先: ");
        while (!minHeap.isEmpty()) {
            System.out.print(minHeap.poll() + " ");
        }
        System.out.println();

        // 降順: 大きい順
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
        maxHeap.offer(30);
        maxHeap.offer(10);
        maxHeap.offer(50);
        maxHeap.offer(20);

        System.out.print("最大優先: ");
        while (!maxHeap.isEmpty()) {
            System.out.print(maxHeap.poll() + " ");
        }
        System.out.println();

        // 文字列の長さで優先度を決める
        PriorityQueue<String> byLength = new PriorityQueue<>(
            Comparator.comparingInt(String::length)
        );
        byLength.offer("banana");
        byLength.offer("fig");
        byLength.offer("apple");

        System.out.print("短い順: ");
        while (!byLength.isEmpty()) {
            System.out.print(byLength.poll() + " ");
        }
        System.out.println();
    }
}`}
          expectedOutput={`最小優先: 10 20 30 50
最大優先: 50 30 20 10
短い順: fig apple banana `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="queue-deque" />
      </div>
      <LessonNav lessons={lessons} currentId="queue-deque" basePath="/learn/collections" />
    </div>
  );
}
