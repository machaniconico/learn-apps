import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function BoundedTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ジェネリクス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">境界型</h1>
        <p className="text-gray-400">extends・superによる型パラメータの制約</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">境界型パラメータとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型パラメータに制約を付けることで、特定のクラスやインターフェースを継承・実装した型のみ
          受け付けるようにできます。<code className="text-orange-300">{"<T extends Number>"}</code> は
          T が Number またはそのサブクラスであることを保証します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>{"<T extends Number>"}</code> で数値型に制限</li>
          <li><code>{"<T extends Comparable<T>>"}</code> で比較可能な型に制限</li>
          <li><code>{"<T extends A & B>"}</code> で複数の境界を指定（クラスは1つ、インターフェースは複数）</li>
          <li>境界があると T のメソッドを呼び出せる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">{"<T extends Number>"}</h2>
        <p className="text-gray-400 mb-4">
          Number を上限とする境界型を使い、数値型のみを受け付けるクラスを作成します。
          Number のメソッド（doubleValue など）が使えるようになります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    static class NumberBox<T extends Number> {
        private T value;

        public NumberBox(T value) {
            this.value = value;
        }

        public double toDouble() {
            return value.doubleValue();
        }

        public boolean isPositive() {
            return value.doubleValue() > 0;
        }
    }

    public static <T extends Number> double sum(T a, T b) {
        return a.doubleValue() + b.doubleValue();
    }

    public static void main(String[] args) {
        NumberBox<Integer> intBox = new NumberBox<>(42);
        System.out.println("整数 → double: " + intBox.toDouble());
        System.out.println("正の数? " + intBox.isPositive());

        NumberBox<Double> dblBox = new NumberBox<>(-3.14);
        System.out.println("負の数? " + !dblBox.isPositive());

        System.out.println("合計: " + sum(10, 20));
        System.out.println("合計: " + sum(1.5, 2.5));
    }
}`}
          expectedOutput={`整数 → double: 42.0
正の数? true
負の数? true
合計: 30.0
合計: 4.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">{"<T extends Comparable<T>>"}</h2>
        <p className="text-gray-400 mb-4">
          Comparable を実装した型に制限することで、要素の比較が可能になります。
          最大値や最小値を求める汎用メソッドを定義できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static <T extends Comparable<T>> T findMax(T[] array) {
        T max = array[0];
        for (T item : array) {
            if (item.compareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }

    public static <T extends Comparable<T>> T findMin(T[] array) {
        T min = array[0];
        for (T item : array) {
            if (item.compareTo(min) < 0) {
                min = item;
            }
        }
        return min;
    }

    public static void main(String[] args) {
        Integer[] nums = {3, 7, 1, 9, 4};
        System.out.println("最大値: " + findMax(nums));
        System.out.println("最小値: " + findMin(nums));

        String[] words = {"banana", "apple", "cherry"};
        System.out.println("辞書順で最後: " + findMax(words));
        System.out.println("辞書順で最初: " + findMin(words));
    }
}`}
          expectedOutput={`最大値: 9
最小値: 1
辞書順で最後: cherry
辞書順で最初: apple`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の境界</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">{"<T extends A & B>"}</code> のように
          複数のインターフェースを境界として指定できます。
        </p>
        <JavaEditor
          defaultCode={`import java.io.Serializable;

public class Main {
    // Number かつ Comparable を実装する型のみ受け付ける
    public static <T extends Number & Comparable<T>> T clamp(T value, T min, T max) {
        if (value.compareTo(min) < 0) return min;
        if (value.compareTo(max) > 0) return max;
        return value;
    }

    public static void main(String[] args) {
        // 値を範囲内に制限する
        System.out.println("clamp(5, 1, 10) = " + clamp(5, 1, 10));
        System.out.println("clamp(-3, 1, 10) = " + clamp(-3, 1, 10));
        System.out.println("clamp(15, 1, 10) = " + clamp(15, 1, 10));

        System.out.println("clamp(3.7, 1.0, 5.0) = " + clamp(3.7, 1.0, 5.0));
        System.out.println("clamp(0.5, 1.0, 5.0) = " + clamp(0.5, 1.0, 5.0));
    }
}`}
          expectedOutput={`clamp(5, 1, 10) = 5
clamp(-3, 1, 10) = 1
clamp(15, 1, 10) = 10
clamp(3.7, 1.0, 5.0) = 3.7
clamp(0.5, 1.0, 5.0) = 1.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="bounded-types" />
      </div>
      <LessonNav lessons={lessons} currentId="bounded-types" basePath="/learn/generics" />
    </div>
  );
}
