import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdio");

export default function PrintfFormatPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準入出力 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">printf書式</h1>
        <p className="text-gray-400">%d・%f・%s・%c・%x・%p・幅と精度指定を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">printf 書式指定子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">printf</code> の書式文字列には変換指定子（%で始まる）を埋め込みます。
          形式: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%[フラグ][幅][.精度]変換文字</code>
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%d</code>: 符号付き整数, <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%u</code>: 符号なし整数</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%f</code>: 浮動小数点, <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%e</code>: 指数表記, <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%g</code>: 短い方</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%s</code>: 文字列, <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%c</code>: 文字, <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%p</code>: ポインタ</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%x</code>: 16進数（小文字）, <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">%X</code>: 16進数（大文字）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な書式指定子</h2>
        <p className="text-gray-400 mb-4">
          各型に対応する書式指定子です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int n = 42;
    double d = 3.14159;
    char c = 'A';
    char *s = "Hello";
    void *p = &n;

    printf("整数:     %d\\n", n);
    printf("符号なし: %u\\n", (unsigned)n);
    printf("16進数:   %x\\n", n);
    printf("8進数:    %o\\n", n);
    printf("浮動小数: %f\\n", d);
    printf("指数表記: %e\\n", d);
    printf("文字:     %c\\n", c);
    printf("文字列:   %s\\n", s);
    printf("ポインタ: %p\\n", p);

    return 0;
}`}
          expectedOutput={`整数:     42
符号なし: 42
16進数:   2a
8進数:    52
浮動小数: 3.141590
指数表記: 3.141590e+00
文字:     A
文字列:   Hello
ポインタ: 0x...`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">幅・精度・フラグ</h2>
        <p className="text-gray-400 mb-4">
          幅と精度で出力フォーマットを細かく制御できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 幅指定
    printf("[%10d]\\n", 42);       // 右寄せ幅10
    printf("[%-10d]\\n", 42);      // 左寄せ幅10
    printf("[%010d]\\n", 42);      // ゼロ埋め幅10

    // 精度指定
    printf("[%.5f]\\n", 3.14);     // 小数5桁
    printf("[%10.3f]\\n", 3.14);   // 幅10精度3

    // 文字列の幅・精度
    printf("[%10s]\\n", "Hi");     // 幅10右寄せ
    printf("[%-10s]\\n", "Hi");    // 幅10左寄せ
    printf("[%.3s]\\n", "Hello");  // 最大3文字

    // +フラグ（符号を常に表示）
    printf("[%+d] [%+d]\\n", 42, -42);

    return 0;
}`}
          expectedOutput={`[        42]
[42        ]
[0000000042]
[3.14000]
[     3.140]
[        Hi]
[Hi        ]
[Hel]
[+42] [-42]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdio" lessonId="printf-format" />
      </div>
      <LessonNav lessons={lessons} currentId="printf-format" basePath="/learn/stdio" />
    </div>
  );
}
