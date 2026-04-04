import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function BinaryIoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ファイルI/O レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バイナリI/O</h1>
        <p className="text-gray-400">"rb"/"wb"モード、fread/fwriteで構造体を扱う方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">バイナリI/Oとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          バイナリモードではデータをそのままのバイト列で読み書きします。
          テキスト変換（改行コード変換など）が行われないため、
          画像・音声・構造体などのバイナリデータに使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>モード: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">"rb"</code>（バイナリ読み込み）、<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">"wb"</code>（バイナリ書き込み）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fwrite(ptr, size, n, fp)</code>: n個のsizeバイトを書く</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fread(ptr, size, n, fp)</code>: n個のsizeバイトを読む</li>
          <li>戻り値は実際に読み書きできた個数</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体のバイナリ保存・読み込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fwrite/fread</code> で構造体をそのままファイルに保存・復元できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[20];
    float score;
} Record;

int main() {
    Record records[] = {
        {1, "Alice", 95.5f},
        {2, "Bob",   87.0f},
        {3, "Carol", 91.3f},
    };
    int n = 3;

    // バイナリ書き込み
    FILE *fp = fopen("records.bin", "wb");
    fwrite(records, sizeof(Record), n, fp);
    fclose(fp);
    printf("バイナリ書き込み完了\\n");

    // バイナリ読み込み
    Record loaded[3];
    fp = fopen("records.bin", "rb");
    size_t count = fread(loaded, sizeof(Record), n, fp);
    fclose(fp);

    printf("読み込み数: %zu\\n", count);
    for (size_t i = 0; i < count; i++) {
        printf("id=%d name=%-8s score=%.1f\\n",
            loaded[i].id, loaded[i].name, loaded[i].score);
    }

    return 0;
}`}
          expectedOutput={`バイナリ書き込み完了
読み込み数: 3
id=1 name=Alice    score=95.5
id=2 name=Bob      score=87.0
id=3 name=Carol    score=91.3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">整数配列のバイナリI/O</h2>
        <p className="text-gray-400 mb-4">
          整数配列をバイナリ形式で保存します。テキスト形式より小さく高速です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int data[] = {100, 200, 300, 400, 500};
    int n = 5;

    // バイナリ書き込み
    FILE *fp = fopen("nums.bin", "wb");
    fwrite(&n, sizeof(int), 1, fp);        // 要素数
    fwrite(data, sizeof(int), n, fp);      // データ
    fclose(fp);

    // バイナリ読み込み
    fp = fopen("nums.bin", "rb");
    int count;
    fread(&count, sizeof(int), 1, fp);
    printf("要素数: %d\\n", count);

    int loaded[10];
    fread(loaded, sizeof(int), count, fp);
    fclose(fp);

    for (int i = 0; i < count; i++) {
        printf("loaded[%d] = %d\\n", i, loaded[i]);
    }

    return 0;
}`}
          expectedOutput={`要素数: 5
loaded[0] = 100
loaded[1] = 200
loaded[2] = 300
loaded[3] = 400
loaded[4] = 500`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="binary-io" />
      </div>
      <LessonNav lessons={lessons} currentId="binary-io" basePath="/learn/fileio" />
    </div>
  );
}
