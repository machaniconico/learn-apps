import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function ComparatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ラムダ式 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Comparator</h1>
        <p className="text-gray-400">Comparator.comparing, thenComparing, reversed を使ったソート</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Comparatorとラムダ式</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">Comparator</code> は関数型インターフェースなので、ラムダ式で簡潔に記述できます。
          Java 8では <code className="text-orange-300">Comparator.comparing()</code> などの
          静的メソッドやデフォルトメソッドが追加され、複雑なソート条件も読みやすく記述できるようになりました。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>Comparator.comparing(keyExtractor)</code> — キーで比較</li>
          <li><code>.thenComparing(keyExtractor)</code> — 第2ソートキーの追加</li>
          <li><code>.reversed()</code> — 逆順にする</li>
          <li><code>Comparator.naturalOrder()</code> / <code>reverseOrder()</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Comparator.comparingでソート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Comparator.comparing()</code> にキー抽出関数を渡すことで、
          特定のプロパティでソートできます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.Comparator;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("Banana", "Apple", "Cherry", "Date");

        // 文字列の長さでソート
        words.sort(Comparator.comparing(String::length));
        System.out.println("長さ順: " + words);

        // 自然順序（アルファベット順）でソート
        words.sort(Comparator.naturalOrder());
        System.out.println("アルファベット順: " + words);

        // 逆順
        words.sort(Comparator.reverseOrder());
        System.out.println("逆アルファベット順: " + words);
    }
}`}
          expectedOutput={`長さ順: [Date, Apple, Banana, Cherry]
アルファベット順: [Apple, Banana, Cherry, Date]
逆アルファベット順: [Date, Cherry, Banana, Apple]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">thenComparingで複合ソート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">thenComparing()</code> を使うと、第1キーが同じ場合に
          第2キーでさらにソートする複合条件を簡潔に書けます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.Comparator;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList(
            "cat", "apple", "bat", "cherry", "ant", "box"
        );

        // 1. 長さでソート → 2. 同じ長さならアルファベット順
        words.sort(
            Comparator.comparing(String::length)
                      .thenComparing(Comparator.naturalOrder())
        );
        System.out.println("長さ→アルファベット: " + words);

        // 長さの降順 → 同じ長さならアルファベット順
        words.sort(
            Comparator.comparing(String::length).reversed()
                      .thenComparing(Comparator.naturalOrder())
        );
        System.out.println("長さ降順→アルファベット: " + words);
    }
}`}
          expectedOutput={`長さ→アルファベット: [ant, bat, box, cat, apple, cherry]
長さ降順→アルファベット: [cherry, apple, ant, bat, box, cat]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムオブジェクトのソート</h2>
        <p className="text-gray-400 mb-4">
          独自クラスのリストも <code className="text-orange-300">Comparator.comparing()</code> で
          簡潔にソートできます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.Comparator;

public class Main {
    static class Student {
        String name;
        int age;
        double score;

        Student(String name, int age, double score) {
            this.name = name;
            this.age = age;
            this.score = score;
        }

        public String toString() {
            return name + "(age=" + age + ", score=" + score + ")";
        }
    }

    public static void main(String[] args) {
        List<Student> students = Arrays.asList(
            new Student("Alice", 20, 85.5),
            new Student("Bob", 22, 92.0),
            new Student("Charlie", 20, 78.0),
            new Student("Diana", 22, 92.0)
        );

        // スコア降順 → 年齢昇順 → 名前順
        students.sort(
            Comparator.comparingDouble((Student s) -> s.score).reversed()
                      .thenComparingInt(s -> s.age)
                      .thenComparing(s -> s.name)
        );

        students.forEach(System.out::println);
    }
}`}
          expectedOutput={`Bob(age=22, score=92.0)
Diana(age=22, score=92.0)
Alice(age=20, score=85.5)
Charlie(age=20, score=78.0)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="comparator" />
      </div>
      <LessonNav lessons={lessons} currentId="comparator" basePath="/learn/lambda" />
    </div>
  );
}
