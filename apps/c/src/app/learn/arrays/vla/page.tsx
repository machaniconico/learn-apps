import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function VlaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">配列 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">可変長配列 (VLA)</h1>
        <p className="text-gray-400">C99で導入されたVLAでサイズを実行時に決める配列を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">VLA（Variable Length Array）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通常の配列はサイズをコンパイル時に決める必要がありますが、
          <strong className="text-teal-400">VLA（可変長配列）</strong>はC99で導入され、
          実行時の変数でサイズを指定できます。スタック領域に確保されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>C99以降で使用可能（C11ではオプション扱い）</li>
          <li>スタック上に確保されるため大きすぎるとスタックオーバーフロー</li>
          <li>初期化子リストは使えない（宣言後にループで設定する）</li>
          <li>関数の引数としてもVLAサイズを指定できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">VLAの基本</h2>
        <p className="text-gray-400 mb-4">
          実行時に決まる変数をサイズとして配列を宣言できます。
          固定サイズ配列の代わりに使えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int n;
    printf("配列のサイズを入力: ");
    // デモ用に固定値を使用
    n = 5;
    printf("%d\\n", n);

    int arr[n];  // VLA: サイズが実行時に決まる

    // 値を設定
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    printf("VLA配列: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    printf("n = %d 個の要素\\n", n);

    return 0;
}`}
          expectedOutput={`配列のサイズを入力: 5
VLA配列: 10 20 30 40 50
n = 5 個の要素`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">VLAを使った2次元配列</h2>
        <p className="text-gray-400 mb-4">
          VLAは2次元でも使えます。行列のサイズを実行時に指定できます。
          関数引数に2次元VLAのサイズを渡す例です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void print_matrix(int rows, int cols, int mat[rows][cols]) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%4d", mat[i][j]);
        }
        printf("\\n");
    }
}

int main() {
    int rows = 3, cols = 4;
    int matrix[rows][cols];  // 2次元VLA

    // 九九風に初期化
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = (i + 1) * (j + 1);
        }
    }

    printf("%dx%d 行列:\\n", rows, cols);
    print_matrix(rows, cols, matrix);

    return 0;
}`}
          expectedOutput={`3x4 行列:
   1   2   3   4
   2   4   6   8
   3   6   9  12`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="vla" />
      </div>
      <LessonNav lessons={lessons} currentId="vla" basePath="/learn/arrays" />
    </div>
  );
}
