import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function LibrariesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">エコシステム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ライブラリ</h1>
        <p className="text-gray-400">glibc・musl・主要Cライブラリ（curl・sqlite・zlib）の特徴と使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Cの標準ライブラリ実装</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C標準ライブラリ（libc）にはいくつかの実装があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
          <li><strong className="text-white">glibc</strong>: GNU C Library。Linux/GNUシステムの標準。最も機能が豊富。POSIX完全対応</li>
          <li><strong className="text-white">musl</strong>: 軽量・クリーンな実装。Alpine Linux採用。コンテナや組込みに最適</li>
          <li><strong className="text-white">newlib</strong>: 組込みシステム向け。ARM Cortex-Mなどで使用</li>
          <li><strong className="text-white">uclibc-ng</strong>: 小型Linuxシステム向け</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">標準ライブラリの活用</h2>
        <p className="text-gray-400 mb-4">
          C標準ライブラリには便利な関数が多数あります。
          外部ライブラリを使う前に標準ライブラリで解決できないか確認しましょう。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <math.h>

int compare_int(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int main(void) {
    /* stdlib.h: qsort */
    int arr[] = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    int n = 9;
    qsort(arr, n, sizeof(int), compare_int);
    printf("qsort: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    /* stdlib.h: bsearch */
    int key = 7;
    int *found = bsearch(&key, arr, n, sizeof(int), compare_int);
    printf("bsearch(%d): %s\\n", key, found ? "found" : "not found");

    /* math.h: 数学関数 */
    printf("sqrt(144) = %.0f\\n", sqrt(144.0));
    printf("pow(2,8) = %.0f\\n", pow(2.0, 8.0));
    printf("log2(1024) = %.0f\\n", log2(1024.0));

    /* time.h: 時刻 */
    time_t t = time(NULL);
    printf("time() OK: %s\\n", t != (time_t)-1 ? "yes" : "no");

    return 0;
}`}
          expectedOutput={`qsort: 1 2 3 4 5 6 7 8 9
bsearch(7): found
sqrt(144) = 12
pow(2,8) = 256
log2(1024) = 10
time() OK: yes`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主要なサードパーティCライブラリ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語には高品質なオープンソースライブラリが多数あります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
          <li><strong className="text-white">libcurl</strong>: HTTP/HTTPS/FTPなどのネットワーク通信（<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-lcurl</code>）</li>
          <li><strong className="text-white">SQLite</strong>: 組込みSQLデータベース、単一ファイル（<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-lsqlite3</code>）</li>
          <li><strong className="text-white">zlib</strong>: データ圧縮/展開（<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-lz</code>）</li>
          <li><strong className="text-white">OpenSSL</strong>: 暗号化・TLS（<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">-lssl -lcrypto</code>）</li>
          <li><strong className="text-white">libuv</strong>: 非同期I/O（Node.jsが使用）</li>
          <li><strong className="text-white">jansson</strong>: JSONパース</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">独自ライブラリの作成</h2>
        <p className="text-gray-400 mb-4">
          静的ライブラリ（.a）を作成すると複数プロジェクトで再利用できます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">ar</code> コマンドで.oファイルをまとめます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* 小さな汎用ライブラリの例 */

/* 文字列ユーティリティ */
char *str_trim(const char *s) {
    while (*s == ' ' || *s == '\\t') s++;
    size_t len = strlen(s);
    char *result = malloc(len + 1);
    if (!result) return NULL;
    strcpy(result, s);
    while (len > 0 && (result[len-1] == ' ' || result[len-1] == '\\t')) {
        result[--len] = '\\0';
    }
    return result;
}

int str_starts_with(const char *s, const char *prefix) {
    return strncmp(s, prefix, strlen(prefix)) == 0;
}

/* 数値ユーティリティ */
int clamp_int(int val, int min, int max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

int main(void) {
    char *trimmed = str_trim("  Hello, World!  ");
    printf("trim: '%s'\\n", trimmed);
    free(trimmed);

    printf("starts_with: %d\\n",
           str_starts_with("Hello, World!", "Hello"));
    printf("starts_with: %d\\n",
           str_starts_with("Hello, World!", "World"));

    printf("clamp(150, 0, 100) = %d\\n", clamp_int(150, 0, 100));
    printf("clamp(-5, 0, 100) = %d\\n", clamp_int(-5, 0, 100));
    printf("clamp(50, 0, 100) = %d\\n", clamp_int(50, 0, 100));

    return 0;
}`}
          expectedOutput={`trim: 'Hello, World!'
starts_with: 1
starts_with: 0
clamp(150, 0, 100) = 100
clamp(-5, 0, 100) = 0
clamp(50, 0, 100) = 50`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="libraries" />
      </div>
      <LessonNav lessons={lessons} currentId="libraries" basePath="/learn/ecosystem" />
    </div>
  );
}
