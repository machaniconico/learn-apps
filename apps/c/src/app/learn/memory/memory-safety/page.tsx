import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function MemorySafetyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メモリ管理 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メモリ安全性</h1>
        <p className="text-gray-400">バッファオーバーフロー・ダングリングポインタ・二重解放を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">代表的なメモリ安全性の問題</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語ではメモリ安全性はプログラマの責任です。主な問題点を理解して回避しましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-gray-300">バッファオーバーフロー</strong>: 配列の範囲外アクセス</li>
          <li><strong className="text-gray-300">ダングリングポインタ</strong>: free後のポインタを使用</li>
          <li><strong className="text-gray-300">二重解放（double free）</strong>: 同じポインタを2回free</li>
          <li><strong className="text-gray-300">未初期化メモリの読み取り</strong>: malloc後の初期化なし使用</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バッファオーバーフローの防止</h2>
        <p className="text-gray-400 mb-4">
          配列境界を常にチェックし、文字列関数は安全な版（strncpy、snprintf）を使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    char buf[10];
    const char *safe_str = "Hello";
    const char *long_str = "This is a very long string";

    // 安全: strncpy でサイズ制限
    strncpy(buf, safe_str, sizeof(buf) - 1);
    buf[sizeof(buf) - 1] = '\\0';
    printf("安全なコピー: %s\\n", buf);

    // 安全: snprintf でサイズ制限
    snprintf(buf, sizeof(buf), "%s", long_str);
    printf("snprintfで切り捨て: %s\\n", buf);

    // 境界チェックの例
    int arr[5] = {10, 20, 30, 40, 50};
    int idx = 3;
    if (idx >= 0 && idx < 5) {
        printf("arr[%d] = %d\\n", idx, arr[idx]);
    }

    return 0;
}`}
          expectedOutput={`安全なコピー: Hello
snprintfで切り捨て: This is
arr[3] = 40`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ダングリングポインタの防止</h2>
        <p className="text-gray-400 mb-4">
          free() 後はポインタを NULL に設定します。NULL チェックを守れば二重解放も防げます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = (int *)malloc(sizeof(int));
    *p = 42;
    printf("値: %d\\n", *p);

    free(p);
    p = NULL;  // ダングリングポインタ防止

    // NULL チェックで安全に使用
    if (p != NULL) {
        printf("値: %d\\n", *p);  // 実行されない
    } else {
        printf("ポインタはNULLです\\n");
    }

    // NULL の free は安全（何もしない）
    free(p);
    printf("完了\\n");

    return 0;
}`}
          expectedOutput={`値: 42
ポインタはNULLです
完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全なメモリ管理パターン</h2>
        <p className="text-gray-400 mb-4">
          確保・使用・解放のライフサイクルを明確にし、所有権を意識した設計が重要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *data;
    int size;
} Buffer;

Buffer *bufCreate(int size) {
    Buffer *b = (Buffer *)malloc(sizeof(Buffer));
    if (!b) return NULL;
    b->data = (char *)calloc(size, 1);
    if (!b->data) { free(b); return NULL; }
    b->size = size;
    return b;
}

void bufDestroy(Buffer **b) {
    if (*b) {
        free((*b)->data);
        free(*b);
        *b = NULL;
    }
}

int main() {
    Buffer *buf = bufCreate(32);
    strncpy(buf->data, "Hello, Memory!", buf->size - 1);
    printf("データ: %s\\n", buf->data);
    printf("サイズ: %d\\n", buf->size);

    bufDestroy(&buf);
    printf("buf == NULL: %s\\n", buf == NULL ? "true" : "false");
    return 0;
}`}
          expectedOutput={`データ: Hello, Memory!
サイズ: 32
buf == NULL: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="memory-safety" />
      </div>
      <LessonNav lessons={lessons} currentId="memory-safety" basePath="/learn/memory" />
    </div>
  );
}
