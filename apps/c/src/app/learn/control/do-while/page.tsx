import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function DoWhilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御フロー レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">do-whileループ</h1>
        <p className="text-gray-400">最低1回は実行するdo-while構文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">do-whileの特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">do &#123; ... &#125; while(条件);</code> は
          ループ本体を先に実行してから条件を評価します。
          そのため条件が最初から偽でも<strong className="text-cyan-400">最低1回は実行</strong>されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>入力検証（最低1回は入力を求める）に適している</li>
          <li>while文の末尾にセミコロン <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">;</code> が必要</li>
          <li>while(条件)よりdo-while(条件)の方が少し使用頻度が低い</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">do-while vs while の違い</h2>
        <p className="text-gray-400 mb-4">
          条件が最初から偽のときの動作の違いを確認します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int x = 10;

    // while: 条件が偽なので実行されない
    printf("whileループ:\\n");
    while (x < 5) {
        printf("  while実行: x = %d\\n", x);
        x++;
    }
    printf("  (一度も実行されなかった)\\n");

    // do-while: 最低1回は実行される
    printf("\\ndo-whileループ:\\n");
    x = 10;
    do {
        printf("  do-while実行: x = %d\\n", x);
        x++;
    } while (x < 5);
    printf("  (1回だけ実行された)\\n");

    return 0;
}`}
          expectedOutput={`whileループ:
  (一度も実行されなかった)

do-whileループ:
  do-while実行: x = 10
  (1回だけ実行された)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メニュー選択の例</h2>
        <p className="text-gray-400 mb-4">
          do-whileはメニューを表示して有効な入力を受け取るパターンに適しています。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 実際の入力の代わりにシミュレーション
    int inputs[] = {5, 0, 2};  // 無効、無効、有効
    int idx = 0;

    int choice;
    do {
        printf("メニュー\\n");
        printf("1. 新規作成\\n");
        printf("2. 開く\\n");
        printf("3. 終了\\n");
        printf("選択(1-3): ");

        choice = inputs[idx++];
        printf("%d\\n", choice);

        if (choice < 1 || choice > 3) {
            printf("無効な選択です。再入力してください。\\n\\n");
        }
    } while (choice < 1 || choice > 3);

    printf("\\n選択: %d\\n", choice);
    return 0;
}`}
          expectedOutput={`メニュー
1. 新規作成
2. 開く
3. 終了
選択(1-3): 5
無効な選択です。再入力してください。

メニュー
1. 新規作成
2. 開く
3. 終了
選択(1-3): 0
無効な選択です。再入力してください。

メニュー
1. 新規作成
2. 開く
3. 終了
選択(1-3): 2

選択: 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="do-while" />
      </div>
      <LessonNav lessons={lessons} currentId="do-while" basePath="/learn/control" />
    </div>
  );
}
