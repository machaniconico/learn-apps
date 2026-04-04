import { CEditor } from "@/components/c-editor";

const DEFAULT_CODE = `// C言語 FizzBuzz & 配列操作
#include <stdio.h>
#include <stdlib.h>

int main() {
    // FizzBuzz
    printf("=== FizzBuzz (1-20) ===\\n");
    for (int i = 1; i <= 20; i++) {
        if (i % 15 == 0) printf("FizzBuzz ");
        else if (i % 3 == 0) printf("Fizz ");
        else if (i % 5 == 0) printf("Buzz ");
        else printf("%d ", i);
    }
    printf("\\n");

    // 配列操作
    printf("\\n=== 配列操作 ===\\n");
    int numbers[] = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
    int n = 10;

    // 合計と最大値
    int sum = 0, max = numbers[0];
    for (int i = 0; i < n; i++) {
        sum += numbers[i];
        if (numbers[i] > max) max = numbers[i];
    }
    printf("合計: %d\\n", sum);
    printf("最大値: %d\\n", max);
    printf("平均: %.1f\\n", (double)sum / n);

    // 動的配列
    printf("\\n=== 動的メモリ確保 ===\\n");
    int *arr = (int *)malloc(5 * sizeof(int));
    for (int i = 0; i < 5; i++) arr[i] = (i + 1) * (i + 1);
    printf("二乗: ");
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\\n");
    free(arr);

    return 0;
}
`;

export default function FreespacePage() {
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🚀</span>
            <h1 className="text-3xl font-bold text-gray-100">C言語フリースペース</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Cコードを自由に書いて実行できるフリースペースです
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ブラウザ上で動作（インストール不要）
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ctrl+Enter で実行
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Tabキーでインデント
            </div>
          </div>
        </div>

        {/* Editor */}
        <CEditor defaultCode={DEFAULT_CODE} height="480px" />

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">基本構文</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              変数宣言、制御構文、関数定義、ポインタ、構造体などC言語の基本的な構文を自由に試せます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">標準ライブラリ</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              stdio.h、stdlib.h、string.h、math.hなどの標準ライブラリ関数をブラウザ上で確認できます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">コンパイルヒント</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              ローカルでは gcc main.c -o main &amp;&amp; ./main でコンパイル・実行できます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
