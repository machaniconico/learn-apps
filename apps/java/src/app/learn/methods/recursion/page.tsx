import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsRecursionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">メソッド レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰</h1>
        <p className="text-gray-400">自分自身を呼び出す再帰メソッドの設計と活用法を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">再帰（Recursion）とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          再帰とは、メソッドが自分自身を呼び出すプログラミング手法です。
          複雑な問題を同じ構造の小さな部分問題に分割して解決するのに適しています。
          再帰メソッドには必ず「基底条件（ベースケース）」を設け、無限ループを防ぐ必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>基底条件：再帰を停止する条件（必須）</li>
          <li>再帰ステップ：問題をより小さな部分問題に分割して自身を呼び出す</li>
          <li>スタックオーバーフローに注意（深い再帰は避ける）</li>
          <li>ツリー構造やフラクタルなどの処理に向いている</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">階乗の計算</h2>
        <p className="text-gray-400 mb-4">n! = n * (n-1) * ... * 1 を再帰で計算する古典的な例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // n! = n * (n-1)!
    // 基底条件: 0! = 1, 1! = 1
    static long factorial(int n) {
        if (n <= 1) return 1;       // 基底条件
        return n * factorial(n - 1); // 再帰ステップ
    }

    // 再帰の過程を表示
    static long factorialVerbose(int n, int depth) {
        String indent = "  ".repeat(depth);
        System.out.println(indent + "factorial(" + n + ") 呼び出し");

        if (n <= 1) {
            System.out.println(indent + "→ 基底条件: 1を返す");
            return 1;
        }

        long result = n * factorialVerbose(n - 1, depth + 1);
        System.out.println(indent + "→ " + n + " * factorial(" + (n-1) + ") = " + result);
        return result;
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
        System.out.println("10! = " + factorial(10));
        System.out.println("---");
        factorialVerbose(4, 0);
    }
}`}
          expectedOutput={`5! = 120
10! = 3628800
---
factorial(4) 呼び出し
  factorial(3) 呼び出し
    factorial(2) 呼び出し
      factorial(1) 呼び出し
      → 基底条件: 1を返す
    → 2 * factorial(1) = 2
  → 3 * factorial(2) = 6
→ 4 * factorial(3) = 24`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フィボナッチ数列</h2>
        <p className="text-gray-400 mb-4">F(n) = F(n-1) + F(n-2) というフィボナッチ数列を再帰で求めます。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // 単純な再帰（効率は悪いが分かりやすい）
    static int fib(int n) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        // フィボナッチ数列の最初の10項を表示
        System.out.print("フィボナッチ数列: ");
        for (int i = 0; i < 10; i++) {
            if (i > 0) System.out.print(", ");
            System.out.print(fib(i));
        }
        System.out.println();

        // 各項の計算
        System.out.println("F(5)  = " + fib(5));
        System.out.println("F(10) = " + fib(10));
        System.out.println("F(15) = " + fib(15));
    }
}`}
          expectedOutput={`フィボナッチ数列: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
F(5)  = 5
F(10) = 55
F(15) = 610`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の再帰処理</h2>
        <p className="text-gray-400 mb-4">再帰を使って文字列を逆転させたり、回文判定を行う例です。</p>
        <JavaEditor
          defaultCode={`public class Main {
    // 文字列を再帰で反転
    static String reverse(String s) {
        if (s.length() <= 1) return s;
        return reverse(s.substring(1)) + s.charAt(0);
    }

    // 回文判定を再帰で
    static boolean isPalindrome(String s) {
        if (s.length() <= 1) return true;
        if (s.charAt(0) != s.charAt(s.length() - 1)) return false;
        return isPalindrome(s.substring(1, s.length() - 1));
    }

    // 数値の各桁の合計を再帰で
    static int digitSum(int n) {
        if (n < 10) return n;
        return (n % 10) + digitSum(n / 10);
    }

    public static void main(String[] args) {
        System.out.println("reverse(\"Java\") = " + reverse("Java"));
        System.out.println("reverse(\"hello\") = " + reverse("hello"));

        System.out.println("---");
        System.out.println("\"madam\"は回文？ " + isPalindrome("madam"));
        System.out.println("\"hello\"は回文？ " + isPalindrome("hello"));
        System.out.println("\"racecar\"は回文？ " + isPalindrome("racecar"));

        System.out.println("---");
        System.out.println("digitSum(1234) = " + digitSum(1234));
        System.out.println("digitSum(9999) = " + digitSum(9999));
    }
}`}
          expectedOutput={`reverse("Java") = avaJ
reverse("hello") = olleh
---
"madam"は回文？ true
"hello"は回文？ false
"racecar"は回文？ true
---
digitSum(1234) = 10
digitSum(9999) = 36`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="recursion" />
      </div>
      <LessonNav lessons={lessons} currentId="recursion" basePath="/learn/methods" />
    </div>
  );
}
