import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("enums");

export default function TypeAliasesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">enum・型 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型エイリアス</h1>
        <p className="text-gray-400">関数ポインタのtypedefと可読性向上のテクニックを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数ポインタの typedef</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数ポインタの型は複雑になりがちです。typedef で別名をつけることで格段に読みやすくなります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>生の関数ポインタ型: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int (*)(int, int)</code></li>
          <li>typedef後: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">typedef int (*BinaryOp)(int, int);</code></li>
          <li>コールバック関数の型定義に必須</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数ポインタ typedef の基本</h2>
        <p className="text-gray-400 mb-4">
          計算関数を typedef で扱いやすくします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef int (*BinaryOp)(int, int);

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

void applyOp(BinaryOp op, int a, int b, const char *name) {
    printf("%s(%d, %d) = %d\\n", name, a, b, op(a, b));
}

int main() {
    applyOp(add, 10, 3, "add");
    applyOp(sub, 10, 3, "sub");
    applyOp(mul, 10, 3, "mul");

    // 配列で複数操作
    BinaryOp ops[] = {add, sub, mul};
    const char *names[] = {"add", "sub", "mul"};
    for (int i = 0; i < 3; i++) {
        printf("%s(5,2)=%d\\n", names[i], ops[i](5, 2));
    }

    return 0;
}`}
          expectedOutput={`add(10, 3) = 13
sub(10, 3) = 7
mul(10, 3) = 30
add(5,2)=7
sub(5,2)=3
mul(5,2)=10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コールバックパターン</h2>
        <p className="text-gray-400 mb-4">
          typedef した関数ポインタをコールバックとして受け取る関数を作れます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef void (*Callback)(int);

void forEach(int *arr, int n, Callback cb) {
    for (int i = 0; i < n; i++) {
        cb(arr[i]);
    }
}

void printDouble(int x) { printf("%d ", x * 2); }
void printSquare(int x) { printf("%d ", x * x); }

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = 5;

    printf("2倍: ");
    forEach(arr, n, printDouble);
    printf("\\n");

    printf("2乗: ");
    forEach(arr, n, printSquare);
    printf("\\n");

    return 0;
}`}
          expectedOutput={`2倍: 2 4 6 8 10 
2乗: 1 4 9 16 25`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="type-aliases" />
      </div>
      <LessonNav lessons={lessons} currentId="type-aliases" basePath="/learn/enums" />
    </div>
  );
}
