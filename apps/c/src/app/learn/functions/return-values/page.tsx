import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ReturnValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">戻り値</h1>
        <p className="text-gray-400">関数から値を返す方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">戻り値の仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">return 式;</code> で呼び出し元に値を返します。
          関数定義の先頭に<strong className="text-teal-400">戻り値の型</strong>を指定します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>returnに達した時点で関数の実行が終了する</li>
          <li>void関数では <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">return;</code> または省略</li>
          <li>戻り値の型と実際に返す値の型は一致させる</li>
          <li>複数の値を返したい場合はポインタや構造体を使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">様々な戻り値の型</h2>
        <p className="text-gray-400 mb-4">
          int・double・char など様々な型を返す関数の例です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int square(int n) {
    return n * n;
}

double circle_area(double r) {
    return 3.14159265 * r * r;
}

// 条件によって異なる値を返す
int sign(int n) {
    if (n > 0) return 1;
    if (n < 0) return -1;
    return 0;  // n == 0
}

// 早期リターン
int is_prime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0;  // 割り切れたら素数でない
    }
    return 1;
}

int main() {
    printf("square(7) = %d\\n", square(7));
    printf("circle_area(5.0) = %.2f\\n", circle_area(5.0));

    printf("sign(-3) = %d\\n", sign(-3));
    printf("sign(0)  = %d\\n", sign(0));
    printf("sign(5)  = %d\\n", sign(5));

    printf("\\n素数チェック: ");
    for (int i = 2; i <= 20; i++) {
        if (is_prime(i)) printf("%d ", i);
    }
    printf("\\n");

    return 0;
}`}
          expectedOutput={`square(7) = 49
circle_area(5.0) = 78.54

sign(-3) = -1
sign(0)  = 0
sign(5)  = 1

素数チェック: 2 3 5 7 11 13 17 19`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">戻り値を使った処理の連鎖</h2>
        <p className="text-gray-400 mb-4">
          関数の戻り値を別の関数の引数として渡せます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int max(int a, int b) { return (a > b) ? a : b; }
int min(int a, int b) { return (a < b) ? a : b; }

int clamp(int value, int lo, int hi) {
    return max(lo, min(value, hi));
}

int main() {
    // 関数の連鎖
    int result = multiply(add(2, 3), add(4, 1));
    printf("(2+3) * (4+1) = %d\\n", result);

    // clampの使用
    printf("clamp(15, 0, 10) = %d\\n", clamp(15, 0, 10));
    printf("clamp(-5, 0, 10) = %d\\n", clamp(-5, 0, 10));
    printf("clamp(7,  0, 10) = %d\\n", clamp(7,  0, 10));

    return 0;
}`}
          expectedOutput={`(2+3) * (4+1) = 25
clamp(15, 0, 10) = 10
clamp(-5, 0, 10) = 0
clamp(7,  0, 10) = 7`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="return-values" />
      </div>
      <LessonNav lessons={lessons} currentId="return-values" basePath="/learn/functions" />
    </div>
  );
}
