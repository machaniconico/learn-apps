import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileReadPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ファイルI/O レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイル読み込み</h1>
        <p className="text-gray-400">fgetc・fgets・fscanf・fread の使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイル読み込み関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ファイルからデータを読む方法は複数あります。用途に応じて使い分けましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fgetc(fp)</code>: 1文字ずつ読む</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fgets(buf, n, fp)</code>: 1行読む（最大n-1文字）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fscanf(fp, fmt, ...)</code>: 書式指定で読む</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fread(buf, size, n, fp)</code>: バイナリでn個読む</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fgetc で1文字ずつ読む</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fgetc</code> はEOFまで1文字ずつ読み込みます。文字カウントなどに使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    // ファイル内容を文字列でシミュレート
    const char *content = "Hello\\nWorld\\nC Language\\n";
    int len = strlen(content);

    int chars = 0, lines = 0;
    for (int i = 0; i < len; i++) {
        char c = content[i];
        chars++;
        if (c == '\\n') lines++;
    }

    printf("文字数: %d\\n", chars);
    printf("行数:   %d\\n", lines);

    // fgetc のEOFチェックパターン
    // int c;
    // while ((c = fgetc(fp)) != EOF) { ... }

    printf("fgetc パターン: while ((c = fgetc(fp)) != EOF)\\n");

    return 0;
}`}
          expectedOutput={`文字数: 23
行数:   3
fgetc パターン: while ((c = fgetc(fp)) != EOF)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fscanf で構造化データを読む</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fscanf</code> で書式指定してファイルからデータを読み込みます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

struct Record {
    char name[20];
    int age;
    float score;
};

int main() {
    // CSVデータをシミュレート（実際はファイルから読む）
    const char *data =
        "Alice 25 85.5\\n"
        "Bob 30 92.0\\n"
        "Carol 28 78.3\\n";

    struct Record records[3];
    int n = 0;

    // sscanf で各行をパース
    const char *p = data;
    char line[64];
    while (sscanf(p, "%63[^\\n]%*c", line) == 1) {
        sscanf(line, "%19s %d %f",
            records[n].name, &records[n].age, &records[n].score);
        n++;
        p += strlen(line) + 1;
        if (!*p) break;
    }

    for (int i = 0; i < n; i++) {
        printf("%-8s %3d歳 %.1f点\\n",
            records[i].name, records[i].age, records[i].score);
    }

    return 0;
}`}
          expectedOutput={`Alice    25歳 85.5点
Bob      30歳 92.0点
Carol    28歳 78.3点`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="file-read" />
      </div>
      <LessonNav lessons={lessons} currentId="file-read" basePath="/learn/fileio" />
    </div>
  );
}
