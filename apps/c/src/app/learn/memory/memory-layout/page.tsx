import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function MemoryLayoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メモリ管理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メモリレイアウト</h1>
        <p className="text-gray-400">テキスト・データ・BSS・ヒープ・スタックセグメントを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロセスのメモリレイアウト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Cプログラムのプロセスメモリは複数のセグメントに分かれています。
          それぞれ役割が異なり、変数の種類によってどのセグメントに置かれるかが決まります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-gray-300">テキスト（コード）セグメント</strong>: 実行コード（読み取り専用）</li>
          <li><strong className="text-gray-300">データセグメント</strong>: 初期化済みグローバル・static変数</li>
          <li><strong className="text-gray-300">BSSセグメント</strong>: 未初期化グローバル・static変数（ゼロ初期化）</li>
          <li><strong className="text-gray-300">ヒープ</strong>: malloc/calloc で確保される領域（低アドレスから高アドレスへ成長）</li>
          <li><strong className="text-gray-300">スタック</strong>: ローカル変数・関数呼び出し情報（高アドレスから低アドレスへ成長）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各セグメントの変数例</h2>
        <p className="text-gray-400 mb-4">
          変数の種類によって格納されるセグメントが異なります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

// データセグメント（初期化済みグローバル）
int global_init = 100;

// BSSセグメント（未初期化グローバル）
int global_uninit;

static int static_var = 42;  // データセグメント

int main() {
    int local = 10;           // スタック
    int *heap = (int *)malloc(sizeof(int));  // ヒープ
    *heap = 99;

    printf("グローバル（初期化済み）: %d\\n", global_init);
    printf("グローバル（未初期化）:   %d\\n", global_uninit);
    printf("static変数:             %d\\n", static_var);
    printf("ローカル変数:            %d\\n", local);
    printf("ヒープ変数:              %d\\n", *heap);

    free(heap);
    return 0;
}`}
          expectedOutput={`グローバル（初期化済み）: 100
グローバル（未初期化）:   0
static変数:             42
ローカル変数:            10
ヒープ変数:              99`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">static 変数のメモリ</h2>
        <p className="text-gray-400 mb-4">
          static ローカル変数はスタックでなくデータセグメントに置かれ、関数呼び出しをまたいで値が保持されます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void counter() {
    static int count = 0;  // データセグメント（一度だけ初期化）
    int local = 0;         // スタック（毎回初期化）

    count++;
    local++;
    printf("count=%d, local=%d\\n", count, local);
}

int main() {
    counter();
    counter();
    counter();
    return 0;
}`}
          expectedOutput={`count=1, local=1
count=2, local=1
count=3, local=1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="memory-layout" />
      </div>
      <LessonNav lessons={lessons} currentId="memory-layout" basePath="/learn/memory" />
    </div>
  );
}
