import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function TernaryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">制御構文 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">三項演算子</h1>
        <p className="text-gray-400">condition ? a : b による簡潔な条件式</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          三項演算子（条件演算子）は <code className="text-orange-300">条件 ? 値A : 値B</code> の形式で、
          条件が true なら値A、false なら値Bを返します。
          シンプルな if-else を1行で書ける便利な演算子です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>構文: <code>condition ? valueIfTrue : valueIfFalse</code></li>
          <li>if-else の代わりに使える（値を返す式として）</li>
          <li>変数への代入やメソッドの引数に直接使える</li>
          <li>ネストは可能だが、可読性が下がるので注意</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な三項演算子</h2>
        <p className="text-gray-400 mb-4">
          if-else と三項演算子を比較して、簡潔さを確認しましょう。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int age = 20;

        // if-else版
        String status1;
        if (age >= 18) {
            status1 = "成人";
        } else {
            status1 = "未成年";
        }

        // 三項演算子版（同じ結果をより簡潔に）
        String status2 = age >= 18 ? "成人" : "未成年";

        System.out.println("if-else: " + status1);
        System.out.println("三項演算子: " + status2);

        // 数値での使用
        int a = 15, b = 23;
        int max = a > b ? a : b;
        int min = a < b ? a : b;
        System.out.println("最大値: " + max);
        System.out.println("最小値: " + min);

        // 直接printlnに使用
        int score = 75;
        System.out.println("結果: " + (score >= 60 ? "合格" : "不合格"));
    }
}`}
          expectedOutput={`if-else: 成人
三項演算子: 成人
最大値: 23
最小値: 15
結果: 合格`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践的な活用例</h2>
        <p className="text-gray-400 mb-4">
          三項演算子を使った実用的なコードパターンです。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // null安全な文字列処理
        String name = null;
        String displayName = name != null ? name : "ゲスト";
        System.out.println("ようこそ、" + displayName + "さん");

        // 偶数・奇数判定
        for (int i = 1; i <= 5; i++) {
            String type = i % 2 == 0 ? "偶数" : "奇数";
            System.out.println(i + " は " + type);
        }

        // 絶対値の計算
        int value = -42;
        int abs = value >= 0 ? value : -value;
        System.out.println("|" + value + "| = " + abs);

        // 複数形の処理
        int itemCount = 1;
        System.out.println(itemCount + " item" + (itemCount == 1 ? "" : "s"));
        itemCount = 5;
        System.out.println(itemCount + " item" + (itemCount == 1 ? "" : "s"));
    }
}`}
          expectedOutput={`ようこそ、ゲストさん
1 は 奇数
2 は 偶数
3 は 奇数
4 は 偶数
5 は 奇数
|-42| = 42
1 item
5 items`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストと注意点</h2>
        <p className="text-gray-400 mb-4">
          三項演算子はネストできますが、可読性を考慮して使いましょう。
          複雑な条件は if-else の方が適切です。
        </p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        int score = 85;

        // ネストした三項演算子（可読性に注意）
        String grade = score >= 90 ? "A"
                     : score >= 80 ? "B"
                     : score >= 70 ? "C"
                     : score >= 60 ? "D"
                     : "F";
        System.out.println("スコア " + score + " → 評価 " + grade);

        // メソッドの引数で使用
        int temperature = 30;
        System.out.println(formatTemp(temperature));

        temperature = 15;
        System.out.println(formatTemp(temperature));
    }

    static String formatTemp(int temp) {
        String feeling = temp >= 30 ? "暑い"
                       : temp >= 20 ? "快適"
                       : "寒い";
        return temp + "℃ → " + feeling;
    }
}`}
          expectedOutput={`スコア 85 → 評価 B
30℃ → 暑い
15℃ → 寒い`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="ternary" />
      </div>
      <LessonNav lessons={lessons} currentId="ternary" basePath="/learn/control" />
    </div>
  );
}
