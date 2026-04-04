import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function TypeErasurePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ジェネリクス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型消去</h1>
        <p className="text-gray-400">Javaジェネリクスの型消去メカニズム</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型消去（Type Erasure）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Javaのジェネリクスはコンパイル時にのみ型チェックされ、実行時には型情報が消去されます。
          これを型消去（Type Erasure）と呼びます。コンパイル後、
          <code className="text-orange-300">{"List<String>"}</code> と <code className="text-orange-300">{"List<Integer>"}</code> は
          同じ <code className="text-orange-300">List</code> クラスになります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>型パラメータは実行時に Object（または境界の型）に置き換わる</li>
          <li><code>{"new T()"}</code> や <code>T.class</code> は使えない</li>
          <li><code>instanceof</code> でジェネリック型の判定はできない</li>
          <li>ジェネリック型の配列 <code>{"new T[]"}</code> は作成できない</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型消去の確認</h2>
        <p className="text-gray-400 mb-4">
          実行時にはジェネリクスの型情報が消えることを確認します。
          異なる型パラメータのリストでも、getClass() は同じ結果を返します。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        List<Integer> integers = new ArrayList<>();
        List<Double> doubles = new ArrayList<>();

        // 実行時のクラスは全て同じ
        System.out.println("String List: " + strings.getClass().getName());
        System.out.println("Integer List: " + integers.getClass().getName());
        System.out.println("Double List: " + doubles.getClass().getName());

        // クラスが同一か確認
        System.out.println("同じクラス? " + (strings.getClass() == integers.getClass()));
    }
}`}
          expectedOutput={`String List: java.util.ArrayList
Integer List: java.util.ArrayList
Double List: java.util.ArrayList
同じクラス? true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型消去の制限と回避策</h2>
        <p className="text-gray-400 mb-4">
          型消去により <code className="text-orange-300">{"new T()"}</code> は使えません。
          Class オブジェクトを渡すことで、実行時に型情報を保持する回避策があります。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;

public class Main {
    // Class<T>を使って型情報を実行時に保持する
    static class TypedFactory<T> {
        private Class<T> type;

        public TypedFactory(Class<T> type) {
            this.type = type;
        }

        public String getTypeName() {
            return type.getSimpleName();
        }

        public boolean isInstance(Object obj) {
            return type.isInstance(obj);
        }
    }

    public static void main(String[] args) {
        TypedFactory<String> sf = new TypedFactory<>(String.class);
        System.out.println("型名: " + sf.getTypeName());
        System.out.println("Stringのインスタンス? " + sf.isInstance("hello"));
        System.out.println("Integerのインスタンス? " + sf.isInstance(42));

        TypedFactory<Integer> nf = new TypedFactory<>(Integer.class);
        System.out.println("型名: " + nf.getTypeName());
        System.out.println("Integerのインスタンス? " + nf.isInstance(42));
    }
}`}
          expectedOutput={`型名: String
Stringのインスタンス? true
Integerのインスタンス? false
型名: Integer
Integerのインスタンス? true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">境界型の型消去</h2>
        <p className="text-gray-400 mb-4">
          境界型パラメータがある場合、型消去後は境界の型に置き換わります。
          <code className="text-orange-300">{"<T extends Number>"}</code> は Number に、
          境界なしの T は Object に置き換わります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // T extends Number → 型消去後は Number になる
    static class NumberContainer<T extends Number> {
        private T value;

        public NumberContainer(T value) {
            this.value = value;
        }

        // 型消去後: Number doubleValue() → キャスト不要
        public double getDouble() {
            return value.doubleValue();
        }
    }

    // 境界なし → 型消去後は Object になる
    static class Container<T> {
        private T value;
        public Container(T value) { this.value = value; }
        public T getValue() { return value; }
    }

    public static void main(String[] args) {
        NumberContainer<Integer> nc = new NumberContainer<>(42);
        System.out.println("値: " + nc.getDouble());

        Container<String> c = new Container<>("Hello");
        // 型消去後、コンパイラが自動キャストを挿入
        String val = c.getValue();
        System.out.println("値: " + val);

        System.out.println("NumberContainer: " + nc.getClass().getName());
        System.out.println("Container: " + c.getClass().getName());
    }
}`}
          expectedOutput={`値: 42.0
値: Hello
NumberContainer: Main$NumberContainer
Container: Main$Container`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="type-erasure" />
      </div>
      <LessonNav lessons={lessons} currentId="type-erasure" basePath="/learn/generics" />
    </div>
  );
}
