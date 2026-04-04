import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function CommentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コメント</h1>
        <p className="text-gray-400">単一行・複数行コメントの書き方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コメントの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コメントはコンパイラに無視されるテキストです。コードの説明や一時的な無効化に使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">// コメント</code> - 単一行コメント（C99以降）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">/* コメント */</code> - 複数行コメント（C89から）</li>
          <li>コメントはコンパイル時に削除されるので実行速度に影響しない</li>
          <li>良いコメントは「なぜ」を説明する（「何を」はコードで分かる）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">単一行・複数行コメント</h2>
        <p className="text-gray-400 mb-4">
          コメントを適切に使うことでコードの可読性が向上します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/*
 * プログラムの説明
 * 作者: 山田太郎
 * 日付: 2024-01-01
 */

int main() {
    // 変数の宣言と初期化
    int radius = 5;  // 半径（cm）

    /*
     * 円の面積を計算する
     * 面積 = π × r²
     */
    double pi = 3.14159265;
    double area = pi * radius * radius;

    printf("半径: %d cm\\n", radius);
    printf("面積: %.2f cm²\\n", area);

    // TODO: 周囲長の計算も追加する

    return 0; // 正常終了
}`}
          expectedOutput={`半径: 5 cm
面積: 78.54 cm²`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コメントアウトによるデバッグ</h2>
        <p className="text-gray-400 mb-4">
          コードの一部を一時的に無効化したいときにコメントアウトを使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int x = 10;
    int y = 20;

    printf("x = %d\\n", x);
    printf("y = %d\\n", y);

    // デバッグ用（通常は無効）
    // printf("デバッグ: x + y = %d\\n", x + y);

    /* 以下のコードは現在使用しない
    int z = 30;
    printf("z = %d\\n", z);
    */

    int sum = x + y;
    printf("合計: %d\\n", sum);

    return 0;
}`}
          expectedOutput={`x = 10
y = 20
合計: 30`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="comments" />
      </div>
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}
