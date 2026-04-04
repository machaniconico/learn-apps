import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("multifile");

export default function HeaderFilesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">マルチファイル レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ヘッダファイル</h1>
        <p className="text-gray-400">.hファイルの役割・宣言と定義の違い・ヘッダに書くべき内容を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ヘッダファイルの役割</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ヘッダファイル（.h）は複数の.cファイルで共有する「インターフェース」を定義します。
          実装（定義）は.cファイルに書き、ヘッダには宣言だけを書くのが基本です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-white">ヘッダに書くもの</strong>: 関数プロトタイプ、構造体定義、typedef、マクロ、externな変数宣言</li>
          <li><strong className="text-white">ヘッダに書かないもの</strong>: 関数の実装、グローバル変数の定義（実体）</li>
          <li><strong className="text-white">宣言</strong>: 「この名前が存在する」という情報</li>
          <li><strong className="text-white">定義</strong>: 実際のメモリやコードを確保する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">宣言と定義の違い</h2>
        <p className="text-gray-400 mb-4">
          関数プロトタイプは宣言、関数本体は定義です。
          変数も同様に <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">extern</code> 付きが宣言、なしが定義です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* ---- math_utils.h の内容 ----
 * int add(int a, int b);        // 宣言（プロトタイプ）
 * int multiply(int a, int b);   // 宣言
 * extern int call_count;        // 変数の宣言
 * -------------------------------- */

/* ---- math_utils.c の内容 ---- */
int call_count = 0;  /* 変数の定義（実体） */

int add(int a, int b) {  /* 関数の定義 */
    call_count++;
    return a + b;
}

int multiply(int a, int b) {  /* 関数の定義 */
    call_count++;
    return a * b;
}

/* ---- main.c の内容 ---- */
int main(void) {
    printf("add(3,4) = %d\\n", add(3, 4));
    printf("multiply(5,6) = %d\\n", multiply(5, 6));
    printf("呼び出し回数: %d\\n", call_count);
    return 0;
}`}
          expectedOutput={`add(3,4) = 7
multiply(5,6) = 30
呼び出し回数: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ヘッダファイルの典型的な内容</h2>
        <p className="text-gray-400 mb-4">
          良いヘッダファイルの設計例です。インクルードガードを含め、
          公開インターフェースのみを宣言します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stddef.h>

/* ---- stack.h の典型的な内容 ----
 *
 * #ifndef STACK_H
 * #define STACK_H
 *
 * #include <stddef.h>
 *
 * #define STACK_MAX 128
 *
 * typedef struct {
 *     int data[STACK_MAX];
 *     int top;
 * } Stack;
 *
 * void stack_init(Stack *s);
 * int  stack_push(Stack *s, int val);
 * int  stack_pop(Stack *s, int *val);
 * int  stack_is_empty(const Stack *s);
 *
 * #endif
 * -------------------------------- */

#define STACK_MAX 128

typedef struct { int data[STACK_MAX]; int top; } Stack;

void stack_init(Stack *s) { s->top = -1; }

int stack_push(Stack *s, int v) {
    if (s->top >= STACK_MAX - 1) return -1;
    s->data[++s->top] = v;
    return 0;
}

int stack_pop(Stack *s, int *v) {
    if (s->top < 0) return -1;
    *v = s->data[s->top--];
    return 0;
}

int main(void) {
    Stack s;
    stack_init(&s);
    stack_push(&s, 10);
    stack_push(&s, 20);
    stack_push(&s, 30);

    int v;
    while (stack_pop(&s, &v) == 0) {
        printf("pop: %d\\n", v);
    }
    return 0;
}`}
          expectedOutput={`pop: 30
pop: 20
pop: 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">typedefとstructをヘッダで共有</h2>
        <p className="text-gray-400 mb-4">
          複数のファイルで使う構造体はヘッダで定義します。
          typedefで使いやすい型名をつけます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

/* ---- person.h に書く内容 ---- */
typedef struct {
    char name[64];
    int age;
} Person;

/* 関数プロトタイプ */
void person_init(Person *p, const char *name, int age);
void person_print(const Person *p);

/* ---- person.c に書く内容 ---- */
void person_init(Person *p, const char *name, int age) {
    strncpy(p->name, name, sizeof(p->name) - 1);
    p->name[sizeof(p->name) - 1] = '\\0';
    p->age = age;
}

void person_print(const Person *p) {
    printf("名前: %s, 年齢: %d\\n", p->name, p->age);
}

/* ---- main.c ---- */
int main(void) {
    Person p1, p2;
    person_init(&p1, "田中太郎", 30);
    person_init(&p2, "鈴木花子", 25);
    person_print(&p1);
    person_print(&p2);
    return 0;
}`}
          expectedOutput={`名前: 田中太郎, 年齢: 30
名前: 鈴木花子, 年齢: 25`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="multifile" lessonId="header-files" />
      </div>
      <LessonNav lessons={lessons} currentId="header-files" basePath="/learn/multifile" />
    </div>
  );
}
