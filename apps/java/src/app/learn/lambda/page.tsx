import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ラムダ式の正しい構文はどれですか？",
    options: [
      "x => x * 2",
      "(x) -> x * 2",
      "x :: x * 2",
      "lambda x: x * 2",
    ],
    answer: 1,
    explanation: "Javaのラムダ式は (引数) -> 式 または (引数) -> { 文; } の構文を使います。アロー演算子は -> です。",
  },
  {
    question: "Predicate<T>・Function<T,R>・Consumer<T> の説明として正しいものはどれですか？",
    options: [
      "すべて戻り値を持つ関数型インターフェースである",
      "Predicateはboolean、Functionは変換結果、Consumerは戻り値なしを返す",
      "すべてjava.utilパッケージに含まれる",
      "Java 7から利用可能である",
    ],
    answer: 1,
    explanation: "Predicate<T>はT→boolean、Function<T,R>はT→R、Consumer<T>はT→voidの関数型インターフェースです。java.util.functionパッケージに含まれます。",
  },
  {
    question: "メソッド参照の正しい書き方はどれですか？",
    options: [
      "String.length()",
      "String->length",
      "String::length",
      "String.length",
    ],
    answer: 2,
    explanation: "メソッド参照は :: (ダブルコロン) 演算子を使います。String::length はインスタンスメソッド参照で、s -> s.length() と同等です。",
  },
  {
    question: "Comparatorをラムダ式で書く正しい方法はどれですか？",
    options: [
      "Comparator.compare((a, b) -> a - b)",
      "(a, b) -> a.compareTo(b)",
      "new Comparator() { a.compareTo(b) }",
      "Comparator.of(a -> a)",
    ],
    answer: 1,
    explanation: "Comparatorは2つの引数を受け取り整数を返す関数型インターフェースなので、(a, b) -> a.compareTo(b) のようにラムダ式で簡潔に書けます。",
  },
];

export default function LambdaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">ラムダ式</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Java 8で導入されたラムダ式を学びましょう。関数型インターフェース・メソッド参照・Comparatorなど、モダンJavaプログラミングの基盤となる概念を丁寧に解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="lambda" totalLessons={6} color="orange" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/lambda" color="orange" categoryId="lambda" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式でComparatorを使う</h2>
        <p className="text-gray-400 mb-4">
          ラムダ式を使うと、<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">Comparator</code> を
          簡潔に記述できます。匿名クラスを使った冗長な書き方と比較してみましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(Arrays.asList("Charlie", "Alice", "Bob"));

        // ラムダ式でソート（文字列長でソート）
        names.sort((a, b) -> a.length() - b.length());
        System.out.println("長さ順: " + names);

        // Comparatorチェーン
        names.sort(Comparator.comparingInt(String::length)
                             .thenComparing(Comparator.naturalOrder()));
        System.out.println("長さ→辞書順: " + names);

        // 逆順
        names.sort(Comparator.reverseOrder());
        System.out.println("逆順: " + names);
    }
}`}
          expectedOutput={`長さ順: [Bob, Alice, Charlie]
長さ→辞書順: [Bob, Alice, Charlie]
逆順: [Charlie, Bob, Alice]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッド参照と関数型インターフェース</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">::</code> を使ったメソッド参照は、
          ラムダ式をさらにシンプルにする書き方です。標準の関数型インターフェースと組み合わせて使えます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        List<String> items = Arrays.asList("Java", "Spring", "Lambda");

        // Consumer: メソッド参照で出力
        System.out.println("=== forEach ===");
        items.forEach(System.out::println);

        // Function: 大文字変換
        Function<String, String> toUpper = String::toUpperCase;
        System.out.println("変換: " + toUpper.apply("hello"));

        // Predicate: 条件判定
        Predicate<String> startsWithJ = s -> s.startsWith("J");
        System.out.println("Jで始まる: " + startsWithJ.test("Java"));
        System.out.println("Jで始まる: " + startsWithJ.test("Spring"));
    }
}`}
          expectedOutput={`=== forEach ===
Java
Spring
Lambda
変換: HELLO
Jで始まる: true
Jで始まる: false`}
        />
      </section>

      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
