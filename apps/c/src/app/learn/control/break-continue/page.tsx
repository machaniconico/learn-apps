import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function BreakContinuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御フロー レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">break・continue</h1>
        <p className="text-gray-400">ループを中断・スキップする制御文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">break と continue</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ループの流れを制御する2つのキーワードです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">break</code> - ループを即座に終了する</li>
          <li><code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">continue</code> - 残りの処理をスキップして次の繰り返しへ</li>
          <li>多重ループでは最内側のループにのみ作用する</li>
          <li>switch文の中でも break が使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">breakでループを抜ける</h2>
        <p className="text-gray-400 mb-4">
          条件を満たしたらループを即座に終了します。線形探索の典型的な使い方です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 配列から値を探す
    int arr[] = {3, 7, 1, 9, 4, 6, 2, 8, 5};
    int n = 9;
    int target = 9;
    int found = -1;

    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            found = i;
            break;  // 見つかったらループを終了
        }
    }

    if (found >= 0) {
        printf("%d はインデックス %d で見つかりました\\n", target, found);
    } else {
        printf("%d は見つかりませんでした\\n", target);
    }

    // 最初の偶数を見つける
    for (int i = 1; i <= 20; i++) {
        if (i % 2 == 0) {
            printf("最初の偶数: %d\\n", i);
            break;
        }
    }

    return 0;
}`}
          expectedOutput={`9 はインデックス 3 で見つかりました
最初の偶数: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">continueで処理をスキップ</h2>
        <p className="text-gray-400 mb-4">
          特定の条件のときだけ処理をスキップします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 奇数だけ出力
    printf("奇数: ");
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            continue;  // 偶数はスキップ
        }
        printf("%d ", i);
    }
    printf("\\n");

    // 3の倍数をスキップして合計
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        if (i % 3 == 0) {
            continue;  // 3の倍数はスキップ
        }
        sum += i;
    }
    printf("3の倍数を除く1〜10の合計: %d\\n", sum);

    return 0;
}`}
          expectedOutput={`奇数: 1 3 5 7 9
3の倍数を除く1〜10の合計: 37`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="break-continue" />
      </div>
      <LessonNav lessons={lessons} currentId="break-continue" basePath="/learn/control" />
    </div>
  );
}
