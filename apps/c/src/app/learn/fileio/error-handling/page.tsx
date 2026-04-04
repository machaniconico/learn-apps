import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function ErrorHandlingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ファイルI/O レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラー処理</h1>
        <p className="text-gray-400">ferror・feof・perror・errno を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイルI/Oのエラー処理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ファイル操作は失敗する可能性があります。エラーの種類を正しく判別し、適切に処理しましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">ferror(fp)</code>: エラーフラグが立っていれば0以外</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">feof(fp)</code>: EOFに達していれば0以外</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">clearerr(fp)</code>: エラー・EOFフラグをリセット</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">perror(msg)</code>: errno に基づくエラーメッセージを出力</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">strerror(errno)</code>: エラー番号を文字列に変換</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">perror と errno</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">perror</code> でシステムエラーの詳細を表示します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <errno.h>
#include <string.h>

int main() {
    // 存在しないファイルを開こうとする
    FILE *fp = fopen("nonexistent.txt", "r");
    if (fp == NULL) {
        perror("fopen失敗");
        printf("errno: %d\\n", errno);
        printf("メッセージ: %s\\n", strerror(errno));
    }

    // 正常なファイル操作
    fp = fopen("test.txt", "w");
    if (fp != NULL) {
        fputs("test\\n", fp);
        if (ferror(fp)) {
            perror("書き込みエラー");
        } else {
            printf("書き込み成功\\n");
        }
        fclose(fp);
    }

    return 0;
}`}
          expectedOutput={`fopen失敗: No such file or directory
errno: 2
メッセージ: No such file or directory
書き込み成功`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">feof を使った安全な読み込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">feof</code> でEOFを検出し、<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">ferror</code> でエラーを区別します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    // テストデータ
    const char *data = "Line 1\\nLine 2\\nLine 3\\n";

    // tmpfile() でメモリ上のファイルを作成
    FILE *fp = tmpfile();
    fputs(data, fp);
    rewind(fp);

    char line[64];
    int lineCount = 0;

    while (fgets(line, sizeof(line), fp) != NULL) {
        // 改行除去
        line[strcspn(line, "\\n")] = '\\0';
        printf("[%d] %s\\n", ++lineCount, line);
    }

    if (feof(fp)) {
        printf("EOF に達しました\\n");
    }
    if (ferror(fp)) {
        perror("読み込みエラー");
    }

    fclose(fp);
    return 0;
}`}
          expectedOutput={`[1] Line 1
[2] Line 2
[3] Line 3
EOF に達しました`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="error-handling" />
      </div>
      <LessonNav lessons={lessons} currentId="error-handling" basePath="/learn/fileio" />
    </div>
  );
}
