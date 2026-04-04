import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdio");

export default function BufferingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準入出力 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バッファリング</h1>
        <p className="text-gray-400">setbuf・setvbuf・fflush・行/完全/バッファなしを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">バッファリングの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語のI/Oはパフォーマンスのためにバッファリングされます。3種類のモードがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-gray-300">完全バッファリング</strong>: バッファが満杯かfflush時に出力（ファイルのデフォルト）</li>
          <li><strong className="text-gray-300">行バッファリング</strong>: 改行時かバッファ満杯時に出力（端末のstdoutデフォルト）</li>
          <li><strong className="text-gray-300">バッファなし</strong>: 即座に出力（stderrのデフォルト）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fflush(fp)</code>: バッファを強制フラッシュ</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">setvbuf(fp, buf, mode, size)</code>: バッファリングモード設定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fflush の使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fflush(stdout)</code> でバッファを強制的にフラッシュします。プログレス表示などに重要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // fflush なしでは改行がないと表示されないことがある
    printf("処理中");
    fflush(stdout);  // 強制出力

    // プログレス表示のシミュレーション
    for (int i = 0; i <= 5; i++) {
        printf("\\r進捗: %d/5", i);
        fflush(stdout);
    }
    printf("\\n");

    printf("完了!\\n");

    // stderr はバッファなし（即座に出力）
    fprintf(stderr, "エラーメッセージは即座に出力\\n");

    return 0;
}`}
          expectedOutput={`処理中
進捗: 5/5
完了!
エラーメッセージは即座に出力`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">setvbuf でバッファモード設定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">setvbuf</code> でストリームのバッファリングモードとサイズを制御できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // _IONBF: バッファなし
    // _IOLBF: 行バッファリング
    // _IOFBF: 完全バッファリング

    // stdout をバッファなしに設定
    setvbuf(stdout, NULL, _IONBF, 0);
    printf("バッファなし出力1\\n");
    printf("バッファなし出力2\\n");

    // カスタムバッファでの完全バッファリング
    char mybuf[256];
    FILE *fp = fopen("/dev/null", "w");
    if (fp) {
        setvbuf(fp, mybuf, _IOFBF, sizeof(mybuf));
        fputs("test\\n", fp);
        fflush(fp);
        fclose(fp);
    }

    printf("バッファリング設定完了\\n");
    return 0;
}`}
          expectedOutput={`バッファなし出力1
バッファなし出力2
バッファリング設定完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdio" lessonId="buffering" />
      </div>
      <LessonNav lessons={lessons} currentId="buffering" basePath="/learn/stdio" />
    </div>
  );
}
