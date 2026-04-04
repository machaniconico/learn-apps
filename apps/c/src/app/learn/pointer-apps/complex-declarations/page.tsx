import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointer-apps");

export default function ComplexDeclarationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタの応用 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複雑な宣言の読み方</h1>
        <p className="text-gray-400">螺旋ルール（右左ルール）でC言語の複雑な型宣言を読み解く方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">右左ルール（螺旋ルール）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複雑なC言語の宣言を読むには<strong className="text-teal-400">右左ルール</strong>を使います。
          変数名から始め、右を見て、左を見て、を繰り返します。
        </p>
        <ol className="list-decimal list-inside text-gray-400 space-y-1 text-sm">
          <li>変数名から出発</li>
          <li>右にあるものを読む（<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">[n]</code>→配列、<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">()</code>→関数）</li>
          <li>左にあるものを読む（<code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">*</code>→ポインタ、型名→その型）</li>
          <li>括弧で囲まれた部分は先に処理</li>
          <li>型名（左端）に到達したら終了</li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">典型的な宣言パターン</h2>
        <p className="text-gray-400 mb-4">
          よく登場するパターンを実際のコードで確認しましょう。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int main() {
    // int *p        → intへのポインタ
    int x = 10;
    int *p = &x;

    // int *arr[3]   → intへのポインタの配列（3要素）
    int a = 1, b = 2, c = 3;
    int *arr[3] = {&a, &b, &c};

    // int (*fp)(int,int) → int,intを取りintを返す関数へのポインタ
    int (*fp)(int, int) = add;

    printf("*p = %d\\n", *p);
    printf("*arr[1] = %d\\n", *arr[1]);
    printf("fp(3,4) = %d\\n", fp(3, 4));

    fp = mul;
    printf("fp(3,4) = %d\\n", fp(3, 4));

    return 0;
}`}
          expectedOutput={`*p = 10
*arr[1] = 2
fp(3,4) = 7
fp(3,4) = 12`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数ポインタの配列</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">int (*ops[4])(int, int)</code> は「int,intを取りintを返す関数へのポインタ」を4つ持つ配列です。
          typedefで読みやすくできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }
int div_int(int a, int b) { return b != 0 ? a / b : 0; }

// typedefで読みやすく
typedef int (*BinOp)(int, int);

int main() {
    BinOp ops[4] = {add, sub, mul, div_int};
    const char *names[] = {"+", "-", "*", "/"};

    int x = 10, y = 3;
    for (int i = 0; i < 4; i++) {
        printf("%d %s %d = %d\\n", x, names[i], y, ops[i](x, y));
    }

    return 0;
}`}
          expectedOutput={`10 + 3 = 13
10 - 3 = 7
10 * 3 = 30
10 / 3 = 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointer-apps" lessonId="complex-declarations" />
      </div>
      <LessonNav lessons={lessons} currentId="complex-declarations" basePath="/learn/pointer-apps" />
    </div>
  );
}
