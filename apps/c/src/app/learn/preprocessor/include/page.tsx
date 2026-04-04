import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

export default function IncludePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プリプロセッサ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">#include</h1>
        <p className="text-gray-400">#include &lt;stdio.h&gt; と "myheader.h" の違いを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">#include の仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#include</code> はファイルの内容をその場に展開するディレクティブです。
          ヘッダファイルの関数宣言・マクロ・型定義を取り込むために使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#include &lt;file.h&gt;</code>: システムインクルードパスから検索</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#include "file.h"</code>: カレントディレクトリ優先で検索</li>
          <li>二重インクルード防止にはインクルードガードか <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#pragma once</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">標準ライブラリのインクルード</h2>
        <p className="text-gray-400 mb-4">
          よく使う標準ヘッダファイルを確認します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>   // printf, scanf, FILE
#include <stdlib.h>  // malloc, free, exit, rand
#include <string.h>  // strcpy, strlen, memset
#include <math.h>    // sqrt, pow, sin, cos
#include <time.h>    // time, clock
#include <assert.h>  // assert

int main() {
    // stdio.h
    printf("printf from stdio.h\\n");

    // string.h
    char buf[20];
    strcpy(buf, "Hello");
    printf("strlen: %zu\\n", strlen(buf));

    // math.h
    printf("sqrt(16) = %.1f\\n", sqrt(16.0));

    // assert.h
    int x = 42;
    assert(x > 0);
    printf("assert passed\\n");

    return 0;
}`}
          expectedOutput={`printf from stdio.h
strlen: 5
sqrt(16) = 4.0
assert passed`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インクルードガード</h2>
        <p className="text-gray-400 mb-4">
          ヘッダファイルの二重インクルードを防ぐための定番パターンです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// mymath.h の内容をシミュレート
// 通常は別ファイルだが、ここではインラインで示す

// インクルードガードの仕組み
#ifndef MYMATH_H
#define MYMATH_H

#define MY_PI 3.14159f

static float mySquare(float x) { return x * x; }
static float myCircleArea(float r) { return MY_PI * mySquare(r); }

#endif // MYMATH_H

// 二度目の#include は無視される（ガードのため）
#ifndef MYMATH_H
#define MYMATH_H
// ... この内容は展開されない
#endif

int main() {
    printf("PI = %.5f\\n", MY_PI);
    printf("square(4) = %.1f\\n", mySquare(4.0f));
    printf("circle(3) = %.2f\\n", myCircleArea(3.0f));
    return 0;
}`}
          expectedOutput={`PI = 3.14159
square(4) = 16.0
circle(3) = 28.27`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="preprocessor" lessonId="include" />
      </div>
      <LessonNav lessons={lessons} currentId="include" basePath="/learn/preprocessor" />
    </div>
  );
}
