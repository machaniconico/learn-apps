import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function CompileProcessPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ビルド レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンパイルプロセス</h1>
        <p className="text-gray-400">前処理・コンパイル・アセンブル・リンクの4段階を理解しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">4つのステージ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Cソースコードが実行ファイルになるまでには4つのステージがあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
          <li><strong className="text-white">前処理（Preprocessing）</strong>: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#include</code>展開、マクロ置換、<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">.i</code>ファイル生成</li>
          <li><strong className="text-white">コンパイル（Compilation）</strong>: C→アセンブリ言語、<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">.s</code>ファイル生成</li>
          <li><strong className="text-white">アセンブル（Assembly）</strong>: アセンブリ→機械語、<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">.o</code>オブジェクトファイル生成</li>
          <li><strong className="text-white">リンク（Linking）</strong>: .oファイルをつなぎ実行ファイル生成</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各ステージのgccコマンド</h2>
        <p className="text-gray-400 mb-4">
          gccは通常すべてのステージを一度に実行しますが、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-E</code>、<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-S</code>、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-c</code> フラグで途中で止めることができます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* このファイルのコンパイル手順:
 * 1. 前処理のみ:  gcc -E hello.c -o hello.i
 * 2. コンパイルのみ: gcc -S hello.c -o hello.s
 * 3. アセンブルのみ: gcc -c hello.c -o hello.o
 * 4. 全ステージ:  gcc hello.c -o hello
 */

#define GREETING "コンパイルプロセス学習中"

int main(void) {
    /* 前処理後: printf("コンパイルプロセス学習中\\n"); */
    printf(GREETING "\\n");
    printf("ステップ: 前処理→コンパイル→アセンブル→リンク\\n");
    return 0;
}`}
          expectedOutput={`コンパイルプロセス学習中
ステップ: 前処理→コンパイル→アセンブル→リンク`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">前処理の動作確認</h2>
        <p className="text-gray-400 mb-4">
          前処理では <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#define</code> マクロが置換され、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#include</code> の内容が展開されます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define PI 3.14159
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void) {
    double r = 5.0;

    /* 前処理後: double area = 3.14159 * ((5.0) * (5.0)); */
    double area = PI * SQUARE(r);

    /* 前処理後: int m = ((3) > (7) ? (3) : (7)); */
    int m = MAX(3, 7);

    printf("半径%.1fの面積: %.3f\\n", r, area);
    printf("MAX(3,7) = %d\\n", m);
    return 0;
}`}
          expectedOutput={`半径5.0の面積: 78.540
MAX(3,7) = 7`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">オブジェクトファイルとリンク</h2>
        <p className="text-gray-400 mb-4">
          複数の .c ファイルをそれぞれ .o にコンパイルし、最後にリンクします。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">gcc a.o b.o -o program</code> でリンクします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* 通常は別々のファイルに書く:
 * math_utils.c: int add(int, int); int multiply(int, int);
 * main.c: #include "math_utils.h" + main()
 * コンパイル:
 *   gcc -c math_utils.c -o math_utils.o
 *   gcc -c main.c -o main.o
 *   gcc main.o math_utils.o -o program
 */

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int main(void) {
    printf("リンク後のプログラム\\n");
    printf("add(2,3) = %d\\n", add(2, 3));
    printf("multiply(4,5) = %d\\n", multiply(4, 5));
    return 0;
}`}
          expectedOutput={`リンク後のプログラム
add(2,3) = 5
multiply(4,5) = 20`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="compile-process" />
      </div>
      <LessonNav lessons={lessons} currentId="compile-process" basePath="/learn/build" />
    </div>
  );
}
