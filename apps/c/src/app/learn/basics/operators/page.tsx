import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function OperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">演算子</h1>
        <p className="text-gray-400">算術・比較・論理・代入演算子を使いこなしましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">演算子の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語には多くの演算子があります。優先順位を理解して正しく使いましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>算術演算子：<code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">+ - * / %</code></li>
          <li>比較演算子：<code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">== != &lt; &gt; &lt;= &gt;=</code></li>
          <li>論理演算子：<code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">&amp;&amp; || !</code></li>
          <li>代入演算子：<code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">= += -= *= /= %=</code></li>
          <li>インクリメント：<code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">++ --</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">算術演算子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">%</code> は剰余（余り）を求める演算子です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int a = 17, b = 5;

    printf("a = %d, b = %d\\n", a, b);
    printf("a + b = %d\\n", a + b);
    printf("a - b = %d\\n", a - b);
    printf("a * b = %d\\n", a * b);
    printf("a / b = %d\\n", a / b);  // 整数除算
    printf("a %% b = %d\\n", a % b); // 剰余

    // インクリメント・デクリメント
    int x = 10;
    printf("\\nx = %d\\n", x);
    x++;
    printf("x++ -> %d\\n", x);
    x--;
    printf("x-- -> %d\\n", x);

    return 0;
}`}
          expectedOutput={`a = 17, b = 5
a + b = 22
a - b = 12
a * b = 85
a / b = 3
a % b = 2

x = 10
x++ -> 11
x-- -> 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子と論理演算子</h2>
        <p className="text-gray-400 mb-4">
          C言語では真は1（非ゼロ）、偽は0として扱われます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    int a = 10, b = 20;

    printf("a=%d, b=%d\\n", a, b);
    printf("a == b: %d\\n", a == b);
    printf("a != b: %d\\n", a != b);
    printf("a < b:  %d\\n", a < b);
    printf("a > b:  %d\\n", a > b);

    // 論理演算子
    int x = 15;
    printf("\\nx = %d\\n", x);
    printf("x>10 && x<20: %d\\n", x > 10 && x < 20);
    printf("x<5  || x>10: %d\\n", x < 5  || x > 10);
    printf("!(x == 15):   %d\\n", !(x == 15));

    return 0;
}`}
          expectedOutput={`a=10, b=20
a == b: 0
a != b: 1
a < b:  1
a > b:  0

x = 15
x>10 && x<20: 1
x<5  || x>10: 1
!(x == 15):   0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="operators" />
      </div>
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/basics" />
    </div>
  );
}
