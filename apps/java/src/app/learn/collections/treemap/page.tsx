import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function TreeMapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">コレクション レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">TreeMap</h1>
        <p className="text-gray-400">キーでソートされた順序付きマップ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TreeMapとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">TreeMap</code> はキーが自動的にソートされるマップです。
          内部は赤黒木（Red-Black Tree）で実装されており、
          操作の計算量は O(log n) です。キーの範囲検索にも対応しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>キーが自然順序（Comparable）またはComparatorでソートされる</li>
          <li><code>firstKey()</code>・<code>lastKey()</code> で最小・最大キーを取得</li>
          <li><code>headMap()</code>・<code>tailMap()</code>・<code>subMap()</code> で範囲ビュー</li>
          <li>null キーは許可されない（NullPointerException）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本操作と自動ソート</h2>
        <p className="text-gray-400 mb-4">
          TreeMap に要素を追加すると、キーの自然順序で自動的にソートされます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        TreeMap<String, Integer> scores = new TreeMap<>();

        // 順序を気にせず追加
        scores.put("Charlie", 78);
        scores.put("Alice", 92);
        scores.put("Bob", 85);
        scores.put("David", 88);

        // キーでソートされて表示
        System.out.println("TreeMap: " + scores);

        // 最小・最大キー
        System.out.println("最初のキー: " + scores.firstKey());
        System.out.println("最後のキー: " + scores.lastKey());

        // 最初と最後のエントリ
        System.out.println("最初のエントリ: " + scores.firstEntry());
        System.out.println("最後のエントリ: " + scores.lastEntry());

        // 数値キーでもソート
        TreeMap<Integer, String> ranking = new TreeMap<>();
        ranking.put(3, "銅メダル");
        ranking.put(1, "金メダル");
        ranking.put(2, "銀メダル");
        System.out.println("ランキング: " + ranking);
    }
}`}
          expectedOutput={`TreeMap: {Alice=92, Bob=85, Charlie=78, David=88}
最初のキー: Alice
最後のキー: David
最初のエントリ: Alice=92
最後のエントリ: David=88
ランキング: {1=金メダル, 2=銀メダル, 3=銅メダル}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">範囲ビュー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">headMap()</code>、<code className="text-orange-300">tailMap()</code>、
          <code className="text-orange-300">subMap()</code> でキーの範囲を指定してビューを取得します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        TreeMap<Integer, String> map = new TreeMap<>();
        map.put(10, "A");
        map.put(20, "B");
        map.put(30, "C");
        map.put(40, "D");
        map.put(50, "E");

        System.out.println("全体: " + map);

        // headMap: 指定キーより小さいもの
        System.out.println("headMap(30): " + map.headMap(30));
        System.out.println("headMap(30, true): " + map.headMap(30, true));

        // tailMap: 指定キー以上のもの
        System.out.println("tailMap(30): " + map.tailMap(30));

        // subMap: 範囲指定 [from, to)
        System.out.println("subMap(20,40): " + map.subMap(20, 40));
        System.out.println("subMap(20,true,40,true): " + map.subMap(20, true, 40, true));

        // 近傍検索
        System.out.println("25以上で最小: " + map.ceilingKey(25));
        System.out.println("25以下で最大: " + map.floorKey(25));
        System.out.println("25より大きい最小: " + map.higherKey(25));
        System.out.println("25より小さい最大: " + map.lowerKey(25));
    }
}`}
          expectedOutput={`全体: {10=A, 20=B, 30=C, 40=D, 50=E}
headMap(30): {10=A, 20=B}
headMap(30, true): {10=A, 20=B, 30=C}
tailMap(30): {30=C, 40=D, 50=E}
subMap(20,40): {20=B, 30=C}
subMap(20,true,40,true): {20=B, 30=C, 40=D}
25以上で最小: 30
25以下で最大: 20
25より大きい最小: 30
25より小さい最大: 20`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム順序とHashMapとの比較</h2>
        <p className="text-gray-400 mb-4">
          Comparator を使ってカスタムソート順を指定できます。
          HashMap との違いも確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.TreeMap;
import java.util.HashMap;
import java.util.Comparator;

public class Main {
    public static void main(String[] args) {
        // 降順のTreeMap
        TreeMap<Integer, String> desc = new TreeMap<>(Comparator.reverseOrder());
        desc.put(1, "一位");
        desc.put(3, "三位");
        desc.put(2, "二位");
        System.out.println("降順: " + desc);

        // HashMap vs TreeMap
        HashMap<String, Integer> hashMap = new HashMap<>();
        TreeMap<String, Integer> treeMap = new TreeMap<>();

        String[] names = {"Charlie", "Alice", "Bob"};
        for (int i = 0; i < names.length; i++) {
            hashMap.put(names[i], i + 1);
            treeMap.put(names[i], i + 1);
        }

        System.out.println("HashMap: " + hashMap + " (順序不定)");
        System.out.println("TreeMap: " + treeMap + " (ソート済み)");
    }
}`}
          expectedOutput={`降順: {3=三位, 2=二位, 1=一位}
HashMap: {Bob=3, Alice=2, Charlie=1} (順序不定)
TreeMap: {Alice=2, Bob=3, Charlie=1} (ソート済み)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="treemap" />
      </div>
      <LessonNav lessons={lessons} currentId="treemap" basePath="/learn/collections" />
    </div>
  );
}
