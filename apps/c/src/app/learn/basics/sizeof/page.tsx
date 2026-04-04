import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function SizeofPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">sizeof演算子</h1>
        <p className="text-gray-400">型や変数のサイズを求めるsizeof演算子を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">sizeof演算子とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">sizeof</code> はコンパイル時に型や変数のバイト数を返す演算子です。
          結果の型は <code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">size_t</code>（符号なし整数）で、<code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">%zu</code> で出力します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">sizeof(int)</code> - 型のサイズ</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">sizeof(変数名)</code> - 変数のサイズ</li>
          <li>配列のサイズ取得：<code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">sizeof(arr) / sizeof(arr[0])</code></li>
          <li>実行時ではなくコンパイル時に評価される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本型のサイズ</h2>
        <p className="text-gray-400 mb-4">
          各データ型が占めるメモリサイズを確認しましょう。環境（OS・コンパイラ）によって異なる場合があります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    printf("=== 基本型のサイズ ===\\n");
    printf("char:        %zu バイト\\n", sizeof(char));
    printf("short:       %zu バイト\\n", sizeof(short));
    printf("int:         %zu バイト\\n", sizeof(int));
    printf("long:        %zu バイト\\n", sizeof(long));
    printf("long long:   %zu バイト\\n", sizeof(long long));
    printf("float:       %zu バイト\\n", sizeof(float));
    printf("double:      %zu バイト\\n", sizeof(double));
    printf("long double: %zu バイト\\n", sizeof(long double));

    // ポインタのサイズ（64ビット環境では8バイト）
    printf("\\nint*:        %zu バイト\\n", sizeof(int*));
    printf("char*:       %zu バイト\\n", sizeof(char*));

    return 0;
}`}
          expectedOutput={`=== 基本型のサイズ ===
char:        1 バイト
short:       2 バイト
int:         4 バイト
long:        8 バイト
long long:   8 バイト
float:       4 バイト
double:      8 バイト
long double: 16 バイト

int*:        8 バイト
char*:       8 バイト`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列のサイズ計算</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">sizeof(配列) / sizeof(配列[0])</code> で配列の要素数を求められます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    double dbl[] = {1.1, 2.2, 3.3};

    // 配列のバイト数
    printf("arr全体:  %zu バイト\\n", sizeof(arr));
    printf("arr要素1個: %zu バイト\\n", sizeof(arr[0]));

    // 要素数の計算
    int len = sizeof(arr) / sizeof(arr[0]);
    printf("要素数: %d\\n", len);

    // これを使って配列を安全にループ
    printf("\\n配列の要素: ");
    for (int i = 0; i < (int)(sizeof(arr) / sizeof(arr[0])); i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    int dbl_len = sizeof(dbl) / sizeof(dbl[0]);
    printf("double配列の要素数: %d\\n", dbl_len);

    return 0;
}`}
          expectedOutput={`arr全体:  20 バイト
arr要素1個: 4 バイト
要素数: 5

配列の要素: 10 20 30 40 50
double配列の要素数: 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="sizeof" />
      </div>
      <LessonNav lessons={lessons} currentId="sizeof" basePath="/learn/basics" />
    </div>
  );
}
