import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function PrototypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数プロトタイプ</h1>
        <p className="text-gray-400">関数宣言（プロトタイプ）の書き方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロトタイプ宣言とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">プロトタイプ（前方宣言）</strong>は関数の定義より前に関数のシグネチャを宣言することです。
          これにより関数の定義よりも前の位置で呼び出せます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>構文：<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">戻り値型 関数名(引数型リスト);</code></li>
          <li>引数名は省略可能（型だけでもよい）</li>
          <li>ヘッダファイル（.h）にプロトタイプを書くのが一般的</li>
          <li>相互再帰（AがBを呼び、BがAを呼ぶ）にも必要</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プロトタイプなしの問題</h2>
        <p className="text-gray-400 mb-4">
          プロトタイプを使って、定義より前に関数を呼び出す例です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// プロトタイプ宣言（定義はmainの後）
int factorial(int n);
double power(double base, int exp);
void print_stars(int n);

int main() {
    // プロトタイプがあるので定義より前に呼び出せる
    printf("5! = %d\\n", factorial(5));
    printf("2^10 = %.0f\\n", power(2.0, 10));
    print_stars(7);

    return 0;
}

// 関数の定義（mainの後）
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

double power(double base, int exp) {
    double result = 1.0;
    for (int i = 0; i < exp; i++) result *= base;
    return result;
}

void print_stars(int n) {
    for (int i = 0; i < n; i++) printf("*");
    printf("\\n");
}`}
          expectedOutput={`5! = 120
2^10 = 1024
*******`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">相互再帰</h2>
        <p className="text-gray-400 mb-4">
          互いを呼び合う関数（相互再帰）にはプロトタイプが必須です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// 相互再帰のプロトタイプ（どちらかが必要）
int is_even(int n);
int is_odd(int n);

int is_even(int n) {
    if (n == 0) return 1;
    return is_odd(n - 1);  // is_oddを呼ぶ
}

int is_odd(int n) {
    if (n == 0) return 0;
    return is_even(n - 1);  // is_evenを呼ぶ
}

int main() {
    for (int i = 0; i <= 6; i++) {
        printf("%d: %s\\n", i, is_even(i) ? "偶数" : "奇数");
    }
    return 0;
}`}
          expectedOutput={`0: 偶数
1: 奇数
2: 偶数
3: 奇数
4: 偶数
5: 奇数
6: 偶数`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="prototypes" />
      </div>
      <LessonNav lessons={lessons} currentId="prototypes" basePath="/learn/functions" />
    </div>
  );
}
