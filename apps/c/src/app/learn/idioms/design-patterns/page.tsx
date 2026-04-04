import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("idioms");

export default function DesignPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">イディオム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デザインパターン</h1>
        <p className="text-gray-400">不透明ポインタ・コールバック・vtable的パターンなどCのデザインパターンを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CのOOPパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CはOOP言語ではありませんが、関数ポインタと構造体を使って
          カプセル化・多態性・継承に似た設計を実現できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-white">不透明ポインタ</strong>: カプセル化（実装隠蔽）</li>
          <li><strong className="text-white">コールバック</strong>: 高階関数・戦略パターン</li>
          <li><strong className="text-white">vtable</strong>: 関数ポインタ構造体による多態性</li>
          <li><strong className="text-white">シングルトン</strong>: staticローカル変数で実現</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">vtable的パターン（多態性）</h2>
        <p className="text-gray-400 mb-4">
          関数ポインタを持つ構造体（vtable）で多態性を実現します。
          C++の仮想関数テーブルと同じ原理です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <math.h>

/* 仮想関数テーブル（vtable） */
typedef struct {
    double (*area)(const void *self);
    double (*perimeter)(const void *self);
    const char *(*name)(void);
} ShapeVTable;

/* 円 */
typedef struct { double radius; } Circle;

static double circle_area(const void *s) {
    const Circle *c = s;
    return 3.14159 * c->radius * c->radius;
}
static double circle_perimeter(const void *s) {
    const Circle *c = s;
    return 2.0 * 3.14159 * c->radius;
}
static const char *circle_name(void) { return "Circle"; }

static const ShapeVTable circle_vtable = {
    circle_area, circle_perimeter, circle_name
};

/* 長方形 */
typedef struct { double w, h; } Rect;

static double rect_area(const void *s) {
    const Rect *r = s;
    return r->w * r->h;
}
static double rect_perimeter(const void *s) {
    const Rect *r = s;
    return 2.0 * (r->w + r->h);
}
static const char *rect_name(void) { return "Rect"; }

static const ShapeVTable rect_vtable = {
    rect_area, rect_perimeter, rect_name
};

void print_shape(const ShapeVTable *vt, const void *shape) {
    printf("%s: area=%.2f, perimeter=%.2f\\n",
           vt->name(),
           vt->area(shape),
           vt->perimeter(shape));
}

int main(void) {
    Circle c = {5.0};
    Rect r = {4.0, 6.0};

    print_shape(&circle_vtable, &c);
    print_shape(&rect_vtable, &r);

    return 0;
}`}
          expectedOutput={`Circle: area=78.54, perimeter=31.42
Rect: area=24.00, perimeter=20.00`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コールバックと関数ポインタ</h2>
        <p className="text-gray-400 mb-4">
          関数ポインタを引数として渡す「戦略パターン」です。
          処理の変更可能な部分を外から注入できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef int (*Predicate)(int);
typedef int (*Transform)(int);

void filter_and_map(const int *arr, int n,
                    Predicate pred, Transform fn,
                    int *out, int *out_n) {
    *out_n = 0;
    for (int i = 0; i < n; i++) {
        if (pred(arr[i])) {
            out[(*out_n)++] = fn(arr[i]);
        }
    }
}

int is_even(int x)   { return x % 2 == 0; }
int is_odd(int x)    { return x % 2 != 0; }
int double_it(int x) { return x * 2; }
int square(int x)    { return x * x; }

int main(void) {
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8};
    int out[8];
    int n;

    /* 偶数を2倍 */
    filter_and_map(arr, 8, is_even, double_it, out, &n);
    printf("偶数*2: ");
    for (int i = 0; i < n; i++) printf("%d ", out[i]);
    printf("\\n");

    /* 奇数を2乗 */
    filter_and_map(arr, 8, is_odd, square, out, &n);
    printf("奇数^2: ");
    for (int i = 0; i < n; i++) printf("%d ", out[i]);
    printf("\\n");

    return 0;
}`}
          expectedOutput={`偶数*2: 4 8 12 16
奇数^2: 1 9 25 49 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シングルトンパターン</h2>
        <p className="text-gray-400 mb-4">
          staticローカル変数を使ったシングルトンパターンです。
          設定やロガーなど一度だけ初期化するリソースに使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef struct {
    int log_level;
    int call_count;
} Logger;

Logger *logger_get(void) {
    static Logger instance = {1, 0};  /* 一度だけ初期化 */
    return &instance;
}

void logger_log(int level, const char *msg) {
    Logger *l = logger_get();
    l->call_count++;
    if (level >= l->log_level) {
        printf("[L%d] %s\\n", level, msg);
    }
}

int main(void) {
    /* どこからアクセスしても同じインスタンス */
    logger_log(1, "アプリ起動");
    logger_log(2, "処理開始");

    Logger *l = logger_get();
    l->log_level = 2;  /* レベルを上げる */
    logger_log(1, "このメッセージは表示されない");
    logger_log(2, "このメッセージは表示される");

    printf("合計呼び出し: %d\\n", logger_get()->call_count);
    return 0;
}`}
          expectedOutput={`[L1] アプリ起動
[L2] 処理開始
[L2] このメッセージは表示される
合計呼び出し: 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="idioms" lessonId="design-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="design-patterns" basePath="/learn/idioms" />
    </div>
  );
}
