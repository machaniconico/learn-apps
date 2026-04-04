import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

export default function ConditionalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プリプロセッサ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">条件コンパイル</h1>
        <p className="text-gray-400">#ifdef・#ifndef・#if・#endif・#else の使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">条件コンパイルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          条件コンパイルディレクティブを使うと、特定の条件を満たす場合のみコードをコンパイルできます。
          デバッグコード・プラットフォーム別コード・機能フラグ管理に使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#ifdef NAME</code>: NAMEが定義済みなら</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#ifndef NAME</code>: NAMEが未定義なら</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#if 式</code>: 式が真なら</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#elif 式</code>・<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#else</code>・<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#endif</code> で分岐</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">#ifdef によるデバッグコード</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">DEBUG</code> マクロでデバッグ出力を切り替えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define DEBUG

#ifdef DEBUG
#define DBG(fmt, ...) printf("[DBG] " fmt "\\n", ##__VA_ARGS__)
#else
#define DBG(fmt, ...)
#endif

int divide(int a, int b) {
    DBG("divide(%d, %d) called", a, b);
    if (b == 0) {
        DBG("エラー: ゼロ除算");
        return 0;
    }
    int result = a / b;
    DBG("結果: %d", result);
    return result;
}

int main() {
    int r = divide(10, 2);
    printf("10 / 2 = %d\\n", r);
    divide(5, 0);
    return 0;
}`}
          expectedOutput={`[DBG] divide(10, 2) called
[DBG] 結果: 5
10 / 2 = 5
[DBG] divide(5, 0) called
[DBG] エラー: ゼロ除算`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">#if と #elif で数値判定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#if</code> では数値比較もできます。バージョン管理やプラットフォーム分岐に便利です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define VERSION 2

#if VERSION == 1
#define FEATURE "基本機能のみ"
#elif VERSION == 2
#define FEATURE "拡張機能あり"
#elif VERSION >= 3
#define FEATURE "全機能利用可"
#else
#define FEATURE "不明なバージョン"
#endif

int main() {
    printf("バージョン: %d\\n", VERSION);
    printf("機能: %s\\n", FEATURE);

    // defined() 演算子
    #if defined(DEBUG) || defined(VERBOSE)
    printf("デバッグモード\\n");
    #else
    printf("リリースモード\\n");
    #endif

    return 0;
}`}
          expectedOutput={`バージョン: 2
機能: 拡張機能あり
リリースモード`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="preprocessor" lessonId="conditional" />
      </div>
      <LessonNav lessons={lessons} currentId="conditional" basePath="/learn/preprocessor" />
    </div>
  );
}
