import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function WhileLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御フロー レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">whileループ</h1>
        <p className="text-gray-400">条件が真の間繰り返すwhileの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">whileループの構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">while(条件)</code> は条件が真の間ループします。
          繰り返し回数が不明なときに適しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>条件が最初から偽なら一度も実行されない</li>
          <li>ループ内で条件を変化させないと無限ループになる</li>
          <li>回数が不明・条件が複雑なときにforより使いやすい</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なwhileループ</h2>
        <p className="text-gray-400 mb-4">
          カウントダウンと、数を半分にしていく例です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // カウントダウン
    int count = 5;
    printf("カウントダウン: ");
    while (count > 0) {
        printf("%d ", count);
        count--;
    }
    printf("発射！\\n");

    // 数を2で割り続ける
    int n = 100;
    int steps = 0;
    while (n > 1) {
        n /= 2;
        steps++;
    }
    printf("100を1以下にするまで%d回割った\\n", steps);

    return 0;
}`}
          expectedOutput={`カウントダウン: 5 4 3 2 1 発射！
100を1以下にするまで7回割った`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コラッツ予想</h2>
        <p className="text-gray-400 mb-4">
          偶数なら2で割り、奇数なら3倍して1を足す。いつか必ず1になる（コラッツ予想）。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int n = 27;
    int steps = 0;

    printf("n = %d からスタート\\n", n);

    while (n != 1) {
        if (n % 2 == 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        steps++;
        if (steps <= 10) {
            printf("ステップ%2d: %d\\n", steps, n);
        }
    }

    printf("...\\n合計 %d ステップで1に到達\\n", steps);

    return 0;
}`}
          expectedOutput={`n = 27 からスタート
ステップ 1: 82
ステップ 2: 41
ステップ 3: 124
ステップ 4: 62
ステップ 5: 31
ステップ 6: 94
ステップ 7: 47
ステップ 8: 142
ステップ 9: 71
ステップ10: 214
...
合計 111 ステップで1に到達`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="while-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="while-loop" basePath="/learn/control" />
    </div>
  );
}
