import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function AssertHPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">assert.h</h1>
        <p className="text-gray-400">assert() マクロと NDEBUG を使ったデバッグ表明の書き方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">assert とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">assert(式)</code> は「このコードが実行される時点では式は必ず真である」という表明（assertion）です。
          式が偽になるとエラーメッセージを表示してプログラムを異常終了させます。
          バグを早期発見するための強力なデバッグツールです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>式が真（0以外）なら何もしない</li>
          <li>式が偽（0）ならエラーを表示して <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">abort()</code> を呼ぶ</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">NDEBUG</code> を定義するとすべての assert が無効化される</li>
          <li>本番ビルドでは <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-DNDEBUG</code> フラグで無効化するのが一般的</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">assert の基本的な使い方</h2>
        <p className="text-gray-400 mb-4">
          関数の前提条件（引数が有効な範囲か等）を assert で検証するのが典型的な使い方です。
          NULL チェックやインデックス範囲チェックに活用できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <assert.h>

/* 0以上の数の平方根を計算（負は不正） */
double safeSqrt(double x) {
    assert(x >= 0.0);  /* 前提条件: xは非負 */
    double result = 1.0;
    /* 簡易ニュートン法 */
    for (int i = 0; i < 20; i++)
        result = (result + x / result) / 2.0;
    return result;
}

int main() {
    printf("sqrt(4)  = %.1f\\n", safeSqrt(4.0));
    printf("sqrt(9)  = %.1f\\n", safeSqrt(9.0));
    printf("sqrt(0)  = %.1f\\n", safeSqrt(0.0));
    /* safeSqrt(-1.0) を呼ぶと assert で異常終了する */
    return 0;
}`}
          expectedOutput={`sqrt(4)  = 2.0
sqrt(9)  = 3.0
sqrt(0)  = 0.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">assert でポインタの NULL チェック</h2>
        <p className="text-gray-400 mb-4">
          NULL ポインタの参照は未定義動作を引き起こします。assert で事前にチェックすることで
          問題が発生した箇所を明確に特定できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <assert.h>

void printName(const char *name) {
    assert(name != NULL);  /* NULLは不正 */
    printf("Name: %s\\n", name);
}

int getElement(int *arr, int size, int idx) {
    assert(arr != NULL);
    assert(idx >= 0 && idx < size);
    return arr[idx];
}

int main() {
    printName("Alice");
    printName("Bob");

    int nums[] = {10, 20, 30};
    printf("nums[1] = %d\\n", getElement(nums, 3, 1));
    return 0;
}`}
          expectedOutput={`Name: Alice
Name: Bob
nums[1] = 20`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NDEBUG で assert を無効化</h2>
        <p className="text-gray-400 mb-4">
          リリースビルドでは <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-DNDEBUG</code> コンパイルフラグを使うか、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#define NDEBUG</code> を assert.h より前に書くと
          すべての assert が空のマクロに置き換えられてオーバーヘッドがなくなります。
        </p>
        <CEditor
          defaultCode={`/* リリースビルド相当（NDEBUGを定義） */
#define NDEBUG
#include <stdio.h>
#include <assert.h>

int divide(int a, int b) {
    assert(b != 0);  /* NDEBUGが定義されているので無効化される */
    return a / b;
}

int main() {
    printf("10 / 2 = %d\\n", divide(10, 2));
    printf("NDEBUG defined: asserts disabled\\n");
    return 0;
}`}
          expectedOutput={`10 / 2 = 5
NDEBUG defined: asserts disabled`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdlib" lessonId="assert-h" />
      </div>
      <LessonNav lessons={lessons} currentId="assert-h" basePath="/learn/stdlib" />
    </div>
  );
}
