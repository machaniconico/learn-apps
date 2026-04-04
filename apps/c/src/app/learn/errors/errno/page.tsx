import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function ErrnoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">エラー処理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">errno</h1>
        <p className="text-gray-400">errno・perror()・strerror()を使ってシステムコールのエラーを確認しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">errnoとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">errno</code> はシステムコールや標準ライブラリ関数が失敗したときに
          設定されるグローバル変数（スレッドローカル）です。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">errno.h</code> をインクルードして使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">ENOENT (2)</code> — ファイルが存在しない</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">EACCES (13)</code> — 権限なし</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">ENOMEM (12)</code> — メモリ不足</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">EINVAL (22)</code> — 無効な引数</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">ERANGE (34)</code> — 範囲外</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">errnoの基本的な使い方</h2>
        <p className="text-gray-400 mb-4">
          システムコールが失敗したら即座にerrnoを確認します。
          次の関数呼び出しでerrnoが上書きされるためです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <errno.h>
#include <string.h>

int main(void) {
    /* 存在しないファイルを開く */
    errno = 0;  /* 明示的にリセット */
    FILE *fp = fopen("no_such_file.txt", "r");

    if (fp == NULL) {
        int saved_errno = errno;  /* すぐ保存 */
        printf("エラー番号: %d\\n", saved_errno);
        printf("エラー文字列: %s\\n", strerror(saved_errno));
        perror("fopen");
    }

    /* ENOENT の定数値を確認 */
    printf("ENOENT = %d\\n", ENOENT);

    return 0;
}`}
          expectedOutput={`エラー番号: 2
エラー文字列: No such file or directory
fopen: No such file or directory
ENOENT = 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">perror() vs strerror()</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">perror()</code> はstderrに直接出力、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">strerror()</code> は文字列を返すのでフォーマットに組み込めます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <errno.h>
#include <string.h>

void try_open(const char *path) {
    FILE *fp = fopen(path, "r");
    if (fp == NULL) {
        /* strerror: 文字列として使える */
        fprintf(stderr, "エラー '%s': %s\\n", path, strerror(errno));
        return;
    }
    printf("'%s' を開くことができた\\n", path);
    fclose(fp);
}

int main(void) {
    /* /etc/hostsは通常読める */
    try_open("/etc/hosts");

    /* 存在しないファイル */
    try_open("/tmp/no_such_file_xyz.txt");

    /* perrorの例 */
    fopen("/root/secret", "r");
    perror("perror例");

    return 0;
}`}
          expectedOutput={`'/etc/hosts' を開くことができた
エラー '/tmp/no_such_file_xyz.txt': No such file or directory
perror例: No such file or directory`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">errnoの注意点</h2>
        <p className="text-gray-400 mb-4">
          成功した関数呼び出しでもerrnoが変わる場合があります。
          失敗を検出したらすぐにerrnoを確認・保存しましょう。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <stdlib.h>

int main(void) {
    /* strtol のエラー確認 */
    char *end;
    errno = 0;
    long val = strtol("9999999999999", &end, 10);

    if (errno == ERANGE) {
        printf("オーバーフロー: errno=%d (%s)\\n",
               errno, strerror(errno));
    } else if (*end != '\\0') {
        printf("変換エラー: 非数字が含まれる\\n");
    } else {
        printf("変換成功: %ld\\n", val);
    }

    /* 正常な変換 */
    errno = 0;
    val = strtol("42", &end, 10);
    if (errno == 0 && *end == '\\0') {
        printf("正常変換: %ld\\n", val);
    }

    return 0;
}`}
          expectedOutput={`オーバーフロー: errno=34 (Result too large)
正常変換: 42`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="errno" />
      </div>
      <LessonNav lessons={lessons} currentId="errno" basePath="/learn/errors" />
    </div>
  );
}
