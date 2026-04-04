import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function HashSetPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">コレクション レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">HashSet</h1>
        <p className="text-gray-400">重複なしの集合HashSetの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">HashSetとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">HashSet</code> は重複を許さない集合（Set）です。
          要素の追加・検索・削除がすべて O(1) で高速に行えます。
          要素の順序は保証されません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>add()</code> で追加（重複は無視される）</li>
          <li><code>contains()</code> で存在チェック</li>
          <li><code>remove()</code> で削除</li>
          <li>順序が必要なら <code>LinkedHashSet</code>（挿入順）や <code>TreeSet</code>（ソート順）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本操作と重複排除</h2>
        <p className="text-gray-400 mb-4">
          HashSet に同じ要素を追加しても重複は自動的に排除されます。
          add() は追加に成功したかどうかを boolean で返します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<String> fruits = new HashSet<>();

        // 要素の追加
        System.out.println("りんご追加: " + fruits.add("りんご"));
        System.out.println("バナナ追加: " + fruits.add("バナナ"));
        System.out.println("みかん追加: " + fruits.add("みかん"));
        System.out.println("りんご追加(重複): " + fruits.add("りんご"));

        System.out.println("セット: " + fruits);
        System.out.println("サイズ: " + fruits.size());

        // 存在チェック
        System.out.println("りんごを含む? " + fruits.contains("りんご"));
        System.out.println("ぶどうを含む? " + fruits.contains("ぶどう"));

        // 削除
        fruits.remove("バナナ");
        System.out.println("削除後: " + fruits);
    }
}`}
          expectedOutput={`りんご追加: true
バナナ追加: true
みかん追加: true
りんご追加(重複): false
セット: [みかん, りんご, バナナ]
サイズ: 3
りんごを含む? true
ぶどうを含む? false
削除後: [みかん, りんご]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">重複排除の実践</h2>
        <p className="text-gray-400 mb-4">
          リストから重複を取り除くなど、実践的な使い方を見てみましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.HashSet;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // リストから重複を排除
        ArrayList<String> listWithDupes = new ArrayList<>(
            Arrays.asList("A", "B", "A", "C", "B", "D", "A")
        );
        System.out.println("元リスト: " + listWithDupes);

        HashSet<String> unique = new HashSet<>(listWithDupes);
        System.out.println("重複排除: " + unique);

        // 重複排除した新しいリスト
        ArrayList<String> cleanList = new ArrayList<>(unique);
        System.out.println("新リスト: " + cleanList);

        // ユニークな単語数をカウント
        String[] words = {"hello", "world", "hello", "java", "world", "hello"};
        HashSet<String> uniqueWords = new HashSet<>(Arrays.asList(words));
        System.out.println("全単語数: " + words.length);
        System.out.println("ユニーク数: " + uniqueWords.size());
        System.out.println("ユニーク: " + uniqueWords);
    }
}`}
          expectedOutput={`元リスト: [A, B, A, C, B, D, A]
重複排除: [A, B, C, D]
新リスト: [A, B, C, D]
全単語数: 6
ユニーク数: 3
ユニーク: [java, world, hello]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">集合演算</h2>
        <p className="text-gray-400 mb-4">
          和集合（union）、積集合（intersection）、差集合（difference）などの
          集合演算を行えます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.HashSet;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        HashSet<String> setA = new HashSet<>(Arrays.asList("A", "B", "C", "D"));
        HashSet<String> setB = new HashSet<>(Arrays.asList("C", "D", "E", "F"));

        System.out.println("セットA: " + setA);
        System.out.println("セットB: " + setB);

        // 和集合 (A ∪ B)
        HashSet<String> union = new HashSet<>(setA);
        union.addAll(setB);
        System.out.println("和集合: " + union);

        // 積集合 (A ∩ B)
        HashSet<String> intersection = new HashSet<>(setA);
        intersection.retainAll(setB);
        System.out.println("積集合: " + intersection);

        // 差集合 (A - B)
        HashSet<String> diff = new HashSet<>(setA);
        diff.removeAll(setB);
        System.out.println("差集合(A-B): " + diff);
    }
}`}
          expectedOutput={`セットA: [A, B, C, D]
セットB: [C, D, E, F]
和集合: [A, B, C, D, E, F]
積集合: [C, D]
差集合(A-B): [A, B]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="hashset" />
      </div>
      <LessonNav lessons={lessons} currentId="hashset" basePath="/learn/collections" />
    </div>
  );
}
