import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function RecursionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰</h1>
        <p className="text-gray-400">自分自身を呼び出す再帰関数の設計を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">再帰の仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          再帰関数は<strong className="text-teal-400">自分自身を呼び出す</strong>関数です。
          必ず<strong className="text-teal-400">ベースケース（終了条件）</strong>を設けないと無限ループになります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ベースケース：再帰を止める条件（必須）</li>
          <li>再帰ステップ：問題を小さくして自分を呼ぶ</li>
          <li>各呼び出しはスタックフレームを消費する</li>
          <li>深すぎる再帰はスタックオーバーフローを起こす</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">階乗とフィボナッチ数</h2>
        <p className="text-gray-400 mb-4">
          再帰の典型例：階乗（n!）とフィボナッチ数列です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// 階乗: n! = n * (n-1)!
int factorial(int n) {
    if (n <= 1) return 1;        // ベースケース
    return n * factorial(n - 1); // 再帰ステップ
}

// フィボナッチ数列
int fib(int n) {
    if (n <= 1) return n;        // ベースケース
    return fib(n-1) + fib(n-2);  // 再帰ステップ
}

int main() {
    printf("階乗:\\n");
    for (int i = 0; i <= 7; i++) {
        printf("%d! = %d\\n", i, factorial(i));
    }

    printf("\\nフィボナッチ数列:\\n");
    for (int i = 0; i <= 10; i++) {
        printf("fib(%2d) = %d\\n", i, fib(i));
    }

    return 0;
}`}
          expectedOutput={`階乗:
0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
7! = 5040

フィボナッチ数列:
fib( 0) = 0
fib( 1) = 1
fib( 2) = 1
fib( 3) = 2
fib( 4) = 3
fib( 5) = 5
fib( 6) = 8
fib( 7) = 13
fib( 8) = 21
fib( 9) = 34
fib(10) = 55`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ユークリッドの互除法</h2>
        <p className="text-gray-400 mb-4">
          最大公約数を求めるユークリッドの互除法は再帰で非常に簡潔に書けます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// 最大公約数（ユークリッドの互除法）
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// 最小公倍数
int lcm(int a, int b) {
    return a / gcd(a, b) * b;
}

int main() {
    int pairs[][2] = {{12, 8}, {15, 25}, {100, 75}, {7, 13}};

    for (int i = 0; i < 4; i++) {
        int a = pairs[i][0], b = pairs[i][1];
        printf("gcd(%3d, %3d) = %3d, lcm = %d\\n",
               a, b, gcd(a, b), lcm(a, b));
    }

    return 0;
}`}
          expectedOutput={`gcd( 12,   8) =   4, lcm = 24
gcd( 15,  25) =   5, lcm = 75
gcd(100,  75) =  25, lcm = 300
gcd(  7,  13) =   1, lcm = 91`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="recursion" />
      </div>
      <LessonNav lessons={lessons} currentId="recursion" basePath="/learn/functions" />
    </div>
  );
}
