import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("multifile");

export default function SourceSplitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">マルチファイル レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソース分割</h1>
        <p className="text-gray-400">コードを複数の.cファイルに分割する方法と単一定義規則を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜソースを分割するか</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          大きなプログラムを1ファイルに書くと管理が難しくなります。
          機能ごとにファイルを分割することで、コードの再利用性・保守性・ビルド時間が改善します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>変更があったファイルだけ再コンパイルできる</li>
          <li>チームでの並行開発が可能になる</li>
          <li>関連する機能をまとめてモジュール化できる</li>
          <li>単一定義規則（ODR）: 定義は1ファイルのみ、宣言は複数可</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイル分割の典型的な構造</h2>
        <p className="text-gray-400 mb-4">
          機能単位でファイルを分けます。ヘッダ(.h)には宣言、ソース(.c)には実装を書きます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <math.h>

/* ---- vector.h ----
 * typedef struct { double x, y; } Vec2;
 * Vec2 vec2_add(Vec2 a, Vec2 b);
 * Vec2 vec2_scale(Vec2 v, double s);
 * double vec2_length(Vec2 v);
 * ------------------- */

/* ---- vector.c ---- */
typedef struct { double x, y; } Vec2;

Vec2 vec2_add(Vec2 a, Vec2 b) {
    return (Vec2){ a.x + b.x, a.y + b.y };
}

Vec2 vec2_scale(Vec2 v, double s) {
    return (Vec2){ v.x * s, v.y * s };
}

double vec2_length(Vec2 v) {
    return sqrt(v.x * v.x + v.y * v.y);
}

/* ---- main.c ---- */
int main(void) {
    Vec2 a = {3.0, 4.0};
    Vec2 b = {1.0, 2.0};

    Vec2 sum = vec2_add(a, b);
    printf("a + b = (%.1f, %.1f)\\n", sum.x, sum.y);

    Vec2 scaled = vec2_scale(a, 2.0);
    printf("a * 2 = (%.1f, %.1f)\\n", scaled.x, scaled.y);

    printf("|a| = %.1f\\n", vec2_length(a));

    return 0;
}`}
          expectedOutput={`a + b = (4.0, 6.0)
a * 2 = (6.0, 8.0)
|a| = 5.0`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">単一定義規則（ODR）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          同じ変数や関数の「定義」はプログラム全体で1つだけです。
          ヘッダファイルを複数の.cファイルからincludeする場合、
          ヘッダには「宣言」のみを書きます。
        </p>
        <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg text-sm font-mono overflow-x-auto">{`/* BAD: ヘッダに定義を書くと多重定義エラー */
/* header.h */
int global_count = 0;  /* 定義 - NG */

/* GOOD: ヘッダには宣言のみ */
/* header.h */
extern int global_count;  /* 宣言 - OK */

/* source.c */
int global_count = 0;  /* 定義 - OK（1箇所のみ） */`}</pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">staticでファイルスコープに限定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">static</code> を関数・変数に付けると、そのファイル内からのみアクセス可能になります。
          外部から隠蔽したい実装の詳細に使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* static関数: このファイル内のみ */
static int helper_add(int a, int b) {
    return a + b;
}

static int helper_multiply(int a, int b) {
    return a * b;
}

/* 公開関数: ヘッダに宣言する */
int compute(int x, int y) {
    int sum = helper_add(x, y);
    int product = helper_multiply(x, y);
    return sum + product;
}

/* static変数: このファイル内のみ */
static int call_count = 0;

int get_call_count(void) {
    return call_count;
}

int main(void) {
    call_count++;
    printf("compute(3,4) = %d\\n", compute(3, 4));
    call_count++;
    printf("compute(5,6) = %d\\n", compute(5, 6));
    printf("呼び出し: %d回\\n", get_call_count());
    return 0;
}`}
          expectedOutput={`compute(3,4) = 19
compute(5,6) = 41
呼び出し: 2回`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="multifile" lessonId="source-split" />
      </div>
      <LessonNav lessons={lessons} currentId="source-split" basePath="/learn/multifile" />
    </div>
  );
}
