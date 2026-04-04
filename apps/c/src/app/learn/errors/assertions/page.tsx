import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function AssertionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">エラー処理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アサーション</h1>
        <p className="text-gray-400">assert()・static_assert（C11）・NDEBUGを使ったデバッグ技法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">アサーションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アサーションは「この条件は必ず真である」という表明です。
          開発中に前提条件・事後条件・不変条件をチェックしてバグを早期発見します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">assert(expr)</code> — 実行時アサーション（falseでアボート）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">_Static_assert(expr, msg)</code> — コンパイル時アサーション（C11）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">NDEBUG</code> — 定義するとassert()が無効化</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">assert()の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">assert()</code> は条件が偽のとき、
          ファイル名・行番号・式を表示してプログラムを中止します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <assert.h>

/* 前提条件チェックにassertを使う */
int array_get(int *arr, int size, int index) {
    assert(arr != NULL);       /* NULLチェック */
    assert(index >= 0);        /* 境界チェック */
    assert(index < size);      /* 境界チェック */
    return arr[index];
}

int main(void) {
    int data[] = {10, 20, 30, 40, 50};
    int n = 5;

    /* 正常なアクセス */
    for (int i = 0; i < n; i++) {
        printf("data[%d] = %d\\n", i, array_get(data, n, i));
    }

    /* assert が通ることを確認 */
    assert(n == 5);
    assert(data[0] < data[4]);
    printf("すべてのアサーション通過\\n");

    return 0;
}`}
          expectedOutput={`data[0] = 10
data[1] = 20
data[2] = 30
data[3] = 40
data[4] = 50
すべてのアサーション通過`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">_Static_assert（コンパイル時）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">_Static_assert</code>（C11）はコンパイル時に評価されます。
          型のサイズや設定値の妥当性チェックに使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdint.h>

/* コンパイル時アサーション */
_Static_assert(sizeof(int) >= 4, "int must be at least 4 bytes");
_Static_assert(sizeof(char) == 1, "char must be 1 byte");
_Static_assert(sizeof(int32_t) == 4, "int32_t must be 4 bytes");

#define BUFFER_SIZE 1024
_Static_assert(BUFFER_SIZE >= 256, "BUFFER_SIZE too small");

typedef struct {
    int x;
    int y;
    int z;
} Point3D;

/* 構造体サイズの確認 */
_Static_assert(sizeof(Point3D) >= 12, "Point3D must be at least 12 bytes");

int main(void) {
    printf("sizeof(int) = %zu\\n", sizeof(int));
    printf("sizeof(char) = %zu\\n", sizeof(char));
    printf("sizeof(int32_t) = %zu\\n", sizeof(int32_t));
    printf("sizeof(Point3D) = %zu\\n", sizeof(Point3D));
    printf("すべてのstatic_assert通過\\n");
    return 0;
}`}
          expectedOutput={`sizeof(int) = 4
sizeof(char) = 1
sizeof(int32_t) = 4
sizeof(Point3D) = 12
すべてのstatic_assert通過`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NDEBUGで本番無効化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-DNDEBUG</code> でコンパイルするとassert()が空になります。
          本番ビルドではパフォーマンスへの影響をゼロにできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <assert.h>

/* デバッグ専用チェックマクロ */
#ifdef NDEBUG
  #define DEBUG_CHECK(x) ((void)0)
#else
  #define DEBUG_CHECK(x) do { \
    if (!(x)) { \
      printf("[DEBUG FAIL] %s (line %d)\\n", #x, __LINE__); \
    } else { \
      printf("[DEBUG OK]  %s\\n", #x); \
    } \
  } while(0)
#endif

int main(void) {
    int x = 42;

    /* NDEBUGなし: チェックが実行される */
    DEBUG_CHECK(x > 0);
    DEBUG_CHECK(x == 42);
    DEBUG_CHECK(x < 100);

    assert(x == 42);  /* NDEBUGで無効化 */
    printf("x = %d\\n", x);
    return 0;
}`}
          expectedOutput={`[DEBUG OK]  x > 0
[DEBUG OK]  x == 42
[DEBUG OK]  x < 100
x = 42`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="assertions" />
      </div>
      <LessonNav lessons={lessons} currentId="assertions" basePath="/learn/errors" />
    </div>
  );
}
