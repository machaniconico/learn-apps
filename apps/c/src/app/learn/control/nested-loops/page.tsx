import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function NestedLoopsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御フロー レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ネストしたループ</h1>
        <p className="text-gray-400">ループの中にループを書く多重ループを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">多重ループの構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ループの中にループを書くことができます。外側のループが1回進むたびに内側のループが全て実行されます。
          2次元配列の処理や表の描画によく使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>外側のループ変数と内側のループ変数は別の名前にする</li>
          <li>実行回数は外側 × 内側の回数</li>
          <li>深くネストしすぎると可読性が下がる（3重以上は注意）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">九九の表</h2>
        <p className="text-gray-400 mb-4">
          2重ループの典型例：九九（掛け算表）を出力します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    printf("九九の表\\n");
    printf("   ");
    for (int j = 1; j <= 9; j++) {
        printf("%4d", j);
    }
    printf("\\n   ");
    for (int j = 1; j <= 9; j++) {
        printf("----");
    }
    printf("\\n");

    for (int i = 1; i <= 9; i++) {
        printf("%2d|", i);
        for (int j = 1; j <= 9; j++) {
            printf("%4d", i * j);
        }
        printf("\\n");
    }

    return 0;
}`}
          expectedOutput={`九九の表
      1   2   3   4   5   6   7   8   9
   ------------------------------------
 1|   1   2   3   4   5   6   7   8   9
 2|   2   4   6   8  10  12  14  16  18
 3|   3   6   9  12  15  18  21  24  27
 4|   4   8  12  16  20  24  28  32  36
 5|   5  10  15  20  25  30  35  40  45
 6|   6  12  18  24  30  36  42  48  54
 7|   7  14  21  28  35  42  49  56  63
 8|   8  16  24  32  40  48  56  64  72
 9|   9  18  27  36  45  54  63  72  81`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">三角形のパターン</h2>
        <p className="text-gray-400 mb-4">
          ネストしたループで図形パターンを描画します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int n = 5;

    // 直角三角形
    printf("直角三角形:\\n");
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    // 逆三角形
    printf("\\n逆三角形:\\n");
    for (int i = n; i >= 1; i--) {
        for (int j = 0; j < i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    return 0;
}`}
          expectedOutput={`直角三角形:
*
* *
* * *
* * * *
* * * * *

逆三角形:
* * * * *
* * * *
* * *
* *
*`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="nested-loops" />
      </div>
      <LessonNav lessons={lessons} currentId="nested-loops" basePath="/learn/control" />
    </div>
  );
}
