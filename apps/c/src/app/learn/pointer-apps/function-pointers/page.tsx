import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointer-apps");

export default function FunctionPointersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタの応用 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数ポインタ</h1>
        <p className="text-gray-400">関数のアドレスを保持して間接的に呼び出す関数ポインタを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数ポインタとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語では関数もメモリ上のアドレスを持ちます。そのアドレスを格納する変数が<strong className="text-teal-400">関数ポインタ</strong>です。
          実行時に呼び出す関数を切り替えたり、コールバックとして関数を渡すのに使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>宣言: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">戻り値型 (*変数名)(引数型, ...)</code></li>
          <li>例: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int (*fp)(int, int)</code> — 2つのintを取りintを返す</li>
          <li>代入: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fp = add;</code> （&は省略可）</li>
          <li>呼び出し: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fp(3, 4)</code> または <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">(*fp)(3, 4)</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数ポインタの宣言と呼び出し</h2>
        <p className="text-gray-400 mb-4">
          同じシグネチャを持つ複数の関数を関数ポインタで切り替えて呼び出せます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main() {
    int (*fp)(int, int);  // 関数ポインタの宣言

    fp = add;
    printf("add(10, 3) = %d\\n", fp(10, 3));

    fp = sub;
    printf("sub(10, 3) = %d\\n", fp(10, 3));

    fp = mul;
    printf("mul(10, 3) = %d\\n", fp(10, 3));

    return 0;
}`}
          expectedOutput={`add(10, 3) = 13
sub(10, 3) = 7
mul(10, 3) = 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数ポインタの配列</h2>
        <p className="text-gray-400 mb-4">
          関数ポインタを配列に格納すると、テーブル駆動のディスパッチが実現できます。
          switch文の代わりとして使われるパターンです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void say_hello(void) { printf("Hello!\\n"); }
void say_bye(void)   { printf("Goodbye!\\n"); }
void say_hi(void)    { printf("Hi there!\\n"); }

int main() {
    void (*greetings[])(void) = {say_hello, say_bye, say_hi};
    int n = 3;

    for (int i = 0; i < n; i++) {
        greetings[i]();
    }

    // インデックスで選択
    int choice = 1;
    greetings[choice]();

    return 0;
}`}
          expectedOutput={`Hello!
Goodbye!
Hi there!
Goodbye!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">typedefで読みやすくする</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">typedef</code> で関数ポインタ型に名前を付けると、
          宣言がシンプルになります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

typedef int (*BinaryOp)(int, int);  // 型エイリアス

int add(int a, int b) { return a + b; }
int max_val(int a, int b) { return (a > b) ? a : b; }

void apply(BinaryOp op, int x, int y) {
    printf("結果: %d\\n", op(x, y));
}

int main() {
    BinaryOp op = add;
    apply(op, 5, 3);

    op = max_val;
    apply(op, 5, 3);

    return 0;
}`}
          expectedOutput={`結果: 8
結果: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointer-apps" lessonId="function-pointers" />
      </div>
      <LessonNav lessons={lessons} currentId="function-pointers" basePath="/learn/pointer-apps" />
    </div>
  );
}
