import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FopenFclosePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ファイルI/O レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">fopen・fclose</h1>
        <p className="text-gray-400">fopen("file.txt", "r")・fclose()・モード一覧を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイルのオープンとクローズ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fopen(path, mode)</code> でファイルを開き、
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">FILE *</code> ポインタを返します。失敗時はNULL。
          処理後は必ず <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fclose()</code> で閉じます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">"r"</code>: 読み込み専用（存在必須）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">"w"</code>: 書き込み（新規作成または内容消去）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">"a"</code>: 追記（末尾に追加）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">"r+"</code>: 読み書き両用（存在必須）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">"rb"/"wb"</code>: バイナリモード</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルの書き込みと読み込み</h2>
        <p className="text-gray-400 mb-4">
          ファイルを書き込みモードで開いて内容を書き、読み込みモードで開いて表示します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    const char *filename = "sample.txt";

    // 書き込み
    FILE *fp = fopen(filename, "w");
    if (fp == NULL) {
        perror("書き込みオープン失敗");
        return 1;
    }
    fprintf(fp, "Line 1: Hello\\n");
    fprintf(fp, "Line 2: World\\n");
    fprintf(fp, "Line 3: C Language\\n");
    fclose(fp);
    printf("書き込み完了\\n");

    // 読み込み
    fp = fopen(filename, "r");
    if (fp == NULL) {
        perror("読み込みオープン失敗");
        return 1;
    }
    char line[100];
    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("%s", line);
    }
    fclose(fp);

    return 0;
}`}
          expectedOutput={`書き込み完了
Line 1: Hello
Line 2: World
Line 3: C Language`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">追記モード</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">"a"</code> モードでは既存内容を保持したまま末尾に追加します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int writeLog(const char *filename, const char *msg) {
    FILE *fp = fopen(filename, "a");  // 追記モード
    if (fp == NULL) return -1;
    fprintf(fp, "[LOG] %s\\n", msg);
    fclose(fp);
    return 0;
}

int main() {
    const char *log = "app.log";

    writeLog(log, "アプリ起動");
    writeLog(log, "処理開始");
    writeLog(log, "処理完了");

    // ログ内容を表示
    FILE *fp = fopen(log, "r");
    char line[100];
    while (fgets(line, sizeof(line), fp)) {
        printf("%s", line);
    }
    fclose(fp);

    return 0;
}`}
          expectedOutput={`[LOG] アプリ起動
[LOG] 処理開始
[LOG] 処理完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="fopen-fclose" />
      </div>
      <LessonNav lessons={lessons} currentId="fopen-fclose" basePath="/learn/fileio" />
    </div>
  );
}
