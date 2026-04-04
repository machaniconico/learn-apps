import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("idioms");

export default function SafeCPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">イディオム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">安全なC</h1>
        <p className="text-gray-400">安全な文字列関数・境界チェック・CERT Cルールを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">危険な関数と安全な代替</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Cの標準ライブラリには境界チェックのない危険な関数があります。
          バッファオーバーフローを防ぐために安全な代替を使いましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">gets()</code> → <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fgets()</code></li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">strcpy()</code> → <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">strncpy()</code> または <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">strlcpy()</code></li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">strcat()</code> → <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">strncat()</code></li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sprintf()</code> → <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">snprintf()</code></li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">scanf("%s")</code> → <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">scanf("%63s")</code>（幅指定）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全な文字列操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">strncpy</code> と <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">snprintf</code> を使った安全なパターンです。
          常にNULL終端を保証します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

#define BUFSIZE 16

/* 安全なコピー: NUL終端を保証 */
void safe_strcpy(char *dst, const char *src, size_t size) {
    if (size == 0) return;
    strncpy(dst, src, size - 1);
    dst[size - 1] = '\\0';  /* 必ずNUL終端 */
}

/* 安全な連結 */
void safe_strcat(char *dst, const char *src, size_t size) {
    size_t dst_len = strlen(dst);
    if (dst_len >= size - 1) return;
    strncat(dst, src, size - dst_len - 1);
}

int main(void) {
    char buf[BUFSIZE];

    /* 安全なコピー */
    safe_strcpy(buf, "Hello, World!", BUFSIZE);
    printf("コピー: '%s'\\n", buf);

    /* 長すぎる文字列は切り詰め */
    safe_strcpy(buf, "This is a very long string", BUFSIZE);
    printf("切り詰め: '%s' (len=%zu)\\n", buf, strlen(buf));

    /* snprintf: 常に安全 */
    char result[BUFSIZE];
    int written = snprintf(result, sizeof(result), "val=%d", 12345);
    printf("snprintf: '%s' (written=%d)\\n", result, written);

    return 0;
}`}
          expectedOutput={`コピー: 'Hello, World!'
切り詰め: 'This is a very' (len=14)
snprintf: 'val=12345' (written=9)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">境界チェックの徹底</h2>
        <p className="text-gray-400 mb-4">
          配列アクセス前に必ず境界チェックを行います。
          符号なし整数と符号付き整数の比較にも注意が必要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stddef.h>

#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

int safe_array_get(const int *arr, size_t arr_size, int index) {
    /* 符号なし比較: index < 0 のケースも検出 */
    if (arr == NULL) return 0;
    if ((size_t)index >= arr_size) {
        fprintf(stderr, "境界外: index=%d, size=%zu\\n",
                index, arr_size);
        return 0;
    }
    return arr[index];
}

int main(void) {
    int data[] = {10, 20, 30, 40, 50};
    size_t n = ARRAY_SIZE(data);

    printf("data[0] = %d\\n", safe_array_get(data, n, 0));
    printf("data[4] = %d\\n", safe_array_get(data, n, 4));

    /* 境界外アクセスは安全に防ぐ */
    safe_array_get(data, n, 5);
    safe_array_get(data, n, -1);

    printf("配列サイズ: %zu\\n", n);
    return 0;
}`}
          expectedOutput={`data[0] = 10
data[4] = 50
境界外: index=5, size=5
境界外: index=-1, size=5
配列サイズ: 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">CERT Cの主要ルール</h2>
        <p className="text-gray-400 mb-4">
          CERT C Coding Standardは組込みシステムやセキュリティクリティカルなコードのためのガイドラインです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

/* CERT C: INT32-C 符号付き整数オーバーフローを避ける */
int safe_abs(int x) {
    /* INT_MIN の abs は未定義動作 */
    if (x == INT_MIN) return INT_MAX;
    return x < 0 ? -x : x;
}

/* CERT C: MEM35-C mallocの戻り値を必ず確認 */
int *safe_malloc_int(size_t n) {
    int *p = malloc(sizeof(int) * n);
    if (p == NULL) {
        fprintf(stderr, "malloc失敗: %zu要素\\n", n);
        return NULL;
    }
    return p;
}

/* CERT C: STR31-C 文字列の終端を保証 */
void safe_copy(char *dst, const char *src, size_t max) {
    size_t i;
    for (i = 0; i < max - 1 && src[i] != '\\0'; i++) {
        dst[i] = src[i];
    }
    dst[i] = '\\0';  /* 必ずNUL終端 */
}

int main(void) {
    printf("abs(-5) = %d\\n", safe_abs(-5));
    printf("abs(INT_MIN) = %d (安全)\\n", safe_abs(INT_MIN));

    int *arr = safe_malloc_int(5);
    if (arr) {
        for (int i = 0; i < 5; i++) arr[i] = i * 3;
        printf("arr: %d %d %d %d %d\\n",
               arr[0], arr[1], arr[2], arr[3], arr[4]);
        free(arr);
    }

    char buf[8];
    safe_copy(buf, "Hello, World!", sizeof(buf));
    printf("safe_copy: '%s'\\n", buf);

    return 0;
}`}
          expectedOutput={`abs(-5) = 5
abs(INT_MIN) = 2147483647 (安全)
arr: 0 3 6 9 12
safe_copy: 'Hello, '`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="idioms" lessonId="safe-c" />
      </div>
      <LessonNav lessons={lessons} currentId="safe-c" basePath="/learn/idioms" />
    </div>
  );
}
