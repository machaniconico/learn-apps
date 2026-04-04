import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function MultidimensionalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">配列 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">多次元配列</h1>
        <p className="text-gray-400">2次元配列int matrix[3][4]の宣言・初期化・アクセス方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">2次元配列の構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int matrix[行数][列数]</code> で2次元配列を宣言します。
          メモリ上は1次元に連続して配置されます（行優先）。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">matrix[i][j]</code> で行i・列jの要素にアクセス</li>
          <li>メモリ上の配置: row0[col0,col1,...], row1[col0,col1,...], ...</li>
          <li>3次元以上も同様に <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">arr[x][y][z]</code> と宣言できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">2次元配列の初期化と表示</h2>
        <p className="text-gray-400 mb-4">
          入れ子の波括弧で行ごとに初期化できます。二重ループで全要素にアクセスします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int matrix[3][4] = {
        { 1,  2,  3,  4},
        { 5,  6,  7,  8},
        { 9, 10, 11, 12}
    };

    // 行列の表示
    printf("matrix[3][4]:\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            printf("%4d", matrix[i][j]);
        }
        printf("\\n");
    }

    // 特定要素へのアクセス
    printf("\\nmatrix[1][2] = %d\\n", matrix[1][2]);

    return 0;
}`}
          expectedOutput={`matrix[3][4]:
   1   2   3   4
   5   6   7   8
   9  10  11  12

matrix[1][2] = 7`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">行列の転置</h2>
        <p className="text-gray-400 mb-4">
          2次元配列を使った典型的な操作として、行列の転置（行と列を入れ替え）を実装します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int original[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int transposed[3][2];

    // 転置
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            transposed[j][i] = original[i][j];
        }
    }

    printf("元の行列 (2x3):\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) printf("%3d", original[i][j]);
        printf("\\n");
    }

    printf("転置後 (3x2):\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 2; j++) printf("%3d", transposed[i][j]);
        printf("\\n");
    }

    return 0;
}`}
          expectedOutput={`元の行列 (2x3):
  1  2  3
  4  5  6
転置後 (3x2):
  1  4
  2  5
  3  6`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="multidimensional" />
      </div>
      <LessonNav lessons={lessons} currentId="multidimensional" basePath="/learn/arrays" />
    </div>
  );
}
