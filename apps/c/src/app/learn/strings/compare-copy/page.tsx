import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function CompareCopyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">文字列 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">安全な比較・コピー</h1>
        <p className="text-gray-400">strncpy・strncmpによるバッファオーバーフローを防ぐ安全な文字列操作を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">n系関数の必要性</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">strcpy</code> や <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">strcat</code> はバッファサイズを確認しないため、
          長すぎる文字列でバッファオーバーフローが発生します。
          <strong className="text-teal-400">n系関数</strong>はコピー・比較する最大文字数を指定できます。
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-gray-800 rounded flex gap-3">
            <code className="text-teal-400 shrink-0">strncpy(dst, src, n)</code>
            <span className="text-gray-400">最大n文字コピー（バッファオーバーフロー防止）</span>
          </div>
          <div className="p-2 bg-gray-800 rounded flex gap-3">
            <code className="text-teal-400 shrink-0">strncat(dst, src, n)</code>
            <span className="text-gray-400">最大n文字結合</span>
          </div>
          <div className="p-2 bg-gray-800 rounded flex gap-3">
            <code className="text-teal-400 shrink-0">strncmp(s1, s2, n)</code>
            <span className="text-gray-400">最大n文字まで比較</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">strncpy と strncmp</h2>
        <p className="text-gray-400 mb-4">
          n系関数でバッファサイズを制限して安全に操作します。
          strncpyはsrcがn文字以上の場合にヌル終端されないため、手動で追加する必要があります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    char dst[10];
    const char *long_str = "Hello, World!";

    // strncpy: 最大9文字コピー
    strncpy(dst, long_str, sizeof(dst) - 1);
    dst[sizeof(dst) - 1] = '\\0';  // 明示的にヌル終端
    printf("strncpy: \"%s\"\\n", dst);

    // strncmp: 最初のn文字で比較
    printf("strncmp(\\"Hello\\", \\"Hello World\\", 5): %d\\n",
           strncmp("Hello", "Hello World", 5));
    printf("strncmp(\\"Hello\\", \\"Hello World\\", 6): %d\\n",
           strncmp("Hello", "Hello World", 6));

    return 0;
}`}
          expectedOutput={`strncpy: "Hello, Wo"
strncmp("Hello", "Hello World", 5): 0
strncmp("Hello", "Hello World", 6): -1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">snprintfによる安全な文字列構築</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">snprintf(buf, size, fmt, ...)</code> はバッファサイズを超えない安全な文字列フォーマットです。
          sprintfの代わりに常にsnprintfを使うべきです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    char buf[20];
    const char *name = "Alice";
    int age = 30;

    // snprintf: バッファサイズを指定（安全）
    int written = snprintf(buf, sizeof(buf), "%s(%d)", name, age);
    printf("結果: \"%s\"\\n", buf);
    printf("書き込み文字数: %d\\n", written);

    // バッファが小さい場合は切り捨て
    char small[8];
    snprintf(small, sizeof(small), "Hello, %s!", name);
    printf("切り捨て: \"%s\"\\n", small);

    return 0;
}`}
          expectedOutput={`結果: "Alice(30)"
書き込み文字数: 8
切り捨て: "Hello, "`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="compare-copy" />
      </div>
      <LessonNav lessons={lessons} currentId="compare-copy" basePath="/learn/strings" />
    </div>
  );
}
