import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsReturnValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">メソッド レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">戻り値</h1>
        <p className="text-gray-400">return文の使い方と、複数の値をオブジェクトで返すテクニックを学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">戻り値（return）の仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドは return 文を使って呼び出し元に値を返すことができます。
          戻り値の型はメソッド宣言で指定し、return 文で返す値の型と一致させる必要があります。
          voidメソッドでは return; で途中終了でき、値を返すメソッドでは return 式; で値を返します。
          Javaは単一の値しか返せませんが、配列やオブジェクトを使って複数の値をまとめて返せます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>return文はメソッドの実行を即座に終了させる</li>
          <li>条件分岐のすべてのパスでreturn文が必要</li>
          <li>複数の値を返したい場合は配列やオブジェクトを利用する</li>
          <li>戻り値を変数に代入するか、直接式の中で使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なreturn文</h2>
        <p className="text-gray-400 mb-4">様々な型の戻り値と、条件分岐での早期リターンの例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static String getGrade(int score) {
        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        if (score >= 60) return "D";
        return "F";  // どの条件にも合わなかった場合
    }

    static int findMax(int a, int b, int c) {
        int max = a;
        if (b > max) max = b;
        if (c > max) max = c;
        return max;
    }

    static double average(int[] nums) {
        if (nums.length == 0) return 0.0;  // 早期リターン
        int sum = 0;
        for (int n : nums) sum += n;
        return (double) sum / nums.length;
    }

    public static void main(String[] args) {
        System.out.println("85点 → " + getGrade(85));
        System.out.println("72点 → " + getGrade(72));
        System.out.println("55点 → " + getGrade(55));

        System.out.println("最大値: " + findMax(10, 25, 18));

        int[] scores = {80, 90, 75, 85};
        System.out.printf("平均: %.1f%n", average(scores));
    }
}`}
          expectedOutput={`85点 → B
72点 → C
55点 → F
最大値: 25
平均: 82.5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列で複数の値を返す</h2>
        <p className="text-gray-400 mb-4">Javaでは戻り値は1つだけですが、配列を使って複数の値をまとめて返せます。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // 最小値と最大値を配列で返す
    static int[] findMinMax(int[] arr) {
        int min = arr[0];
        int max = arr[0];
        for (int n : arr) {
            if (n < min) min = n;
            if (n > max) max = n;
        }
        return new int[]{min, max};
    }

    // 統計情報を返す
    static double[] calcStats(int[] data) {
        double sum = 0;
        for (int d : data) sum += d;
        double avg = sum / data.length;

        double variance = 0;
        for (int d : data) {
            variance += (d - avg) * (d - avg);
        }
        variance /= data.length;

        return new double[]{sum, avg, Math.sqrt(variance)};
    }

    public static void main(String[] args) {
        int[] nums = {3, 7, 1, 9, 4, 6};

        int[] minMax = findMinMax(nums);
        System.out.println("最小値: " + minMax[0]);
        System.out.println("最大値: " + minMax[1]);

        System.out.println("---");
        double[] stats = calcStats(nums);
        System.out.printf("合計: %.0f%n", stats[0]);
        System.out.printf("平均: %.1f%n", stats[1]);
        System.out.printf("標準偏差: %.2f%n", stats[2]);
    }
}`}
          expectedOutput={`最小値: 1
最大値: 9
---
合計: 30
平均: 5.0
標準偏差: 2.58`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドチェーンと戻り値の活用</h2>
        <p className="text-gray-400 mb-4">戻り値を別のメソッドの引数として直接渡す活用法です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    static String repeat(String s, int count) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < count; i++) sb.append(s);
        return sb.toString();
    }

    static String surround(String text, String border) {
        return border + " " + text + " " + border;
    }

    static String toUpperFirst(String s) {
        if (s.isEmpty()) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }

    public static void main(String[] args) {
        // 戻り値を直接引数に渡す
        String stars = repeat("*", 5);
        System.out.println(surround("Java", stars));

        // メソッドの戻り値を組み合わせ
        String title = toUpperFirst("hello");
        String decorated = surround(title, repeat("-", 3));
        System.out.println(decorated);

        // ネストした呼び出し
        System.out.println(surround(toUpperFirst("world"), repeat("=", 4)));
    }
}`}
          expectedOutput={`***** Java *****
--- Hello ---
==== World ====`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="return-values" />
      </div>
      <LessonNav lessons={lessons} currentId="return-values" basePath="/learn/methods" />
    </div>
  );
}
