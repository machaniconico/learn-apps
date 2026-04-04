import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function InitializationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">配列 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列の初期化</h1>
        <p className="text-gray-400">指示付き初期化・部分初期化・{"{0}"}による全ゼロ初期化を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">初期化のルール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語の配列初期化にはいくつかの重要なルールがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>部分初期化: 指定した分だけ初期化、残りは <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">0</code></li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">{"= {0}"}</code>: 全要素を0に初期化（最も簡単な全ゼロ初期化）</li>
          <li>指示付き初期化（C99）: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">{"[インデックス] = 値"}</code></li>
          <li>未初期化のローカル配列は不定値（ゴミ値）に注意</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">部分初期化と全ゼロ初期化</h2>
        <p className="text-gray-400 mb-4">
          配列を部分的に初期化すると残りは自動的に0になります。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">{"= {0}"}</code> は全要素を0にする最もシンプルな書き方です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 部分初期化（残りは0）
    int partial[8] = {1, 2, 3};
    printf("部分初期化: ");
    for (int i = 0; i < 8; i++) printf("%d ", partial[i]);
    printf("\\n");

    // 全ゼロ初期化
    int zeros[8] = {0};
    printf("全ゼロ:     ");
    for (int i = 0; i < 8; i++) printf("%d ", zeros[i]);
    printf("\\n");

    // 全1での初期化（個別に設定が必要）
    int ones[5];
    for (int i = 0; i < 5; i++) ones[i] = 1;
    printf("全1:        ");
    for (int i = 0; i < 5; i++) printf("%d ", ones[i]);
    printf("\\n");

    return 0;
}`}
          expectedOutput={`部分初期化: 1 2 3 0 0 0 0 0
全ゼロ:     0 0 0 0 0 0 0 0
全1:        1 1 1 1 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">指示付き初期化（C99）</h2>
        <p className="text-gray-400 mb-4">
          C99以降では <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">[インデックス] = 値</code> で
          特定のインデックスを指定して初期化できます。間のインデックスは0になります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 指示付き初期化（C99）
    int arr[10] = {
        [0] = 100,
        [3] = 300,
        [7] = 700,
        [9] = 900
    };

    printf("指示付き初期化:\\n");
    for (int i = 0; i < 10; i++) {
        printf("[%d]=%d ", i, arr[i]);
    }
    printf("\\n");

    // 順番を変えても使える
    int days[7] = {
        [6] = 7,   // Sunday
        [0] = 1,   // Monday
        [5] = 6    // Saturday
    };
    printf("\\n曜日: ");
    for (int i = 0; i < 7; i++) printf("%d ", days[i]);
    printf("\\n");

    return 0;
}`}
          expectedOutput={`指示付き初期化:
[0]=100 [1]=0 [2]=0 [3]=300 [4]=0 [5]=0 [6]=0 [7]=700 [8]=0 [9]=900

曜日: 1 0 0 0 0 6 7`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="initialization" />
      </div>
      <LessonNav lessons={lessons} currentId="initialization" basePath="/learn/arrays" />
    </div>
  );
}
