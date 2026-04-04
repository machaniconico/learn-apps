import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArrayListPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">配列・リスト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ArrayList</h1>
        <p className="text-gray-400">動的配列ArrayListの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ArrayListとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">ArrayList</code> は可変長の配列で、
          要素の追加・削除に伴って自動的にサイズが調整されます。
          配列と違い、サイズを事前に決める必要がありません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>add()</code> で要素を追加、<code>get()</code> で取得</li>
          <li><code>remove()</code> で削除、<code>size()</code> でサイズ取得</li>
          <li>ジェネリクスで型を指定: <code>{"ArrayList<String>"}</code></li>
          <li>内部は配列ベースで、ランダムアクセスが高速（O(1)）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本操作</h2>
        <p className="text-gray-400 mb-4">
          ArrayList の基本的なメソッドを使って要素の追加、取得、削除を行います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();

        // 要素の追加
        fruits.add("りんご");
        fruits.add("バナナ");
        fruits.add("みかん");
        System.out.println("リスト: " + fruits);
        System.out.println("サイズ: " + fruits.size());

        // インデックスで取得
        System.out.println("0番目: " + fruits.get(0));
        System.out.println("2番目: " + fruits.get(2));

        // 要素の変更
        fruits.set(1, "ぶどう");
        System.out.println("変更後: " + fruits);

        // 要素の削除
        fruits.remove("みかん");
        System.out.println("削除後: " + fruits);

        // インデックスで削除
        fruits.remove(0);
        System.out.println("0番目削除: " + fruits);
    }
}`}
          expectedOutput={`リスト: [りんご, バナナ, みかん]
サイズ: 3
0番目: りんご
2番目: みかん
変更後: [りんご, ぶどう, みかん]
削除後: [りんご, ぶどう]
0番目削除: [ぶどう]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">検索と位置指定追加</h2>
        <p className="text-gray-400 mb-4">
          要素の存在チェック、インデックス検索、指定位置への挿入を行います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(10);
        nums.add(20);
        nums.add(30);
        nums.add(20);

        // 存在チェック
        System.out.println("20を含む? " + nums.contains(20));
        System.out.println("50を含む? " + nums.contains(50));

        // インデックス検索
        System.out.println("20の位置: " + nums.indexOf(20));
        System.out.println("20の最後の位置: " + nums.lastIndexOf(20));

        // 指定位置に挿入
        nums.add(1, 15);  // インデックス1に15を挿入
        System.out.println("挿入後: " + nums);

        // 空チェック
        System.out.println("空? " + nums.isEmpty());

        // 全削除
        nums.clear();
        System.out.println("clear後: " + nums);
        System.out.println("空? " + nums.isEmpty());
    }
}`}
          expectedOutput={`20を含む? true
50を含む? false
20の位置: 1
20の最後の位置: 3
挿入後: [10, 15, 20, 30, 20]
空? false
clear後: []
空? true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ループと変換</h2>
        <p className="text-gray-400 mb-4">
          ArrayList のループ処理と、配列との相互変換を行います。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> colors = new ArrayList<>();
        colors.add("赤");
        colors.add("青");
        colors.add("緑");

        // for-each
        System.out.print("for-each: ");
        for (String c : colors) {
            System.out.print(c + " ");
        }
        System.out.println();

        // forEachメソッド（ラムダ式）
        System.out.print("forEach: ");
        colors.forEach(c -> System.out.print(c + " "));
        System.out.println();

        // ArrayList → 配列
        String[] arr = colors.toArray(new String[0]);
        System.out.println("配列: " + Arrays.toString(arr));

        // 配列 → ArrayList
        ArrayList<String> fromArr = new ArrayList<>(Arrays.asList("A", "B", "C"));
        System.out.println("配列から: " + fromArr);
    }
}`}
          expectedOutput={`for-each: 赤 青 緑
forEach: 赤 青 緑
配列: [赤, 青, 緑]
配列から: [A, B, C]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="arraylist" />
      </div>
      <LessonNav lessons={lessons} currentId="arraylist" basePath="/learn/arrays" />
    </div>
  );
}
