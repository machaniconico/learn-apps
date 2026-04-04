import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function InputOutputPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">入出力</h1>
        <p className="text-gray-400">printfとscanfを使った標準入出力を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">標準入出力関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語の標準入出力は <code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">stdio.h</code> で定義されています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">printf(format, ...)</code> - 書式付き出力</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">scanf(format, &var)</code> - 書式付き入力（アドレスを渡す）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">putchar(c)</code> - 1文字出力</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">getchar()</code> - 1文字入力</li>
          <li>scanfの引数には変数のアドレス <code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">&変数名</code> を渡す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">printfの書式指定子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">%</code> で始まる書式指定子で出力の形式を制御できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int    n = 42;
    double d = 3.14159;
    char   c = 'X';
    char   s[] = "Hello";

    // 基本的な書式指定子
    printf("整数:     %d\\n", n);
    printf("浮動小数: %f\\n", d);
    printf("文字:     %c\\n", c);
    printf("文字列:   %s\\n", s);

    // 幅・精度の指定
    printf("\\n右寄せ(幅10): |%10d|\\n", n);
    printf("左寄せ(幅10): |%-10d|\\n", n);
    printf("ゼロ埋め:     |%05d|\\n", n);
    printf("小数点以下2桁: %.2f\\n", d);

    return 0;
}`}
          expectedOutput={`整数:     42
浮動小数: 3.141590
文字:     X
文字列:   Hello

右寄せ(幅10): |        42|
左寄せ(幅10): |42        |
ゼロ埋め:     |00042|
小数点以下2桁: 3.14`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">scanfによる入力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">scanf</code> でユーザーからの入力を受け取ります。
          変数のアドレス <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&変数名</code> を渡すことに注意してください。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int age;
    float height;

    // 実際の実行では入力が必要ですが、ここでは値を直接設定します
    age = 25;
    height = 1.75f;

    // scanfの代わりに直接代入した値を使用
    printf("年齢: %d歳\\n", age);
    printf("身長: %.2fm\\n", height);

    // 複数値の入力例（コメント）
    // scanf("%d %f", &age, &height);

    int a = 10, b = 20;
    printf("\\n%d + %d = %d\\n", a, b, a + b);
    printf("%d * %d = %d\\n", a, b, a * b);

    return 0;
}`}
          expectedOutput={`年齢: 25歳
身長: 1.75m

10 + 20 = 30
10 * 20 = 200`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="input-output" />
      </div>
      <LessonNav lessons={lessons} currentId="input-output" basePath="/learn/basics" />
    </div>
  );
}
