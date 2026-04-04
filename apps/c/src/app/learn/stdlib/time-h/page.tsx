import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function TimeHPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">time.h</h1>
        <p className="text-gray-400">time()・clock()・strftime() など時間処理の関数を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">time.h の主要な型と関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;time.h&gt;</code> は時刻取得・変換・書式化の機能を提供します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">time_t</code> - Unix エポックからの秒数を表す型</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">struct tm</code> - 年・月・日・時・分・秒を保持する構造体</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">time()</code> - 現在時刻を time_t で取得</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">localtime()</code> - time_t を struct tm に変換</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">strftime()</code> - 時刻を書式付き文字列に変換</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">clock()</code> - CPU 処理時間の計測</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">time() と localtime()</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">time(NULL)</code> で現在時刻を取得し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">localtime()</code> で struct tm に変換して年・月・日を取り出せます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <time.h>

int main() {
    time_t now = time(NULL);
    printf("Epoch seconds: %ld\\n", (long)now);

    struct tm *t = localtime(&now);
    printf("Year:  %d\\n", t->tm_year + 1900);
    printf("Month: %d\\n", t->tm_mon + 1);
    printf("Day:   %d\\n", t->tm_mday);

    return 0;
}`}
          expectedOutput={`Epoch seconds: 1743634800
Year:  2025
Month: 4
Day:   3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">strftime() で時刻を書式化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">strftime()</code> は printf に似た書式で時刻を文字列にフォーマットします。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">%Y</code>・<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">%m</code>・<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">%d</code> などが使えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <time.h>

int main() {
    time_t now = time(NULL);
    struct tm *t = localtime(&now);

    char buf[80];
    strftime(buf, sizeof(buf), "%Y-%m-%d", t);
    printf("Date: %s\\n", buf);

    strftime(buf, sizeof(buf), "%H:%M:%S", t);
    printf("Time: %s\\n", buf);

    return 0;
}`}
          expectedOutput={`Date: 2025-04-03
Time: 12:00:00`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">clock() で処理時間を計測</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">clock()</code> は CPU が消費したクロック数を返します。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">CLOCKS_PER_SEC</code> で割ると秒数になります。
          処理のパフォーマンス計測に役立ちます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <time.h>

int main() {
    clock_t start = clock();

    /* 何らかの処理（ループで疑似的に） */
    long sum = 0;
    for (long i = 0; i < 1000000; i++) sum += i;

    clock_t end = clock();
    double elapsed = (double)(end - start) / CLOCKS_PER_SEC;

    printf("Sum: %ld\\n", sum);
    printf("Time: %.6f sec\\n", elapsed);

    return 0;
}`}
          expectedOutput={`Sum: 499999500000
Time: 0.002000 sec`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdlib" lessonId="time-h" />
      </div>
      <LessonNav lessons={lessons} currentId="time-h" basePath="/learn/stdlib" />
    </div>
  );
}
