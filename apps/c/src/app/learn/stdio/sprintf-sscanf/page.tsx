import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdio");

export default function SprintfSscanfPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準入出力 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">sprintf・sscanf</h1>
        <p className="text-gray-400">文字列フォーマットのsprintf、文字列解析のsscanfを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">sprintf と sscanf の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sprintf</code> は printf と同じ書式でバッファに書き込みます。
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sscanf</code> は文字列から scanf のようにデータを解析します。
          ファイルや標準入出力ではなく文字列を対象にします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sprintf(buf, fmt, ...)</code>: バッファへの書式出力</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">snprintf(buf, n, fmt, ...)</code>: サイズ制限付き（推奨）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sscanf(str, fmt, ...)</code>: 文字列からのパース</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sprintf と snprintf</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">snprintf</code> はバッファサイズを指定できるので安全です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    char buf[64];

    // 数値を文字列に変換
    snprintf(buf, sizeof(buf), "%d", 12345);
    printf("整数→文字列: '%s'\\n", buf);

    // 日付フォーマット
    int y = 2026, m = 4, d = 3;
    snprintf(buf, sizeof(buf), "%04d-%02d-%02d", y, m, d);
    printf("日付: %s\\n", buf);

    // 複合メッセージ作成
    const char *name = "Alice";
    int score = 95;
    snprintf(buf, sizeof(buf), "%s: %d点", name, score);
    printf("メッセージ: %s\\n", buf);

    // バッファ長チェック
    int written = snprintf(buf, 10, "長い文字列: %d", 12345);
    printf("書いた文字数: %d, バッファ内: '%s'\\n", written, buf);

    return 0;
}`}
          expectedOutput={`整数→文字列: '12345'
日付: 2026-04-03
メッセージ: Alice: 95点
書いた文字数: 15, バッファ内: '長い文字'`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sscanf で文字列解析</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sscanf</code> でCSVや構造化テキストをパースできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // CSV行をパース
    const char *csv = "Alice,30,85.5";
    char name[20];
    int age;
    float score;

    int r = sscanf(csv, "%19[^,],%d,%f", name, &age, &score);
    printf("パース数: %d\\n", r);
    printf("名前: %s\\n", name);
    printf("年齢: %d\\n", age);
    printf("スコア: %.1f\\n", score);

    // キー=値形式
    const char *kv = "width=1920";
    char key[20];
    int value;
    sscanf(kv, "%19[^=]=%d", key, &value);
    printf("%s = %d\\n", key, value);

    return 0;
}`}
          expectedOutput={`パース数: 3
名前: Alice
年齢: 30
スコア: 85.5
width = 1920`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdio" lessonId="sprintf-sscanf" />
      </div>
      <LessonNav lessons={lessons} currentId="sprintf-sscanf" basePath="/learn/stdio" />
    </div>
  );
}
