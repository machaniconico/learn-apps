import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileWritePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ファイルI/O レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイル書き込み</h1>
        <p className="text-gray-400">fputc・fputs・fprintf・fwrite の使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイル書き込み関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ファイルへのデータ書き込み方法は複数あります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fputc(c, fp)</code>: 1文字書く</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fputs(s, fp)</code>: 文字列を書く（改行なし）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fprintf(fp, fmt, ...)</code>: 書式指定で書く</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fwrite(buf, size, n, fp)</code>: バイナリでn個書く</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fprintf でCSV出力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fprintf</code> でCSVファイルを生成する例です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Student {
    char name[20];
    int age;
    float score;
};

int main() {
    struct Student students[] = {
        {"Alice", 20, 85.5f},
        {"Bob",   22, 92.0f},
        {"Carol", 21, 78.3f},
    };
    int n = 3;

    // CSV書き込みをシミュレート（stdoutに出力）
    FILE *fp = stdout;

    // ヘッダー行
    fprintf(fp, "名前,年齢,スコア\\n");

    // データ行
    for (int i = 0; i < n; i++) {
        fprintf(fp, "%s,%d,%.1f\\n",
            students[i].name,
            students[i].age,
            students[i].score);
    }

    return 0;
}`}
          expectedOutput={`名前,年齢,スコア
Alice,20,85.5
Bob,22,92.0
Carol,21,78.3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fputc と fputs</h2>
        <p className="text-gray-400 mb-4">
          文字・文字列単位での書き込みです。テキスト変換処理などに使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    const char *text = "Hello, World!";

    // fputc で1文字ずつ大文字変換して出力
    for (int i = 0; text[i]; i++) {
        fputc(toupper(text[i]), stdout);
    }
    fputc('\\n', stdout);

    // fputs で複数行
    const char *lines[] = {"Line A\\n", "Line B\\n", "Line C\\n"};
    for (int i = 0; i < 3; i++) {
        fputs(lines[i], stdout);
    }

    return 0;
}`}
          expectedOutput={`HELLO, WORLD!
Line A
Line B
Line C`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="file-write" />
      </div>
      <LessonNav lessons={lessons} currentId="file-write" basePath="/learn/fileio" />
    </div>
  );
}
