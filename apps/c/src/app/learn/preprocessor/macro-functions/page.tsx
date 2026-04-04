import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

export default function MacroFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プリプロセッサ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数形式マクロ</h1>
        <p className="text-gray-400">#define MAX(a,b) とマクロの落とし穴を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数形式マクロ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          引数を取るマクロを定義できます。関数と似ていますが、型チェックなしのテキスト置換です。
          引数と全体を括弧で囲むことが重要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>引数を必ず <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">( )</code> で囲む</li>
          <li>マクロ全体も <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">( )</code> で囲む</li>
          <li>副作用のある式（i++等）を引数に渡さない</li>
          <li>複数文のマクロは <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">do {"{ }"} while(0)</code> で囲む</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全な関数形式マクロ</h2>
        <p className="text-gray-400 mb-4">
          引数と本体を括弧で囲んだ安全な書き方です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define MAX(a, b)   ((a) > (b) ? (a) : (b))
#define MIN(a, b)   ((a) < (b) ? (a) : (b))
#define ABS(x)      ((x) >= 0 ? (x) : -(x))
#define CLAMP(x,lo,hi) ((x) < (lo) ? (lo) : (x) > (hi) ? (hi) : (x))

int main() {
    printf("MAX(3, 7) = %d\\n", MAX(3, 7));
    printf("MIN(3, 7) = %d\\n", MIN(3, 7));
    printf("ABS(-5) = %d\\n", ABS(-5));
    printf("CLAMP(15, 0, 10) = %d\\n", CLAMP(15, 0, 10));
    printf("CLAMP(-3, 0, 10) = %d\\n", CLAMP(-3, 0, 10));
    printf("CLAMP(5, 0, 10) = %d\\n", CLAMP(5, 0, 10));

    return 0;
}`}
          expectedOutput={`MAX(3, 7) = 7
MIN(3, 7) = 3
ABS(-5) = 5
CLAMP(15, 0, 10) = 10
CLAMP(-3, 0, 10) = 0
CLAMP(5, 0, 10) = 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">do-while(0) パターン</h2>
        <p className="text-gray-400 mb-4">
          複数文を含むマクロには <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">do {"{ }"} while(0)</code> を使うと安全です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// 複数文マクロの安全な書き方
#define SWAP(a, b, type) do { \\
    type _tmp = (a);        \\
    (a) = (b);              \\
    (b) = _tmp;             \\
} while(0)

#define CHECK_NULL(p) do { \\
    if ((p) == NULL) {     \\
        printf("NULLエラー: %s:%d\\n", __FILE__, __LINE__); \\
        return -1;         \\
    }                      \\
} while(0)

int main() {
    int x = 10, y = 20;
    printf("swap前: x=%d, y=%d\\n", x, y);
    SWAP(x, y, int);
    printf("swap後: x=%d, y=%d\\n", x, y);

    double a = 1.5, b = 2.5;
    SWAP(a, b, double);
    printf("double swap: a=%.1f, b=%.1f\\n", a, b);

    return 0;
}`}
          expectedOutput={`swap前: x=10, y=20
swap後: x=20, y=10
double swap: a=2.5, b=1.5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="preprocessor" lessonId="macro-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="macro-functions" basePath="/learn/preprocessor" />
    </div>
  );
}
