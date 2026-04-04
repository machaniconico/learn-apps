import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function GotoLabelPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御フロー レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">goto文</h1>
        <p className="text-gray-400">goto文の使い方と避けるべき理由を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">goto文とラベル</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">goto ラベル名;</code> で指定したラベルの位置に無条件ジャンプします。
          ラベルは <code className="text-cyan-400 bg-gray-800 px-1 py-0.5 rounded">ラベル名:</code> の形式で定義します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>goto は通常避けるべき（スパゲッティコードになりやすい）</li>
          <li>多重ループを一度に抜けるときに例外的に使われることがある</li>
          <li>エラーハンドリングのクリーンアップに使われることもある</li>
          <li>ほとんどの場合、breakやreturnで代替できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">gotoの基本的な使い方</h2>
        <p className="text-gray-400 mb-4">
          goto文の動作を理解します。実際のコードではほとんど使いません。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int i = 0;

    loop_start:
        if (i >= 5) goto loop_end;
        printf("%d ", i);
        i++;
        goto loop_start;

    loop_end:
        printf("\\n完了\\n");

    // これはforループで書くべき：
    // for (int i = 0; i < 5; i++) printf("%d ", i);

    return 0;
}`}
          expectedOutput={`0 1 2 3 4
完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">多重ループからの脱出</h2>
        <p className="text-gray-400 mb-4">
          多重ループを一度に抜けるときが、gotoの数少ない正当な使用例です。
          ただし、フラグ変数や関数化でも解決できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // gotoで多重ループを抜ける
    printf("gotoを使った場合:\\n");
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            if (i * j > 6) {
                printf("i=%d, j=%d で脱出\\n", i, j);
                goto done;
            }
        }
    }
    done:
    printf("ループ終了\\n");

    // フラグを使った代替（より推奨）
    printf("\\nフラグを使った場合:\\n");
    int found = 0;
    for (int i = 0; i < 5 && !found; i++) {
        for (int j = 0; j < 5 && !found; j++) {
            if (i * j > 6) {
                printf("i=%d, j=%d で脱出\\n", i, j);
                found = 1;
            }
        }
    }
    printf("ループ終了\\n");

    return 0;
}`}
          expectedOutput={`gotoを使った場合:
i=2, j=4 で脱出
ループ終了

フラグを使った場合:
i=2, j=4 で脱出
ループ終了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="goto-label" />
      </div>
      <LessonNav lessons={lessons} currentId="goto-label" basePath="/learn/control" />
    </div>
  );
}
