import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function TestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">エコシステム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テスト</h1>
        <p className="text-gray-400">Unity・CUnit・CMockaを使ったCのテストスイートの書き方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Cのテストフレームワーク</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語のテストフレームワークは純Cで書かれており、組込みシステムでも動作します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
          <li><strong className="text-white">Unity</strong>: ThrowTheSwitch製。軽量・シンプル。組込み向け。最も広く使われる</li>
          <li><strong className="text-white">CUnit</strong>: JUnitスタイル。スイート/テストケースの階層構造</li>
          <li><strong className="text-white">CMocka</strong>: モック機能付き。メモリリーク検出内蔵</li>
          <li><strong className="text-white">Check</strong>: フォーク型テスト。セグフォルトをキャッチ可能</li>
          <li><strong className="text-white">Criterion</strong>: モダンなC/C++テストフレームワーク</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Unityスタイルのテスト</h2>
        <p className="text-gray-400 mb-4">
          Unityの主要マクロを模倣したシンプルなテストパターンです。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">TEST_ASSERT_EQUAL_INT</code> などのマクロで値を検証します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

/* Unity風テストランナー */
static int g_tests = 0, g_pass = 0, g_fail = 0;
static const char *g_test_name = "";

#define TEST_BEGIN(name) do { g_test_name = (name); g_tests++; } while(0)
#define ASSERT_EQ_INT(exp, act) do { \
    if ((exp) == (act)) { g_pass++; printf("  PASS: %s\\n", g_test_name); } \
    else { g_fail++; printf("  FAIL: %s (expected %d, got %d)\\n", \
           g_test_name, (int)(exp), (int)(act)); } \
} while(0)
#define ASSERT_EQ_STR(exp, act) do { \
    if (strcmp((exp),(act))==0) { g_pass++; printf("  PASS: %s\\n",g_test_name);} \
    else { g_fail++; printf("  FAIL: %s (expected '%s', got '%s')\\n", \
           g_test_name, (exp), (act)); } \
} while(0)

/* テスト対象の関数 */
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

char *reverse(char *s) {
    int i = 0, j = (int)strlen(s) - 1;
    while (i < j) {
        char tmp = s[i]; s[i] = s[j]; s[j] = tmp;
        i++; j--;
    }
    return s;
}

/* テストケース */
void test_factorial(void) {
    TEST_BEGIN("factorial(0)"); ASSERT_EQ_INT(1, factorial(0));
    TEST_BEGIN("factorial(1)"); ASSERT_EQ_INT(1, factorial(1));
    TEST_BEGIN("factorial(5)"); ASSERT_EQ_INT(120, factorial(5));
    TEST_BEGIN("factorial(6)"); ASSERT_EQ_INT(720, factorial(6));
}

void test_reverse(void) {
    char s1[] = "hello";
    TEST_BEGIN("reverse hello"); ASSERT_EQ_STR("olleh", reverse(s1));
    char s2[] = "abcd";
    TEST_BEGIN("reverse abcd"); ASSERT_EQ_STR("dcba", reverse(s2));
}

int main(void) {
    printf("=== テスト実行 ===\\n");
    test_factorial();
    test_reverse();
    printf("結果: %d/%d passed\\n", g_pass, g_tests);
    return g_fail == 0 ? 0 : 1;
}`}
          expectedOutput={`=== テスト実行 ===
  PASS: factorial(0)
  PASS: factorial(1)
  PASS: factorial(5)
  PASS: factorial(6)
  PASS: reverse hello
  PASS: reverse abcd
結果: 6/6 passed`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テスト駆動開発（TDD）のサイクル</h2>
        <p className="text-gray-400 mb-4">
          TDDは「Red-Green-Refactor」サイクルで開発します。
          まずテストを書き（失敗）、実装して通し（成功）、リファクタリングします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* TDDの例: 動的配列の実装 */

typedef struct {
    int *data;
    int size;
    int capacity;
} DynArray;

DynArray *dynarray_create(void) {
    DynArray *a = malloc(sizeof(DynArray));
    a->data = malloc(sizeof(int) * 4);
    a->size = 0;
    a->capacity = 4;
    return a;
}

void dynarray_push(DynArray *a, int val) {
    if (a->size >= a->capacity) {
        a->capacity *= 2;
        a->data = realloc(a->data, sizeof(int) * a->capacity);
    }
    a->data[a->size++] = val;
}

int dynarray_get(const DynArray *a, int i) { return a->data[i]; }
int dynarray_size(const DynArray *a) { return a->size; }
void dynarray_destroy(DynArray *a) { free(a->data); free(a); }

/* テスト */
static int pass = 0, fail = 0;
#define ASSERT(cond, msg) do { \
    if (cond) { pass++; printf("  PASS: %s\\n", msg); } \
    else { fail++; printf("  FAIL: %s\\n", msg); } \
} while(0)

int main(void) {
    DynArray *a = dynarray_create();

    ASSERT(dynarray_size(a) == 0, "初期サイズ=0");

    dynarray_push(a, 10);
    dynarray_push(a, 20);
    dynarray_push(a, 30);

    ASSERT(dynarray_size(a) == 3, "push後サイズ=3");
    ASSERT(dynarray_get(a, 0) == 10, "a[0]=10");
    ASSERT(dynarray_get(a, 2) == 30, "a[2]=30");

    /* 自動拡張のテスト */
    for (int i = 0; i < 10; i++) dynarray_push(a, i * 5);
    ASSERT(dynarray_size(a) == 13, "拡張後サイズ=13");

    dynarray_destroy(a);

    printf("結果: %d/%d passed\\n", pass, pass + fail);
    return fail == 0 ? 0 : 1;
}`}
          expectedOutput={`  PASS: 初期サイズ=0
  PASS: push後サイズ=3
  PASS: a[0]=10
  PASS: a[2]=30
  PASS: 拡張後サイズ=13
結果: 5/5 passed`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エッジケースのテスト</h2>
        <p className="text-gray-400 mb-4">
          境界値・エラーケース・NULLポインタなど「エッジケース」を必ずテストします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>
#include <limits.h>

/* テスト対象 */
int safe_div(int a, int b, int *result) {
    if (b == 0) return -1;
    *result = a / b;
    return 0;
}

size_t safe_strlen(const char *s) {
    if (s == NULL) return 0;
    return strlen(s);
}

static int pass = 0, fail = 0;
#define ASSERT(cond, msg) do { \
    if (cond) { pass++; printf("  PASS %s\\n", msg); } \
    else      { fail++; printf("  FAIL %s\\n", msg); } \
} while(0)

int main(void) {
    int r;

    /* 正常ケース */
    ASSERT(safe_div(10, 2, &r) == 0 && r == 5, "10/2=5");
    ASSERT(safe_div(0, 5, &r) == 0 && r == 0, "0/5=0");

    /* エッジケース: ゼロ除算 */
    ASSERT(safe_div(5, 0, &r) == -1, "5/0=エラー");

    /* エッジケース: 負数 */
    ASSERT(safe_div(-10, 2, &r) == 0 && r == -5, "-10/2=-5");

    /* NULL安全 */
    ASSERT(safe_strlen(NULL) == 0, "strlen(NULL)=0");
    ASSERT(safe_strlen("") == 0, "strlen(\"\")=0");
    ASSERT(safe_strlen("hello") == 5, "strlen(hello)=5");

    printf("結果: %d/%d passed\\n", pass, pass + fail);
    return fail == 0 ? 0 : 1;
}`}
          expectedOutput={`  PASS 10/2=5
  PASS 0/5=0
  PASS 5/0=エラー
  PASS -10/2=-5
  PASS strlen(NULL)=0
  PASS strlen("")=0
  PASS strlen(hello)=5
結果: 7/7 passed`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="testing" />
      </div>
      <LessonNav lessons={lessons} currentId="testing" basePath="/learn/ecosystem" />
    </div>
  );
}
