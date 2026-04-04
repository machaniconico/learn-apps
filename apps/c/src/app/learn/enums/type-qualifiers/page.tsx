import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("enums");

export default function TypeQualifiersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">enum・型 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型修飾子</h1>
        <p className="text-gray-400">const・volatile・restrict・_Atomicの使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型修飾子の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型修飾子は変数の性質をコンパイラに伝えます。最適化・安全性・並行処理に関わる重要なキーワードです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">const</code>: 変更不可（読み取り専用）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">volatile</code>: コンパイラ最適化を抑制（ハードウェアレジスタ等）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">restrict</code>: ポインタが唯一のアクセス経路であることを保証（最適化ヒント）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">_Atomic</code>: アトミック操作（C11、スレッドセーフ）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const の使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">const</code> で変数を読み取り専用にします。ポインタとの組み合わせに注意が必要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void printArray(const int *arr, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
        // arr[i] = 0;  // コンパイルエラー: constなので変更不可
    }
    printf("\\n");
}

int main() {
    const int MAX = 100;
    // MAX = 200;  // エラー

    const char *msg = "Hello";  // ポインタ先が const
    printf("%s\\n", msg);
    msg = "World";              // ポインタ自体は変更可
    printf("%s\\n", msg);

    int arr[] = {1, 2, 3, 4, 5};
    printArray(arr, 5);

    printf("MAX = %d\\n", MAX);
    return 0;
}`}
          expectedOutput={`Hello
World
1 2 3 4 5 
MAX = 100`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">volatile の使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">volatile</code> はコンパイラの最適化を抑制し、毎回メモリから読むことを保証します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// ハードウェアレジスタや割り込み変数をシミュレート
volatile int sensor_value = 0;

void simulateSensor(void) {
    // 実際はハードウェアが更新
    sensor_value = 42;
}

int main() {
    printf("初期値: %d\\n", sensor_value);

    simulateSensor();

    // volatile がないとコンパイラが最適化でキャッシュするかも
    printf("センサー値: %d\\n", sensor_value);

    sensor_value = 100;
    printf("更新後: %d\\n", sensor_value);

    return 0;
}`}
          expectedOutput={`初期値: 0
センサー値: 42
更新後: 100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="type-qualifiers" />
      </div>
      <LessonNav lessons={lessons} currentId="type-qualifiers" basePath="/learn/enums" />
    </div>
  );
}
