import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function CollectionsUtilityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">コレクション レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Collectionsクラス</h1>
        <p className="text-gray-400">sort・unmodifiable・synchronizedなどのユーティリティ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Collectionsユーティリティクラス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">java.util.Collections</code> はコレクション操作のための
          静的メソッドを提供するユーティリティクラスです。
          ソート、シャッフル、不変ラッパー、同期ラッパーなど多彩な機能があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>sort()</code>・<code>reverse()</code>・<code>shuffle()</code> で並び替え</li>
          <li><code>unmodifiableList()</code> で不変ラッパーを作成</li>
          <li><code>frequency()</code> で出現回数を数える</li>
          <li><code>singletonList()</code>・<code>emptyList()</code> で特殊なリスト</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ソートと並び替え</h2>
        <p className="text-gray-400 mb-4">
          Collections のソートメソッドで、様々な方法でリストを並び替えます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>(
            Arrays.asList("Charlie", "Alice", "Bob", "David")
        );

        // 自然順序でソート
        Collections.sort(names);
        System.out.println("ソート: " + names);

        // 逆順
        Collections.reverse(names);
        System.out.println("逆順: " + names);

        // カスタムComparatorでソート（文字列長順）
        Collections.sort(names, Comparator.comparingInt(String::length));
        System.out.println("長さ順: " + names);

        // swap: 要素を入れ替え
        Collections.swap(names, 0, 3);
        System.out.println("swap(0,3): " + names);

        // rotate: 要素を回転
        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        Collections.rotate(nums, 2);
        System.out.println("rotate(2): " + nums);
    }
}`}
          expectedOutput={`ソート: [Alice, Bob, Charlie, David]
逆順: [David, Charlie, Bob, Alice]
長さ順: [Bob, Alice, David, Charlie]
swap(0,3): [Charlie, Alice, David, Bob]
rotate(2): [4, 5, 1, 2, 3]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">不変ラッパーと特殊コレクション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">unmodifiableList()</code> で変更不可なビューを作成し、
          安全にコレクションを公開できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> original = new ArrayList<>(
            Arrays.asList("A", "B", "C")
        );

        // 不変ラッパー
        List<String> unmodifiable = Collections.unmodifiableList(original);
        System.out.println("不変リスト: " + unmodifiable);

        try {
            unmodifiable.add("D");
        } catch (UnsupportedOperationException e) {
            System.out.println("変更不可! UnsupportedOperationException");
        }

        // singletonList: 1要素のみの不変リスト
        List<String> single = Collections.singletonList("唯一");
        System.out.println("singleton: " + single);

        // emptyList: 空の不変リスト
        List<String> empty = Collections.emptyList();
        System.out.println("empty: " + empty);

        // nCopies: 同じ要素をn個持つリスト
        List<String> copies = Collections.nCopies(4, "★");
        System.out.println("nCopies: " + copies);
    }
}`}
          expectedOutput={`不変リスト: [A, B, C]
変更不可! UnsupportedOperationException
singleton: [唯一]
empty: []
nCopies: [★, ★, ★, ★]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">統計と検索</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">frequency()</code>、<code className="text-orange-300">min()</code>、
          <code className="text-orange-300">max()</code> などで統計情報を取得します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> items = new ArrayList<>(
            Arrays.asList("りんご", "バナナ", "りんご", "みかん", "りんご", "バナナ")
        );

        // frequency: 出現回数
        System.out.println("りんごの回数: " + Collections.frequency(items, "りんご"));
        System.out.println("バナナの回数: " + Collections.frequency(items, "バナナ"));
        System.out.println("みかんの回数: " + Collections.frequency(items, "みかん"));

        // min / max
        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(30, 10, 50, 20, 40));
        System.out.println("最小: " + Collections.min(nums));
        System.out.println("最大: " + Collections.max(nums));

        // disjoint: 共通要素がないか
        ArrayList<Integer> a = new ArrayList<>(Arrays.asList(1, 2, 3));
        ArrayList<Integer> b = new ArrayList<>(Arrays.asList(4, 5, 6));
        ArrayList<Integer> c = new ArrayList<>(Arrays.asList(3, 4, 5));
        System.out.println("a,b共通なし? " + Collections.disjoint(a, b));
        System.out.println("a,c共通なし? " + Collections.disjoint(a, c));
    }
}`}
          expectedOutput={`りんごの回数: 3
バナナの回数: 2
みかんの回数: 1
最小: 10
最大: 50
a,b共通なし? true
a,c共通なし? false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="collections-utility" />
      </div>
      <LessonNav lessons={lessons} currentId="collections-utility" basePath="/learn/collections" />
    </div>
  );
}
