import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ListOfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">{"List.of・copyOf"}</h1>
        <p className="text-gray-400">不変リストの作成（Java 9+）</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">不変リストとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Java 9 以降、<code className="text-orange-300">List.of()</code> で不変（immutable）リストを
          簡潔に作成できます。不変リストは要素の追加・変更・削除ができず、
          null 要素も許可しません。安全なデータの受け渡しに適しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>List.of()</code> で不変リストを作成（Java 9+）</li>
          <li><code>List.copyOf()</code> で既存コレクションから不変リストを作成（Java 10+）</li>
          <li>add, set, remove は <code>UnsupportedOperationException</code></li>
          <li>null 要素を含めると <code>NullPointerException</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">List.ofの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">List.of()</code> で簡潔に不変リストを作成します。
          要素数0から10まで最適化されたオーバーロードがあります。
        </p>
        <JavaEditor
          defaultCode={`import java.util.List;

public class Main {
    public static void main(String[] args) {
        // 空の不変リスト
        List<String> empty = List.of();
        System.out.println("空リスト: " + empty);
        System.out.println("サイズ: " + empty.size());

        // 要素を指定して作成
        List<String> fruits = List.of("りんご", "バナナ", "みかん");
        System.out.println("果物: " + fruits);

        // 数値リスト
        List<Integer> nums = List.of(1, 2, 3, 4, 5);
        System.out.println("数値: " + nums);

        // 読み取りは通常通り可能
        System.out.println("0番目: " + fruits.get(0));
        System.out.println("含む? " + fruits.contains("バナナ"));

        // for-eachも使える
        System.out.print("ループ: ");
        for (String f : fruits) {
            System.out.print(f + " ");
        }
        System.out.println();
    }
}`}
          expectedOutput={`空リスト: []
サイズ: 0
果物: [りんご, バナナ, みかん]
数値: [1, 2, 3, 4, 5]
0番目: りんご
含む? true
ループ: りんご バナナ みかん `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">不変性の確認</h2>
        <p className="text-gray-400 mb-4">
          不変リストに対して変更操作を行うと例外が発生します。
          これにより意図しない変更を防げます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> colors = List.of("赤", "青", "緑");

        // addを試みる → 例外
        try {
            colors.add("黄");
        } catch (UnsupportedOperationException e) {
            System.out.println("add: UnsupportedOperationException");
        }

        // setを試みる → 例外
        try {
            colors.set(0, "白");
        } catch (UnsupportedOperationException e) {
            System.out.println("set: UnsupportedOperationException");
        }

        // removeを試みる → 例外
        try {
            colors.remove(0);
        } catch (UnsupportedOperationException e) {
            System.out.println("remove: UnsupportedOperationException");
        }

        // リスト自体は変更されていない
        System.out.println("リスト: " + colors);
        System.out.println("不変リストは安全です！");
    }
}`}
          expectedOutput={`add: UnsupportedOperationException
set: UnsupportedOperationException
remove: UnsupportedOperationException
リスト: [赤, 青, 緑]
不変リストは安全です！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">List.copyOfと使い分け</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">List.copyOf()</code> は既存のコレクションから不変リストを作成します。
          可変リストと不変リストを使い分ける方法を見てみましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;

public class Main {
    // 不変リストを返すメソッド（安全なAPI設計）
    static List<String> getColors() {
        return List.of("赤", "青", "緑");
    }

    public static void main(String[] args) {
        // 可変リストから不変リストを作成
        ArrayList<String> mutable = new ArrayList<>();
        mutable.add("Java");
        mutable.add("Python");
        mutable.add("Go");

        List<String> immutable = List.copyOf(mutable);
        System.out.println("不変コピー: " + immutable);

        // 元の可変リストを変更しても不変リストには影響なし
        mutable.add("Rust");
        System.out.println("可変: " + mutable);
        System.out.println("不変: " + immutable);

        // APIから不変リストを受け取る
        List<String> colors = getColors();
        System.out.println("API結果: " + colors);

        // Map.of, Set.of も同様に使える
        System.out.println("Set.of: " + java.util.Set.of("A", "B", "C"));
        System.out.println("Map.of: " + java.util.Map.of("key1", 1, "key2", 2));
    }
}`}
          expectedOutput={`不変コピー: [Java, Python, Go]
可変: [Java, Python, Go, Rust]
不変: [Java, Python, Go]
API結果: [赤, 青, 緑]
Set.of: [C, B, A]
Map.of: {key2=2, key1=1}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="list-of" />
      </div>
      <LessonNav lessons={lessons} currentId="list-of" basePath="/learn/arrays" />
    </div>
  );
}
