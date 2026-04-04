import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function ErrnoHPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">errno.h</h1>
        <p className="text-gray-400">errno・perror()・strerror() を使ったシステムエラーの処理を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">errno とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">errno</code> はシステムコールや標準ライブラリ関数が失敗したときに
          エラーコードをセットするグローバル変数です。
          成功した場合はリセットされないため、エラーチェックは関数の直後に行う必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">ENOENT</code> - ファイルやディレクトリが存在しない</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">EACCES</code> - アクセス権限がない</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">ENOMEM</code> - メモリが不足している</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">EINVAL</code> - 不正な引数</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">ERANGE</code> - 結果が範囲外</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">perror() でエラーを表示</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">perror(str)</code> は
          引数の文字列と現在の errno に対応するエラーメッセージを stderr に出力します。
          ファイルオープン失敗などのエラー報告に最もよく使われます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <errno.h>
#include <string.h>

int main() {
    /* 存在しないファイルを開こうとする */
    FILE *f = fopen("no_such_file.txt", "r");
    if (f == NULL) {
        perror("fopen failed");
        printf("errno = %d\\n", errno);
        printf("strerror: %s\\n", strerror(errno));
    }
    return 0;
}`}
          expectedOutput={`fopen failed: No such file or directory
errno = 2
strerror: No such file or directory`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">strerror() でエラー文字列を取得</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">strerror(errnum)</code> は
          エラーコードに対応する説明文字列を返します。perror() と異なりログファイルへの書き込みなど
          柔軟な使い方ができます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <errno.h>
#include <string.h>

int main() {
    /* 代表的なエラーコードの説明を表示 */
    int codes[] = {ENOENT, EACCES, ENOMEM, EINVAL};
    const char *names[] = {"ENOENT", "EACCES", "ENOMEM", "EINVAL"};
    int n = 4;

    for (int i = 0; i < n; i++) {
        printf("%s (%d): %s\\n", names[i], codes[i], strerror(codes[i]));
    }
    return 0;
}`}
          expectedOutput={`ENOENT (2): No such file or directory
EACCES (13): Permission denied
ENOMEM (12): Cannot allocate memory
EINVAL (22): Invalid argument`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">errno を使った安全なエラーハンドリング</h2>
        <p className="text-gray-400 mb-4">
          errno は複数の関数呼び出しをまたいで保持されます。エラーをチェックする前に
          errno を 0 にリセットし、関数の直後でチェックするのがベストプラクティスです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

int main() {
    /* errno をリセットしてから関数を呼ぶ */
    errno = 0;
    double val = strtod("not_a_number", NULL);
    if (errno != 0) {
        fprintf(stderr, "Error: %s\\n", strerror(errno));
    } else {
        printf("Converted: %f\\n", val);
    }

    errno = 0;
    double ok = strtod("3.14", NULL);
    printf("OK: %.2f\\n", ok);

    return 0;
}`}
          expectedOutput={`Converted: 0.000000
OK: 3.14`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdlib" lessonId="errno-h" />
      </div>
      <LessonNav lessons={lessons} currentId="errno-h" basePath="/learn/stdlib" />
    </div>
  );
}
