import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function FloatingPointPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">浮動小数点数</h1>
        <p className="text-gray-400">float・double・long double の精度と使い分けを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">浮動小数点型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          小数点を含む数値を扱うための型です。精度と用途に応じて使い分けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">float</code> - 単精度（4バイト、約7桁）、リテラルは <code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">3.14f</code></li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">double</code> - 倍精度（8バイト、約15桁）、通常はこちらを使う</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">long double</code> - 拡張精度（環境依存）</li>
          <li>浮動小数点数は正確に表現できない値がある（例：0.1）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">float と double の精度の違い</h2>
        <p className="text-gray-400 mb-4">
          doubleはfloatより精度が高く、計算誤差が小さくなります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    float  f = 3.14159265358979f;
    double d = 3.14159265358979;

    printf("float:  %.20f\\n", f);
    printf("double: %.20f\\n", d);

    // 浮動小数点の誤差
    float  sum_f = 0.1f + 0.2f;
    double sum_d = 0.1 + 0.2;

    printf("\\n0.1 + 0.2 (float):  %.20f\\n", sum_f);
    printf("0.1 + 0.2 (double): %.20f\\n", sum_d);

    return 0;
}`}
          expectedOutput={`float:  3.14159274101257324219
double: 3.14159265358979311600

0.1 + 0.2 (float):  0.30000001192092895508
0.1 + 0.2 (double): 0.30000000000000004441`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">数学関数の利用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">math.h</code> をインクルードすると数学関数が使えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <math.h>

int main() {
    double x = 2.0;

    printf("sqrt(%.1f) = %.6f\\n", x, sqrt(x));
    printf("pow(%.1f, 3) = %.6f\\n", x, pow(x, 3));
    printf("fabs(-3.7) = %.6f\\n", fabs(-3.7));
    printf("ceil(3.2)  = %.6f\\n", ceil(3.2));
    printf("floor(3.8) = %.6f\\n", floor(3.8));

    // 円の面積
    double r = 5.0;
    double area = M_PI * r * r;
    printf("\\n半径%.1fの円の面積: %.4f\\n", r, area);

    return 0;
}`}
          expectedOutput={`sqrt(2.0) = 1.414214
pow(2.0, 3) = 8.000000
fabs(-3.7) = 3.700000
ceil(3.2)  = 4.000000
floor(3.8) = 3.000000

半径5.0の円の面積: 78.5398`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="floating-point" />
      </div>
      <LessonNav lessons={lessons} currentId="floating-point" basePath="/learn/basics" />
    </div>
  );
}
