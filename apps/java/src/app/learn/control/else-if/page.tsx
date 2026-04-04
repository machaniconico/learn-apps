import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ElseIfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">制御構文 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">else if</h1>
        <p className="text-gray-400">複数条件のチェーン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">else if チェーン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">else if</code> を使うと、複数の条件を順番にチェックできます。
          最初に <code>true</code> になった条件のブロックだけが実行され、残りはスキップされます。
          すべての条件が <code>false</code> の場合は <code>else</code> ブロックが実行されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>上から順に条件を評価し、最初にtrueになったブロックのみ実行</li>
          <li><code>else if</code> はいくつでも連鎖可能</li>
          <li>最後の <code>else</code> はどの条件にも当てはまらない場合のデフォルト処理</li>
          <li>条件の順序が重要（より具体的な条件を先に書く）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">成績判定</h2>
        <p className="text-gray-400 mb-4">
          スコアに応じてグレードを判定する典型的な else if チェーンです。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int score = 82;

        String grade;
        if (score >= 90) {
            grade = "A (優秀)";
        } else if (score >= 80) {
            grade = "B (良好)";
        } else if (score >= 70) {
            grade = "C (普通)";
        } else if (score >= 60) {
            grade = "D (可)";
        } else {
            grade = "F (不可)";
        }

        System.out.println("スコア: " + score);
        System.out.println("評価: " + grade);

        // 別の例: 気温判定
        int temp = 28;
        if (temp >= 35) {
            System.out.println(temp + "℃: 猛暑日");
        } else if (temp >= 30) {
            System.out.println(temp + "℃: 真夏日");
        } else if (temp >= 25) {
            System.out.println(temp + "℃: 夏日");
        } else {
            System.out.println(temp + "℃: 通常");
        }
    }
}`}
          expectedOutput={`スコア: 82
評価: B (良好)
28℃: 夏日`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複合条件の else if</h2>
        <p className="text-gray-400 mb-4">
          各条件に複合条件（AND/OR）を組み合わせた実践的な例です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int age = 15;
        boolean isStudent = true;

        // チケット料金の判定
        int price;
        String category;

        if (age < 6) {
            price = 0;
            category = "幼児（無料）";
        } else if (age < 12) {
            price = 500;
            category = "子供";
        } else if (age < 18 || isStudent) {
            price = 800;
            category = "学生";
        } else if (age >= 65) {
            price = 600;
            category = "シニア";
        } else {
            price = 1200;
            category = "大人";
        }

        System.out.println("年齢: " + age + "歳");
        System.out.println("カテゴリ: " + category);
        System.out.println("料金: " + price + "円");
    }
}`}
          expectedOutput={`年齢: 15歳
カテゴリ: 学生
料金: 800円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">BMI判定の例</h2>
        <p className="text-gray-400 mb-4">
          実用的な else if チェーンでBMI（体格指数）を判定します。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        double weight = 65.0;  // kg
        double height = 1.70;  // m

        double bmi = weight / (height * height);

        System.out.printf("体重: %.1fkg%n", weight);
        System.out.printf("身長: %.2fm%n", height);
        System.out.printf("BMI: %.1f%n", bmi);

        if (bmi < 18.5) {
            System.out.println("判定: 低体重");
        } else if (bmi < 25.0) {
            System.out.println("判定: 普通体重");
        } else if (bmi < 30.0) {
            System.out.println("判定: 肥満(1度)");
        } else if (bmi < 35.0) {
            System.out.println("判定: 肥満(2度)");
        } else {
            System.out.println("判定: 肥満(3度以上)");
        }
    }
}`}
          expectedOutput={`体重: 65.0kg
身長: 1.70m
BMI: 22.5
判定: 普通体重`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="else-if" />
      </div>
      <LessonNav lessons={lessons} currentId="else-if" basePath="/learn/control" />
    </div>
  );
}
