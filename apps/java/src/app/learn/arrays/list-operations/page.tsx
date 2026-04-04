import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ListOperationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Listの操作</h1>
        <p className="text-gray-400">sort・subList・Collectionsユーティリティ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Listの高度な操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          List インターフェースにはソート、部分リスト取得、一括操作など
          様々な便利メソッドがあります。
          <code className="text-orange-300">Collections</code> クラスのユーティリティメソッドと組み合わせると
          さらに強力になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Collections.sort()</code> でリストをソート</li>
          <li><code>subList(from, to)</code> で部分リストを取得</li>
          <li><code>contains()</code>・<code>containsAll()</code> で存在チェック</li>
          <li><code>addAll()</code> でリストの一括追加</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ソートと逆順</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Collections.sort()</code> で昇順ソート、
          <code className="text-orange-300">Collections.reverse()</code> で逆順にします。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(30);
        nums.add(10);
        nums.add(50);
        nums.add(20);
        nums.add(40);

        System.out.println("元のリスト: " + nums);

        // 昇順ソート
        Collections.sort(nums);
        System.out.println("昇順: " + nums);

        // 逆順
        Collections.reverse(nums);
        System.out.println("逆順: " + nums);

        // Comparatorで降順ソート
        nums.sort(Comparator.reverseOrder());
        System.out.println("降順ソート: " + nums);

        // 文字列のソート
        ArrayList<String> names = new ArrayList<>();
        names.add("Charlie");
        names.add("Alice");
        names.add("Bob");
        Collections.sort(names);
        System.out.println("名前ソート: " + names);
    }
}`}
          expectedOutput={`元のリスト: [30, 10, 50, 20, 40]
昇順: [10, 20, 30, 40, 50]
逆順: [50, 40, 30, 20, 10]
降順ソート: [50, 40, 30, 20, 10]
名前ソート: [Alice, Bob, Charlie]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">subListと一括操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">subList()</code> で部分リストを取得し、
          <code className="text-orange-300">addAll()</code> でリストを一括追加します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>(
            Arrays.asList("A", "B", "C", "D", "E")
        );

        // subList: 部分リスト（ビュー）
        List<String> sub = list.subList(1, 4);
        System.out.println("subList(1,4): " + sub);

        // containsAll: 全要素を含むか
        System.out.println("B,Cを含む? " + list.containsAll(Arrays.asList("B", "C")));
        System.out.println("B,Xを含む? " + list.containsAll(Arrays.asList("B", "X")));

        // addAll: 一括追加
        ArrayList<String> extra = new ArrayList<>(Arrays.asList("F", "G"));
        list.addAll(extra);
        System.out.println("addAll後: " + list);

        // removeAll: 一括削除
        list.removeAll(Arrays.asList("A", "C", "E"));
        System.out.println("removeAll後: " + list);

        // retainAll: 共通要素のみ残す
        list.retainAll(Arrays.asList("B", "F", "Z"));
        System.out.println("retainAll後: " + list);
    }
}`}
          expectedOutput={`subList(1,4): [B, C, D]
B,Cを含む? true
B,Xを含む? false
addAll後: [A, B, C, D, E, F, G]
removeAll後: [B, D, F, G]
retainAll後: [B, F]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シャッフルと検索</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Collections.shuffle()</code> でランダムに並び替え、
          <code className="text-orange-300">Collections.frequency()</code> で出現回数を数えます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> items = new ArrayList<>(
            Arrays.asList("A", "B", "A", "C", "A", "B")
        );

        // frequency: 出現回数
        System.out.println("Aの出現回数: " + Collections.frequency(items, "A"));
        System.out.println("Bの出現回数: " + Collections.frequency(items, "B"));
        System.out.println("Cの出現回数: " + Collections.frequency(items, "C"));

        // min / max
        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(30, 10, 50, 20, 40));
        System.out.println("最小値: " + Collections.min(nums));
        System.out.println("最大値: " + Collections.max(nums));

        // replaceAll: 要素の置換
        Collections.replaceAll(items, "A", "X");
        System.out.println("A→X置換: " + items);
    }
}`}
          expectedOutput={`Aの出現回数: 3
Bの出現回数: 2
Cの出現回数: 1
最小値: 10
最大値: 50
A→X置換: [X, B, X, C, X, B]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="list-operations" />
      </div>
      <LessonNav lessons={lessons} currentId="list-operations" basePath="/learn/arrays" />
    </div>
  );
}
