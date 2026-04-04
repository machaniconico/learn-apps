import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

export default function PredefinedMacrosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プリプロセッサ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">定義済みマクロ</h1>
        <p className="text-gray-400">__FILE__・__LINE__・__DATE__・__func__ を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">標準定義済みマクロ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語には標準で定義されている便利なマクロがあります。デバッグ出力・ログ・アサーションなどに広く使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">__FILE__</code>: 現在のソースファイル名（文字列）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">__LINE__</code>: 現在の行番号（整数）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">__DATE__</code>: コンパイル日（"Mmm dd yyyy"）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">__TIME__</code>: コンパイル時刻（"hh:mm:ss"）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">__func__</code>: 現在の関数名（C99）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">__STDC_VERSION__</code>: C標準のバージョン番号</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な定義済みマクロ</h2>
        <p className="text-gray-400 mb-4">
          デバッグ時に現在位置とコンパイル情報を出力できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void greet(void) {
    printf("[%s:%d] %s() called\\n", __FILE__, __LINE__, __func__);
    printf("こんにちは\\n");
}

int main() {
    printf("ファイル: %s\\n", __FILE__);
    printf("行番号: %d\\n", __LINE__);
    printf("日付: %s\\n", __DATE__);
    printf("時刻: %s\\n", __TIME__);
    printf("関数: %s\\n", __func__);

    greet();

    return 0;
}`}
          expectedOutput={`ファイル: main.c
行番号: 10
日付: Apr  3 2026
時刻: 12:00:00
関数: main
[main.c:4] greet() called
こんにちは`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デバッグログマクロの実装</h2>
        <p className="text-gray-400 mb-4">
          定義済みマクロを使って便利なデバッグログマクロを作れます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define LOG_INFO(fmt, ...)  printf("[INFO]  %s:%d " fmt "\\n", __func__, __LINE__, ##__VA_ARGS__)
#define LOG_WARN(fmt, ...)  printf("[WARN]  %s:%d " fmt "\\n", __func__, __LINE__, ##__VA_ARGS__)
#define LOG_ERROR(fmt, ...) printf("[ERROR] %s:%d " fmt "\\n", __func__, __LINE__, ##__VA_ARGS__)

int divide(int a, int b) {
    LOG_INFO("divide(%d, %d)", a, b);
    if (b == 0) {
        LOG_ERROR("ゼロ除算!");
        return 0;
    }
    int result = a / b;
    LOG_INFO("結果: %d", result);
    return result;
}

int main() {
    divide(10, 2);
    divide(5, 0);
    LOG_WARN("これは警告です");
    return 0;
}`}
          expectedOutput={`[INFO]  divide:6 divide(10, 2)
[INFO]  divide:10 結果: 5
[INFO]  divide:6 divide(5, 0)
[ERROR] divide:8 ゼロ除算!
[WARN]  main:16 これは警告です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="preprocessor" lessonId="predefined-macros" />
      </div>
      <LessonNav lessons={lessons} currentId="predefined-macros" basePath="/learn/preprocessor" />
    </div>
  );
}
