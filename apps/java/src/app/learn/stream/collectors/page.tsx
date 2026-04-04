import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stream");

export default function CollectorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">Stream API レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Collectors</h1>
        <p className="text-gray-400">toList、toMap、groupingBy、joining でStreamを収集する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Collectorsとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">Collectors</code> クラスには、Streamの結果をコレクションや
          文字列に変換するための便利なファクトリメソッドが多数用意されています。
          <code className="text-orange-300">collect()</code> 終端操作と組み合わせて使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>toList()</code> / <code>toSet()</code> — リスト・セットに変換</li>
          <li><code>toMap(keyMapper, valueMapper)</code> — マップに変換</li>
          <li><code>groupingBy(classifier)</code> — グループ化</li>
          <li><code>joining(delimiter)</code> — 文字列結合</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">toList・toSet・toMap</h2>
        <p className="text-gray-400 mb-4">
          Streamの結果をリスト、セット、マップに変換する基本的なCollectorです。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("Apple", "Banana", "Apple", "Cherry", "Banana");

        // toList
        List<String> list = fruits.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println("List: " + list);

        // toSet（重複除去）
        Set<String> set = fruits.stream()
            .collect(Collectors.toSet());
        System.out.println("Set: " + set.size() + "種類");

        // toMap（名前 -> 文字数）
        Map<String, Integer> map = fruits.stream()
            .distinct()
            .collect(Collectors.toMap(
                f -> f,             // キー
                String::length      // 値
            ));
        System.out.println("Map: " + map);
    }
}`}
          expectedOutput={`List: [APPLE, BANANA, APPLE, CHERRY, BANANA]
Set: 3種類
Map: {Apple=5, Cherry=6, Banana=6}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">groupingBy でグループ化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">groupingBy()</code> で要素を分類キーごとにグループ化できます。
          SQLの GROUP BY に相当する操作です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList(
            "cat", "car", "dog", "deer", "cow", "duck", "dove"
        );

        // 頭文字でグループ化
        Map<Character, List<String>> grouped = words.stream()
            .collect(Collectors.groupingBy(w -> w.charAt(0)));

        grouped.forEach((key, value) ->
            System.out.println(key + ": " + value));

        System.out.println("---");

        // 文字数でグループ化 + 個数カウント
        Map<Integer, Long> countByLength = words.stream()
            .collect(Collectors.groupingBy(
                String::length,
                Collectors.counting()
            ));
        countByLength.forEach((len, count) ->
            System.out.println(len + "文字: " + count + "個"));
    }
}`}
          expectedOutput={`c: [cat, car, cow]
d: [dog, deer, duck, dove]
---
3文字: 4個
4文字: 3個`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">joining で文字列結合</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">Collectors.joining()</code> はStreamの文字列要素を
          指定した区切り文字で結合します。接頭辞・接尾辞も指定できます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> langs = Arrays.asList("Java", "Python", "Rust", "Go");

        // 区切り文字で結合
        String csv = langs.stream()
            .collect(Collectors.joining(", "));
        System.out.println(csv);

        // 接頭辞・接尾辞付き
        String formatted = langs.stream()
            .collect(Collectors.joining(" | ", "[", "]"));
        System.out.println(formatted);

        // 数値をフォーマットして結合
        List<Integer> scores = Arrays.asList(85, 92, 78, 95);
        String scoreReport = scores.stream()
            .map(s -> s + "点")
            .collect(Collectors.joining(", ", "成績: ", " (計" + scores.size() + "名)"));
        System.out.println(scoreReport);
    }
}`}
          expectedOutput={`Java, Python, Rust, Go
[Java | Python | Rust | Go]
成績: 85点, 92点, 78点, 95点 (計4名)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stream" lessonId="collectors" />
      </div>
      <LessonNav lessons={lessons} currentId="collectors" basePath="/learn/stream" />
    </div>
  );
}
