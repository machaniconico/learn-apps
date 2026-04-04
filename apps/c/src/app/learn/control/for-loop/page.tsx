import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ForLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御フロー レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">forループ</h1>
        <p className="text-gray-400">カウンタベースの繰り返し処理を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">forループの構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">for(初期化; 条件; 更新)</code> の3つの部分で繰り返しを制御します。
          回数が決まっている繰り返しに最適です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>初期化：ループ変数を初期化（ループ前に1回実行）</li>
          <li>条件：各繰り返し前に評価、偽になったら終了</li>
          <li>更新：各繰り返しの後に実行（通常はインクリメント）</li>
          <li>3つの部分はすべて省略可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なforループ</h2>
        <p className="text-gray-400 mb-4">
          1から10まで出力し、合計を計算します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 1から5まで出力
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    // 逆順（5から1）
    for (int i = 5; i >= 1; i--) {
        printf("%d ", i);
    }
    printf("\\n");

    // 2ずつ増やす
    for (int i = 0; i <= 10; i += 2) {
        printf("%d ", i);
    }
    printf("\\n");

    // 合計を計算
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    printf("1から100の合計: %d\\n", sum);

    return 0;
}`}
          expectedOutput={`1 2 3 4 5
5 4 3 2 1
0 2 4 6 8 10
1から100の合計: 5050`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列のループ処理</h2>
        <p className="text-gray-400 mb-4">
          forループを使って配列の全要素を処理する典型的なパターンです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int numbers[] = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    int n = sizeof(numbers) / sizeof(numbers[0]);

    printf("配列: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");

    // 最大値を求める
    int max = numbers[0];
    for (int i = 1; i < n; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    printf("最大値: %d\\n", max);

    // 合計と平均
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += numbers[i];
    }
    printf("合計: %d, 平均: %.2f\\n", sum, (double)sum / n);

    return 0;
}`}
          expectedOutput={`配列: 5 2 8 1 9 3 7 4 6
最大値: 9
合計: 45, 平均: 5.00`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="for-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="for-loop" basePath="/learn/control" />
    </div>
  );
}
