import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function ClosurePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ラムダ式 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クロージャ</h1>
        <p className="text-gray-400">effectively final とラムダ内の変数キャプチャ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式と変数キャプチャ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ラムダ式は外部のローカル変数を「キャプチャ」（参照）できます。
          ただし、キャプチャされる変数は <code className="text-orange-300">effectively final</code>
          （実質的にfinal）でなければなりません。つまり、初期化後に値が変更されない変数のみ参照できます。
          これはスレッドセーフティと予測可能性を確保するための制約です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ラムダ式の外のローカル変数を参照できる（キャプチャ）</li>
          <li>キャプチャされる変数は <code>final</code> または effectively final である必要がある</li>
          <li>インスタンス変数やクラス変数にはこの制約はない</li>
          <li>配列やオブジェクトの参照はfinalでも中身の変更は可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">effectively final の変数キャプチャ</h2>
        <p className="text-gray-400 mb-4">
          ラムダ式から外部のローカル変数を参照する例です。
          変数に再代入しなければ <code className="text-orange-300">final</code> を付けなくても参照できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        String prefix = "Item: ";  // effectively final
        int threshold = 3;         // effectively final

        List<String> items = Arrays.asList("Apple", "Banana", "Cherry", "Date", "Fig");

        // 外部変数をキャプチャ
        List<String> result = items.stream()
            .filter(s -> s.length() > threshold)
            .map(s -> prefix + s)
            .collect(Collectors.toList());

        result.forEach(System.out::println);
    }
}`}
          expectedOutput={`Item: Apple
Item: Banana
Item: Cherry`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列やオブジェクトのキャプチャ</h2>
        <p className="text-gray-400 mb-4">
          参照自体がfinalであれば、参照先のオブジェクトの状態は変更できます。
          配列やリストの中身を変更するのは許可されますが、注意が必要です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // 配列の参照はfinal（再代入しない）が、中身は変更可能
        int[] counter = {0};  // effectively final（参照）

        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        names.forEach(name -> {
            counter[0]++;  // 配列の中身を変更（OK）
            System.out.println(counter[0] + ". " + name);
        });

        System.out.println("合計: " + counter[0] + "名");
    }
}`}
          expectedOutput={`1. Alice
2. Bob
3. Charlie
合計: 3名`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッド引数のキャプチャ</h2>
        <p className="text-gray-400 mb-4">
          メソッドの引数もeffectively finalとしてラムダ式からキャプチャできます。
          これにより、関数を返す関数（高階関数）のようなパターンが実現できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.function.Predicate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    // メソッド引数をキャプチャしたPredicateを返す
    static Predicate<String> longerThan(int minLength) {
        // minLengthはeffectively final
        return s -> s.length() > minLength;
    }

    static Predicate<String> startsWith(String prefix) {
        // prefixはeffectively final
        return s -> s.startsWith(prefix);
    }

    public static void main(String[] args) {
        List<String> words = Arrays.asList(
            "Java", "JavaScript", "Python", "Julia", "Kotlin"
        );

        List<String> result = words.stream()
            .filter(longerThan(4).and(startsWith("J")))
            .collect(Collectors.toList());

        System.out.println("5文字以上でJから始まる: " + result);
    }
}`}
          expectedOutput={`5文字以上でJから始まる: [JavaScript, Julia]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="closure" />
      </div>
      <LessonNav lessons={lessons} currentId="closure" basePath="/learn/lambda" />
    </div>
  );
}
