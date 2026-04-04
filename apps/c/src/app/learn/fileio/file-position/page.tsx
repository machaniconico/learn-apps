import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FilePositionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ファイルI/O レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイル位置</h1>
        <p className="text-gray-400">ftell・fseek・rewind・SEEK_SET/CUR/END を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイル位置の操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ファイルには「現在位置」があり、読み書きはその位置から行われます。
          位置を自由に移動することでランダムアクセスが可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">ftell(fp)</code>: 現在位置を返す（先頭からのバイト数）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fseek(fp, offset, whence)</code>: 位置を移動</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">rewind(fp)</code>: 先頭に戻す（fseek(fp,0,SEEK_SET)と同等）</li>
          <li>whence: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">SEEK_SET</code>（先頭）、<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">SEEK_CUR</code>（現在）、<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">SEEK_END</code>（末尾）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ftell・fseek でファイルサイズ取得</h2>
        <p className="text-gray-400 mb-4">
          末尾に移動してから <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">ftell</code> でファイルサイズを取得できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

long getFileSize(const char *filename) {
    FILE *fp = fopen(filename, "rb");
    if (!fp) return -1;
    fseek(fp, 0, SEEK_END);
    long size = ftell(fp);
    fclose(fp);
    return size;
}

int main() {
    // テストファイル作成
    FILE *fp = fopen("test.bin", "wb");
    for (int i = 0; i < 10; i++) {
        fwrite(&i, sizeof(int), 1, fp);
    }
    fclose(fp);

    printf("ファイルサイズ: %ld bytes\\n", getFileSize("test.bin"));

    // ランダムアクセス
    fp = fopen("test.bin", "rb");
    fseek(fp, 5 * sizeof(int), SEEK_SET);
    int val;
    fread(&val, sizeof(int), 1, fp);
    printf("5番目の値: %d\\n", val);

    rewind(fp);
    fread(&val, sizeof(int), 1, fp);
    printf("先頭の値: %d\\n", val);

    fclose(fp);
    return 0;
}`}
          expectedOutput={`ファイルサイズ: 40 bytes
5番目の値: 5
先頭の値: 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SEEK_CUR で相対移動</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">SEEK_CUR</code> で現在位置から相対的に移動します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // テキストファイル作成
    FILE *fp = fopen("pos.txt", "w");
    fputs("ABCDEFGHIJ", fp);
    fclose(fp);

    fp = fopen("pos.txt", "r");

    // 先頭から読む
    char c = fgetc(fp);
    printf("位置0: %c (ftell=%ld)\\n", c, ftell(fp));

    // 2文字スキップ
    fseek(fp, 2, SEEK_CUR);
    c = fgetc(fp);
    printf("スキップ後: %c (ftell=%ld)\\n", c, ftell(fp));

    // 末尾から3つ前
    fseek(fp, -3, SEEK_END);
    c = fgetc(fp);
    printf("末尾-3: %c\\n", c);

    fclose(fp);
    return 0;
}`}
          expectedOutput={`位置0: A (ftell=1)
スキップ後: D (ftell=4)
末尾-3: H`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="file-position" />
      </div>
      <LessonNav lessons={lessons} currentId="file-position" basePath="/learn/fileio" />
    </div>
  );
}
