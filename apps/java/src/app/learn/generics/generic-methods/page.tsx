import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function GenericMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ジェネリクス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリックメソッド</h1>
        <p className="text-gray-400">型パラメータを持つメソッドの定義</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリックメソッドとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ジェネリックメソッドは、メソッド単位で型パラメータを定義します。
          クラス全体をジェネリクスにしなくても、特定のメソッドだけ汎用的にできます。
          戻り値の型の前に <code className="text-orange-300">{"<T>"}</code> と記述して型パラメータを宣言します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>{"<T> T method(T param)"}</code> の形式で定義</li>
          <li>呼び出し時に型が自動推論される（明示指定も可能）</li>
          <li>staticメソッドでもジェネリクスが使える</li>
          <li>複数の型パラメータも <code>{"<T, U>"}</code> のように定義可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なジェネリックメソッド</h2>
        <p className="text-gray-400 mb-4">
          配列の中身を表示する汎用メソッドと、2つの値を入れ替えるメソッドを定義します。
          型パラメータにより、どんな型の配列でも対応できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // ジェネリックメソッド: 配列の全要素を表示
    public static <T> void printArray(T[] array) {
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i]);
            if (i < array.length - 1) System.out.print(", ");
        }
        System.out.println();
    }

    // ジェネリックメソッド: 最初の要素を返す
    public static <T> T getFirst(T[] array) {
        return array[0];
    }

    public static void main(String[] args) {
        Integer[] nums = {1, 2, 3, 4, 5};
        String[] words = {"Java", "Python", "Go"};

        System.out.print("整数: ");
        printArray(nums);

        System.out.print("文字列: ");
        printArray(words);

        System.out.println("最初の整数: " + getFirst(nums));
        System.out.println("最初の文字列: " + getFirst(words));
    }
}`}
          expectedOutput={`整数: 1, 2, 3, 4, 5
文字列: Java, Python, Go
最初の整数: 1
最初の文字列: Java`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の型パラメータ</h2>
        <p className="text-gray-400 mb-4">
          2つの異なる型を受け取るジェネリックメソッドです。
          型パラメータ T と U を使い、異なる型の値を処理できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Pair<K, V> {
        K key;
        V value;
        Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    // 2つの型パラメータを持つメソッド
    public static <K, V> Pair<K, V> makePair(K key, V value) {
        return new Pair<>(key, value);
    }

    // 型パラメータで戻り値の型が決まる
    public static <T> T pickRandom(T a, T b) {
        return a.toString().length() > b.toString().length() ? a : b;
    }

    public static void main(String[] args) {
        Pair<String, Integer> p = makePair("年齢", 25);
        System.out.println(p.key + ": " + p.value);

        String longer = pickRandom("Hello", "Hi");
        System.out.println("長い方: " + longer);

        Integer bigger = pickRandom(100, 9);
        System.out.println("桁が多い方: " + bigger);
    }
}`}
          expectedOutput={`年齢: 25
長い方: Hello
桁が多い方: 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型推論と明示的な型指定</h2>
        <p className="text-gray-400 mb-4">
          通常は型推論が働くため型を明示する必要はありませんが、
          <code className="text-orange-300">{"Main.<String>method()"}</code> のように明示指定も可能です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;

public class Main {
    public static <T> List<T> listOf(T... items) {
        return Arrays.asList(items);
    }

    public static <T> void printList(List<T> list) {
        System.out.println(list);
    }

    public static void main(String[] args) {
        // 型推論（自動）
        List<String> names = listOf("Alice", "Bob", "Charlie");
        printList(names);

        // 型推論（自動）
        List<Integer> nums = listOf(10, 20, 30);
        printList(nums);

        // 明示的な型指定
        List<Double> prices = Main.<Double>listOf(1.5, 2.0, 3.5);
        printList(prices);
    }
}`}
          expectedOutput={`[Alice, Bob, Charlie]
[10, 20, 30]
[1.5, 2.0, 3.5]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="generic-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="generic-methods" basePath="/learn/generics" />
    </div>
  );
}
