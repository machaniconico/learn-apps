import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function CStandardsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">エコシステム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">C言語標準</h1>
        <p className="text-gray-400">K&R CからC23まで、C言語標準の変遷と各バージョンの主な追加機能を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C言語の歴史</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語は1972年にデニス・リッチーによって開発されました。
          以来、定期的に標準が改定されています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-white">K&R C (1978)</strong>: カーニハン&リッチーの「プログラミング言語C」が事実上の標準</li>
          <li><strong className="text-white">C89/ANSI C (1989)</strong>: 最初の公式標準。プロトタイプ、void型など</li>
          <li><strong className="text-white">C99 (1999)</strong>: //コメント、for内宣言、VLA、stdint.h、stdbool.h</li>
          <li><strong className="text-white">C11 (2011)</strong>: _Static_assert、_Atomic、匿名struct/union、threads.h</li>
          <li><strong className="text-white">C17 (2018)</strong>: バグ修正のみ、新機能なし</li>
          <li><strong className="text-white">C23 (2024)</strong>: nullptr、typeof、[[属性]]、constexpr変数</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C89からC99への変化</h2>
        <p className="text-gray-400 mb-4">
          C99は実用的な機能を多数追加しました。
          現代のCコードはほぼC99以降の機能を前提としています。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdbool.h>  /* C99 */
#include <stdint.h>   /* C99 */
#include <complex.h>  /* C99 */

int main(void) {
    /* C99: for文内での変数宣言 */
    for (int i = 0; i < 3; i++) {
        printf("i=%d\\n", i);
    }

    /* C99: bool型 */
    bool found = false;
    int arr[] = {3, 7, 2, 9, 1};
    for (int i = 0; i < 5; i++) {
        if (arr[i] == 7) { found = true; break; }
    }
    printf("found: %s\\n", found ? "true" : "false");

    /* C99: 指示付き初期化子 */
    int vec[5] = {[0]=1, [2]=3, [4]=5};
    printf("vec: %d %d %d %d %d\\n",
           vec[0], vec[1], vec[2], vec[3], vec[4]);

    /* C99: 複合リテラル */
    int *p = (int[]){10, 20, 30};
    printf("compound: %d %d %d\\n", p[0], p[1], p[2]);

    return 0;
}`}
          expectedOutput={`i=0
i=1
i=2
found: true
vec: 1 0 3 0 5
compound: 10 20 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C11の新機能</h2>
        <p className="text-gray-400 mb-4">
          C11では_Static_assert・_Atomic・_Generic・匿名構造体などが追加されました。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdint.h>

/* C11: _Static_assert (コンパイル時チェック) */
_Static_assert(sizeof(int) >= 4, "int must be at least 4 bytes");
_Static_assert(sizeof(char) == 1, "char must be 1 byte");

/* C11: _Generic (型汎用マクロ) */
#define type_name(x) _Generic((x), \
    int:    "int",    \
    double: "double", \
    float:  "float",  \
    char:   "char",   \
    default:"unknown" \
)

/* C11: 匿名構造体 */
typedef struct {
    union {
        struct { int x, y; };    /* 匿名struct */
        int coords[2];
    };
} Point2D;

int main(void) {
    int    i = 42;
    double d = 3.14;
    float  f = 1.5f;

    printf("type of i: %s\\n", type_name(i));
    printf("type of d: %s\\n", type_name(d));
    printf("type of f: %s\\n", type_name(f));

    /* 匿名struct: x,y と coords[0],coords[1] が共有 */
    Point2D p = {.x = 10, .y = 20};
    printf("p.x=%d, p.coords[0]=%d\\n", p.x, p.coords[0]);

    return 0;
}`}
          expectedOutput={`type of i: int
type of d: double
type of f: float
p.x=10, p.coords[0]=10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C23の新機能</h2>
        <p className="text-gray-400 mb-4">
          C23は2024年発行。nullptrキーワード、typeof、[[属性構文]]、constexpr変数などが追加されました。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdint.h>

/* C23: typeof演算子 */
#define MAX(a, b) ({ \
    typeof(a) _a = (a); \
    typeof(b) _b = (b); \
    _a > _b ? _a : _b; \
})

/* C23: constexpr (定数式変数) */
/* constexpr int BUFSIZE = 256; */  /* C23 */
#define BUFSIZE 256  /* C23前はこちら */

/* C23: [[nodiscard]] 属性 */
/* [[nodiscard]] int must_check(void) { return 42; } */

int main(void) {
    /* typeof: 変数の型を自動取得 */
    int x = 10;
    typeof(x) y = 20;  /* y は int */
    printf("typeof: MAX(%d,%d)=%d\\n", x, y, MAX(x, y));

    double a = 1.5, b = 2.5;
    typeof(a) c = MAX(a, b);
    printf("typeof double: MAX=%.1f\\n", c);

    /* C23: nullptr (NULLの型安全版) */
    /* int *p = nullptr; */  /* C23 */
    int *p = NULL;   /* 従来 */
    printf("p=%s\\n", p == NULL ? "NULL" : "非NULL");

    printf("BUFSIZE=%d\\n", BUFSIZE);
    return 0;
}`}
          expectedOutput={`typeof: MAX(10,20)=20
typeof double: MAX=2.5
p=NULL
BUFSIZE=256`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="c-standards" />
      </div>
      <LessonNav lessons={lessons} currentId="c-standards" basePath="/learn/ecosystem" />
    </div>
  );
}
