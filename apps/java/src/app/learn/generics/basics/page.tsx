import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function GenericsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ジェネリクス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリクスの基本</h1>
        <p className="text-gray-400">型パラメータを使った汎用クラスの定義</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ジェネリクスは、クラスやメソッドに型パラメータを導入し、
          型安全で再利用可能なコードを書くための仕組みです。
          <code className="text-orange-300">{"<T>"}</code> のように型パラメータを指定し、
          コンパイル時に型チェックが行われるため、実行時のClassCastExceptionを防げます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>{"Box<T>"}</code> のように型パラメータ T を使ってクラスを定義</li>
          <li>T はType、E はElement、K はKey、V はValueの慣例</li>
          <li>コンパイル時に型チェックされ、キャストが不要になる</li>
          <li>複数の型パラメータも <code>{"<K, V>"}</code> のように使用可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">{"Box<T>の作成"}</h2>
        <p className="text-gray-400 mb-4">
          1つの値を保持する汎用的な <code className="text-orange-300">Box</code> クラスを作成します。
          型パラメータ T により、どんな型でも安全に格納できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // ジェネリッククラスの定義
    static class Box<T> {
        private T value;

        public Box(T value) {
            this.value = value;
        }

        public T getValue() {
            return value;
        }

        public void setValue(T value) {
            this.value = value;
        }
    }

    public static void main(String[] args) {
        Box<String> strBox = new Box<>("Hello");
        System.out.println("文字列: " + strBox.getValue());

        Box<Integer> intBox = new Box<>(42);
        System.out.println("整数: " + intBox.getValue());

        Box<Double> dblBox = new Box<>(3.14);
        System.out.println("小数: " + dblBox.getValue());
    }
}`}
          expectedOutput={`文字列: Hello
整数: 42
小数: 3.14`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">{"Pair<K, V>の作成"}</h2>
        <p className="text-gray-400 mb-4">
          2つの型パラメータを持つ <code className="text-orange-300">Pair</code> クラスです。
          キーと値のペアなど、2つの関連する値を1つにまとめるのに便利です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static class Pair<K, V> {
        private K key;
        private V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() { return key; }
        public V getValue() { return value; }

        @Override
        public String toString() {
            return key + " = " + value;
        }
    }

    public static void main(String[] args) {
        Pair<String, Integer> age = new Pair<>("田中", 25);
        System.out.println(age);

        Pair<Integer, String> rank = new Pair<>(1, "金メダル");
        System.out.println(rank);

        Pair<String, Boolean> status = new Pair<>("接続", true);
        System.out.println(status);
    }
}`}
          expectedOutput={`田中 = 25
1 = 金メダル
接続 = true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクスなしとの比較</h2>
        <p className="text-gray-400 mb-4">
          ジェネリクスを使わない場合は Object 型で受けるため、取り出し時にキャストが必要です。
          ジェネリクスを使えばキャスト不要で型安全になります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // ジェネリクスなし（Object型）
    static class OldBox {
        private Object value;
        public OldBox(Object value) { this.value = value; }
        public Object getValue() { return value; }
    }

    // ジェネリクスあり
    static class GenericBox<T> {
        private T value;
        public GenericBox(T value) { this.value = value; }
        public T getValue() { return value; }
    }

    public static void main(String[] args) {
        // Object型: キャストが必要
        OldBox old = new OldBox("Hello");
        String s1 = (String) old.getValue();
        System.out.println("Object型: " + s1);

        // ジェネリクス: キャスト不要
        GenericBox<String> gen = new GenericBox<>("Hello");
        String s2 = gen.getValue();  // キャスト不要！
        System.out.println("ジェネリクス: " + s2);

        System.out.println("型安全にアクセスできます");
    }
}`}
          expectedOutput={`Object型: Hello
ジェネリクス: Hello
型安全にアクセスできます`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/generics" />
    </div>
  );
}
