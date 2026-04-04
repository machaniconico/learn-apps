import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function FormattedStringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">文字列 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">書式付き文字列</h1>
        <p className="text-gray-400">sprintf・snprintf・sscanfによる文字列への書式出力と解析を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列への書式操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          printfファミリーにはファイルや文字列を対象にした派生関数があります。
        </p>
        <div className="space-y-2 text-sm">
          {[
            { fn: "printf(fmt, ...)", desc: "標準出力への書式出力" },
            { fn: "fprintf(fp, fmt, ...)", desc: "ファイルへの書式出力" },
            { fn: "sprintf(buf, fmt, ...)", desc: "文字列バッファへの書式出力（非推奨）" },
            { fn: "snprintf(buf, n, fmt, ...)", desc: "サイズ制限付きの安全な書式出力" },
            { fn: "sscanf(str, fmt, ...)", desc: "文字列からの書式入力（解析）" },
          ].map(({ fn, desc }) => (
            <div key={fn} className="flex gap-3 p-2 bg-gray-800 rounded">
              <code className="text-teal-400 shrink-0 text-xs">{fn}</code>
              <span className="text-gray-400 text-xs">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">snprintf で文字列を構築</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">snprintf()</code> は数値や文字列を組み合わせてバッファに書き込みます。
          バッファオーバーフローを防ぐ安全な方法です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    char buf[64];

    // 数値を文字列に変換
    int n = 42;
    snprintf(buf, sizeof(buf), "%d", n);
    printf("数値→文字列: \"%s\"\\n", buf);

    // 複数の値を組み合わせる
    const char *name = "Alice";
    int age = 30;
    double score = 98.5;
    snprintf(buf, sizeof(buf), "名前: %s, 年齢: %d, スコア: %.1f", name, age, score);
    printf("%s\\n", buf);

    // ゼロパディング
    snprintf(buf, sizeof(buf), "ID: %05d", 42);
    printf("%s\\n", buf);

    return 0;
}`}
          expectedOutput={`数値→文字列: "42"
名前: Alice, 年齢: 30, スコア: 98.5
ID: 00042`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sscanf で文字列を解析</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sscanf()</code> はscanfの文字列版です。
          文字列から数値や他の文字列を抽出するのに使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 文字列から数値を解析
    const char *num_str = "42 3.14 255";
    int i; double d; unsigned int u;
    sscanf(num_str, "%d %lf %u", &i, &d, &u);
    printf("int: %d, double: %.2f, uint: %u\\n", i, d, u);

    // 日付文字列を解析
    const char *date = "2025-04-03";
    int year, month, day;
    sscanf(date, "%d-%d-%d", &year, &month, &day);
    printf("年: %d, 月: %d, 日: %d\\n", year, month, day);

    // CSV行を解析
    const char *csv = "Bob,25,Osaka";
    char name[32], city[32]; int age;
    sscanf(csv, "%31[^,],%d,%31s", name, &age, city);
    printf("名前: %s, 年齢: %d, 都市: %s\\n", name, age, city);

    return 0;
}`}
          expectedOutput={`int: 42, double: 3.14, uint: 255
年: 2025, 月: 4, 日: 3
名前: Bob, 年齢: 25, 都市: Osaka`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="formatted-strings" />
      </div>
      <LessonNav lessons={lessons} currentId="formatted-strings" basePath="/learn/strings" />
    </div>
  );
}
