import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function ImportPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">パッケージ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">import文</h1>
        <p className="text-gray-400">import、import static、ワイルドカードimport</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">import文の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          import文を使うと、他のパッケージのクラスを短い名前で使用できます。
          <code className="text-orange-300">java.lang</code> パッケージは自動的にimportされるため、
          <code className="text-orange-300">String</code> や <code className="text-orange-300">System</code> はimport不要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>import java.util.List;</code> - 個別クラスのimport（推奨）</li>
          <li><code>import java.util.*;</code> - ワイルドカードimport（パッケージ内全クラス）</li>
          <li><code>import static java.lang.Math.PI;</code> - staticメンバのimport</li>
          <li><code>java.lang.*</code> は暗黙的にimport済み</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">個別importとワイルドカード</h2>
        <p className="text-gray-400 mb-4">
          個別importは使用するクラスが明確になり、ワイルドカードは記述が簡潔になります。
          一般的には個別importが推奨されます。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        // 個別importしたクラスを使用
        List<String> fruits = new ArrayList<>();
        fruits.add("りんご");
        fruits.add("みかん");
        fruits.add("バナナ");

        Map<String, Integer> prices = new HashMap<>();
        prices.put("りんご", 200);
        prices.put("みかん", 100);
        prices.put("バナナ", 150);

        System.out.println("=== フルーツリスト ===");
        for (String fruit : fruits) {
            System.out.println(fruit + ": " + prices.get(fruit) + "円");
        }
    }
}`}
          expectedOutput={`=== フルーツリスト ===
りんご: 200円
みかん: 100円
バナナ: 150円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">static import</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">import static</code> を使うと、
          クラス名を省略してstaticメンバに直接アクセスできます。
        </p>
        <JavaEditor
          defaultCode={`import static java.lang.Math.PI;
import static java.lang.Math.sqrt;
import static java.lang.Math.pow;

public class Main {
    public static void main(String[] args) {
        // static importなし: Math.PI, Math.sqrt()
        // static importあり: PI, sqrt() だけで使える

        double radius = 5.0;
        double area = PI * pow(radius, 2);
        double circumference = 2 * PI * radius;
        double diagonal = sqrt(pow(3, 2) + pow(4, 2));

        System.out.println("=== static importの例 ===");
        System.out.printf("半径 %.0f の円の面積: %.2f%n", radius, area);
        System.out.printf("半径 %.0f の円の周長: %.2f%n", radius, circumference);
        System.out.printf("3-4-5 三角形の斜辺: %.1f%n", diagonal);
    }
}`}
          expectedOutput={`=== static importの例 ===
半径 5 の円の面積: 78.54
半径 5 の円の周長: 31.42
3-4-5 三角形の斜辺: 5.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">importのベストプラクティス</h2>
        <p className="text-gray-400 mb-4">
          importの書き方にはチームで統一すべきルールがあります。IDEの自動import機能を活用しましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== importのベストプラクティス ===");
        System.out.println();

        System.out.println("推奨:");
        System.out.println("  import java.util.List;        ← 個別import");
        System.out.println("  import java.util.ArrayList;   ← 使うクラスだけ");
        System.out.println();

        System.out.println("避けるべき:");
        System.out.println("  import java.util.*;            ← ワイルドカード");
        System.out.println("  → どのクラスを使っているか不明確");
        System.out.println("  → 名前衝突のリスク");
        System.out.println();

        System.out.println("static importの注意:");
        System.out.println("  import static java.lang.Math.PI;  ← OK（有名な定数）");
        System.out.println("  import static foo.Bar.*;           ← 避ける");
        System.out.println("  → 出所が分からなくなる");
        System.out.println();

        // 名前衝突の例
        System.out.println("名前衝突の例:");
        System.out.println("  java.util.Date と java.sql.Date");
        System.out.println("  → 片方を完全修飾名で使用する");

        List<String> tips = new ArrayList<>();
        tips.add("IDEの自動importを活用する");
        tips.add("未使用importは削除する");
        System.out.println();
        tips.forEach(t -> System.out.println("TIP: " + t));
    }
}`}
          expectedOutput={`=== importのベストプラクティス ===

推奨:
  import java.util.List;        ← 個別import
  import java.util.ArrayList;   ← 使うクラスだけ

避けるべき:
  import java.util.*;            ← ワイルドカード
  → どのクラスを使っているか不明確
  → 名前衝突のリスク

static importの注意:
  import static java.lang.Math.PI;  ← OK（有名な定数）
  import static foo.Bar.*;           ← 避ける
  → 出所が分からなくなる

名前衝突の例:
  java.util.Date と java.sql.Date
  → 片方を完全修飾名で使用する

TIP: IDEの自動importを活用する
TIP: 未使用importは削除する`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="packages" lessonId="import" />
      </div>
      <LessonNav lessons={lessons} currentId="import" basePath="/learn/packages" />
    </div>
  );
}
