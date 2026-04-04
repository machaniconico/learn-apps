import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ジェネリッククラスの定義として正しいのはどれですか？",
    options: [
      "class Box<T> { T value; }",
      "class Box[T] { T value; }",
      "class Box(T) { T value; }",
      "class Box<T extends Any> { T value; }",
    ],
    answer: 0,
    explanation: "Javaではクラス名の後に<T>の形式で型パラメータを定義します。Tは慣例的な名前で、任意の大文字1文字を使います（T=Type, E=Element, K=Key, V=Value）。",
  },
  {
    question: "境界型パラメータ <T extends Number> の意味はどれですか？",
    options: [
      "TはNumber型のみ使える",
      "TはNumberまたはそのサブクラスのみ使える",
      "TはNumberのスーパークラスのみ使える",
      "TにはどんなObjectでも使える",
    ],
    answer: 1,
    explanation: "<T extends Number>は上限境界を指定し、TにはNumberまたはそのサブクラス（Integer, Double等）のみを指定できます。Number自身のメソッドも使えるようになります。",
  },
  {
    question: "ワイルドカード <? super Integer> の意味はどれですか？",
    options: [
      "Integerのサブクラスのみ受け入れる",
      "Integerまたはそのスーパークラスを受け入れる",
      "Integer以外のすべての型を受け入れる",
      "任意の型を受け入れる",
    ],
    answer: 1,
    explanation: "<? super Integer>は下限境界ワイルドカードで、Integerまたはそのスーパークラス（Number, Object）を受け入れます。PECS原則のConsumer側で使います。",
  },
  {
    question: "Javaの型消去（type erasure）について正しいのはどれですか？",
    options: [
      "実行時にジェネリックの型パラメータ情報が完全に保持される",
      "コンパイル後にジェネリックの型情報が削除される",
      "ジェネリック型はプリミティブ型も使える",
      "型消去は Java 17 で廃止された",
    ],
    answer: 1,
    explanation: "Javaのジェネリクスは型消去方式を採用しており、コンパイル後に型パラメータ情報は削除されます。そのため、new T()やT[].classはできず、プリミティブ型も使えません。",
  },
];

export default function GenericsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">ジェネリクス</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          型安全なコードを書くためのジェネリクスを学びましょう。ジェネリッククラス・ジェネリックメソッド・境界型・ワイルドカード・型消去・実践パターンまで、型パラメータの活用法を解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="generics" totalLessons={6} color="pink" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/generics" color="pink" categoryId="generics" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリッククラス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">{'<T>'}</code> で型パラメータを定義すると、
          さまざまな型で再利用できる型安全なクラスを作れます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // ジェネリッククラス
    static class Pair<A, B> {
        private final A first;
        private final B second;

        Pair(A first, B second) {
            this.first = first;
            this.second = second;
        }

        A getFirst() { return first; }
        B getSecond() { return second; }

        @Override
        public String toString() {
            return "(" + first + ", " + second + ")";
        }
    }

    // ジェネリックメソッド
    static <T> void printArray(T[] array) {
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i]);
            if (i < array.length - 1) System.out.print(", ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Pair<String, Integer> nameAge = new Pair<>("太郎", 25);
        Pair<String, Double> nameScore = new Pair<>("花子", 95.5);

        System.out.println("名前と年齢: " + nameAge);
        System.out.println("名前と点数: " + nameScore);

        Integer[] nums = {1, 2, 3, 4, 5};
        String[] words = {"Java", "Generics", "Example"};
        printArray(nums);
        printArray(words);
    }
}`}
          expectedOutput={`名前と年齢: (太郎, 25)
名前と点数: (花子, 95.5)
1, 2, 3, 4, 5
Java, Generics, Example`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">境界型パラメータ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">{'<T extends Number>'}</code> のように上限境界を指定すると、
          型パラメータに使える型を制限し、そのクラスのメソッドを呼び出せるようになります。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    // 上限境界: Numberまたはそのサブクラスのみ
    static class Stats<T extends Number> {
        private final T[] data;

        Stats(T[] data) {
            this.data = data;
        }

        double average() {
            double sum = 0;
            for (T item : data) {
                sum += item.doubleValue();  // Numberのメソッドが使える
            }
            return sum / data.length;
        }

        T max() {
            T max = data[0];
            for (T item : data) {
                if (item.doubleValue() > max.doubleValue()) {
                    max = item;
                }
            }
            return max;
        }
    }

    // Comparable境界
    static <T extends Comparable<T>> T findMin(T[] array) {
        T min = array[0];
        for (T item : array) {
            if (item.compareTo(min) < 0) min = item;
        }
        return min;
    }

    public static void main(String[] args) {
        Integer[] ints = {3, 1, 4, 1, 5, 9};
        Stats<Integer> intStats = new Stats<>(ints);
        System.out.println("平均: " + intStats.average());
        System.out.println("最大: " + intStats.max());

        String[] words = {"banana", "apple", "cherry"};
        System.out.println("最小: " + findMin(words));
    }
}`}
          expectedOutput={`平均: 3.8333333333333335
最大: 9
最小: apple`}
        />
      </section>

      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
