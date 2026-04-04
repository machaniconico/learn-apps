import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function TernaryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御フロー レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">三項演算子</h1>
        <p className="text-gray-400">条件式を使った簡潔な分岐の書き方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子の構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">条件 ? 真の値 : 偽の値</code> の形式で、
          if-elseを1行で書けます。値を返す式なので変数の初期化にも使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>シンプルな条件分岐を簡潔に書ける</li>
          <li>式（値を返す）なので変数に代入できる</li>
          <li>ネストは可読性が下がるので避けるべき</li>
          <li>複雑な処理はif-elseを使う方が良い</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な三項演算子</h2>
        <p className="text-gray-400 mb-4">
          if-elseと三項演算子の等価な書き方を比較します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int x = 7;

    // if-elseの書き方
    char *result1;
    if (x % 2 == 0) {
        result1 = "偶数";
    } else {
        result1 = "奇数";
    }

    // 三項演算子の書き方（等価）
    char *result2 = (x % 2 == 0) ? "偶数" : "奇数";

    printf("%d は %s (if-else)\\n", x, result1);
    printf("%d は %s (三項演算子)\\n", x, result2);

    // 最大値を求める
    int a = 15, b = 23;
    int max = (a > b) ? a : b;
    printf("max(%d, %d) = %d\\n", a, b, max);

    // 絶対値
    int n = -42;
    int abs_n = (n >= 0) ? n : -n;
    printf("|%d| = %d\\n", n, abs_n);

    return 0;
}`}
          expectedOutput={`7 は 奇数 (if-else)
7 は 奇数 (三項演算子)
max(15, 23) = 23
|-42| = 42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子の活用例</h2>
        <p className="text-gray-400 mb-4">
          printfの中で直接使ったり、値の正規化に使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // printfの中で直接使う
    for (int i = 1; i <= 5; i++) {
        printf("%d は%s\\n", i, (i % 2 == 0) ? "偶数" : "奇数");
    }

    // 範囲クランプ（値を範囲内に収める）
    int values[] = {-5, 0, 50, 100, 150};
    int min_val = 0, max_val = 100;

    printf("\\nクランプ結果:\\n");
    for (int i = 0; i < 5; i++) {
        int v = values[i];
        int clamped = (v < min_val) ? min_val : (v > max_val) ? max_val : v;
        printf("%4d -> %d\\n", v, clamped);
    }

    return 0;
}`}
          expectedOutput={`1 は奇数
2 は偶数
3 は奇数
4 は偶数
5 は奇数

クランプ結果:
  -5 -> 0
   0 -> 0
  50 -> 50
 100 -> 100
 150 -> 100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="ternary" />
      </div>
      <LessonNav lessons={lessons} currentId="ternary" basePath="/learn/control" />
    </div>
  );
}
