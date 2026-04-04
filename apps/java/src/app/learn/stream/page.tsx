import { JavaEditor } from "@/components/java-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stream");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Streamを作成する方法として正しいものはどれですか？",
    options: [
      "new Stream(1, 2, 3)",
      "Stream.of(1, 2, 3)",
      "Stream.create(1, 2, 3)",
      "Arrays.stream(1, 2, 3)",
    ],
    answer: 1,
    explanation: "Stream.of() はStreamを作成する標準的な方法のひとつです。Arrays.stream(配列) やコレクションの .stream() メソッドでも作成できます。",
  },
  {
    question: "filterとmapについて正しい説明はどれですか？",
    options: [
      "filterは要素を変換し、mapは要素を選別する",
      "filterは条件に合う要素を残し、mapは要素を変換する",
      "どちらも終端操作である",
      "filterとmapは同時に使えない",
    ],
    answer: 1,
    explanation: "filterはPredicate条件に合う要素を残す中間操作、mapはFunctionで要素を変換する中間操作です。パイプラインで連結して使えます。",
  },
  {
    question: "reduceメソッドについて正しい説明はどれですか？",
    options: [
      "Streamの要素数を減らす中間操作である",
      "Streamの全要素を1つの値に集約する終端操作である",
      "Streamをフィルタリングする操作である",
      "Streamを並列処理にする操作である",
    ],
    answer: 1,
    explanation: "reduceはStreamの全要素を累積的に処理して1つの結果に集約する終端操作です。合計・最大値・文字列結合などに使われます。",
  },
  {
    question: "Collectors.groupingBy() の戻り値の型は何ですか？",
    options: [
      "List<T>",
      "Set<T>",
      "Map<K, List<T>>",
      "Optional<T>",
    ],
    answer: 2,
    explanation: "groupingByは指定したキーで要素をグループ化し、Map<K, List<T>> を返します。ダウンストリームコレクタを指定してカスタマイズも可能です。",
  },
];

export default function StreamPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">Stream API</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Java 8のStream APIを使ったデータ処理を学びましょう。filter・map・reduce・collectなどの操作を組み合わせて、宣言的なデータ処理パイプラインを構築する方法を解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="stream" totalLessons={8} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/stream" color="cyan" categoryId="stream" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Streamパイプライン：filter・map・collect</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">filter</code> で条件に合う要素を絞り込み、
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">map</code> で変換し、
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">collect</code> で結果をまとめます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> languages = Arrays.asList(
            "Java", "Python", "JavaScript", "C++", "C#", "Go", "Rust"
        );

        // filter → map → collect パイプライン
        List<String> result = languages.stream()
            .filter(lang -> lang.length() > 2)       // 3文字以上
            .map(String::toUpperCase)                 // 大文字に変換
            .sorted()                                 // ソート
            .collect(Collectors.toList());

        System.out.println("結果: " + result);

        // 数値ストリーム
        int sum = IntStream.rangeClosed(1, 10)
            .filter(n -> n % 2 == 0)   // 偶数のみ
            .sum();
        System.out.println("偶数の合計: " + sum);
    }
}`}
          expectedOutput={`結果: [C++, JAVA, JAVASCRIPT, PYTHON, RUST]
偶数の合計: 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">groupingByでグループ化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">Collectors.groupingBy()</code> を使うと、
          指定したキーで要素をグループ化した <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">Map</code> を作成できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList(
            "apple", "ant", "bear", "bee", "cat", "cherry"
        );

        // 先頭文字でグループ化
        Map<Character, List<String>> grouped = words.stream()
            .collect(Collectors.groupingBy(w -> w.charAt(0)));

        grouped.forEach((key, value) ->
            System.out.println(key + ": " + value));

        // 文字列長でグループ化 + カウント
        Map<Integer, Long> countByLength = words.stream()
            .collect(Collectors.groupingBy(
                String::length,
                Collectors.counting()
            ));
        System.out.println("長さ別カウント: " + countByLength);
    }
}`}
          expectedOutput={`a: [apple, ant]
b: [bear, bee]
c: [cat, cherry]
長さ別カウント: {3=[ant, bee, cat], 4=[bear], 5=[apple], 6=[cherry]}`}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
