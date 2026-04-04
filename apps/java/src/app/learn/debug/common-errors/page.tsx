import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function CommonErrorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">よくあるエラー</h1>
        <p className="text-gray-400">NullPointerException、ArrayIndexOutOfBoundsException、ClassCastException、ConcurrentModificationExceptionの対処法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Javaでよく遭遇するエラー</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaプログラミングでよく遭遇するランタイムエラーとその対処法を学びます。
          原因を理解して、事前に防ぐコードを書けるようになりましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>NullPointerException</code> - nullオブジェクトのメソッド呼び出し</li>
          <li><code>ArrayIndexOutOfBoundsException</code> - 配列の範囲外アクセス</li>
          <li><code>ClassCastException</code> - 不正な型キャスト</li>
          <li><code>ConcurrentModificationException</code> - 反復中のコレクション変更</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NullPointerException</h2>
        <p className="text-gray-400 mb-4">
          最も多いエラーの一つです。nullオブジェクトに対してメソッドを呼ぶと発生します。
          nullチェックやOptionalで防ぎましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Optional;

public class Main {
    static String getUserName(String id) {
        if ("U001".equals(id)) return "Alice";
        return null;  // ユーザーが見つからない
    }

    public static void main(String[] args) {
        // 悪い例: NullPointerExceptionが起きる可能性
        String name1 = getUserName("U001");
        System.out.println("1. " + name1.toUpperCase());  // OK

        // nullチェックで防ぐ
        String name2 = getUserName("U999");
        if (name2 != null) {
            System.out.println("2. " + name2.toUpperCase());
        } else {
            System.out.println("2. ユーザーが見つかりません");
        }

        // Optionalで安全にアクセス
        Optional<String> name3 = Optional.ofNullable(getUserName("U999"));
        String result = name3.map(String::toUpperCase).orElse("不明なユーザー");
        System.out.println("3. " + result);

        // Objects.requireNonNull で早期にチェック
        try {
            String name4 = java.util.Objects.requireNonNull(getUserName("U999"), "ユーザーはnullです");
        } catch (NullPointerException e) {
            System.out.println("4. NPE防止: " + e.getMessage());
        }
    }
}`}
          expectedOutput={`1. ALICE
2. ユーザーが見つかりません
3. 不明なユーザー
4. NPE防止: ユーザーはnullです`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ArrayIndexOutOfBoundsException と ClassCastException</h2>
        <p className="text-gray-400 mb-4">
          配列の範囲外アクセスと不正な型キャストの対処法です。
          事前の範囲チェックと <code className="text-orange-300">instanceof</code> チェックで防ぎます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // 安全な配列アクセス
    static String safeGet(String[] array, int index) {
        if (index >= 0 && index < array.length) {
            return array[index];
        }
        return "範囲外 (index=" + index + ", length=" + array.length + ")";
    }

    // 安全な型キャスト
    static String safeCast(Object obj) {
        if (obj instanceof String) {
            return "文字列: " + (String) obj;
        } else if (obj instanceof Integer) {
            return "整数: " + (Integer) obj;
        } else {
            return "不明な型: " + obj.getClass().getSimpleName();
        }
    }

    public static void main(String[] args) {
        // ArrayIndexOutOfBoundsException の防止
        String[] fruits = {"りんご", "バナナ", "みかん"};
        System.out.println("--- 配列アクセス ---");
        System.out.println(safeGet(fruits, 0));
        System.out.println(safeGet(fruits, 2));
        System.out.println(safeGet(fruits, 5));
        System.out.println(safeGet(fruits, -1));

        // ClassCastException の防止
        System.out.println("--- 型キャスト ---");
        System.out.println(safeCast("Hello"));
        System.out.println(safeCast(42));
        System.out.println(safeCast(3.14));
    }
}`}
          expectedOutput={`--- 配列アクセス ---
りんご
みかん
範囲外 (index=5, length=3)
範囲外 (index=-1, length=3)
--- 型キャスト ---
文字列: Hello
整数: 42
不明な型: Double`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ConcurrentModificationException</h2>
        <p className="text-gray-400 mb-4">
          コレクションを反復（for-each）しながら要素を追加・削除すると発生します。
          <code className="text-orange-300">Iterator.remove()</code> や新しいリストで対処します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        // 悪い例: for-each中に削除するとConcurrentModificationException
        // for (String s : list) { if (...) list.remove(s); }

        // 対策1: Iteratorを使う
        List<String> list1 = new ArrayList<>(List.of("apple", "", "banana", "", "cherry"));
        Iterator<String> it = list1.iterator();
        while (it.hasNext()) {
            if (it.next().isEmpty()) {
                it.remove();  // 安全な削除
            }
        }
        System.out.println("Iterator: " + list1);

        // 対策2: removeIf を使う（Java 8+）
        List<Integer> list2 = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));
        list2.removeIf(n -> n % 2 == 0);  // 偶数を削除
        System.out.println("removeIf: " + list2);

        // 対策3: Streamでフィルタして新しいリストを作る
        List<String> original = List.of("Java", "Go", "Python", "C");
        List<String> filtered = original.stream()
            .filter(s -> s.length() > 2)
            .collect(Collectors.toList());
        System.out.println("Stream filter: " + filtered);
    }
}`}
          expectedOutput={`Iterator: [apple, banana, cherry]
removeIf: [1, 3, 5]
Stream filter: [Java, Python]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="debug" lessonId="common-errors" />
      </div>
      <LessonNav lessons={lessons} currentId="common-errors" basePath="/learn/debug" />
    </div>
  );
}
