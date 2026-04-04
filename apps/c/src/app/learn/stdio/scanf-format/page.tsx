import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdio");

export default function ScanfFormatPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準入出力 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">scanf書式</h1>
        <p className="text-gray-400">scanf("%d", &x)・書式指定子・戻り値を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">scanf の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">scanf</code> は標準入力から書式に従ってデータを読み込みます。
          引数にはアドレス（<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">&変数</code>）を渡します。
          戻り値は成功した変換の数です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>変数には <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">&</code> でアドレスを渡す（配列・ポインタは不要）</li>
          <li>戻り値で読み込み成功数を確認する</li>
          <li>文字列バッファには幅制限 <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%19s</code> を指定して安全に</li>
          <li>空白（スペース・タブ・改行）はスキップされる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">scanf の基本的な使い方</h2>
        <p className="text-gray-400 mb-4">
          sscanf を使って入力のシミュレーションを行います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // sscanf で入力をシミュレート
    int n;
    double d;
    char s[20];

    // 整数の読み込み
    int r = sscanf("42", "%d", &n);
    printf("整数: %d (変換数: %d)\\n", n, r);

    // 浮動小数点の読み込み
    r = sscanf("3.14", "%lf", &d);
    printf("float: %.2f (変換数: %d)\\n", d, r);

    // 文字列の読み込み
    r = sscanf("Hello", "%19s", s);
    printf("文字列: %s (変換数: %d)\\n", s, r);

    // 複数同時
    int x, y;
    r = sscanf("10 20", "%d %d", &x, &y);
    printf("x=%d, y=%d (変換数: %d)\\n", x, y, r);

    return 0;
}`}
          expectedOutput={`整数: 42 (変換数: 1)
float: 3.14 (変換数: 1)
文字列: Hello (変換数: 1)
x=10, y=20 (変換数: 2)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">戻り値と入力検証</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">scanf</code> の戻り値を確認して入力エラーを検出します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int value;
    const char *inputs[] = {"123", "abc", "456"};

    for (int i = 0; i < 3; i++) {
        int r = sscanf(inputs[i], "%d", &value);
        if (r == 1) {
            printf("成功: %d\\n", value);
        } else {
            printf("失敗: '%s' は整数ではありません\\n", inputs[i]);
        }
    }

    // 日付のパース
    int year, month, day;
    r = sscanf("2026-04-03", "%d-%d-%d", &year, &month, &day);
    if (r == 3) {
        printf("日付: %d年%d月%d日\\n", year, month, day);
    }

    return 0;
}`}
          expectedOutput={`成功: 123
失敗: 'abc' は整数ではありません
成功: 456
日付: 2026年4月3日`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdio" lessonId="scanf-format" />
      </div>
      <LessonNav lessons={lessons} currentId="scanf-format" basePath="/learn/stdio" />
    </div>
  );
}
