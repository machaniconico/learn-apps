import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function LinkedListPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">LinkedList</h1>
        <p className="text-gray-400">連結リストLinkedListの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">LinkedListとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">LinkedList</code> は双方向連結リストで、
          各要素が前後の要素への参照を持ちます。先頭・末尾への追加・削除が高速（O(1)）ですが、
          ランダムアクセスは遅い（O(n)）のが特徴です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>addFirst()</code>・<code>addLast()</code> で先頭・末尾に追加</li>
          <li><code>getFirst()</code>・<code>getLast()</code> で先頭・末尾を取得</li>
          <li><code>removeFirst()</code>・<code>removeLast()</code> で先頭・末尾を削除</li>
          <li>Deque インターフェースも実装しており、キューやスタックとして使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本操作</h2>
        <p className="text-gray-400 mb-4">
          LinkedList の先頭・末尾への操作メソッドを使ってみます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();

        // 末尾に追加
        list.add("B");
        list.add("C");

        // 先頭に追加
        list.addFirst("A");

        // 末尾に追加
        list.addLast("D");

        System.out.println("リスト: " + list);
        System.out.println("先頭: " + list.getFirst());
        System.out.println("末尾: " + list.getLast());
        System.out.println("サイズ: " + list.size());

        // 先頭を削除
        String first = list.removeFirst();
        System.out.println("削除した先頭: " + first);

        // 末尾を削除
        String last = list.removeLast();
        System.out.println("削除した末尾: " + last);

        System.out.println("残り: " + list);
    }
}`}
          expectedOutput={`リスト: [A, B, C, D]
先頭: A
末尾: D
サイズ: 4
削除した先頭: A
削除した末尾: D
残り: [B, C]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">キューとしての使用</h2>
        <p className="text-gray-400 mb-4">
          LinkedList は Queue インターフェースを実装しています。
          <code className="text-orange-300">offer()</code> で追加、<code className="text-orange-300">poll()</code> で取り出しができます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        // Queueとして使用（FIFO: 先入れ先出し）
        Queue<String> queue = new LinkedList<>();

        queue.offer("タスク1");
        queue.offer("タスク2");
        queue.offer("タスク3");
        System.out.println("キュー: " + queue);

        // peek: 先頭を見る（削除しない）
        System.out.println("peek: " + queue.peek());

        // poll: 先頭を取り出す（削除する）
        System.out.println("poll: " + queue.poll());
        System.out.println("poll: " + queue.poll());
        System.out.println("残り: " + queue);

        // 空のキューにpoll → null（例外なし）
        queue.poll();
        System.out.println("空のpoll: " + queue.poll());
    }
}`}
          expectedOutput={`キュー: [タスク1, タスク2, タスク3]
peek: タスク1
poll: タスク1
poll: タスク2
残り: [タスク3]
空のpoll: null`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ArrayListとの比較</h2>
        <p className="text-gray-400 mb-4">
          ArrayList と LinkedList はどちらも List インターフェースを実装していますが、
          得意な操作が異なります。用途に応じて使い分けましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // 同じListインターフェースで操作可能
        List<String> arrayList = new ArrayList<>();
        List<String> linkedList = new LinkedList<>();

        // 両方とも同じ操作が可能
        for (String item : new String[]{"A", "B", "C"}) {
            arrayList.add(item);
            linkedList.add(item);
        }

        System.out.println("ArrayList: " + arrayList);
        System.out.println("LinkedList: " + linkedList);

        // LinkedList固有の操作を使う場合はLinkedList型で宣言
        LinkedList<String> ll = new LinkedList<>(arrayList);
        ll.addFirst("Z");
        ll.addLast("D");
        System.out.println("操作後: " + ll);

        System.out.println("--- 使い分け ---");
        System.out.println("ArrayList: ランダムアクセスが高速");
        System.out.println("LinkedList: 先頭・末尾の追加削除が高速");
    }
}`}
          expectedOutput={`ArrayList: [A, B, C]
LinkedList: [A, B, C]
操作後: [Z, A, B, C, D]
--- 使い分け ---
ArrayList: ランダムアクセスが高速
LinkedList: 先頭・末尾の追加削除が高速`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="linkedlist" />
      </div>
      <LessonNav lessons={lessons} currentId="linkedlist" basePath="/learn/arrays" />
    </div>
  );
}
