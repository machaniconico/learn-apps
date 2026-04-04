import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function StdlibHPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">stdlib.h</h1>
        <p className="text-gray-400">数値変換・乱数・プロセス終了などの標準ユーティリティ関数を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">stdlib.h とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;stdlib.h&gt;</code> は C 標準ライブラリの中核ヘッダの一つで、
          文字列から数値への変換・乱数生成・メモリ管理・プロセス制御など幅広い機能を提供します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">atoi() / atof()</code> - 文字列を整数・浮動小数点に変換</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">rand() / srand()</code> - 乱数生成とシード設定</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">exit()</code> - プログラムを終了</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">abs()</code> - 整数の絶対値</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">system()</code> - シェルコマンドの実行</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列から数値への変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">atoi()</code> は文字列を int に、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">atof()</code> は文字列を double に変換します。
          変換できない場合は 0 を返します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    /* atoi: 文字列 → int */
    int age = atoi("25");
    int score = atoi("100");
    printf("age = %d\\n", age);
    printf("score = %d\\n", score);

    /* atof: 文字列 → double */
    double pi = atof("3.14159");
    double rate = atof("0.75");
    printf("pi = %.5f\\n", pi);
    printf("rate = %.2f\\n", rate);

    /* 変換失敗の場合は 0 */
    int bad = atoi("hello");
    printf("bad = %d\\n", bad);

    return 0;
}`}
          expectedOutput={`age = 25
score = 100
pi = 3.14159
rate = 0.75
bad = 0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">乱数生成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">rand()</code> で 0〜RAND_MAX の乱数を生成できます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">srand()</code> でシードを設定し、毎回異なる乱数列を得ます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">srand(time(NULL))</code> が一般的な使い方です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    /* シードを固定して再現性のある乱数 */
    srand(42);

    printf("サイコロ1: %d\\n", rand() % 6 + 1);
    printf("サイコロ2: %d\\n", rand() % 6 + 1);
    printf("サイコロ3: %d\\n", rand() % 6 + 1);

    /* 0〜99 の乱数 */
    printf("0-99: %d\\n", rand() % 100);

    return 0;
}`}
          expectedOutput={`サイコロ1: 1
サイコロ2: 6
サイコロ3: 5
0-99: 17`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">abs() と exit()</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">abs()</code> は整数の絶対値を返します（double には <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fabs()</code> を使用）。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">exit()</code> はステータスコードを指定してプログラムを終了します。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">EXIT_SUCCESS</code> と <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">EXIT_FAILURE</code> が定義されています。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("abs(-42)  = %d\\n", abs(-42));
    printf("abs(100)  = %d\\n", abs(100));
    printf("abs(-1)   = %d\\n", abs(-1));

    int x = -7, y = 3;
    printf("diff = %d\\n", abs(x - y));

    /* exit(EXIT_SUCCESS) は return 0; と同等 */
    return 0;
}`}
          expectedOutput={`abs(-42)  = 42
abs(100)  = 100
abs(-1)   = 1
diff = 10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdlib" lessonId="stdlib-h" />
      </div>
      <LessonNav lessons={lessons} currentId="stdlib-h" basePath="/learn/stdlib" />
    </div>
  );
}
