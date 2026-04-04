import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function MathHPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">math.h</h1>
        <p className="text-gray-400">sqrt・pow・sin・cos など数学計算に必要な関数を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">math.h の使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;math.h&gt;</code> は数学的な計算関数を提供します。
          コンパイル時に <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-lm</code> フラグでリンクが必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sqrt(x)</code> - 平方根</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">pow(x, y)</code> - x の y 乗</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">ceil(x) / floor(x)</code> - 切り上げ・切り捨て</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fabs(x)</code> - 浮動小数点の絶対値</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sin(x) / cos(x) / log(x)</code> - 三角関数・対数</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">べき乗・平方根・絶対値</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sqrt()</code> と <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">pow()</code> は
          double 型を受け取り double を返します。整数を渡すと暗黙的に変換されます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <math.h>

int main() {
    printf("sqrt(9)   = %.1f\\n", sqrt(9.0));
    printf("sqrt(2)   = %.4f\\n", sqrt(2.0));
    printf("pow(2,10) = %.0f\\n", pow(2.0, 10.0));
    printf("pow(3,3)  = %.0f\\n", pow(3.0, 3.0));
    printf("fabs(-3.5)= %.1f\\n", fabs(-3.5));

    return 0;
}`}
          expectedOutput={`sqrt(9)   = 3.0
sqrt(2)   = 1.4142
pow(2,10) = 1024
pow(3,3)  = 27
fabs(-3.5)= 3.5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">切り上げ・切り捨て・丸め</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">ceil()</code> は切り上げ、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">floor()</code> は切り捨て、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">round()</code> は四捨五入です（C99以降）。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <math.h>

int main() {
    double x = 3.7, y = -2.3;

    printf("ceil(3.7)  = %.1f\\n", ceil(x));
    printf("floor(3.7) = %.1f\\n", floor(x));
    printf("ceil(-2.3) = %.1f\\n", ceil(y));
    printf("floor(-2.3)= %.1f\\n", floor(y));

    return 0;
}`}
          expectedOutput={`ceil(3.7)  = 4.0
floor(3.7) = 3.0
ceil(-2.3) = -2.0
floor(-2.3)= -3.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">三角関数・対数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">sin() / cos()</code> の引数はラジアンです。
          度をラジアンに変換するには <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">degrees * M_PI / 180.0</code> を使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <math.h>

#define PI 3.14159265358979

int main() {
    /* sin/cos はラジアン単位 */
    printf("sin(0)    = %.1f\\n", sin(0.0));
    printf("cos(0)    = %.1f\\n", cos(0.0));
    printf("sin(90deg)= %.1f\\n", sin(90.0 * PI / 180.0));

    /* 自然対数 */
    printf("log(1)    = %.1f\\n", log(1.0));
    printf("log(e)    = %.1f\\n", log(exp(1.0)));

    return 0;
}`}
          expectedOutput={`sin(0)    = 0.0
cos(0)    = 1.0
sin(90deg)= 1.0
log(1)    = 0.0
log(e)    = 1.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdlib" lessonId="math-h" />
      </div>
      <LessonNav lessons={lessons} currentId="math-h" basePath="/learn/stdlib" />
    </div>
  );
}
