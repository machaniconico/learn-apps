import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function EnhancedForPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">制御構文 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">拡張forループ</h1>
        <p className="text-gray-400">for(Type item : collection) で簡潔にイテレーション</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">拡張for文（for-each）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          拡張for文（for-each文）は、配列やコレクションの全要素を簡潔に巡回するための構文です。
          インデックス変数が不要で、読みやすく安全なコードが書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>構文: <code>{`for (Type variable : collection)`}</code></li>
          <li>配列、List、Set、Mapなど Iterable を実装するすべてのコレクションに使える</li>
          <li>インデックスが不要な場合は拡張forの方がシンプル</li>
          <li>ループ中に要素を削除・追加すると ConcurrentModificationException が発生する可能性</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列での拡張for</h2>
        <p className="text-gray-400 mb-4">
          通常のfor文と拡張for文を比較して、コードの簡潔さを確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        String[] languages = {"Java", "Python", "JavaScript", "Go"};

        // 通常のfor文
        System.out.println("--- 通常のfor ---");
        for (int i = 0; i < languages.length; i++) {
            System.out.println(languages[i]);
        }

        // 拡張for文（同じ結果をより簡潔に）
        System.out.println("--- 拡張for ---");
        for (String lang : languages) {
            System.out.println(lang);
        }

        // 数値配列の合計
        int[] scores = {85, 92, 78, 90, 88};
        int total = 0;
        for (int score : scores) {
            total += score;
        }
        System.out.println("合計: " + total);
        System.out.println("平均: " + (total / scores.length));
    }
}`}
          expectedOutput={`--- 通常のfor ---
Java
Python
JavaScript
Go
--- 拡張for ---
Java
Python
JavaScript
Go
合計: 433
平均: 86`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コレクションでの拡張for</h2>
        <p className="text-gray-400 mb-4">
          List、Set、Map などのコレクションフレームワークでも拡張 for を使えます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.List;
import java.util.Map;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        // Listの拡張for
        List<String> fruits = List.of("りんご", "バナナ", "オレンジ");
        System.out.println("=== List ===");
        for (String fruit : fruits) {
            System.out.println("  " + fruit);
        }

        // Setの拡張for
        Set<Integer> numbers = Set.of(3, 1, 4, 1, 5);  // 重複は除外
        System.out.println("=== Set ===");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();

        // Mapの拡張for（entrySet）
        Map<String, Integer> prices = Map.of("コーヒー", 300, "紅茶", 250, "ジュース", 150);
        System.out.println("=== Map ===");
        for (Map.Entry<String, Integer> entry : prices.entrySet()) {
            System.out.println("  " + entry.getKey() + ": " + entry.getValue() + "円");
        }
    }
}`}
          expectedOutput={`=== List ===
  りんご
  バナナ
  オレンジ
=== Set ===
3 1 4 5
=== Map ===
  コーヒー: 300円
  紅茶: 250円
  ジュース: 150円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">2次元配列と拡張for</h2>
        <p className="text-gray-400 mb-4">
          ネストした拡張 for で2次元配列を簡潔に処理できます。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // 2次元配列の拡張for
        System.out.println("=== 行列 ===");
        for (int[] row : matrix) {
            for (int value : row) {
                System.out.printf("%3d", value);
            }
            System.out.println();
        }

        // 全要素の合計
        int sum = 0;
        for (int[] row : matrix) {
            for (int value : row) {
                sum += value;
            }
        }
        System.out.println("合計: " + sum);
    }
}`}
          expectedOutput={`=== 行列 ===
  1  2  3
  4  5  6
  7  8  9
合計: 45`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="enhanced-for" />
      </div>
      <LessonNav lessons={lessons} currentId="enhanced-for" basePath="/learn/control" />
    </div>
  );
}
