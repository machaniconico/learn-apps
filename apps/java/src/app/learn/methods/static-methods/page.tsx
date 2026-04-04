import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsStaticMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">メソッド レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">staticメソッド</h1>
        <p className="text-gray-400">クラスに属するstaticメソッドの仕組みと標準ライブラリの活用を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">staticメソッドとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          staticメソッドはインスタンスを生成せずにクラス名から直接呼び出せるメソッドです。
          Math.abs()やInteger.parseInt()など、Java標準ライブラリでも多用されています。
          staticメソッドはインスタンスフィールドやインスタンスメソッドに直接アクセスできません。
          ユーティリティ関数や変換処理など、オブジェクトの状態に依存しない処理に適しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>クラス名.メソッド名() で呼び出す</li>
          <li>thisキーワードは使えない</li>
          <li>staticフィールドにはアクセスできるが、インスタンスフィールドには直接アクセス不可</li>
          <li>mainメソッドもstaticメソッドの一つ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Mathクラスのstaticメソッド</h2>
        <p className="text-gray-400 mb-4">Java標準ライブラリのMathクラスが提供するstaticメソッドを使ってみましょう。</p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // 絶対値
        System.out.println("abs(-5) = " + Math.abs(-5));

        // 最大値・最小値
        System.out.println("max(3,7) = " + Math.max(3, 7));
        System.out.println("min(3,7) = " + Math.min(3, 7));

        // 累乗・平方根
        System.out.println("pow(2,8) = " + (int) Math.pow(2, 8));
        System.out.printf("sqrt(144) = %.0f%n", Math.sqrt(144));

        // 四捨五入・切り上げ・切り捨て
        System.out.println("round(3.6) = " + Math.round(3.6));
        System.out.printf("ceil(3.2) = %.0f%n", Math.ceil(3.2));
        System.out.printf("floor(3.8) = %.0f%n", Math.floor(3.8));

        // 円周率
        System.out.printf("PI = %.4f%n", Math.PI);
    }
}`}
          expectedOutput={`abs(-5) = 5
max(3,7) = 7
min(3,7) = 3
pow(2,8) = 256
sqrt(144) = 12
round(3.6) = 4
ceil(3.2) = 4
floor(3.8) = 3
PI = 3.1416`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自作のstaticユーティリティメソッド</h2>
        <p className="text-gray-400 mb-4">staticメソッドを使ってユーティリティクラスを作成する例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // 文字列ユーティリティ
    static boolean isEmpty(String s) {
        return s == null || s.length() == 0;
    }

    static String capitalize(String s) {
        if (isEmpty(s)) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }

    static String padLeft(String s, int width, char ch) {
        StringBuilder sb = new StringBuilder();
        for (int i = s.length(); i < width; i++) {
            sb.append(ch);
        }
        sb.append(s);
        return sb.toString();
    }

    // 数値ユーティリティ
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("isEmpty: " + isEmpty(""));
        System.out.println("isEmpty: " + isEmpty("hello"));
        System.out.println(capitalize("java"));
        System.out.println(padLeft("42", 5, '0'));
        System.out.println(padLeft("7", 3, '0'));

        System.out.println("---");
        for (int i = 1; i <= 10; i++) {
            if (isPrime(i)) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }
}`}
          expectedOutput={`isEmpty: true
isEmpty: false
Java
00042
007
---
2 3 5 7 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型変換のstaticメソッド</h2>
        <p className="text-gray-400 mb-4">Integer.parseInt()やString.valueOf()など、型変換に使うstaticメソッドを確認します。</p>
        <JavaEditor
          defaultCode={`public class Main {
    public static void main(String[] args) {
        // String → int
        int num = Integer.parseInt("123");
        System.out.println("parseInt: " + num);

        // String → double
        double d = Double.parseDouble("3.14");
        System.out.println("parseDouble: " + d);

        // int → String
        String s1 = String.valueOf(42);
        System.out.println("valueOf(42): " + s1);

        // int → 2進数・16進数文字列
        System.out.println("toBinary(255): " + Integer.toBinaryString(255));
        System.out.println("toHex(255): " + Integer.toHexString(255));

        // 比較メソッド
        System.out.println("compare(3,5): " + Integer.compare(3, 5));
        System.out.println("compare(5,5): " + Integer.compare(5, 5));
        System.out.println("compare(7,5): " + Integer.compare(7, 5));
    }
}`}
          expectedOutput={`parseInt: 123
parseDouble: 3.14
valueOf(42): 42
toBinary(255): 11111111
toHex(255): ff
compare(3,5): -1
compare(5,5): 0
compare(7,5): 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="static-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="static-methods" basePath="/learn/methods" />
    </div>
  );
}
