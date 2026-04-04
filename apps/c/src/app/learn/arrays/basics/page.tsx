import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArrayBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">配列 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列の基本</h1>
        <p className="text-gray-400">配列の宣言・初期化・要素アクセスの基本を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列は<strong className="text-teal-400">同じ型の値を連続したメモリに格納</strong>するデータ構造です。
          インデックス（添え字）で各要素にアクセスします。インデックスは <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">0</code> から始まります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>宣言: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">型名 配列名[要素数];</code></li>
          <li>アクセス: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">配列名[インデックス]</code></li>
          <li>有効インデックス: 0 〜 (要素数-1)</li>
          <li>範囲外アクセスは未定義動作（実行時エラーの原因）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の宣言と初期化</h2>
        <p className="text-gray-400 mb-4">
          宣言と同時に初期化できます。要素数を省略すると初期化子の数から自動的に決まります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 明示的に要素数を指定
    int scores[5] = {90, 85, 78, 92, 88};

    // 要素数を省略（3要素の配列になる）
    double temps[] = {36.5, 37.2, 36.8};

    // 要素へのアクセス
    printf("scores[0] = %d\\n", scores[0]);
    printf("scores[4] = %d\\n", scores[4]);

    // 全要素を表示
    printf("成績: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", scores[i]);
    }
    printf("\\n");

    printf("体温: ");
    for (int i = 0; i < 3; i++) {
        printf("%.1f ", temps[i]);
    }
    printf("\\n");

    return 0;
}`}
          expectedOutput={`scores[0] = 90
scores[4] = 88
成績: 90 85 78 92 88
体温: 36.5 37.2 36.8`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の変更と計算</h2>
        <p className="text-gray-400 mb-4">
          配列要素への代入と、ループを使った集計処理の例です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int data[6] = {10, 20, 30, 40, 50, 60};
    int n = 6;

    // 要素の変更
    data[2] = 99;

    // 合計・最大値を求める
    int sum = 0;
    int max = data[0];
    for (int i = 0; i < n; i++) {
        sum += data[i];
        if (data[i] > max) max = data[i];
    }

    printf("配列: ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");
    printf("合計: %d\\n", sum);
    printf("最大: %d\\n", max);
    printf("平均: %.1f\\n", (double)sum / n);

    return 0;
}`}
          expectedOutput={`配列: 10 20 99 40 50 60
合計: 279
最大: 99
平均: 46.5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/arrays" />
    </div>
  );
}
